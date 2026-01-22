# ABIM Bias Checker - Quick Start

## ✅ Setup Complete!

Your backend is now configured to train and run the bias detection model.

## 📋 Current Status

✅ Training script created: `train_model.py`
✅ Dependencies updated: `requirements.txt`  
✅ Prediction script updated: `src/predict.py`
✅ Training guide created: `TRAINING_GUIDE.md`
❌ **Model not yet trained** - Dataset required

## 🚀 Next Steps

### Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Add Your Dataset

Place your training dataset CSV file here:

```
backend/data/abim_bias_balanced_3Bias.csv
```

**Required CSV format:**

- Column 1: `text_clean` - The medical text
- Column 2: `bias_label` - One of: no_bias, demographic_bias, clinical_stigma_bias, assessment_bias

**Example:**

```csv
text_clean,bias_label
"The patient declined the procedure after discussing risks.",no_bias
"The 45-year-old Black male was readmitted due to inability to afford medication.",demographic_bias
"Patient claims 10/10 pain but appears comfortable.",clinical_stigma_bias
"The resident is too confident and often challenges decisions.",assessment_bias
```

### Step 3: Train the Model

```bash
python train_model.py
```

This will:

- Load and validate your dataset
- Train a RoBERTa model with LoRA adapters
- Save the model to `models/RoBERTa_Optimized/`
- Generate training logs and learning curves

**Training time:** 5-10 min (GPU) or 30-60 min (CPU)

### Step 4: Test the Model

```bash
python test_model.py
```

### Step 5: Start the API Server

```bash
python src/app.py
```

API will be available at: `http://localhost:8000`

## 📚 Documentation

- **Full Training Guide**: See `TRAINING_GUIDE.md` for detailed instructions
- **API Documentation**: See `README.md` for API endpoint details
- **Model Architecture**: See `notebook/model_note.ipynb` for original notebook

## 🔍 Troubleshooting

**"Dataset not found" error?**

- Ensure your CSV is at `backend/data/abim_bias_balanced_3Bias.csv`
- Check CSV has columns: `text_clean` and `bias_label`

**No dataset available?**

- You can run the original notebook in Google Colab to train
- Or create a sample dataset following the format above

**Model not loading?**

- Make sure training completed successfully
- Check files exist in `backend/models/RoBERTa_Optimized/`

## 💡 Alternative: Use Google Colab

If you prefer to use the original Colab notebook:

1. Upload `backend/notebook/model_note.ipynb` to Google Colab
2. Upload your dataset to Google Drive
3. Run all cells to train
4. Download the trained model files from Drive
5. Place them in `backend/models/RoBERTa_Optimized/`

## 🎯 Expected Results

After training, you should achieve:

- **Accuracy**: ~98.6%
- **F1 Score**: ~98.6%

## 🔗 Integration with Frontend

Once the model is trained and the API is running:

1. Frontend is already configured to connect to `http://localhost:8000`
2. The `/predict` endpoint will be used for bias detection
3. Start frontend with: `cd frontend && npm run dev`

---

**Need help?** Check `TRAINING_GUIDE.md` for detailed troubleshooting.
