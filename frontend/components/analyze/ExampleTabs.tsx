"use client";

import React from "react";
import { examples } from "@/data/examples";

interface ExampleTabsProps {
  onSelectExample: (text: string) => void;
}

export default function ExampleTabs({ onSelectExample }: ExampleTabsProps) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-6">
        Select a Benchmark Example
      </h3>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelectExample(example.text)}
            className="px-6 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800 hover:border-primary/50 hover:text-primary dark:hover:text-primary hover:shadow-premium border-2 border-neutral-100 dark:border-neutral-800 rounded-xl text-sm font-bold text-neutral-500 dark:text-neutral-400 transition-all-300"
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}
