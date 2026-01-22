#!/usr/bin/env python3
"""
ABIM Bias Checker - Model Training Script
Adapted from the Colab notebook for local execution

Prerequisites:
1. Install required packages (see requirements.txt)
2. Place your dataset CSV at backend/data/abim_bias_balanced_3Bias.csv
3. Run this script from the backend directory

Usage:
    python train_model.py
"""

import os
import json
import random
import numpy as np
import pandas as pd
import torch
import matplotlib.pyplot as plt
from datasets import Dataset, ClassLabel
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    DataCollatorWithPadding
)
from peft import LoraConfig, get_peft_model, TaskType
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# ==========================================
# CONFIGURATION
# ==========================================

# Output paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(SCRIPT_DIR, "models")
OUTPUT_DIR = os.path.join(MODELS_DIR, "RoBERTa_Optimized")
DATA_DIR = os.path.join(SCRIPT_DIR, "data")

# Create directories if they don't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

# Dataset path - adjust if your dataset is elsewhere
DATASET_PATH = os.path.join(DATA_DIR, "abim_bias_balanced_3Bias.csv")

# Model configuration
MODEL_ID = "roberta-base"
MAX_LENGTH = 256
NUM_EPOCHS = 6
BATCH_SIZE = 16
LEARNING_RATE = 1e-5

print("=" * 60)
print("ABIM Bias Checker - Model Training")
print("=" * 60)
print(f"\nConfiguration:")
print(f"  Output Directory: {OUTPUT_DIR}")
print(f"  Dataset Path: {DATASET_PATH}")
print(f"  Base Model: {MODEL_ID}")
print(f"  Max Length: {MAX_LENGTH}")
print(f"  Epochs: {NUM_EPOCHS}")
print(f"  Batch Size: {BATCH_SIZE}")
print("=" * 60)

# ==========================================
# 1. REPRODUCIBILITY
# ==========================================

def set_seeds(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    print(f"✅ Random Seed Locked: {seed}")

set_seeds(42)

# ==========================================
# 2. DATA LOADING & PREPROCESSING
# ==========================================

print("\n📂 Loading Dataset...")

# Check if dataset exists
if not os.path.exists(DATASET_PATH):
    print(f"\n❌ ERROR: Dataset not found at {DATASET_PATH}")
    print("\nPlease place your dataset CSV file at:")
    print(f"  {DATASET_PATH}")
    print("\nThe dataset should have columns:")
    print("  - text_clean: The medical text")
    print("  - bias_label: The bias category")
    print("\nExpected bias labels:")
    print("  - no_bias")
    print("  - demographic_bias")
    print("  - clinical_stigma_bias")
    print("  - assessment_bias")
    print("  (or: structural_bias, algorithmic_bias, documentation_bias - will be mapped)")
    exit(1)

df = pd.read_csv(DATASET_PATH)
print(f"✅ Loaded {len(df)} samples")

# Label mapping (consolidating categories)
label_map = {
    'no_bias': 'no_bias',
    'demographic_bias': 'demographic_bias',
    'structural_bias': 'demographic_bias',
    'algorithmic_bias': 'demographic_bias',
    'clinical_stigma_bias': 'clinical_stigma_bias',
    'documentation_bias': 'clinical_stigma_bias',
    'assessment_bias': 'assessment_bias'
}

df['bias_label'] = df['bias_label'].map(label_map)

# Validation Check
print("\n📊 Class Distribution:")
print(df['bias_label'].value_counts())

# Create label mappings
labels = sorted(df['bias_label'].unique())
label2id = {l: i for i, l in enumerate(labels)}
id2label = {i: l for i, l in enumerate(labels)}

print(f"\n🏷️  Label Mappings:")
for label, idx in label2id.items():
    print(f"  {idx}: {label}")

# Convert to HuggingFace Dataset
hf_dataset = Dataset.from_pandas(df)
hf_dataset = hf_dataset.map(lambda x: {"label": label2id[x["bias_label"]]}, batched=False)
hf_dataset = hf_dataset.cast_column("label", ClassLabel(num_classes=len(labels)))

# ==========================================
# 3. TOKENIZATION
# ==========================================

print(f"\n⚙️  Tokenizing Data...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)

def tokenize_fn(batch):
    return tokenizer(
        batch["text_clean"],
        truncation=True,
        padding="max_length",
        max_length=MAX_LENGTH
    )

tokenized_ds = hf_dataset.map(tokenize_fn, batched=True)

# Stratified split
tokenized_ds = tokenized_ds.train_test_split(
    test_size=0.15,
    seed=42,
    stratify_by_column="label"
)

print(f"✅ Training samples: {len(tokenized_ds['train'])}")
print(f"✅ Test samples: {len(tokenized_ds['test'])}")

# ==========================================
# 4. MODEL ARCHITECTURE (RoBERTa + LoRA)
# ==========================================

print("\n🏗️  Building Model Architecture...")
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_ID,
    num_labels=len(labels),
    id2label=id2label,
    label2id=label2id
)

# LoRA Configuration
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["query", "key", "value", "dense"],
    lora_dropout=0.1,
    bias="none",
    task_type=TaskType.SEQ_CLS
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# ==========================================
# 5. TRAINING CONFIGURATION
# ==========================================

training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    learning_rate=LEARNING_RATE,
    per_device_train_batch_size=BATCH_SIZE,
    num_train_epochs=NUM_EPOCHS,
    weight_decay=0.1,
    warmup_ratio=0.15,
    label_smoothing_factor=0.1,
    eval_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1",
    fp16=torch.cuda.is_available(),  # Only use fp16 if CUDA is available
    logging_steps=50,
    report_to="none",
    seed=42,
    data_seed=42
)

