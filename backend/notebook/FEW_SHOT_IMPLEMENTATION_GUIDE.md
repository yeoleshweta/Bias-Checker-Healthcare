# 🧠 Few-Shot Prompting Bias Detection: Complete Implementation Guide

This guide provides a step-by-step implementation for deploying a **few-shot prompting bias detection model** using the OpenAI API. The system analyzes medical content (clinical vignettes, case studies, documentation) and identifies biases using curated examples.

---

## 📋 Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Project Structure](#3-project-structure)
4. [Step 1: Define the Few-Shot Examples](#step-1-define-the-few-shot-examples)
5. [Step 2: Build the Jupyter Notebook Pipeline](#step-2-build-the-jupyter-notebook-pipeline)
6. [Step 3: Create the Production Service](#step-3-create-the-production-service)
7. [Step 4: Integrate with the Backend API](#step-4-integrate-with-the-backend-api)
8. [Step 5: Deploy to the Website](#step-5-deploy-to-the-website)
9. [Testing & Validation](#testing--validation)
10. [Cost Optimization](#cost-optimization)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  BiasChecker Component                                  │   │
│   │  - Text Input                                           │   │
│   │  - Results Display (Label, Confidence, Flags)           │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ POST /predict-fewshot
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Flask)                            │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  /predict-fewshot Endpoint                              │   │
│   │  - Validates input                                      │   │
│   │  - Calls FewShotBiasClassifier                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                            │                                    │
│                            ▼                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  few_shot_classifier.py                                 │   │
│   │  - Loads curated examples from JSON                     │   │
│   │  - Constructs few-shot prompt                           │   │
│   │  - Calls OpenAI API (gpt-4o / gpt-4o-mini)              │   │
│   │  - Parses and returns structured response               │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Prerequisites

### Software Requirements

- Python 3.10+
- Node.js 18+
- Jupyter Notebook / JupyterLab
- OpenAI API Key

### Python Dependencies

```bash
pip install openai python-dotenv flask flask-cors jupyter
```

### Environment Variables

Create a `.env` file in your `backend/` directory:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini  # or gpt-4o for higher accuracy
```

---

## 3. Project Structure

After implementation, your project should look like this:

```
backend/
├── data/
│   ├── few_shot_examples.json       # Curated examples for each bias type
│   └── abim_bias_balanced_3Bias.csv
├── notebook/
│   ├── few_shot_bias_detection.ipynb  # Development notebook
│   └── model_note.ipynb
├── src/
│   ├── app.py                        # Flask API
│   ├── few_shot_classifier.py        # Core few-shot logic
│   ├── llm_service.py
│   └── predict.py
└── requirements.txt
```

---

## Step 1: Define the Few-Shot Examples

Create a JSON file with curated examples for each bias category.

**File: `backend/data/few_shot_examples.json`**

```json
{
  "system_prompt": "You are an expert medical auditor specializing in bias detection in healthcare documentation, clinical vignettes, and medical assessments. Analyze the input text and classify it into one of the predefined bias categories based on the examples provided.",

  "categories": {
    "no_bias": {
      "definition": "Clinically appropriate, neutral language with no stereotypes, stigma, or inequitable assumptions.",
      "examples": [
        {
          "text": "The patient declined the recommended procedure after a thorough discussion of risks and benefits.",
          "rationale": "Neutral language respecting patient autonomy. No judgment implied."
        },
        {
          "text": "Physical examination reveals clear lung sounds bilaterally with no adventitious sounds.",
          "rationale": "Objective clinical observation without subjective commentary."
        }
      ]
    },
    "demographic_bias": {
      "definition": "Biased assumptions linked to race, ethnicity, gender, age, language, immigration status, or training pathway.",
      "examples": [
        {
          "text": "The patient's failure to adhere to the diet plan is likely due to cultural preferences common in Hispanic populations.",
          "rationale": "Stereotypes diet adherence based on ethnicity. Assumes cultural practices without individual assessment."
        },
        {
          "text": "The 45-year-old Black male was readmitted, probably because he couldn't afford his medications.",
          "rationale": "Assumes socioeconomic status based on race. No evidence provided for the assumption."
        }
      ]
    },
    "clinical_stigma_bias": {
      "definition": "Stigmatizing language that labels patients negatively or dismisses their reported symptoms.",
      "examples": [
        {
          "text": "Patient is a frequent flyer who is non-compliant with all nursing staff recommendations.",
          "rationale": "'Frequent flyer' is stigmatizing terminology. 'Non-compliant' implies fault without addressing barriers."
        },
        {
          "text": "Pt claims 10/10 pain but appears comfortable scrolling on phone.",
          "rationale": "Dismisses patient's reported pain as exaggerated. Implies malingering without clinical evidence."
        }
      ]
    },
    "assessment_bias": {
      "definition": "Bias in how trainees or candidates are evaluated, including subjective or unfair scoring criteria.",
      "examples": [
        {
          "text": "The resident is abrasive and too confident, often challenging attending decisions inappropriately.",
          "rationale": "Uses gendered/subjective terms like 'abrasive'. Penalizes assertiveness without objective criteria."
        },
        {
          "text": "Despite his accent, Dr. Patel communicates adequately with patients.",
          "rationale": "Links communication quality to accent, implying a deficit. Discriminatory evaluation criterion."
        }
      ]
    }
  },

  "output_format": {
    "predicted_label": "string (one of: no_bias, demographic_bias, clinical_stigma_bias, assessment_bias)",
    "confidence": "float (0.0 to 1.0)",
    "rationale": "string (2-3 sentence explanation)",
    "flags": ["array of specific problematic phrases"],
    "recommended_revision": "string (bias-free version of the text)"
  }
}
```

---

## Step 2: Build the Jupyter Notebook Pipeline

Create a development notebook to prototype and test the few-shot prompting logic.

**File: `backend/notebook/few_shot_bias_detection.ipynb`**

### Cell 1: Setup and Imports

```python
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv("../.env")

# Initialize OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Configuration
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
print(f"Using model: {MODEL}")
```

### Cell 2: Load Few-Shot Examples

```python
# Load the curated examples
with open("../data/few_shot_examples.json", "r") as f:
    config = json.load(f)

system_prompt = config["system_prompt"]
categories = config["categories"]
output_format = config["output_format"]

print("Loaded categories:", list(categories.keys()))
```

### Cell 3: Build the Few-Shot Prompt

```python
def build_few_shot_prompt(input_text: str) -> list:
    """
    Constructs a few-shot prompt with examples for each bias category.
    """
    messages = [{"role": "system", "content": system_prompt}]

    # Add examples for each category
    for category, data in categories.items():
        for example in data["examples"]:
            # User message (input)
            messages.append({
                "role": "user",
                "content": f"Analyze this text for bias:\n\n\"{example['text']}\""
            })
            # Assistant message (expected output)
            messages.append({
                "role": "assistant",
                "content": json.dumps({
                    "predicted_label": category,
                    "confidence": 0.95,
                    "rationale": example["rationale"],
                    "flags": [example["text"][:50] + "..."] if category != "no_bias" else [],
                    "recommended_revision": example["text"] if category == "no_bias" else "[Revised version would go here]"
                }, indent=2)
            })

    # Add the actual input to classify
    messages.append({
        "role": "user",
        "content": f"Analyze this text for bias:\n\n\"{input_text}\"\n\nRespond ONLY with a JSON object matching this schema: {json.dumps(output_format)}"
    })

    return messages

# Test prompt construction
test_prompt = build_few_shot_prompt("The elderly patient was confused as expected for her age.")
print(f"Total messages in prompt: {len(test_prompt)}")
```

### Cell 4: Call the OpenAI API

````python
def classify_bias(input_text: str) -> dict:
    """
    Classifies the input text using few-shot prompting.
    """
    messages = build_few_shot_prompt(input_text)

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=0.2,  # Low temperature for consistency
        max_tokens=500
    )

    content = response.choices[0].message.content

    # Parse JSON (handle markdown fences)
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0]
    elif "```" in content:
        content = content.split("```")[1].split("```")[0]

    return json.loads(content.strip())

# Test classification
result = classify_bias("The patient is a drug seeker who frequently visits the ER for pain meds.")
print(json.dumps(result, indent=2))
````

### Cell 5: Batch Testing

```python
test_cases = [
    ("The patient declined the procedure after a discussion of risks.", "no_bias"),
    ("The Hispanic patient probably won't follow the diet due to cultural reasons.", "demographic_bias"),
    ("Pt is a frequent flyer, non-compliant as usual.", "clinical_stigma_bias"),
    ("The female resident lacks the assertiveness needed for leadership.", "assessment_bias"),
]

print("=" * 80)
print("BATCH CLASSIFICATION RESULTS")
print("=" * 80)

for text, expected in test_cases:
    result = classify_bias(text)
    status = "✅" if result["predicted_label"] == expected else "❌"
    print(f"\n{status} Text: {text[:60]}...")
    print(f"   Expected: {expected}")
    print(f"   Predicted: {result['predicted_label']} (Confidence: {result['confidence']})")
    print(f"   Rationale: {result['rationale']}")
```

---

## Step 3: Create the Production Service

**File: `backend/src/few_shot_classifier.py`**

````python
import os
import json
from openai import OpenAI
from pathlib import Path

# Initialize client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")

# Load few-shot examples
DATA_DIR = Path(__file__).parent.parent / "data"
with open(DATA_DIR / "few_shot_examples.json", "r") as f:
    CONFIG = json.load(f)

def build_few_shot_prompt(input_text: str) -> list:
    """Constructs the few-shot prompt with examples."""
    messages = [{"role": "system", "content": CONFIG["system_prompt"]}]

    for category, data in CONFIG["categories"].items():
        for example in data["examples"]:
            messages.append({
                "role": "user",
                "content": f"Analyze this text for bias:\n\n\"{example['text']}\""
            })
            messages.append({
                "role": "assistant",
                "content": json.dumps({
                    "predicted_label": category,
                    "confidence": 0.95,
                    "rationale": example["rationale"],
                    "flags": [example["text"][:50] + "..."] if category != "no_bias" else [],
                    "recommended_revision": example["text"] if category == "no_bias" else "[See rationale for revision guidance]"
                })
            })

    messages.append({
        "role": "user",
        "content": f"Analyze this text for bias:\n\n\"{input_text}\"\n\nRespond ONLY with valid JSON."
    })

    return messages

def classify_bias_few_shot(text: str) -> dict:
    """
    Main function to classify bias using few-shot prompting.
    Returns a structured response with label, confidence, rationale, flags, and revision.
    """
    if not os.environ.get("OPENAI_API_KEY"):
        return {
            "predicted_label": "error",
            "confidence": 0.0,
            "rationale": "OpenAI API Key not configured.",
            "flags": [],
            "recommended_revision": text,
            "error": "missing_api_key"
        }

    try:
        messages = build_few_shot_prompt(text)

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.2,
            max_tokens=500
        )

        content = response.choices[0].message.content

        # Parse JSON
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]

        result = json.loads(content.strip())

        # Ensure all required fields exist
        return {
            "predicted_label": result.get("predicted_label", "unknown"),
            "confidence": float(result.get("confidence", 0.0)),
            "rationale": result.get("rationale", ""),
            "flags": result.get("flags", []),
            "recommended_revision": result.get("recommended_revision", text)
        }

    except Exception as e:
        return {
            "predicted_label": "error",
            "confidence": 0.0,
            "rationale": f"Classification failed: {str(e)}",
            "flags": [],
            "recommended_revision": text,
            "error": str(e)
        }


if __name__ == "__main__":
    # Quick test
    test_text = "The patient is drug-seeking and non-compliant."
    result = classify_bias_few_shot(test_text)
    print(json.dumps(result, indent=2))
````

---

## Step 4: Integrate with the Backend API

Add a new endpoint to `app.py`:

```python
# Add this import at the top
from few_shot_classifier import classify_bias_few_shot

# Add this new endpoint
@app.route('/predict-fewshot', methods=['POST'])
def predict_fewshot():
    """
    Predict bias using few-shot prompting with GPT-4.
    Expected JSON: {"text": "your clinical text here"}
    """
    try:
        data = request.get_json()

        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field"}), 400

        text = data['text']

        if not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({"error": "Text must be a non-empty string"}), 400

        # Classify using few-shot prompting
        result = classify_bias_few_shot(text)

        # Calculate audit score
        if result["predicted_label"] == "no_bias":
            audit_score = min(10, round(8 + result["confidence"] * 2))
        else:
            audit_score = max(1, round((1 - result["confidence"]) * 10))

        result["text"] = text
        result["audit_score"] = audit_score

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

## Step 5: Deploy to the Website

Update the frontend `BiasChecker` component to use the new endpoint:

```typescript
// In frontend/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function analyzeBiasFewShot(text: string) {
  const response = await fetch(`${API_BASE_URL}/predict-fewshot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}
```

---

## Testing & Validation

Run the Jupyter notebook to validate the few-shot examples and tune the prompts before deploying.

```bash
cd backend/notebook
jupyter notebook few_shot_bias_detection.ipynb
```

---

## Cost Optimization

| Model       | Cost per 1M tokens (Input) | Cost per 1M tokens (Output) | Recommended Use               |
| ----------- | -------------------------- | --------------------------- | ----------------------------- |
| gpt-4o-mini | $0.15                      | $0.60                       | Development, high volume      |
| gpt-4o      | $2.50                      | $10.00                      | Production, critical accuracy |

**Tip**: Start with `gpt-4o-mini` for development, then switch to `gpt-4o` if accuracy is insufficient.

---

## 🚀 Ready!

Your `.ipynb` file can now be added to `backend/notebook/`. Let me know once you've added it, and I'll help integrate it into the production pipeline.
