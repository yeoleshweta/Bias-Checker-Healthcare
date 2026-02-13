"use client";
import React, { useEffect, useRef, useState } from "react";

const models = [
  {
    name: "RoBERTa (7-label)",
    accuracy: 91.5,
    f1: 88.3,
    color: "#ef4444",
    note: "Overfitting on semantic overlap",
  },
  {
    name: "Bio-ClinicalBERT (7-label)",
    accuracy: 89.2,
    f1: 85.7,
    color: "#f97316",
    note: "Domain-specific but lower performance",
  },
  {
    name: "RoBERTa (4-label) ✦",
    accuracy: 98.67,
    f1: 98.67,
    color: "#3b82f6",
    note: "Best — consolidated categories",
  },
];

export default function ModelComparisonChart() {
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
    <div ref={ref} className="space-y-6">
      {models.map((m, i) => (
        <div key={m.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-sans font-semibold text-neutral-800 dark:text-neutral-200">
              {m.name}
            </span>
            <span className="text-[10px] font-sans text-neutral-500 italic">
              {m.note}
            </span>
          </div>

          {/* Accuracy bar */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-sans text-neutral-500 w-16 shrink-0">
              Accuracy
            </span>
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full h-5 overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end px-2"
                style={{
                  width: visible ? `${m.accuracy}%` : "0%",
                  backgroundColor: m.color,
                  transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 200}ms`,
                }}
              >
                <span className="text-[10px] font-bold text-white">
                  {m.accuracy}%
                </span>
              </div>
            </div>
          </div>

          {/* F1 bar */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-sans text-neutral-500 w-16 shrink-0">
              Macro F1
            </span>
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full h-5 overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end px-2"
                style={{
                  width: visible ? `${m.f1}%` : "0%",
                  backgroundColor: m.color,
                  opacity: 0.75,
                  transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 200 + 100}ms`,
                }}
              >
                <span className="text-[10px] font-bold text-white">
                  {m.f1}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
