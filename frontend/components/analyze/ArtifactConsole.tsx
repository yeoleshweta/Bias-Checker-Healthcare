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
    <div className="soft-card p-10 bg-white">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-neutral-900 mb-3">
          Artifact Analysis Console
        </h2>
        <p className="text-lg text-neutral-500 font-medium">
          Input clinical vignettes or feedback narratives for real-time bias
          detection against ABIM standards.
        </p>
      </div>

      {/* Source Type Toggle */}
      <div className="flex p-1.5 bg-slate-50 rounded-2xl w-fit mb-8 border border-neutral-100">
        <button
          onClick={() => setSourceType("vignette")}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-smooth ${
            sourceType === "vignette"
              ? "bg-white text-primary shadow-lg shadow-primary/5 border border-primary/10"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          Clinical Vignette
        </button>
        <button
          onClick={() => setSourceType("feedback")}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-smooth ${
            sourceType === "feedback"
              ? "bg-white text-primary shadow-lg shadow-primary/5 border border-primary/10"
              : "text-neutral-500 hover:text-neutral-900"
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
          className="w-full h-80 p-8 border-2 border-neutral-100 rounded-2xl focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none resize-none text-neutral-900 text-lg leading-relaxed placeholder-neutral-400 bg-slate-50/30 transition-smooth"
        />
        <div className="absolute bottom-6 right-8 text-sm font-bold text-neutral-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-neutral-100">
          {text.length.toLocaleString()} chars
        </div>
      </div>

      <div className="flex items-center justify-end mt-10">
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isLoading}
          size="lg"
          className="px-12 h-16 shadow-premium"
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
