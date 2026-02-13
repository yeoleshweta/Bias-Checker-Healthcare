import React from "react";
import { AlertCircle } from "lucide-react";

interface ExplainabilityCardProps {
  rationale: string;
}

export default function ExplainabilityCard({
  rationale,
}: ExplainabilityCardProps) {
  return (
    <div className="premium-card bg-white dark:bg-neutral-800/50 rounded-3xl h-full p-8 md:p-10 flex flex-col">
      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <AlertCircle className="w-4 h-4 text-primary" />
        </div>
        Audit Rationale
      </h3>

      <div className="flex-grow flex items-center">
        <div className="w-full bg-neutral-50 dark:bg-black/20 p-6 md:p-8 rounded-2xl border border-neutral-100 dark:border-neutral-700/50">
          <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-medium leading-relaxed font-sans">
            &quot;{rationale}&quot;
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-neutral-400 font-medium">
        <span>
          Analysis Source: <strong>GPT-4o (Few-Shot)</strong>
        </span>
        <span>
          Latency: <strong>~0.8s</strong>
        </span>
      </div>
    </div>
  );
}
