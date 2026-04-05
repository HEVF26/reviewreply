"use client";

import { tones, type ToneId } from "@/lib/tones";
import type { Lang } from "@/lib/i18n";

interface ToneSelectorProps {
  value: ToneId;
  onChange: (tone: ToneId) => void;
  lang: Lang;
}

export default function ToneSelector({ value, onChange, lang }: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tones.map((tone) => (
        <button
          key={tone.id}
          type="button"
          onClick={() => onChange(tone.id)}
          className={`flex flex-col items-start rounded-xl border-2 p-3 text-left transition-all ${
            value === tone.id
              ? "border-emerald-600 bg-emerald-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className="text-lg">{tone.icon}</span>
          <span className="mt-1 text-sm font-semibold text-gray-900">
            {tone.label[lang]}
          </span>
          <span className="text-xs text-gray-500">{tone.description[lang]}</span>
        </button>
      ))}
    </div>
  );
}
