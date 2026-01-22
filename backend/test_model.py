"""
Quick test script to verify the model can load and make predictions
Run this before deploying to ensure everything works correctly
"""

import os
import sys

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

try:
    print("🔍 Testing ABIM Bias Checker Model...")
    print()
    
    # Test 1: Import modules
    print("✓ Test 1: Checking dependencies...")
    import torch
    import transformers
    from peft import PeftModel
    print("  ✅ All dependencies available")
    print()
    
    # Test 2: Load predict module
    print("✓ Test 2: Loading prediction module...")
    from predict import predict_bias, model, tokenizer
    print("  ✅ Model and tokenizer loaded successfully")
    print(f"  📊 Using device: {next(model.parameters()).device}")
    print()
    
    # Test 3: Run predictions
    print("✓ Test 3: Running test predictions...")
    test_cases = [
        "The patient declined the procedure after a discussion of risks.",
        "The 45-year-old Black male was readmitted due to inability to afford medication.",
        "The patient is a frequent flyer who is non-compliant with all nursing staff.",
    ]
    
    for text in test_cases:
        predicted_label, confidence = predict_bias(text)
        print(f"  Text: {text[:50]}...")
        print(f"  → Predicted: {predicted_label} ({confidence:.2%})")
    print()
    
    print("✅ All tests passed! Model is ready for deployment.")
    print()
    print("📝 Next steps:")
    print("  1. Update .env with your MODEL_PATH")
    print("  2. Run: python src/app.py")
    print("  3. Test the API: curl http://localhost:8000/health")
    
except Exception as e:
    print(f"❌ Test failed with error:")
    print(f"   {str(e)}")
    print()
    print("📋 Troubleshooting:")
    print("  1. Ensure MODEL_PATH environment variable is set correctly")
    print("  2. Check that model files exist in the MODEL_PATH directory")
    print("  3. Run: pip install -r requirements.txt")
    sys.exit(1)
