import React from "react";
import { CheckCircle, Download, FileCheck } from "lucide-react";
import Button from "@/components/ui/Button";

interface RecommendedRevisionProps {
  revision: string;
  originalText: string;
}

export default function RecommendedRevision({
  revision,
  originalText,
}: RecommendedRevisionProps) {
  // Only show if revision is different from original
  if (revision === originalText) {
    return null;
  }

  const handleAdoptRevision = () => {
    navigator.clipboard.writeText(revision);
    alert("Revised text copied to clipboard!");
  };

  const handleExportReport = () => {
    alert("Export functionality coming soon!");
  };

  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center">
        <CheckCircle className="w-4 h-4 mr-2 text-success" />
        Diagnostic Revision
      </h3>
      <div className="bg-success-light/30 dark:bg-success/10 border border-success/10 rounded-2xl p-8">
        <div className="flex items-start mb-8 font-sans">
          <div className="flex-shrink-0 w-10 h-10 bg-success rounded-xl flex items-center justify-center shadow-lg shadow-success/20">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="ml-6 flex-1">
            <p className="text-lg text-neutral-800 dark:text-neutral-200 leading-[1.8] font-medium">
              {revision}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="success"
            size="md"
            onClick={handleAdoptRevision}
            className="flex items-center shadow-lg shadow-success/10"
          >
            <FileCheck className="w-5 h-5 mr-3" />
            Copy Revised Text
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handleExportReport}
            className="flex items-center border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700"
          >
            <Download className="w-5 h-5 mr-3" />
            Audit Report Export
          </Button>
        </div>
      </div>
    </div>
  );
}
