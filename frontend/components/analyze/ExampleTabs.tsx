"use client";

import React from "react";
import { examples } from "@/data/examples";

interface ExampleTabsProps {
  onSelectExample: (text: string) => void;
}

export default function ExampleTabs({ onSelectExample }: ExampleTabsProps) {
  return (
    <div className="p-8 mb-10">
      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
        Audited Examples
      </h3>
      <div className="flex flex-wrap gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelectExample(example.text)}
            className="px-6 py-2.5 bg-white hover:bg-white hover:border-primary/30 hover:text-primary hover:shadow-lg border-2 border-neutral-100 rounded-xl text-sm font-bold text-neutral-500 transition-smooth"
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}
