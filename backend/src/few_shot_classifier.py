"""
Few-Shot Prompting Medical Bias Classifier

Based on the Medical_Bias_Checker_Pipeline.ipynb from Colab.
This module provides bias detection using OpenAI's API with few-shot prompting.

The classifier identifies biases across:
- 4 Main Categories: no_bias, demographic_bias, clinical_stigma_bias, assessment_bias
- 11 Sub-Types: racial_bias, gender_bias, age_bias, socioeconomic_bias,
                weight_stigma, pain_stigma, mental_health_stigma, lifestyle_stigma,
                diagnostic_bias, competency_assessment_bias, treatment_decision_bias

Usage:
    from few_shot_classifier import classify_bias_few_shot
    result = classify_bias_few_shot("Your clinical text here")
"""

import os
import json
import time
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Lazy-loaded client (initialized on first use)
_client = None

def get_openai_client():
    """Get or create the OpenAI client (lazy initialization)."""
    global _client
    if _client is None:
        from openai import OpenAI
        api_key = os.environ.get("OPENAI_API_KEY")
        if api_key:
            _client = OpenAI(api_key=api_key)
    return _client

# Model configuration (can be overridden via environment variable)
# Options: gpt-4o (most accurate), gpt-4o-mini (faster/cheaper), gpt-4.1
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")

# Load few-shot examples configuration
DATA_DIR = Path(__file__).parent.parent / "data"
EXAMPLES_FILE = DATA_DIR / "few_shot_examples.json"

def load_config():
    """Load the few-shot examples configuration."""
    try:
        with open(EXAMPLES_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"⚠️ Warning: {EXAMPLES_FILE} not found. Using fallback configuration.")
        return {
            "system_prompt": "You are a medical bias detection expert.",
            "categories": {},
            "few_shot_examples": [],
            "output_format": {}
        }

CONFIG = load_config()


def build_few_shot_prompt(input_text: str) -> list:
    """
    Constructs the few-shot prompt with examples from each bias category.
    
    Structure: [System Prompt] + [Few-Shot Example Pairs] + [User Content]
    
    Args:
        input_text: The clinical text to classify
        
    Returns:
        List of message dictionaries for the OpenAI API
    """
    messages = [{"role": "system", "content": CONFIG["system_prompt"]}]
    
    # Add few-shot examples (user/assistant pairs)
    for example in CONFIG.get("few_shot_examples", []):
        role = example.get("role")
        content = example.get("content")
        
        # If content is a dict (structured response), convert to JSON string
        if isinstance(content, dict):
            content = json.dumps(content)
        
        messages.append({"role": role, "content": content})
    
    # Add the actual input to classify
    messages.append({
        "role": "user",
        "content": f"Analyze this medical content for bias:\n\n{input_text}"
    })
    
    return messages


def classify_bias_few_shot(text: str, verbose: bool = False) -> dict:
    """
    Classify clinical text for bias using few-shot prompting.
    
    This is the main function aligned with the MedicalBiasChecker from the notebook.
    
    Args:
        text: The clinical text to analyze
        verbose: If True, print progress messages
        
    Returns:
        Dictionary containing:
        - bias_detected: Boolean indicating if bias was found
        - primary_category: The main bias category
        - overall_bias_level: NONE, LOW, MODERATE, HIGH, or CRITICAL
        - biases_found: List of detected biases with details
        - bias_free_sections: List of well-written sections
        - summary: Brief overall assessment
    """
    # Check for API key
    if not os.environ.get("OPENAI_API_KEY"):
        return {
            "bias_detected": False,
            "primary_category": "error",
            "overall_bias_level": "NONE",
            "biases_found": [],
            "bias_free_sections": [],
            "summary": "OpenAI API Key not configured. Please set OPENAI_API_KEY environment variable.",
            "error": "missing_api_key"
        }
    
    if verbose:
        print(f"Analyzing ({len(text)} chars) with {MODEL}...")
    
    start_time = time.time()
    
    try:
        # Get the OpenAI client
        client = get_openai_client()
        if client is None:
            return {
                "bias_detected": False,
                "primary_category": "error",
                "overall_bias_level": "NONE",
                "biases_found": [],
                "bias_free_sections": [],
                "summary": "Failed to initialize OpenAI client. Check your API key.",
                "error": "client_init_failed"
            }
        
        # Build the prompt
        messages = build_few_shot_prompt(text)
        
        # Call OpenAI API with JSON mode
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.1,  # Low temperature for consistency
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        result = json.loads(content)
        
        elapsed = time.time() - start_time
        
        if verbose:
            print(f"Analysis completed in {elapsed:.1f}s")
            _print_report(result, elapsed)
        
        # Validate and normalize response
        return {
            "bias_detected": result.get("bias_detected", False),
            "primary_category": result.get("primary_category", "unknown"),
            "overall_bias_level": result.get("overall_bias_level", "NONE"),
            "biases_found": result.get("biases_found", []),
            "bias_free_sections": result.get("bias_free_sections", []),
            "summary": result.get("summary", "No summary provided.")
        }
    
    except json.JSONDecodeError as e:
        return {
            "bias_detected": False,
            "primary_category": "error",
            "overall_bias_level": "NONE",
            "biases_found": [],
            "bias_free_sections": [],
            "summary": f"Failed to parse model response as JSON: {str(e)}",
            "error": "json_parse_error"
        }
    
    except Exception as e:
        return {
            "bias_detected": False,
            "primary_category": "error",
            "overall_bias_level": "NONE",
            "biases_found": [],
            "bias_free_sections": [],
            "summary": f"Classification failed: {str(e)}",
            "error": str(e)
        }


