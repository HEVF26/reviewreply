"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { ToneId } from "@/lib/tones";
import type { BusinessType } from "@/components/BusinessContext";
import LanguageToggle from "@/components/LanguageToggle";
import BusinessContext from "@/components/BusinessContext";
import ReviewInput from "@/components/ReviewInput";
import StarRating from "@/components/StarRating";
import ToneSelector from "@/components/ToneSelector";
import ReplyPreview from "@/components/ReplyPreview";
import EmailModal from "@/components/EmailModal";
import Footer from "@/components/Footer";

type ResponseLanguage = "es" | "en" | "auto";

interface ReplyData {
  reply: string;
  sentiment: string;
  keyIssues: string[];
  tips: string;
}

export default function RespondPage() {
  const [lang, setLang] = useState<Lang>("es");
  const [businessType, setBusinessType] = useState<BusinessType>("restaurant");
  const [businessName, setBusinessName] = useState("");
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState(3);
  const [tone, setTone] = useState<ToneId>("professional");
  const [responseLang, setResponseLang] = useState<ResponseLanguage>("auto");
  const [loading, setLoading] = useState(false);
  const [replyData, setReplyData] = useState<ReplyData | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [registered, setRegistered] = useState(false);

  // Fetch usage on mount
  useEffect(() => {
    fetch("/api/usage")
      .then((res) => res.json())
      .then((data) => {
        setRemaining(data.remaining);
        setRegistered(data.registered);
      })
      .catch(() => {});
  }, []);

  const generate = useCallback(
    async (overrideTone?: ToneId) => {
      if (!review.trim()) return;

      setLoading(true);
      setError("");
      setReplyData(null);

      try {
        const res = await fetch("/api/generate-reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessType,
            businessName,
            review,
            starRating,
            tone: overrideTone ?? tone,
            language: responseLang,
          }),
        });

        const data = await res.json();

        if (res.status === 429) {
          if (data.error === "registration_required") {
            setShowEmailModal(true);
          } else if (data.error === "limit_reached") {
            setShowWaitlist(true);
          }
          return;
        }

        if (!res.ok) {
          throw new Error(data.error || "Failed to generate reply");
        }

        setReplyData({
          reply: data.reply,
          sentiment: data.sentiment,
          keyIssues: data.keyIssues,
          tips: data.tips,
        });
        setRemaining(data.remaining);
        setRegistered(data.registered);
      } catch {
        setError(
          lang === "es"
            ? "Error al generar la respuesta. Intenta de nuevo."
            : "Error generating response. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [businessType, businessName, review, starRating, tone, responseLang, lang]
  );

  const handleEmailSubmit = async (name: string, email: string) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      setRegistered(true);
      setRemaining(data.remaining);
      setShowEmailModal(false);
      // Auto-generate after registration
      generate();
    } catch {
      setShowEmailModal(false);
    }
  };

  const handleChangeTone = () => {
    const toneOrder: ToneId[] = ["professional", "friendly", "empathetic", "direct"];
    const currentIndex = toneOrder.indexOf(tone);
    const nextTone = toneOrder[(currentIndex + 1) % toneOrder.length];
    setTone(nextTone);
    generate(nextTone);
  };

  const langOptions: { value: ResponseLanguage; labelKey: "lang.es" | "lang.en" | "lang.auto" }[] = [
    { value: "auto", labelKey: "lang.auto" },
    { value: "es", labelKey: "lang.es" },
    { value: "en", labelKey: "lang.en" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          ReviewReply
        </Link>
        <LanguageToggle lang={lang} onChange={setLang} />
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8">
        <h1 className="text-center font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
          {t("respond.title", lang)}
        </h1>

        {/* Remaining counter */}
        {remaining !== null && (
          <p className="mt-3 text-center text-sm text-gray-500">
            {t("respond.remaining", lang, { count: String(remaining) })}
          </p>
        )}

        <div className="mt-8 space-y-6">
          {/* Step 1: Business type + name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              {t("respond.step1", lang)}
            </label>
            <BusinessContext
              type={businessType}
              name={businessName}
              onTypeChange={setBusinessType}
              onNameChange={setBusinessName}
              lang={lang}
            />
          </div>

          {/* Step 2: Review text */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              {t("respond.step3", lang)}
            </label>
            <ReviewInput value={review} onChange={setReview} lang={lang} />
          </div>

          {/* Step 3: Star rating */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              {t("respond.step4", lang)}
            </label>
            <StarRating value={starRating} onChange={setStarRating} />
          </div>

          {/* Step 4: Tone */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              {t("respond.step5", lang)}
            </label>
            <ToneSelector value={tone} onChange={setTone} lang={lang} />
          </div>

          {/* Step 5: Response language */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              {t("respond.step6", lang)}
            </label>
            <div className="flex flex-wrap gap-2">
              {langOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setResponseLang(opt.value)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                    responseLang === opt.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {t(opt.labelKey, lang)}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={() => generate()}
            disabled={loading || !review.trim()}
            className="w-full rounded-full bg-emerald-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? t("respond.generating", lang)
              : t("respond.generate", lang)}
          </button>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* Reply preview */}
          {replyData && (
            <ReplyPreview
              data={replyData}
              lang={lang}
              onRegenerate={() => generate()}
              onChangeTone={handleChangeTone}
            />
          )}

          {/* Waitlist */}
          {showWaitlist && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-sm font-semibold text-gray-900">
                {t("respond.limit", lang)}
              </p>
              {!waitlistDone ? (
                <div className="mt-4 flex gap-2">
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder={t("waitlist.email", lang)}
                    className="flex-1 rounded-full border-2 border-gray-200 px-4 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                  <button
                    onClick={async () => {
                      if (waitlistEmail.trim()) {
                        await fetch("/api/register", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            email: waitlistEmail,
                            name: "",
                            type: "waitlist",
                          }),
                        });
                        setWaitlistDone(true);
                      }
                    }}
                    className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {t("waitlist.submit", lang)}
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-emerald-600">
                  {t("waitlist.success", lang)}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />

      {/* Email capture modal */}
      {showEmailModal && (
        <EmailModal
          lang={lang}
          onSubmit={handleEmailSubmit}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}
