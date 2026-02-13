#!/bin/bash

# ABIM Bias Checker - Local Deployment Script

echo "🚀 Starting ABIM Bias Checker Deployment..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ and try again."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file..."
    cp .env.example .env
    echo "⚠️ Please edit .env and set MODEL_PATH to your trained model location"
fi

# Start the Flask API
echo "🎯 Starting Flask API on http://localhost:8000"
echo "📝 API Endpoints:"
echo "   GET  /health          - Check if model is ready"
echo "   POST /predict         - Single prediction"
echo "   POST /predict-batch   - Batch predictions"
echo ""
python src/app.py
