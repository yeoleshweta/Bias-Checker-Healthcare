# ABIM Bias Checker - Deployment Model

This folder contains everything needed to deploy the ABIM Bias Checker model.

## Directory Structure

```
deployment_model/
├── src/
│   ├── predict.py         # Core prediction logic
│   └── app.py             # Flask REST API application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker container configuration
├── README.md             # This file
├── .env.example          # Example environment variables
└── models/               # (Will contain your trained model weights)
```

## Prerequisites

1. **Python 3.9+** installed locally, or Docker for containerization
2. **Trained Model Weights**: You need to copy your trained model files to the `models/` directory
3. **Dependencies**: Listed in `requirements.txt`

## Setup

### Option 1: Local Deployment

1. **Install dependencies**:

```bash
pip install -r requirements.txt
```

2. **Set up model path** (create `.env` file):

```bash
cp .env.example .env
# Edit .env and set MODEL_PATH to your trained model location
```

3. **Run the Flask API**:

```bash
python src/app.py
```

The API will be available at `http://localhost:8000`

### Option 2: Docker Deployment

1. **Build the Docker image**:

```bash
docker build -t abim-bias-checker:latest .
```

2. **Run the container**:

```bash
docker run -p 8000:8000 -v /path/to/models:/app/models -e MODEL_PATH=/app/models/your_model_path abim-bias-checker:latest
```

## API Endpoints

### Health Check

```bash
GET /health
```

Response:

```json
{ "status": "Model is ready" }
```

### Single Prediction

```bash
POST /predict
Content-Type: application/json

{
  "text": "The patient declined the procedure after a discussion of risks."
}
```

Response:

```json
{
  "text": "The patient declined the procedure after a discussion of risks.",
  "predicted_label": "no_bias",
  "confidence": 0.9876
}
```

### Batch Predictions

```bash
POST /predict-batch
Content-Type: application/json

{
  "texts": [
    "The patient's failure to adhere to the diet is likely due to cultural preferences common in Hispanic populations.",
    "The patient declined the procedure after a discussion of risks."
  ]
}
```

Response:

```json
{
  "predictions": [
    {
      "text": "The patient's failure to adhere to the diet is likely due to cultural preferences common in Hispanic populations.",
      "predicted_label": "demographic_bias",
      "confidence": 0.9542
    },
    {
      "text": "The patient declined the procedure after a discussion of risks.",
      "predicted_label": "no_bias",
      "confidence": 0.9876
    }
  ]
}
```

## Model Classes

The model predicts one of the following bias categories:

- `no_bias` - No detectable bias in the text
- `demographic_bias` - Bias related to patient demographics
- `clinical_stigma_bias` - Clinical stigma or documentation bias
- `assessment_bias` - Bias in clinical assessment or evaluation

## Configuration

### Environment Variables

Create a `.env` file or set these environment variables:

- `MODEL_PATH`: Path to your trained model (default: `/app/models/RoBERTa_Optimized`)

## Testing

Once the API is running, test with curl:

```bash
# Single prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "The patient declined the procedure."}'

# Health check
curl http://localhost:8000/health
```

## Model Setup (Critical Step)

Before running the API, ensure your trained model files are in the correct location:

1. Copy your trained model from training (adapter_config.json, adapter_model.bin, etc.) to the `models/` directory
2. Update the `MODEL_PATH` environment variable to point to this location
3. The model loading logic in `predict.py` will handle finding and loading the weights

## Performance Notes

- **GPU Acceleration**: The model will automatically use GPU if available (CUDA)
- **CPU Fallback**: Falls back to CPU if GPU is not available
- **Batch Inference**: Use `/predict-batch` for higher throughput
- **Max Token Length**: Texts are truncated to 128 tokens; longer texts are handled safely

## Troubleshooting

### "adapter_config.json not found"

- Ensure your model files are in the correct `MODEL_PATH`
- Check that `MODEL_PATH` environment variable is set correctly

### Out of Memory (OOM) errors

- Reduce batch size in `/predict-batch` requests
- Run on a machine with more GPU memory
- Consider CPU-only inference for lower throughput

### Model loading is slow

- First load caches model weights; subsequent calls are faster
- Consider warming up the model with a test request after startup

## Production Deployment

For production use, consider:

1. **Using Gunicorn or uWSGI** instead of Flask's development server:

```bash
gunicorn -w 4 -b 0.0.0.0:8000 src.app:app
```

2. **Setting up reverse proxy** (Nginx/Apache) for load balancing

3. **Adding authentication** to the API endpoints

4. **Monitoring** model performance and predictions

5. **Logging** all predictions for audit trail

## Support

For issues or questions, please refer to the original Jupyter notebook `ABIM_Bias.ipynb` for training details and model configuration.
