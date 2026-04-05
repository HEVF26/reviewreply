"use client";

import { t, type Lang } from "@/lib/i18n";

interface ReviewInputProps {
  value: string;
  onChange: (value: string) => void;
  lang: Lang;
}

export default function ReviewInput({ value, onChange, lang }: ReviewInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t("respond.step3.placeholder", lang)}
      rows={5}
      className="w-full resize-none rounded-xl border-2 border-gray-200 p-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-600 focus:outline-none"
    />
  );
}
