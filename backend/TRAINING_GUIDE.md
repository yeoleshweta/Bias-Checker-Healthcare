# Model Training Guide

## Overview

This guide explains how to train the ABIM Bias Checker model locally.

## Prerequisites

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Prepare Dataset

Place your dataset CSV file at: `backend/data/abim_bias_balanced_3Bias.csv`

The dataset should have the following columns:

- `text_clean`: The medical text to analyze
- `bias_label`: The bias category

Expected bias labels (will be consolidated to 4 main categories):

- `no_bias`
- `demographic_bias` (or `structural_bias`, `algorithmic_bias`)
- `clinical_stigma_bias` (or `documentation_bias`)
- `assessment_bias`

## Training the Model

### Run the Training Script

```bash
cd backend
python train_model.py
```

### What Happens During Training:

1. **Data Loading**: Loads and validates your dataset
2. **Preprocessing**: Tokenizes text and creates train/test splits (85/15)
3. **Model Setup**: Loads RoBERTa-base and adds LoRA adapters
4. **Training**: Trains for 6 epochs with the following config:
   - Learning rate: 1e-5
   - Batch size: 16
   - Optimizer: AdamW with weight decay
   - Early stopping based on F1 score
5. **Evaluation**: Tests on holdout set
6. **Saves**: Model files, logs, and learning curve plot

### Training Time:

- With GPU (recommended): ~5-10 minutes
- With CPU: ~30-60 minutes

### Output Files

All files are saved to: `backend/models/RoBERTa_Optimized/`

Key files:

- `adapter_config.json` - LoRA adapter configuration
- `adapter_model.bin` - Trained adapter weights
- `label_mappings.json` - Label to ID mappings
- `training_logs.json` - Training history
- `learning_curve.png` - F1 score plot

## Using the Trained Model

### 1. The model is automatically configured for use

The `predict.py` script is already set up to load from the correct path.

### 2. Test the Model

```bash
python backend/test_model.py
```

### 3. Start the API Server

```bash
python backend/src/app.py
```

The API will be available at `http://localhost:8000`

### 4. API Endpoints

**Health Check**:

```bash
curl http://localhost:8000/health
```

**Single Prediction**:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "The patient declined the procedure after reviewing the risks."}'
```

**Batch Predictions**:

```bash
curl -X POST http://localhost:8000/predict-batch \
  -H "Content-Type: application/json" \
  -d '{
    "texts": [
      "Patient claims pain but appears comfortable.",
      "Physical exam reveals clear lungs bilaterally."
    ]
  }'
```

## Expected Results

Based on the Colab notebook training, you should achieve:

- **Accuracy**: ~98.6%
- **Macro F1**: ~98.6%

## Troubleshooting

### "Dataset not found" Error

- Ensure your CSV file is at `backend/data/abim_bias_balanced_3Bias.csv`
- Check that the CSV has the required columns: `text_clean` and `bias_label`

### Out of Memory (OOM) Errors

- Reduce `BATCH_SIZE` in `train_model.py` (try 8 or 4)
- Close other applications
- Consider using a machine with more RAM
- If using GPU, ensure you have at least 4GB VRAM

### Slow Training

- Training on CPU is slow but will work
- Consider using Google Colab for free GPU access
- Or use a cloud instance with GPU

### Model Not Loading

- Ensure training completed successfully
- Check that files exist in `backend/models/RoBERTa_Optimized/`
- Verify `adapter_config.json` and `adapter_model.bin` are present

## Re-training

To retrain the model:

1. Delete or rename the `backend/models/RoBERTa_Optimized` directory
2. Run `python train_model.py` again

## Using Your Own Dataset

If you want to use a different dataset:

1. Prepare a CSV with columns `text_clean` and `bias_label`
2. Update `DATASET_PATH` in `train_model.py`
3. Ensure your bias labels match or update the `label_map` dictionary
4. Run training

## Advanced Configuration

Edit `train_model.py` to customize:

- `NUM_EPOCHS`: Number of training epochs (default: 6)
- `BATCH_SIZE`: Batch size (default: 16)
- `LEARNING_RATE`: Learning rate (default: 1e-5)
- `MAX_LENGTH`: Max token length (default: 256)
- LoRA hyperparameters in `LoraConfig`
