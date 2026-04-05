"use client";

import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  return (
    <section className="px-4 pb-16 pt-20 text-center sm:pt-28">
      <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
        {t("hero.title", lang)}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
        {t("hero.subtitle", lang)}
      </p>
      <Link
        href="/respond"
        className="mt-8 inline-block rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
      >
        {t("hero.cta", lang)}
      </Link>
    </section>
  );
}
