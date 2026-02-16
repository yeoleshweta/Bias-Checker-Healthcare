"use client";
import React, { useEffect, useRef, useState } from "react";

const categories = [
  {
    name: "No Bias",
    key: "no_bias",
    color: "#8ab598",
    icon: "✅",
    precision: 96,
    recall: 95,
    f1: 95.5,
    subTypes: [
      "Evidence-based practice",
      "Patient-centered language",
      "Neutral documentation",
    ],
  },
  {
    name: "Demographic Bias",
    key: "demographic_bias",
    color: "#d49494",
    icon: "👥",
    precision: 94,
    recall: 93,
    f1: 93.5,
    subTypes: [
      "Racial/Ethnic Bias",
      "Gender Bias",
      "Age Bias",
      "Socioeconomic Bias",
    ],
  },
  {
    name: "Clinical Stigma",
    key: "clinical_stigma_bias",
    color: "#dcb08a",
    icon: "🏥",
    precision: 93,
    recall: 91,
    f1: 92.0,
    subTypes: [
      "Weight Stigma",
      "Pain Dismissal",
      "Mental Health Stigma",
      "Lifestyle Judgment",
    ],
  },
  {
    name: "Assessment Bias",
    key: "assessment_bias",
    color: "#b3a5c9",
    icon: "⚖️",
    precision: 92,
    recall: 93,
    f1: 92.5,
    subTypes: [
      "Diagnostic Bias",
      "Competency Assessment Bias",
      "Treatment Decision Bias",
    ],
  },
];

export default function FewShotPerformance() {
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
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {categories.map((cat, i) => (
        <div
          key={cat.key}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 hover:shadow-lg transition-shadow"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s ease ${i * 150}ms`,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{cat.icon}</span>
            <h4 className="text-sm font-sans font-bold text-neutral-800 dark:text-neutral-200">
              {cat.name}
            </h4>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Precision", value: cat.precision },
              { label: "Recall", value: cat.recall },
              { label: "F1", value: cat.f1 },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <div
                  className="text-lg font-bold font-sans"
                  style={{ color: cat.color }}
                >
                  {metric.value}%
                </div>
                <div className="text-[9px] font-sans text-neutral-500 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 mb-3 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: visible ? `${cat.f1}%` : "0%",
                backgroundColor: cat.color,
                transition: `width 1s ease ${i * 150 + 300}ms`,
              }}
            />
          </div>

          {/* Sub-types */}
          <div className="flex flex-wrap gap-1">
            {cat.subTypes.map((sub) => (
              <span
                key={sub}
                className="text-[9px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-sans"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
