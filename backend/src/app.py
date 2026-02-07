from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from predict import predict_bias
from few_shot_classifier import classify_bias_few_shot, get_model_info

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "Model is ready"}), 200

@app.route('/model-info', methods=['GET'])
def model_info():
    """Return information about the few-shot model configuration"""
    try:
        info = get_model_info()
        return jsonify(info), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict bias label for input text using the fine-tuned RoBERTa model.
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
        
        # Calculate Audit Score (Logic migrated from frontend)
        if predicted_label == 'no_bias':
            audit_score = min(10, round(8 + confidence * 2))
        else:
            audit_score = max(1, round((1 - confidence) * 10))
            
        # Determine Compliance Rating
        if audit_score >= 9: compliance_rating = 'Excellent'
        elif audit_score >= 7: compliance_rating = 'Good'
        elif audit_score >= 5: compliance_rating = 'Fair'
        elif audit_score >= 3: compliance_rating = 'Needs Improvement'
        else: compliance_rating = 'High Risk'

        # Generate Explanation via OpenAI
        from llm_service import generate_bias_explanation
        explanation = generate_bias_explanation(text, predicted_label, confidence)
        
        return jsonify({
            "text": text,
            "predicted_label": predicted_label,
            "confidence": round(confidence, 4),
            "audit_score": audit_score,
            "compliance_rating": compliance_rating,
            "rationale": explanation.get("rationale", ""),
            "flags": explanation.get("flags", []),
            "recommended_revision": explanation.get("recommended_revision", text)
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/predict-fewshot', methods=['POST'])
def predict_fewshot():
    """
    Predict bias using few-shot prompting with GPT-4 (Medical Bias Checker Pipeline).
    
    This endpoint uses the MedicalBiasChecker architecture with:
    - 4 Bias Categories: no_bias, demographic_bias, clinical_stigma_bias, assessment_bias
    - 11 Sub-Types: racial_bias, gender_bias, age_bias, etc.
    - 5 Few-Shot Example Pairs
    
    Expected JSON: {"text": "your clinical text here"}
    
    Returns (Full Pipeline Response):
        - bias_detected: Boolean
        - primary_category: Main bias category
        - overall_bias_level: NONE/LOW/MODERATE/HIGH/CRITICAL
        - biases_found: Array with category, sub_type, confidence, evidence, problematic_text, recommendation
        - bias_free_sections: Array of well-written sections
        - summary: Overall assessment
        - audit_score: 1-10 score (calculated)
        - compliance_rating: Rating string
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field in request"}), 400
        
        text = data['text']
        
        if not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({"error": "Text must be a non-empty string"}), 400
        
        # Classify using few-shot prompting (full pipeline)
        result = classify_bias_few_shot(text)
        
        # Check for errors
        if result.get("error"):
            return jsonify(result), 500
        
        # Calculate Audit Score based on bias level
        level_scores = {"NONE": 10, "LOW": 7, "MODERATE": 5, "HIGH": 3, "CRITICAL": 1}
        bias_level = result.get("overall_bias_level", "NONE")
        audit_score = level_scores.get(bias_level, 5)
        
        # Determine Compliance Rating
        if audit_score >= 9: compliance_rating = 'Excellent'
        elif audit_score >= 7: compliance_rating = 'Good'
        elif audit_score >= 5: compliance_rating = 'Fair'
        elif audit_score >= 3: compliance_rating = 'Needs Improvement'
        else: compliance_rating = 'High Risk'
        
        # Extract flags (problematic texts) for backward compatibility
        biases = result.get("biases_found", [])
        flags = [b.get("problematic_text", "") for b in biases if b.get("problematic_text")]
        
        # Calculate average confidence
        if biases:
            avg_confidence = sum(b.get("confidence", 0) for b in biases) / len(biases)
        else:
            avg_confidence = 0.95 if result.get("primary_category") == "no_bias" else 0.0
        
        return jsonify({
            # Pipeline response format
            "bias_detected": result.get("bias_detected", False),
            "primary_category": result.get("primary_category", "unknown"),
            "overall_bias_level": result.get("overall_bias_level", "NONE"),
            "biases_found": biases,
            "bias_free_sections": result.get("bias_free_sections", []),
            "summary": result.get("summary", ""),
            
            # Backward compatible fields
            "text": text,
            "predicted_label": result.get("primary_category", "unknown"),
            "confidence": round(avg_confidence, 4),
            "audit_score": audit_score,
            "compliance_rating": compliance_rating,
            "rationale": result.get("summary", ""),
            "flags": flags,
            
            # Metadata
            "model_type": "few-shot-gpt",
            "num_biases": len(biases)
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
    print("\n" + "=" * 60)
    print("🚀 ABIM AI Bias Checker Backend")
    print("=" * 60)
    print("Endpoints:")
    print("  GET  /health          - Health check")
    print("  GET  /model-info      - Few-shot model configuration")
    print("  POST /predict         - Fine-tuned RoBERTa classification")
    print("  POST /predict-fewshot - Few-shot GPT classification")
    print("  POST /predict-batch   - Batch classification")
    print("=" * 60 + "\n")
    app.run(host='0.0.0.0', port=8000, debug=False)

