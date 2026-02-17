import os
import json
from openai import OpenAI

# Initialize client (expects OPENAI_API_KEY env var)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_bias_explanation(text, predicted_label, confidence):
    """
    Uses OpenAI GPT-4 to generate a clinical rationale, bias flags, and recommended revision
    based on the classification from the local discrimination model.
    """
    
    if not os.environ.get("OPENAI_API_KEY"):
        return {
            "rationale": "OpenAI API Key not configured. Using fallback templates.",
            "flags": [],
            "recommended_revision": text,
            "error": "missing_api_key"
        }

    # Construct the prompt
    system_prompt = """You are an expert medical auditor specializing in bias detection in clinical documentation. 
Your task is to analyze a clinical text based on a pre-detected bias label and provide a structured assessment."""

    user_prompt = f"""
Input Text: "{text}"
Detected Label: {predicted_label}
Model Confidence: {confidence:.2f}

Please provide a json response (note: use the word "json" lowercase) with the following fields:
1. "rationale": A professional clinical explanation (2-3 sentences) detailing why this text falls under the '{predicted_label}' category (or why it is unbiased if no_bias). Focus on the impact on patient care.
2. "flags": A list of specific substrings from the input text that are problematic. If 'no_bias', return an empty list.
3. "recommended_revision": A rewritten version of the text that conveys the same clinical information but removes the bias/stigma. If 'no_bias', return the original text.

Ensure the tone is objective, educational, and constructive.
Respond ONLY with the json object (no surrounding text or markdown fences).
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )

        content = response.choices[0].message.content
        
        # Parse JSON from response (strip markdown fences if present)
        if "```json" in content:
            content = content.replace("```json", "").replace("```", "")
        
        data = json.loads(content.strip())
        return data

    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        # Fallback in case of failure
        return {
            "rationale": f"Analysis unavailable due to service error: {str(e)}",
            "flags": [],
            "recommended_revision": text,
            "error": str(e)
        }
