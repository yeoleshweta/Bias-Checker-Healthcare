"use client";

import React, { useState } from "react";
import { SourceType, BiasAnalysisResult } from "@/types";
import { analyzeBias } from "@/services/api";
import ArtifactConsole from "@/components/analyze/ArtifactConsole";
import ExampleTabs from "@/components/analyze/ExampleTabs";
import ExplainabilityCard from "@/components/analyze/ExplainabilityCard";
import FlagsDetected from "@/components/analyze/FlagsDetected";
import RecommendedRevision from "@/components/analyze/RecommendedRevision";
import AuditScore from "@/components/analyze/AuditScore";

export default function AnalyzePage() {
  const [selectedText, setSelectedText] = useState("");
  const [result, setResult] = useState<BiasAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string, type: SourceType) => {
    setIsLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeBias(text);
      setResult(analysisResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during analysis",
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectExample = (text: string) => {
    setSelectedText(text);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header Area */}
      <div className="bg-slate-50 p-12 section-boundary mb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-extrabold text-neutral-900 mb-4 tracking-tight">
            Analyze Content.
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl font-medium">
            Identifying demographic stigma and clinical inconsistencies through
            advanced diagnostics.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-12 pb-24">
        {/* Example Tabs */}
        <ExampleTabs onSelectExample={handleSelectExample} />

        {/* Artifact Console */}
        <ArtifactConsole
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          initialText={selectedText}
        />

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Panel */}
        {result && (
          <div className="mt-8 animate-fade-in">
            {/* Explainability Rationale */}
            <ExplainabilityCard rationale={result.rationale} />

            {/* Flags Detected */}
            <FlagsDetected flags={result.flags} originalText={result.text} />

            {/* Recommended Revision */}
            <RecommendedRevision
              revision={result.recommended_revision}
              originalText={result.text}
            />

            {/* Audit Score */}
            <AuditScore
              score={result.audit_score}
              rating={result.compliance_rating}
              confidence={result.confidence}
              label={result.predicted_label}
            />
          </div>
        )}
      </div>
    </div>
  );
}
