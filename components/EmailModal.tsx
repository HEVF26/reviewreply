"use client";

import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";

interface EmailModalProps {
  lang: Lang;
  onSubmit: (name: string, email: string) => void;
  onClose: () => void;
}

export default function EmailModal({ lang, onSubmit, onClose }: EmailModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(name.trim(), email.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900">
          {t("modal.title", lang)}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("modal.name", lang)}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("modal.email", lang)}
            required
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            {t("modal.submit", lang)}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {t("modal.skip", lang)}
          </button>
        </form>
      </div>
    </div>
  );
}
