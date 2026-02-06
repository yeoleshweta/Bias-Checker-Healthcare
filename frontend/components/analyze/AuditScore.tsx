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
    <div className="premium-card p-8 md:p-10 bg-white dark:bg-neutral-800/50 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Audit Score */}
        <div className="text-center group">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
            Integrity Score
          </p>
          <div className="text-6xl font-display font-extrabold text-neutral-900 dark:text-white leading-none group-hover:text-primary transition-all-300">
            {score}
          </div>
          <p className="text-[10px] font-bold text-neutral-400 mt-4 uppercase tracking-[0.2em]">
            Scale: 1.0 - 10.0
          </p>
        </div>

        {/* Compliance Rating */}
        <div className="text-center md:border-x border-neutral-100 dark:border-neutral-700 px-6">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
            Audited Policy
          </p>
          <div className="flex items-center justify-center h-16">
            <span
              className={`text-2xl font-display font-extrabold tracking-tight ${
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
        </div>

        {/* Confidence */}
        <div className="text-center">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
            ML Certainty
          </p>
          <div className="text-4xl font-display font-extrabold text-primary leading-none">
            {Math.round(confidence * 100)}%
          </div>
          <p className="text-[10px] font-bold text-neutral-400 mt-4 uppercase tracking-widest">
            Cross-Validated
          </p>
        </div>
      </div>

      {/* Bias Label Badge */}
      <div className="mt-10 pt-10 border-t border-neutral-100 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Diagnostic Category:
          </span>
          <Badge label={label} />
        </div>
      </div>
    </div>
  );
}
