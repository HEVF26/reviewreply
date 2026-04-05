"use client";

import type { Lang } from "@/lib/i18n";

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export default function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  return (
    <button
      onClick={() => onChange(lang === "es" ? "en" : "es")}
      className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
      aria-label="Toggle language"
    >
      <span className={lang === "es" ? "font-bold text-gray-900" : ""}>ES</span>
      <span className="text-gray-300">/</span>
      <span className={lang === "en" ? "font-bold text-gray-900" : ""}>EN</span>
    </button>
  );
}
