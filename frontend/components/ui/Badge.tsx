import React from "react";
import { BiasLabel } from "@/types";

interface BadgeProps {
  label: BiasLabel;
  className?: string;
}

const badgeStyles: Record<BiasLabel, string> = {
  no_bias: "bg-emerald-50 text-emerald-700 border-emerald-200",
  demographic_bias: "bg-rose-50 text-rose-700 border-rose-200",
  clinical_stigma_bias: "bg-amber-50 text-amber-700 border-amber-200",
  assessment_bias: "bg-violet-50 text-violet-700 border-violet-200",
  algorithmic_bias: "bg-indigo-50 text-indigo-700 border-indigo-200",
  documentation_bias: "bg-sky-50 text-sky-700 border-sky-200",
  structural_bias: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
};

const labelNames: Record<BiasLabel, string> = {
  no_bias: "No Bias",
  demographic_bias: "Demographic Bias",
  clinical_stigma_bias: "Clinical Stigma",
  assessment_bias: "Assessment Bias",
  algorithmic_bias: "Algorithmic Bias",
  documentation_bias: "Documentation Bias",
  structural_bias: "Structural Bias",
};

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badgeStyles[label]} ${className}`}
    >
      {labelNames[label]}
    </span>
  );
}
