"use client";

import React, { useEffect, useState } from "react";
import { History, Calendar, FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { BiasLabel } from "@/types";

interface AuditRecord {
  id: string;
  timestamp: Date;
  text: string;
  label: BiasLabel;
  confidence: number;
  score: number;
}

export default function HistoryPage() {
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("audit_history");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAuditHistory(
        parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })),
      );
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <History className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Audit History</h1>
          </div>
          <p className="text-gray-600">
            Review past bias analyses and audit results. History is stored
            locally in your browser.
          </p>
        </div>

        {/* History List */}
        {auditHistory.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Audit History Yet
            </h3>
            <p className="text-gray-600">
              Start analyzing vignettes and feedback to build your audit
              history.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {auditHistory.map((record) => (
              <Card key={record.id} hover className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {record.timestamp.toLocaleString()}
                  </div>
                  <Badge label={record.label} />
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">{record.text}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600">
                    Confidence:{" "}
                    <span className="font-semibold">
                      {Math.round(record.confidence * 100)}%
                    </span>
                  </div>
                  <div className="text-gray-600">
                    Audit Score:{" "}
                    <span className="font-semibold">{record.score}/10</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
