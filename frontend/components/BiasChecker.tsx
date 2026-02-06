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
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, CheckCircle, AlertTriangle } from "lucide-react";

export default function BiasChecker() {
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
    <section id="analyzer" className="scroll-mt-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            <Search size={16} />
            <span>Interactive Diagnostic Tool</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Analyze Your{" "}
            <span className="gradient-text">Assessement Narrative</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg max-w-2xl mx-auto">
            Input medical vignettes or trainee feedback to detect latent biases
            using our custom-trained RoBERTa model.
          </p>
        </div>

        <div className="premium-card rounded-3xl p-1 shadow-premium overflow-hidden">
          <div className="p-8 md:p-12">
            <ExampleTabs onSelectExample={handleSelectExample} />

            <ArtifactConsole
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              initialText={selectedText}
            />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 bg-danger-light border border-danger/20 p-4 rounded-2xl flex gap-3 text-danger"
                >
                  <AlertTriangle className="shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12 space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <AuditScore
                      score={result.audit_score}
                      rating={result.compliance_rating}
                      confidence={result.confidence}
                      label={result.predicted_label}
                    />
                    <ExplainabilityCard rationale={result.rationale} />
                  </div>

                  <FlagsDetected
                    flags={result.flags}
                    originalText={result.text}
                  />

                  <RecommendedRevision
                    revision={result.recommended_revision}
                    originalText={result.text}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
