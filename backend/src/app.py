from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from predict import predict_bias

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "Model is ready"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict bias label for input text.
    Expected JSON: {"text": "your clinical text here"}
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field in request"}), 400
        
        text = data['text']
        
        if not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({"error": "Text must be a non-empty string"}), 400
        
        # Make prediction
        predicted_label, confidence = predict_bias(text)
        
        return jsonify({
            "text": text,
            "predicted_label": predicted_label,
            "confidence": round(confidence, 4)
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict-batch', methods=['POST'])
def predict_batch():
    """
    Predict bias labels for multiple texts.
    Expected JSON: {"texts": ["text1", "text2", ...]}
    """
    try:
        data = request.get_json()
        
        if not data or 'texts' not in data:
            return jsonify({"error": "Missing 'texts' field in request"}), 400
        
        texts = data['texts']
        
        if not isinstance(texts, list):
            return jsonify({"error": "Texts must be a list"}), 400
        
        results = []
        for text in texts:
            if isinstance(text, str) and len(text.strip()) > 0:
                predicted_label, confidence = predict_bias(text)
                results.append({
                    "text": text,
                    "predicted_label": predicted_label,
                    "confidence": round(confidence, 4)
                })
            else:
                results.append({
                    "text": text,
                    "error": "Text must be a non-empty string"
                })
        
        return jsonify({"predictions": results}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
