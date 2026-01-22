import React from "react";
import { AlertTriangle } from "lucide-react";

interface FlagsDetectedProps {
  flags: string[];
  originalText: string;
}

export default function FlagsDetected({
  flags,
  originalText,
}: FlagsDetectedProps) {
  if (flags.length === 0) {
    return null;
  }

  // Highlight flags in the text
  let highlightedText = originalText;
  flags.forEach((flag) => {
    const regex = new RegExp(`(${flag})`, "gi");
    highlightedText = highlightedText.replace(
      regex,
      '<mark class="bg-red-200 text-red-900 px-1 rounded">$1</mark>',
    );
  });

  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center">
        <AlertTriangle className="w-4 h-4 mr-2 text-danger" />
        Critical Flags
      </h3>
      <div className="bg-danger-light/30 border border-danger/10 rounded-2xl p-8">
        <div className="mb-8 font-sans">
          <p className="text-sm font-bold text-danger uppercase tracking-widest mb-4">
            Problematic elements detected:
          </p>
          <div className="flex flex-wrap gap-3">
            {flags.map((flag, index) => (
              <span
                key={index}
                className="inline-block bg-rose-100/50 text-rose-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-rose-200"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-8 bg-white rounded-xl border border-danger/10 shadow-premium shadow-danger/5">
          <p
            className="text-lg text-neutral-800 font-medium leading-[1.8] font-sans"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
      </div>
    </div>
  );
}
