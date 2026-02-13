"use client";
import React, { useState } from "react";
import { analyzeBiasLegacy } from "@/services/api";
import { BiasAnalysisResult } from "@/types";
import {
  Cpu,
  Zap,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const sampleTexts = [
  {
    label: "Demographic",
    text: "The patient's failure to adhere to the diet is likely due to cultural preferences common in Hispanic populations.",
  },
  {
    label: "Clinical Stigma",
    text: "Patient claims 10/10 pain but appears comfortable and is likely drug-seeking.",
  },
  {
    label: "Assessment",
    text: "The resident is abrasive and too confident, often challenging attending decisions.",
  },
  {
    label: "No Bias",
    text: "The patient declined the procedure after a thorough discussion of risks and benefits.",
  },
];

const labelConfig: Record<string, { color: string; bg: string; icon: string }> =
  {
    no_bias: {
      color: "#22c55e",
      bg: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
      icon: "✅",
    },
    demographic_bias: {
      color: "#ef4444",
      bg: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
      icon: "👥",
    },
    clinical_stigma_bias: {
      color: "#f97316",
      bg: "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400",
      icon: "🏥",
    },
    assessment_bias: {
      color: "#a855f7",
      bg: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
      icon: "⚖️",
    },
  };

export default function RoBERTaAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<BiasAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeBiasLegacy(text);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Classification failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const config = result
    ? labelConfig[result.predicted_label] || labelConfig.no_bias
    : null;

  return (
    <div className="premium-card rounded-2xl overflow-hidden">
      <div className="p-1">
        {/* Header */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans">
            <Cpu size={14} />
            <span>RoBERTa + LoRA • Fine-Tuned Model</span>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Quick examples */}
          <div>
            <p className="text-[10px] font-sans text-neutral-500 uppercase tracking-wider mb-2">
              Quick Test Samples
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    setText(s.text);
                    setResult(null);
                    setError(null);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-sans"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter clinical text to classify with the fine-tuned RoBERTa model..."
            className="w-full h-28 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-sans text-sm"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-sans font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-40 transition-all"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span> Classifying...
              </>
            ) : (
              <>
                <Zap size={16} /> Classify with RoBERTa
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <AlertTriangle
                size={16}
                className="text-red-500 shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-700 dark:text-red-300 font-sans">
                {error}
              </p>
            </div>
          )}

          {/* Results */}
          {result && config && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* Main result */}
              <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{config.icon}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold font-mono border ${config.bg}`}
                    >
                      {result.predicted_label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold font-sans">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                    <span className="text-xs text-neutral-500 ml-1 font-sans">
                      confidence
                    </span>
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${result.confidence * 100}%`,
                      backgroundColor: config.color,
                    }}
                  />
                </div>

                {/* Audit metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                    <div className="text-xs text-neutral-500 font-sans mb-1">
                      Audit Score
                    </div>
                    <div className="text-2xl font-bold font-sans">
                      {result.audit_score}
                      <span className="text-sm text-neutral-400">/10</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                    <div className="text-xs text-neutral-500 font-sans mb-1">
                      Compliance
                    </div>
                    <div className="text-lg font-bold font-sans">
                      {result.compliance_rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale */}
              {result.rationale && (
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    AI Explanation
                  </h4>
                  <p className="text-sm font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {result.rationale}
                  </p>
                </div>
              )}

              {/* Flags */}
              {result.flags && result.flags.length > 0 && (
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Flagged Phrases
                  </h4>
                  <div className="space-y-2">
                    {result.flags.map((flag, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight
                          size={14}
                          className="text-red-500 shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-sans text-neutral-700 dark:text-neutral-300">
                          &ldquo;{flag}&rdquo;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
