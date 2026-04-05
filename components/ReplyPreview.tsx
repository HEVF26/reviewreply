"use client";

import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";

interface ReplyData {
  reply: string;
  sentiment: string;
  keyIssues: string[];
  tips: string;
}

interface ReplyPreviewProps {
  data: ReplyData;
  lang: Lang;
  onRegenerate: () => void;
  onChangeTone: () => void;
}

export default function ReplyPreview({
  data,
  lang,
  onRegenerate,
  onChangeTone,
}: ReplyPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sentimentColors: Record<string, string> = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-yellow-100 text-yellow-800",
    negative: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-4">
      {/* Reply card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{data.reply}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            {copied ? t("respond.copied", lang) : t("respond.copy", lang)}
          </button>
          <button
            onClick={onRegenerate}
            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t("respond.regenerate", lang)}
          </button>
          <button
            onClick={onChangeTone}
            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t("respond.changeTone", lang)}
          </button>
        </div>
      </div>

      {/* Sentiment & Issues */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-500">
          {t("respond.sentiment", lang)}:
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            sentimentColors[data.sentiment] ?? "bg-gray-100 text-gray-800"
          }`}
        >
          {data.sentiment}
        </span>
      </div>

      {data.keyIssues.length > 0 && (
        <div>
          <span className="text-sm font-medium text-gray-500">
            {t("respond.issues", lang)}:
          </span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {data.keyIssues.map((issue, i) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm font-semibold text-amber-800">
          💡 {t("respond.tip", lang)}
        </p>
        <p className="mt-1 text-sm text-amber-700">{data.tips}</p>
      </div>
    </div>
  );
}
