import React from "react";
import { Activity, TrendingUp, Database, Cpu } from "lucide-react";

export default function RobustnessPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Activity className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Robustness Engine
            </h1>
          </div>
          <p className="text-gray-600">
            Model performance metrics, architecture details, and training
            methodology.
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">94%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Model Accuracy
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Overall classification accuracy across all bias categories
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">3,500</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Training Samples
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Balanced dataset with 500 samples per bias category
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900">RoBERTa</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Model Architecture
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Optimized transformer-based language model
            </p>
          </div>
        </div>

        {/* Model Details */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Model Architecture
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Base Model</h3>
              <p className="text-gray-600">
                RoBERTa (Robustly Optimized BERT Approach) - A transformer-based
                model pre-trained on diverse text corpora and fine-tuned on
                ABIM-style clinical text.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Training Approach
              </h3>
              <p className="text-gray-600">
                Supervised fine-tuning with balanced synthetic dataset
                representing exam vignettes and feedback narratives. Each sample
                includes bias label and human-readable rationale.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Optimization</h3>
              <p className="text-gray-600">
                AdamW optimizer with learning rate scheduling, cross-entropy
                loss function, and early stopping based on validation
                performance.
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Composition */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dataset Composition
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-700">No Bias</span>
              <span className="text-gray-600">500 samples</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-700">
                Demographic Bias
              </span>
              <span className="text-gray-600">500 samples</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-700">
                Clinical Stigma Bias
              </span>
              <span className="text-gray-600">500 samples</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-700">Assessment Bias</span>
              <span className="text-gray-600">500 samples</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-700">
                Algorithmic Bias
              </span>
              <span className="text-gray-600">500 samples</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-700">
                Documentation Bias
              </span>
              <span className="text-gray-600">500 samples</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="font-medium text-gray-700">Structural Bias</span>
              <span className="text-gray-600">500 samples</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
