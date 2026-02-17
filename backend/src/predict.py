import torch
import os
import certifi

# Ensure Python SSL and requests use certifi's CA bundle (fixes Windows cert issues)
os.environ.setdefault("SSL_CERT_FILE", certifi.where())
os.environ.setdefault("REQUESTS_CA_BUNDLE", certifi.where())

from transformers import AutoTokenizer, AutoModelForSequenceClassification
from peft import PeftModel

# 1. SETUP PATHS
# Adjust this path to where your trained model is saved in your deployment environment
SCRIPT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_MODEL_PATH = os.path.join(SCRIPT_DIR, "models", "RoBERTa_Optimized")
MODEL_PATH = os.environ.get("MODEL_PATH", DEFAULT_MODEL_PATH)

# Verify the file exists before trying to load
if not os.path.exists(os.path.join(MODEL_PATH, "adapter_config.json")):
    print(f"⚠️ WARNING: 'adapter_config.json' not found in {MODEL_PATH}")
    print("Checking for sub-folders (checkpoints)...")
    subfolders = [f.path for f in os.scandir(MODEL_PATH) if f.is_dir()]
    if subfolders:
        print(f"Found checkpoints: {subfolders}")
        MODEL_PATH = subfolders[-1] # Pick the latest checkpoint
        print(f"➡️ Switching path to: {MODEL_PATH}")
    else:
        raise FileNotFoundError(f"Could not find adapter_config.json. Ensure the model is correctly saved at {MODEL_PATH} or its subfolder.")

device = "cuda" if torch.cuda.is_available() else "cpu"

# 2. LOAD THE BASE MODEL (The "Brain")
print("⏳ Loading Base RoBERTa Model...")
# The num_labels MUST match the number of unique labels in your training data
# Based on the notebook, there are 4 unique labels: 'assessment_bias', 'clinical_stigma_bias', 'demographic_bias', 'no_bias'
base_model = AutoModelForSequenceClassification.from_pretrained(
    "roberta-base",
    num_labels=4,
    return_dict=True
)

# 3. LOAD YOUR TRAINED ADAPTERS (The "New Knowledge")
print(f"🔗 Attaching LoRA Adapters from {MODEL_PATH}...")
model = PeftModel.from_pretrained(base_model, MODEL_PATH)
model.to(device)
model.eval() # Set to evaluation mode

# 4. LOAD TOKENIZER
tokenizer = AutoTokenizer.from_pretrained("roberta-base")

# 5. DEFINE ID2LABEL MAPPING (MUST match training)
id2label = {
    0: 'assessment_bias',
    1: 'clinical_stigma_bias',
    2: 'demographic_bias',
    3: 'no_bias'
}

def predict_bias(text: str):
    """
    Predicts the bias label for a given input text.
    """
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128).to(device)

    with torch.no_grad():
        logits = model(**inputs).logits

    probs = torch.nn.functional.softmax(logits, dim=-1)
    confidence, pred_id = torch.max(probs, dim=-1)

    predicted_label = id2label[pred_id.item()]
    return predicted_label, confidence.item()

if __name__ == "__main__":
    # Example usage from the notebook's test cases
    test_cases = [
        # DEMOGRAPHIC
        ("The patient's failure to adhere to the diet is likely due to cultural preferences common in Hispanic populations.", "demographic_bias"),
        ("The 45-year-old Black male was readmitted due to inability to afford medication.", "demographic_bias"),

        # STIGMA
        ("The patient is a frequent flyer who is non-compliant with all nursing staff.", "clinical_stigma_bias"),
        ("Patient claims he is in 10/10 pain but appears comfortable.", "clinical_stigma_bias"),

        # ASSESSMENT
        ("The resident is abrasive and too confident, often challenging decisions.", "assessment_bias"),

        # NO BIAS
        ("The patient declined the procedure after a discussion of risks.", "no_bias"),
        ("Physical exam reveals clear lungs bilaterally.", "no_bias")
    ]

    print("\n🚀 RUNNING DIAGNOSTICS...\n")
    for text, expected in test_cases:
        predicted_label, confidence = predict_bias(text)

        status = "✅ PASS" if predicted_label == expected else f"❌ FAIL (Got {predicted_label})"

        print(f"Text: {text[:60]}...")
        print(f"   Expected: {expected}")
        print(f"   Predicted: {predicted_label} ({confidence:.2%})")
        print(f"   Result: {status}\n")
