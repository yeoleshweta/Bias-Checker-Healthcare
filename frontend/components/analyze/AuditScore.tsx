import React from "react";
import { BiasLabel } from "@/types";
import Badge from "@/components/ui/Badge";

interface AuditScoreProps {
  score: number;
  rating: string;
  confidence: number;
  label: BiasLabel;
}

export default function AuditScore({
  score,
  rating,
  confidence,
  label,
}: AuditScoreProps) {
  return (
    <div className="premium-card bg-white dark:bg-neutral-800/50 rounded-3xl h-full flex flex-col overflow-hidden">
      {/* Top Section: Score & Label */}
      <div className="p-8 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 border-b border-neutral-100 dark:border-neutral-700 text-center flex-grow flex flex-col justify-center">
        <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
          Integrity Score
        </p>
        <div className="relative inline-block">
          <div className="text-7xl font-display font-extrabold text-neutral-900 dark:text-white leading-none tracking-tighter">
            {score}
          </div>
          <span className="absolute -top-2 -right-4 text-xs font-bold text-neutral-400">
            /10
          </span>
        </div>

        <div className="mt-6 flex justify-center">
          <Badge label={label} />
        </div>
      </div>

      {/* Bottom Section: Secondary Metrics */}
      <div className="p-6 flex flex-col gap-3 bg-neutral-50/50 dark:bg-black/20">
        {/* Compliance Rating */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/50 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Policy
          </span>
          <span
            className={`text-base font-bold ${
              score >= 7
                ? "text-success"
                : score >= 4
                  ? "text-warning"
                  : "text-danger"
            }`}
          >
            {rating}
          </span>
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/50 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Certainty
          </span>
          <span className="text-base font-bold text-primary">
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
