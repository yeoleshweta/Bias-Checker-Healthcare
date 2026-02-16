"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Info, TrendingUp, Zap, Shield, Target } from "lucide-react";

const comparisonData = [
  {
    feature: "Architecture",
    roberta: "Fine-tuned RoBERTa + LoRA",
    fewshot: "GPT-4o / Gemini Pro 1.5",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    feature: "Data Required",
    roberta: "3,500+ Synthetic Samples",
    fewshot: "5-10 Gold Standard Examples",
    icon: <Info className="w-4 h-4" />,
  },
  {
    feature: "Explainability",
    roberta: "Low (Class Probabilities)",
    fewshot: "High (Detailed Evidence Reasoning)",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    feature: "Granularity",
    roberta: "Rigid (4 Fixed Categories)",
    fewshot: "Dynamic (11+ Nested Sub-types)",
    icon: <Target className="w-4 h-4" />,
  },
  {
    feature: "Generalization",
    roberta: "Risk of Overfitting to Synthetic",
    fewshot: "Robust to Unseen Linguistic Nuance",
    icon: <TrendingUp className="w-4 h-4" />,
  },
];

const applications = [
  {
    title: "ABIM AI Governance",
    desc: "Acts as a core explainability layer for internal AI systems. Beyond item-writing, it audits medical case studies and evaluation assessments to ensure organizational standards for fairness are met.",
    icon: <Shield className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Universal Applicability",
    desc: "Scaling to provide real-time bias detection across all ABIM documentation. From trainee evaluations to complex medical research case studies, the system prevents bias before it enters the ecosystem.",
    icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
  },
];

export default function ApproachComparisonChart() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full space-y-12 my-12">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl">
        <div className="bg-neutral-50 dark:bg-neutral-950 p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            Approach Comparison Matrix
          </h4>
          <p className="text-sm text-neutral-500 mt-1">
            Analyzing the tradeoff between rigid classification and semantic
            few-shot prompting.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50/50 dark:bg-neutral-950/50 text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">Experiment 2: Fine-Tuning</th>
                <th className="px-6 py-4">Experiment 3: Few-Shot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {comparisonData.map((item, i) => (
                <tr
                  key={item.feature}
                  className="group hover:bg-neutral-50/50 dark:hover:bg-neutral-950/50 transition-colors"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(10px)",
                    transition: `all 0.5s ease-out ${i * 100}ms`,
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-primary transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                        {item.feature}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {item.roberta}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                        {item.fewshot}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {applications.map((app, i) => (
          <div
            key={app.title}
            className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.95)",
              transition: `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${600 + i * 200}ms`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm">
                {app.icon}
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-neutral-900 dark:text-neutral-100">
                  {app.title}
                </h5>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
                  {app.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
