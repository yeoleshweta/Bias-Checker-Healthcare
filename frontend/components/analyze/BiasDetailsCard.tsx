"use client";

import React from "react";
import { BiasFound, BiasLevel } from "@/types";
import { AlertTriangle, CheckCircle, Info, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface BiasDetailsCardProps {
  biases: BiasFound[];
  biasLevel: BiasLevel;
  biasFreeSection: string[];
}

const levelConfig: Record<
  BiasLevel,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  NONE: {
    color: "text-success",
    bg: "bg-success/10",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  LOW: {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    icon: <Info className="w-5 h-5" />,
  },
  MODERATE: {
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  HIGH: {
    color: "text-danger",
    bg: "bg-danger/10",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  CRITICAL: {
    color: "text-red-700",
    bg: "bg-red-700/10",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
};

const formatSubType = (subType: string): string => {
  return subType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatCategory = (category: string): string => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BiasDetailsCard({
  biases,
  biasLevel,
  biasFreeSection,
}: BiasDetailsCardProps) {
  const config = levelConfig[biasLevel] || levelConfig.NONE;

  if (biases.length === 0 && biasFreeSection.length > 0) {
    return (
      <div className="premium-card p-8 bg-white dark:bg-neutral-800/50 rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-xl ${config.bg} ${config.color}`}>
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            No Biases Detected
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            Evidence of Good Clinical Practice:
          </p>
          {biasFreeSection.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-xl"
            >
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {section}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bias Level Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-danger" />
          Detailed Bias Analysis
        </h3>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.color}`}
        >
          {config.icon}
          <span className="font-bold text-sm">{biasLevel}</span>
        </div>
      </div>

      {/* Bias Cards */}
      <div className="space-y-4">
        {biases.map((bias, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="premium-card p-6 bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700"
          >
            {/* Header: Category > Sub-Type */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  {formatCategory(bias.category)}
                </span>
                <span className="text-neutral-400">›</span>
                <span className="text-sm font-bold text-primary">
                  {formatSubType(bias.sub_type)}
                </span>
              </div>
              {/* Confidence Bar */}
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      bias.confidence >= 0.8
                        ? "bg-danger"
                        : bias.confidence >= 0.6
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }`}
                    style={{ width: `${bias.confidence * 100}%` }}
                  />
                </div>
                <span
                  className={`text-sm font-bold ${
                    bias.confidence >= 0.8
                      ? "text-danger"
                      : bias.confidence >= 0.6
                        ? "text-orange-500"
                        : "text-yellow-500"
                  }`}
                >
                  {Math.round(bias.confidence * 100)}%
                </span>
              </div>
            </div>

            {/* Evidence */}
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
              {bias.evidence}
            </p>

            {/* Problematic Text */}
            <div className="p-4 bg-danger/5 border-l-4 border-danger rounded-r-xl mb-4">
              <p className="text-xs font-bold text-danger uppercase tracking-wider mb-2">
                Problematic Text:
              </p>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 italic">
                "{bias.problematic_text}"
              </p>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-success/5 border-l-4 border-success rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-success" />
                <p className="text-xs font-bold text-success uppercase tracking-wider">
                  Recommendation:
                </p>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {bias.recommendation}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bias-Free Sections (if any alongside biases) */}
      {biasFreeSection.length > 0 && (
        <div className="mt-6 p-6 bg-success/5 border border-success/20 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-sm font-bold text-success uppercase tracking-wider">
              Bias-Free Sections:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {biasFreeSection.map((section, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-success/10 text-success text-xs font-medium rounded-full"
              >
                {section}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
