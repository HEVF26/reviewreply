import type { ToneId } from "./tones";

interface PromptParams {
  businessType: string;
  businessName: string;
  review: string;
  starRating: number;
  tone: ToneId;
  language: "es" | "en" | "auto";
}

const businessTypeLabels: Record<string, { es: string; en: string }> = {
  restaurant: { es: "Restaurante / Cafetería", en: "Restaurant / Café" },
  dentist: { es: "Dentista / Clínica médica", en: "Dentist / Medical clinic" },
  hotel: { es: "Hotel / Airbnb", en: "Hotel / Airbnb" },
  store: { es: "Tienda / E-commerce", en: "Store / E-commerce" },
  salon: { es: "Peluquería / Salón de belleza", en: "Salon / Beauty salon" },
  gym: { es: "Gimnasio / Fitness", en: "Gym / Fitness" },
  other: { es: "Otro", en: "Other" },
};

const toneLabels: Record<ToneId, { es: string; en: string }> = {
  professional: { es: "Profesional", en: "Professional" },
  friendly: { es: "Amigable", en: "Friendly" },
  empathetic: { es: "Empático", en: "Empathetic" },
  direct: { es: "Directo", en: "Direct" },
};

export function buildSystemPrompt(params: PromptParams): string {
  const { businessType, businessName, review, starRating, tone, language } = params;

  const lang = language === "auto" ? "es" : language;
  const bizLabel = businessTypeLabels[businessType]?.[lang] ?? businessType;
  const toneLabel = toneLabels[tone]?.[lang] ?? tone;
  const nameStr = businessName || (lang === "es" ? "(no proporcionado)" : "(not provided)");

  if (lang === "en") {
    return `You are an expert in online reputation management and Google review responses for local businesses. Your job is to generate professional responses that protect the business reputation and turn negative experiences into opportunities.

BUSINESS CONTEXT:
- Type: ${bizLabel}
- Name: ${nameStr}

CUSTOMER REVIEW:
- Stars: ${starRating}/5
- Text: "${review}"

REQUESTED TONE: ${toneLabel}

GENERATE A RESPONSE IN JSON:
{
  "reply": "The complete response ready to publish on Google",
  "sentiment": "positive|neutral|negative",
  "keyIssues": ["list", "of", "issues", "identified"],
  "tips": "A brief tip for the business owner on how to prevent this issue in the future"
}

RULES FOR THE RESPONSE:
- Maximum 150 words (long responses don't get read)
- ALWAYS start by thanking the customer for their time/feedback
- For negative reviews (1-2 stars):
  - Acknowledge the specific problem
  - Apologize without excuses
  - Offer a concrete solution or invite to contact privately
  - End with an invitation to give another chance
- For positive reviews (4-5 stars):
  - Thank with genuine enthusiasm (not generic)
  - Mention something specific from the review
  - Invite them to return or recommend
- For neutral reviews (3 stars):
  - Thank for honest feedback
  - Ask how to improve
  - Invite them back
- NEVER reveal medical, legal, or personal client information
- NEVER be defensive or argumentative
- NEVER use generic responses like "Thank you for your review, we value your opinion"
- USE the business name if provided
- Tone must match the selected one
- Respond ONLY with the JSON, no additional text`;
  }

  return `Eres un experto en gestión de reputación online y respuesta a reseñas de Google para negocios locales. Tu trabajo es generar respuestas profesionales que protejan la reputación del negocio y conviertan experiencias negativas en oportunidades.

CONTEXTO DEL NEGOCIO:
- Tipo: ${bizLabel}
- Nombre: ${nameStr}

RESEÑA DEL CLIENTE:
- Estrellas: ${starRating}/5
- Texto: "${review}"

TONO SOLICITADO: ${toneLabel}

GENERA UNA RESPUESTA EN JSON:
{
  "reply": "La respuesta completa lista para publicar en Google",
  "sentiment": "positive|neutral|negative",
  "keyIssues": ["lista", "de", "problemas", "identificados"],
  "tips": "Un consejo breve para el dueño del negocio sobre cómo prevenir este problema en el futuro"
}

REGLAS PARA LA RESPUESTA:
- Máximo 150 palabras (las respuestas largas no se leen)
- SIEMPRE empieza agradeciendo al cliente por su tiempo/feedback
- Para reseñas negativas (1-2 estrellas):
  - Reconoce el problema específico
  - Discúlpate sin excusas
  - Ofrece una solución concreta o invita a contactar por privado
  - Termina con una invitación a dar otra oportunidad
- Para reseñas positivas (4-5 estrellas):
  - Agradece con entusiasmo genuino (no genérico)
  - Menciona algo específico de la reseña
  - Invita a volver o recomendar
- Para reseñas neutras (3 estrellas):
  - Agradece el feedback honesto
  - Pregunta cómo mejorar
  - Invita a volver
- NUNCA reveles información médica, legal o personal del cliente
- NUNCA seas defensivo o argumentativo
- NUNCA uses respuestas genéricas tipo "Gracias por su reseña, valoramos su opinión"
- USA el nombre del negocio si se proporcionó
- El tono debe coincidir con el seleccionado
- Responde SOLO con el JSON, sin texto adicional`;
}

export function getMockResponse(language: "es" | "en" | "auto"): {
  reply: string;
  sentiment: string;
  keyIssues: string[];
  tips: string;
} {
  const lang = language === "auto" ? "es" : language;
  if (lang === "en") {
    return {
      reply: "Thank you so much for taking the time to share your experience with us. We sincerely apologize for the inconvenience with your order and the service you received — this does not reflect our standards. We have already addressed this with our team to ensure it doesn't happen again. We would love the opportunity to make it right. Please contact us directly so we can offer you a special experience on your next visit. We hope to see you again soon!",
      sentiment: "negative",
      keyIssues: ["Incomplete order", "Rude staff"],
      tips: "Implement an order verification checklist before serving and conduct customer service training with your team.",
    };
  }
  return {
    reply: "Muchas gracias por tomarse el tiempo de compartir su experiencia con nosotros. Lamentamos sinceramente el inconveniente con su pedido y el trato recibido — esto no refleja nuestros estándares. Ya hemos abordado este tema con nuestro equipo para asegurarnos de que no se repita. Nos encantaría tener la oportunidad de compensarle. Por favor contáctenos directamente para ofrecerle una experiencia especial en su próxima visita. ¡Esperamos verle pronto!",
    sentiment: "negative",
    keyIssues: ["Pedido incompleto", "Trato grosero del personal"],
    tips: "Implementa un checklist de verificación de pedidos antes de servir y realiza una capacitación de servicio al cliente con tu equipo.",
  };
}
