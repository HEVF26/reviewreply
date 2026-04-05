"use client";

import { t, type Lang } from "@/lib/i18n";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-8 text-center">
      <p className="text-sm text-gray-500">{t("footer.made", lang)}</p>
    </footer>
  );
}
