import React from "react";
import { BiasLabel } from "@/types";

interface BadgeProps {
  label: BiasLabel;
  className?: string;
}

const badgeStyles: Record<BiasLabel, string> = {
  no_bias:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  demographic_bias:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  clinical_stigma_bias:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  assessment_bias:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
  error:
    "bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
};

const labelNames: Record<BiasLabel, string> = {
  no_bias: "No Bias",
  demographic_bias: "Demographic Bias",
  clinical_stigma_bias: "Clinical Stigma",
  assessment_bias: "Assessment Bias",
  error: "Error",
};

export default function Badge({ label, className = "" }: BadgeProps) {
  const style = badgeStyles[label] || badgeStyles.error;
  const name = labelNames[label] || label;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${style} ${className}`}
    >
      {name}
    </span>
  );
}
