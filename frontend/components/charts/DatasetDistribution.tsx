"use client";
import React, { useEffect, useRef, useState } from "react";

const categories = [
  { label: "no_bias", samples: 500, color: "#8ab598", emoji: "✅" },
  { label: "demographic_bias", samples: 500, color: "#d49494", emoji: "👥" },
  { label: "clinical_stigma", samples: 500, color: "#dcb08a", emoji: "🏥" },
  { label: "assessment_bias", samples: 500, color: "#b3a5c9", emoji: "⚖️" },
  { label: "algorithmic_bias", samples: 500, color: "#90a4c4", emoji: "🤖" },
  { label: "documentation_bias", samples: 500, color: "#d4c988", emoji: "📄" },
  { label: "structural_bias", samples: 500, color: "#c994ab", emoji: "🏛️" },
];

export default function DatasetDistribution() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex justify-between text-[10px] font-sans text-neutral-500 uppercase tracking-wider mb-4 px-1">
        <span>Category</span>
        <span>Samples (Total: 3,500)</span>
      </div>
      {categories.map((cat, i) => (
        <div key={cat.label} className="flex items-center gap-3">
          <span className="text-sm w-5 shrink-0">{cat.emoji}</span>
          <span className="text-[11px] font-mono w-36 text-neutral-600 dark:text-neutral-400 truncate shrink-0">
            {cat.label}
          </span>
          <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full h-6 overflow-hidden">
            <div
              className="h-full rounded-full flex items-center px-3"
              style={{
                width: visible ? "100%" : "0%",
                backgroundColor: cat.color,
                transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
              }}
            >
              <span className="text-[10px] font-bold text-white whitespace-nowrap">
                {cat.samples}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-sans text-neutral-600 dark:text-neutral-400">
          Balanced dataset • GPT-4o generated • Validated by domain experts
        </span>
      </div>
    </div>
  );
}
