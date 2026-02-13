"use client";

import React, { useState } from "react";
import { SourceType } from "@/types";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ArtifactConsoleProps {
  onAnalyze: (text: string, type: SourceType) => void;
  isLoading: boolean;
  initialText?: string;
  isOffline?: boolean;
}

export default function ArtifactConsole({
  onAnalyze,
  isLoading,
  initialText = "",
  isOffline = false,
}: ArtifactConsoleProps) {
  const [text, setText] = useState(initialText);
  const handleAnalyze = () => {
    if (text.trim()) {
      onAnalyze(text, "vignette");
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
          Input clinical vignettes for real-time bias detection against ABIM
          standards.
        </p>
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

      <div className="flex items-center justify-between mt-10">
        <div className="text-sm font-medium">
          {isOffline && (
            <span className="text-red-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Analysis Engine is currently offline. Please ensure the backend is
              running.
            </span>
          )}
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isLoading || isOffline}
          size="lg"
          className="px-12 h-16 shadow-premium rounded-2xl"
        >
          {isLoading ? (
            <span className="flex items-center">
              <LoadingSpinner className="mr-3" />
              Processing diagnostics...
            </span>
          ) : (
            <>{isOffline ? "Engine Offline" : "Start Analysis Engine"}</>
          )}
        </Button>
      </div>
    </div>
  );
}
