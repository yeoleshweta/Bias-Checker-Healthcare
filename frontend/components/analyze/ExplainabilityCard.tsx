import React from "react";
import { AlertCircle } from "lucide-react";

interface ExplainabilityCardProps {
  rationale: string;
}

export default function ExplainabilityCard({
  rationale,
}: ExplainabilityCardProps) {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center">
        <AlertCircle className="w-4 h-4 mr-2 text-primary" />
        Audit Rationale
      </h3>
      <div className="bg-primary-light/30 border-l-4 border-primary p-8 rounded-xl shadow-premium shadow-primary/5">
        <p className="text-neutral-800 italic leading-relaxed text-xl font-medium">
          &quot;{rationale}&quot;
        </p>
      </div>
    </div>
  );
}
