"use client";

import { t, type Lang } from "@/lib/i18n";

export type BusinessType =
  | "restaurant"
  | "dentist"
  | "hotel"
  | "store"
  | "salon"
  | "gym"
  | "other";

const businessTypes: { id: BusinessType; labelKey: "biz.restaurant" | "biz.dentist" | "biz.hotel" | "biz.store" | "biz.salon" | "biz.gym" | "biz.other"; icon: string }[] = [
  { id: "restaurant", labelKey: "biz.restaurant", icon: "🍽️" },
  { id: "dentist", labelKey: "biz.dentist", icon: "🏥" },
  { id: "hotel", labelKey: "biz.hotel", icon: "🏨" },
  { id: "store", labelKey: "biz.store", icon: "🛍️" },
  { id: "salon", labelKey: "biz.salon", icon: "💇" },
  { id: "gym", labelKey: "biz.gym", icon: "💪" },
  { id: "other", labelKey: "biz.other", icon: "🏢" },
];

interface BusinessContextProps {
  type: BusinessType;
  name: string;
  onTypeChange: (type: BusinessType) => void;
  onNameChange: (name: string) => void;
  lang: Lang;
}

export default function BusinessContext({
  type,
  name,
  onTypeChange,
  onNameChange,
  lang,
}: BusinessContextProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {businessTypes.map((biz) => (
          <button
            key={biz.id}
            type="button"
            onClick={() => onTypeChange(biz.id)}
            className={`flex flex-col items-center rounded-xl border-2 p-3 text-center transition-all ${
              type === biz.id
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl">{biz.icon}</span>
            <span className="mt-1 text-xs font-medium text-gray-700">
              {t(biz.labelKey, lang)}
            </span>
          </button>
        ))}
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={t("respond.step2.placeholder", lang)}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-600 focus:outline-none"
      />
    </div>
  );
}
