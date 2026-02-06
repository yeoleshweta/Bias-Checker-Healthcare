"use client";

import React, { useState } from "react";
import { SourceType } from "@/types";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ArtifactConsoleProps {
  onAnalyze: (text: string, type: SourceType) => void;
  isLoading: boolean;
  initialText?: string;
}

export default function ArtifactConsole({
  onAnalyze,
  isLoading,
  initialText = "",
}: ArtifactConsoleProps) {
  const [text, setText] = useState(initialText);
  const [sourceType, setSourceType] = useState<SourceType>("vignette");

  const handleAnalyze = () => {
    if (text.trim()) {
      onAnalyze(text, sourceType);
    }
  };

  React.useEffect(() => {
    if (initialText) {
      setText(initialText);
    }
  }, [initialText]);

  return (
    <div className="premium-card p-6 md:p-10 bg-white dark:bg-neutral-800/50 rounded-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-3">
          Artifact Analysis Console
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium">
          Input clinical vignettes or feedback narratives for real-time bias
          detection against ABIM standards.
        </p>
      </div>

      {/* Source Type Toggle */}
      <div className="flex p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl w-fit mb-8 border border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setSourceType("vignette")}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all-300 ${
            sourceType === "vignette"
              ? "bg-white dark:bg-neutral-800 text-primary shadow-lg shadow-primary/5 border border-primary/20 dark:border-primary/40"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          }`}
        >
          Clinical Vignette
        </button>
        <button
          onClick={() => setSourceType("feedback")}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all-300 ${
            sourceType === "feedback"
              ? "bg-white dark:bg-neutral-800 text-primary shadow-lg shadow-primary/5 border border-primary/20 dark:border-primary/40"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          }`}
        >
          Clinical Feedback
        </button>
      </div>

      {/* Text Area */}
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type assessment content here..."
          className="w-full h-80 p-8 border-2 border-neutral-100 dark:border-neutral-800 rounded-2xl focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none resize-none text-neutral-900 dark:text-neutral-50 text-lg leading-relaxed placeholder-neutral-400 dark:placeholder-neutral-600 bg-neutral-50/50 dark:bg-neutral-900/50 transition-all-300"
        />
        <div className="absolute bottom-6 right-8 text-sm font-bold text-neutral-400 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-neutral-100 dark:border-neutral-700">
          {text.length.toLocaleString()} chars
        </div>
      </div>

      <div className="flex items-center justify-end mt-10">
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isLoading}
          size="lg"
          className="px-12 h-16 shadow-premium rounded-2xl"
        >
          {isLoading ? (
            <span className="flex items-center">
              <LoadingSpinner className="mr-3" />
              Processing diagnostics...
            </span>
          ) : (
            <>Start Analysis Engine</>
          )}
        </Button>
      </div>
    </div>
  );
}
