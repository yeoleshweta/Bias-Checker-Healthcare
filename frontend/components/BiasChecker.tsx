"use client";

import React, { useState } from "react";
import { SourceType, BiasAnalysisResult } from "@/types";
import { analyzeBias, checkHealth } from "@/services/api";
import ArtifactConsole from "@/components/analyze/ArtifactConsole";
import ExampleTabs from "@/components/analyze/ExampleTabs";
import ExplainabilityCard from "@/components/analyze/ExplainabilityCard";
import BiasDetailsCard from "@/components/analyze/BiasDetailsCard";
import AuditScore from "@/components/analyze/AuditScore";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertTriangle, Sparkles } from "lucide-react";

export default function BiasChecker() {
  const [selectedText, setSelectedText] = useState("");
  const [result, setResult] = useState<BiasAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        const isReady = await checkHealth();
        setBackendStatus(isReady ? "online" : "offline");
      } catch {
        setBackendStatus("offline");
      }
    };
    checkStatus();
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

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
            <Sparkles size={16} />
            <span>GPT-4o Powered • Few-Shot Learning</span>
            <span className="flex items-center gap-1.5 ml-2 pl-3 border-l border-primary/20">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus === "online"
                    ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"
                    : backendStatus === "checking"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
              <span className="text-[10px] uppercase tracking-wider">
                {backendStatus === "online"
                  ? "System Ready"
                  : backendStatus === "checking"
                    ? "Waking Up..."
                    : "Offline"}
              </span>
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Audit Clinical <span className="gradient-text">Documentation</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg max-w-2xl mx-auto">
            Detect hidden biases in clinical vignettes and research protocols
            using our advanced <strong>few-shot prompting engine</strong>.
            Identifies 11 specific bias types including racial profiling,
            stigma, and diagnostic anchoring.
          </p>
        </div>

        <div className="premium-card rounded-3xl p-1 shadow-premium overflow-hidden">
          <div className="p-8 md:p-12">
            <ExampleTabs onSelectExample={handleSelectExample} />

            <ArtifactConsole
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              initialText={selectedText}
              isOffline={backendStatus === "offline"}
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
                  {/* Dashboard Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Metrics & Score (1/3 width) */}
                    <div className="lg:col-span-1 h-full">
                      <AuditScore
                        score={result.audit_score}
                        rating={result.compliance_rating}
                        confidence={result.confidence}
                        label={result.predicted_label}
                      />
                    </div>

                    {/* Right Column: Rationale & Summary (2/3 width) */}
                    <div className="lg:col-span-2 h-full">
                      <ExplainabilityCard
                        rationale={result.summary || result.rationale}
                      />
                    </div>
                  </div>

                  {/* Detailed Bias Analysis */}
                  <BiasDetailsCard
                    biases={result.biases_found || []}
                    biasLevel={result.overall_bias_level || "NONE"}
                    biasFreeSection={result.bias_free_sections || []}
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
