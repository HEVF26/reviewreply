"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="text-xl font-bold text-emerald-700">ReviewReply</span>
        <div className="flex items-center gap-4">
          <Link
            href="/respond"
            className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 sm:block"
          >
            {t("nav.tool", lang)}
          </Link>
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <Hero lang={lang} />

        {/* Stats */}
        <section className="bg-white px-4 py-16">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              { num: "stats.revenue.number" as const, text: "stats.revenue" as const },
              { num: "stats.read.number" as const, text: "stats.read" as const },
              { num: "stats.never.number" as const, text: "stats.never" as const },
            ].map((stat) => (
              <div key={stat.num} className="text-center">
                <p className="text-4xl font-bold text-emerald-600">
                  {t(stat.num, lang)}
                </p>
                <p className="mt-2 text-sm text-gray-600">{t(stat.text, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            {t("how.title", lang)}
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              { icon: "💬", title: "how.step1.title" as const, desc: "how.step1.desc" as const, step: "1" },
              { icon: "🎛️", title: "how.step2.title" as const, desc: "how.step2.desc" as const, step: "2" },
              { icon: "✅", title: "how.step3.title" as const, desc: "how.step3.desc" as const, step: "3" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {t(item.title, lang)}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{t(item.desc, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business types */}
        <section className="bg-white px-4 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            {t("businesses.title", lang)}
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {[
              { icon: "🍽️", key: "biz.restaurant" as const },
              { icon: "🏥", key: "biz.dentist" as const },
              { icon: "🏨", key: "biz.hotel" as const },
              { icon: "🛍️", key: "biz.store" as const },
              { icon: "💇", key: "biz.salon" as const },
              { icon: "💪", key: "biz.gym" as const },
              { icon: "🏢", key: "biz.other" as const },
            ].map((biz) => (
              <div
                key={biz.key}
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-stone-50 p-4 text-center"
              >
                <span className="text-3xl">{biz.icon}</span>
                <span className="mt-2 text-xs font-medium text-gray-700">
                  {t(biz.key, lang)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Example: before / after */}
        <section className="px-4 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            {t("example.title", lang)}
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {t("example.review.label", lang)}
              </p>
              <div className="mt-1 text-yellow-400">★☆☆☆☆</div>
              <p className="mt-2 text-gray-700 italic">
                &ldquo;{t("example.review.text", lang)}&rdquo;
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <p className="text-sm font-bold text-red-700">
                  ❌ {t("example.without", lang)}
                </p>
                <p className="mt-2 text-sm text-red-600">
                  {t("example.without.text", lang)}
                </p>
              </div>
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-bold text-emerald-700">
                  ✅ {t("example.with", lang)}
                </p>
                <p className="mt-2 text-sm text-emerald-700">
                  {t("example.with.text", lang)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-white px-4 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            {t("pricing.title", lang)}
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border-2 border-emerald-600 p-6">
              <p className="text-lg font-bold text-gray-900">
                {t("pricing.free.name", lang)}
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">
                {t("pricing.free.price", lang)}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✓ {t("pricing.free.f1", lang)}</li>
                <li>✓ {t("pricing.free.f2", lang)}</li>
                <li>✓ {t("pricing.free.f3", lang)}</li>
              </ul>
              <Link
                href="/respond"
                className="mt-6 block rounded-full bg-emerald-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                {t("pricing.free.cta", lang)}
              </Link>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 opacity-75">
              <p className="text-lg font-bold text-gray-900">
                {t("pricing.pro.name", lang)}
              </p>
              <p className="mt-1 text-3xl font-bold text-gray-400">
                {t("pricing.pro.price", lang)}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✓ {t("pricing.pro.f1", lang)}</li>
                <li>✓ {t("pricing.pro.f2", lang)}</li>
                <li>✓ {t("pricing.pro.f3", lang)}</li>
              </ul>
              <span className="mt-6 block rounded-full border border-gray-300 py-3 text-center text-sm font-semibold text-gray-400">
                {t("pricing.pro.cta", lang)}
              </span>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 opacity-75">
              <p className="text-lg font-bold text-gray-900">
                {t("pricing.business.name", lang)}
              </p>
              <p className="mt-1 text-3xl font-bold text-gray-400">
                {t("pricing.business.price", lang)}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✓ {t("pricing.business.f1", lang)}</li>
                <li>✓ {t("pricing.business.f2", lang)}</li>
                <li>✓ {t("pricing.business.f3", lang)}</li>
              </ul>
              <span className="mt-6 block rounded-full border border-gray-300 py-3 text-center text-sm font-semibold text-gray-400">
                {t("pricing.business.cta", lang)}
              </span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            {t("faq.title", lang)}
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <details key={n} className="group rounded-xl border border-gray-200 bg-white">
                <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-gray-900">
                  {t(`faq.q${n}`, lang)}
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600">
                  {t(`faq.a${n}`, lang)}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