def compute_metrics(eval_pred):
    logits, labels_ids = eval_pred
    preds = np.argmax(logits, axis=-1)
    precision, recall, f1, _ = precision_recall_fscore_support(
        labels_ids, preds, average='macro'
    )
    acc = accuracy_score(labels_ids, preds)
    return {"accuracy": acc, "f1": f1}

# ==========================================
# 6. TRAINING
# ==========================================

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_ds["train"],
    eval_dataset=tokenized_ds["test"],
    compute_metrics=compute_metrics,
    data_collator=DataCollatorWithPadding(tokenizer)
)

print("\n🚀 Starting Training...")
print(f"   Device: {'CUDA' if torch.cuda.is_available() else 'CPU'}")
print(f"   This may take a while...\n")

trainer.train()

# ==========================================
# 7. EVALUATION & SAVING
# ==========================================

print("\n📊 Evaluating Model...")
results = trainer.evaluate()

print("\n🏆 Final Results:")
print(f"   Accuracy: {results['eval_accuracy']:.4f}")
print(f"   Macro F1: {results['eval_f1']:.4f}")

# Save training logs
log_path = os.path.join(OUTPUT_DIR, "training_logs.json")
with open(log_path, "w") as f:
    json.dump(trainer.state.log_history, f, indent=2)
print(f"\n📊 Logs saved to {log_path}")

# Save the PEFT adapter model
model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)
print(f"✅ Model saved to {OUTPUT_DIR}")

# Save label mappings for inference
mapping_path = os.path.join(OUTPUT_DIR, "label_mappings.json")
with open(mapping_path, "w") as f:
    json.dump({"label2id": label2id, "id2label": id2label}, f, indent=2)
print(f"✅ Label mappings saved to {mapping_path}")

# Plot learning curve
print("\n📈 Generating Learning Curve...")
epochs = [x['epoch'] for x in trainer.state.log_history if 'eval_f1' in x]
f1_scores = [x['eval_f1'] for x in trainer.state.log_history if 'eval_f1' in x]

if epochs and f1_scores:
    plt.figure(figsize=(10, 6))
    plt.plot(epochs, f1_scores, 'o-', color='#4e79a7', linewidth=2)
    plt.title("Model Learning Curve (F1 Score)")
    plt.xlabel("Epochs")
    plt.ylabel("Macro F1")
    plt.grid(True, alpha=0.3)
    plot_path = os.path.join(OUTPUT_DIR, "learning_curve.png")
    plt.savefig(plot_path)
    print(f"✅ Learning curve saved to {plot_path}")

print("\n" + "=" * 60)
print("✅ TRAINING COMPLETE!")
print("=" * 60)
print(f"\nModel files saved to: {OUTPUT_DIR}")
print("\nNext steps:")
print("1. The model is ready to use with backend/src/predict.py")
print("2. Update MODEL_PATH in predict.py to point to this directory")
print("3. Start the Flask API with: python backend/src/app.py")
print("=" * 60)