def _print_report(result: dict, elapsed: float):
    """Pretty-print the bias analysis report (from notebook)."""
    print("=" * 65)
    print("BIAS ANALYSIS REPORT")
    print("=" * 65)

    level = result.get("overall_bias_level", "?")
    primary = result.get("primary_category", "?")
    icons = {"NONE": "🟢", "LOW": "🟡", "MODERATE": "🟠", "HIGH": "🔴", "CRITICAL": "⛔"}

    print(f"  Bias Detected:    {'Yes' if result.get('bias_detected') else 'No'}")
    print(f"  Primary Category: {primary.replace('_', ' ').title()}")
    print(f"  Bias Level:       {icons.get(level, '❓')} {level}")
    print(f"  Analysis Time:    {elapsed:.1f}s")

    biases = result.get("biases_found", [])
    if biases:
        print(f"\n  Biases Found: {len(biases)}")
        print("-" * 65)
        for i, b in enumerate(biases, 1):
            category = b.get("category", "unknown").replace("_", " ").title()
            sub_type = b.get("sub_type", "unknown").replace("_", " ").title()
            confidence = b.get("confidence", 0)

            print(f"\n  [{i}] {category} > {sub_type}")
            print(f"      Confidence: {confidence:.0%}")
            print(f"      Evidence:   {b.get('evidence', '')[:120]}")
            print(f"      Text:       \"{b.get('problematic_text', '')[:100]}\"")
            print(f"      Fix:        {b.get('recommendation', '')[:120]}")
    else:
        print("\n  ✅ No biases detected - content appears fair and well-documented!")

    clean = result.get("bias_free_sections", [])
    if clean:
        print(f"\n  Bias-Free Sections:")
        for s in clean:
            print(f"    ✓ {s}")

    print(f"\n  Summary: {result.get('summary', 'N/A')}")
    print("=" * 65)


def get_model_info() -> dict:
    """Return information about the currently configured model."""
    categories = CONFIG.get("categories", {})
    
    # Count sub-types
    total_sub_types = 0
    for cat in categories.values():
        if "sub_types" in cat:
            total_sub_types += len(cat["sub_types"])
    
    return {
        "model": MODEL,
        "examples_file": str(EXAMPLES_FILE),
        "categories": list(categories.keys()),
        "total_sub_types": total_sub_types,
        "total_examples": len(CONFIG.get("few_shot_examples", [])) // 2
    }


def get_bias_categories() -> dict:
    """Return the full bias category definitions."""
    return CONFIG.get("categories", {})


# --------------------------------------------------------------------------
# Compatibility layer for existing app.py endpoint
# --------------------------------------------------------------------------

def classify_for_api(text: str) -> dict:
    """
    Wrapper function that maps the few-shot result to the format expected
    by the existing /predict endpoint.
    
    Returns:
        - predicted_label: The primary bias category
        - confidence: Average confidence of detected biases (or 0.95 for no_bias)
        - rationale: The summary
        - flags: List of problematic texts
        - recommended_revision: Combined recommendations
    """
    result = classify_bias_few_shot(text)
    
    biases = result.get("biases_found", [])
    
    # Calculate average confidence
    if biases:
        avg_confidence = sum(b.get("confidence", 0) for b in biases) / len(biases)
    else:
        avg_confidence = 0.95 if result.get("primary_category") == "no_bias" else 0.0
    
    # Extract flags (problematic texts)
    flags = [b.get("problematic_text", "") for b in biases if b.get("problematic_text")]
    
    # Combine recommendations
    recommendations = [b.get("recommendation", "") for b in biases if b.get("recommendation")]
    combined_revision = " | ".join(recommendations) if recommendations else text
    
    return {
        "predicted_label": result.get("primary_category", "unknown"),
        "confidence": round(avg_confidence, 4),
        "rationale": result.get("summary", ""),
        "flags": flags,
        "recommended_revision": combined_revision,
        "overall_bias_level": result.get("overall_bias_level", "NONE"),
        "biases_found": biases,
        "bias_free_sections": result.get("bias_free_sections", [])
    }


# CLI testing
if __name__ == "__main__":
    print("=" * 65)
    print("FEW-SHOT MEDICAL BIAS CLASSIFIER - TEST MODE")
    print("=" * 65)
    
    # Print model info
    info = get_model_info()
    print(f"\n📊 Model: {info['model']}")
    print(f"📁 Examples file: {info['examples_file']}")
    print(f"📋 Categories: {', '.join(info['categories'])}")
    print(f"📝 Sub-types: {info['total_sub_types']}")
    print(f"🎯 Few-shot examples: {info['total_examples']} pairs")
    
    # Test cases aligned with notebook
    test_cases = [
        ("The patient, a 58-year-old individual, presented with persistent cough. Comprehensive workup initiated.", "no_bias"),
        ("The Hispanic patient probably won't follow the diet due to cultural reasons.", "demographic_bias"),
        ("Patient is a frequent flyer seeking drugs, appeared to be exaggerating pain.", "clinical_stigma_bias"),
        ("Despite her accent, the female resident communicates adequately.", "assessment_bias"),
    ]
    
    print("\n" + "=" * 65)
    print("RUNNING TEST CASES")
    print("=" * 65)
    
    for text, expected in test_cases:
        result = classify_bias_few_shot(text)
        status = "✅" if result["primary_category"] == expected else "❌"
        
        print(f"\n{status} Input: \"{text[:60]}...\"")
        print(f"   Expected: {expected}")
        print(f"   Predicted: {result['primary_category']} ({result['overall_bias_level']})")
        print(f"   Biases: {len(result['biases_found'])}")
        print(f"   Summary: {result['summary'][:80]}...")
