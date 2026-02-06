import React from "react";
import {
  Activity,
  TrendingUp,
  Database,
  Cpu,
  Layers,
  Target,
  Zap,
} from "lucide-react";

export default function RobustnessPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Activity className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-50">
              Robustness Engine
            </h1>
          </div>
          <p className="text-gray-600 dark:text-neutral-400">
            Model performance metrics, architecture details, and training
            methodology for the ABIM Bias Checker.
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900 dark:text-neutral-50">
                98.7%
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200">
              Model Accuracy
            </h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 mt-2">
              Overall classification accuracy across all 4 bias categories on
              test set
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-indigo-600" />
              <span className="text-3xl font-bold text-gray-900">0.987</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Macro F1 Score
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Balanced performance metric ensuring equal treatment of all
              classes
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">1,999</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Training Samples
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Balanced dataset with ~500 samples per bias category
            </p>
          </div>
        </div>

        {/* Model Details */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Model Architecture
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-3">
                <Cpu className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Base Model</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>RoBERTa-base</strong> (Robustly Optimized BERT Approach)
                - A transformer-based model with 125M parameters, pre-trained on
                diverse text corpora using dynamic masking and larger batch
                sizes.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <Layers className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="font-semibold text-gray-900">
                  LoRA Fine-Tuning
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Low-Rank Adaptation (LoRA)</strong> -
                Parameter-efficient fine-tuning that trains only ~0.5% of model
                parameters while achieving full fine-tuning performance.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              LoRA Configuration
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-neutral-400">
                  Rank (r)
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-neutral-100">
                  16
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Alpha</p>
                <p className="text-xl font-bold text-gray-900">32</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Dropout</p>
                <p className="text-xl font-bold text-gray-900">0.1</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Target Modules</p>
                <p className="text-sm font-bold text-gray-900">
                  Q, K, V, Dense
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Training Configuration */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-6">
            <Zap className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Training Configuration
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Hyperparameters
              </h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Learning Rate: 1e-5</li>
                <li>• Batch Size: 16</li>
                <li>• Epochs: 6</li>
                <li>• Max Sequence Length: 256 tokens</li>
                <li>• Weight Decay: 0.1</li>
                <li>• Warmup Ratio: 15%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Optimization</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Optimizer: AdamW</li>
                <li>• Label Smoothing: 0.1</li>
                <li>• Evaluation: Per epoch</li>
                <li>• Best Model Selection: F1 Score</li>
                <li>• Mixed Precision: FP16 (GPU)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Split</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Training: 85% (~1,700 samples)</li>
                <li>• Validation: 15% (~300 samples)</li>
                <li>• Stratification: By label</li>
                <li>• Random Seed: 42</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dataset Composition */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dataset Composition
          </h2>
          <p className="text-gray-600 mb-6">
            The model is trained on a balanced dataset of ABIM-style clinical
            vignettes and feedback narratives, with approximately equal
            representation across all bias categories.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span className="font-medium text-gray-700">No Bias</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <span className="text-gray-600 w-24 text-right">
                  500 samples
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                <span className="font-medium text-gray-700">
                  Demographic Bias
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <span className="text-gray-600 w-24 text-right">
                  500 samples
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                <span className="font-medium text-gray-700">
                  Clinical Stigma Bias
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <span className="text-gray-600 w-24 text-right">
                  500 samples
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                <span className="font-medium text-gray-700">
                  Assessment Bias
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "99.8%" }}
                  ></div>
                </div>
                <span className="text-gray-600 w-24 text-right">
                  499 samples
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Source Types:</strong> 1,000 exam vignettes + 999 feedback
              snippets
            </p>
          </div>
        </div>

        {/* Learning Curve */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Training Performance
          </h2>
          <p className="text-gray-600 mb-6">
            The model showed rapid convergence, achieving 95.7% F1 by epoch 3
            and reaching peak performance of 98.7% F1 by epoch 5.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Epoch
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Accuracy
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    F1 Score
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Loss
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">1</td>
                  <td className="py-3 px-4 text-gray-600">25.0%</td>
                  <td className="py-3 px-4 text-gray-600">0.100</td>
                  <td className="py-3 px-4 text-gray-600">1.379</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">2</td>
                  <td className="py-3 px-4 text-gray-600">75.3%</td>
                  <td className="py-3 px-4 text-gray-600">0.726</td>
                  <td className="py-3 px-4 text-gray-600">1.022</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">3</td>
                  <td className="py-3 px-4 text-gray-600">95.7%</td>
                  <td className="py-3 px-4 text-gray-600">0.956</td>
                  <td className="py-3 px-4 text-gray-600">0.486</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">4</td>
                  <td className="py-3 px-4 text-gray-600">97.3%</td>
                  <td className="py-3 px-4 text-gray-600">0.973</td>
                  <td className="py-3 px-4 text-gray-600">0.406</td>
                </tr>
                <tr className="border-b border-gray-100 bg-green-50">
                  <td className="py-3 px-4 text-gray-900 font-semibold">
                    5 (Best)
                  </td>
                  <td className="py-3 px-4 text-green-700 font-semibold">
                    98.7%
                  </td>
                  <td className="py-3 px-4 text-green-700 font-semibold">
                    0.987
                  </td>
                  <td className="py-3 px-4 text-gray-600">0.388</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">6</td>
                  <td className="py-3 px-4 text-gray-600">98.3%</td>
                  <td className="py-3 px-4 text-gray-600">0.983</td>
                  <td className="py-3 px-4 text-gray-600">0.387</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Best model (epoch 5) selected based on highest F1 score
          </p>
        </div>
      </div>
    </div>
  );
}
