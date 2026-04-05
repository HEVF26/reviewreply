import type { Lang } from "./i18n";

export type ToneId = "professional" | "friendly" | "empathetic" | "direct";

interface ToneConfig {
  id: ToneId;
  label: { es: string; en: string };
  description: { es: string; en: string };
  icon: string;
}

export const tones: ToneConfig[] = [
  {
    id: "professional",
    label: { es: "Profesional", en: "Professional" },
    description: {
      es: "Formal pero cálido, corporativo",
      en: "Formal yet warm, corporate",
    },
    icon: "💼",
  },
  {
    id: "friendly",
    label: { es: "Amigable", en: "Friendly" },
    description: {
      es: "Cercano, casual, con personalidad",
      en: "Approachable, casual, with personality",
    },
    icon: "😊",
  },
  {
    id: "empathetic",
    label: { es: "Empático", en: "Empathetic" },
    description: {
      es: "Muy comprensivo, enfocado en el cliente",
      en: "Very understanding, customer-focused",
    },
    icon: "💛",
  },
  {
    id: "direct",
    label: { es: "Directo", en: "Direct" },
    description: {
      es: "Claro, al punto, sin rodeos",
      en: "Clear, to the point, no fluff",
    },
    icon: "🎯",
  },
];

export function getToneLabel(id: ToneId, lang: Lang): string {
  return tones.find((t) => t.id === id)?.label[lang] ?? id;
}
