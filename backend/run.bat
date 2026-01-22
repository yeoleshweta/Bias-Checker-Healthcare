@echo off
REM ABIM Bias Checker - Local Deployment Script for Windows

echo.
echo 🚀 Starting ABIM Bias Checker Deployment...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.9+ and try again.
    pause
    exit /b 1
)

echo ✅ Python found: 
python --version

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔄 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📚 Installing dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo ⚙️ Creating .env file...
    copy .env.example .env
    echo ⚠️ Please edit .env and set MODEL_PATH to your trained model location
)

REM Start the Flask API
echo.
echo 🎯 Starting Flask API on http://localhost:8000
echo 📝 API Endpoints:
echo    GET  /health          - Check if model is ready
echo    POST /predict         - Single prediction
echo    POST /predict-batch   - Batch predictions
echo.

python src\app.py
pause
