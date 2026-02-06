"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import BiasChecker from "@/components/BiasChecker";
import { Sparkles } from "lucide-react";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20 container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-bold tracking-wide text-primary">
              AI Diagnostic Engine
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-6">
            Comprehensive <span className="gradient-text">Bias Analysis</span>
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            Input clinical vignettes or trainee evaluations below. Our system
            will analyze the text for 7 types of bias and provide actionable
            revision suggestions.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <BiasChecker />
        </div>
      </main>
    </div>
  );
}
