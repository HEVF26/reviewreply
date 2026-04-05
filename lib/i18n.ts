export type Lang = "es" | "en";

const translations = {
  // Header
  "nav.tool": { es: "Responder reseña", en: "Respond to review" },
  "nav.pricing": { es: "Precios", en: "Pricing" },
  "nav.faq": { es: "Preguntas frecuentes", en: "FAQ" },

  // Hero
  "hero.title": {
    es: "Responde las reseñas de Google de tu negocio en 30 segundos con IA",
    en: "Respond to your Google reviews in 30 seconds with AI",
  },
  "hero.subtitle": {
    es: "Pega la reseña, elige el tono, y copia una respuesta profesional lista para publicar. Gratis.",
    en: "Paste the review, choose the tone, and copy a professional response ready to publish. Free.",
  },
  "hero.cta": {
    es: "Responder reseña gratis →",
    en: "Respond to review free →",
  },

  // Stats
  "stats.revenue": {
    es: "Los negocios que responden reseñas ganan hasta 35% más ingresos",
    en: "Businesses that respond to reviews earn up to 35% more revenue",
  },
  "stats.read": {
    es: "El 88% de consumidores lee reseñas de Google antes de elegir",
    en: "88% of consumers read Google reviews before choosing",
  },
  "stats.never": {
    es: "El 63% de clientes dice que los negocios nunca responden",
    en: "63% of customers say businesses never respond",
  },
  "stats.revenue.number": { es: "+35%", en: "+35%" },
  "stats.read.number": { es: "88%", en: "88%" },
  "stats.never.number": { es: "63%", en: "63%" },

  // How it works
  "how.title": { es: "Cómo funciona", en: "How it works" },
  "how.step1.title": { es: "Pega la reseña de tu cliente", en: "Paste your customer's review" },
  "how.step1.desc": {
    es: "Copia la reseña directamente desde Google Business Profile",
    en: "Copy the review directly from Google Business Profile",
  },
  "how.step2.title": { es: "Elige el tono de respuesta", en: "Choose the response tone" },
  "how.step2.desc": {
    es: "Profesional, amigable, empático o directo — tú decides",
    en: "Professional, friendly, empathetic, or direct — you decide",
  },
  "how.step3.title": {
    es: "Copia y pega en Google Business Profile",
    en: "Copy and paste into Google Business Profile",
  },
  "how.step3.desc": {
    es: "Tu respuesta profesional está lista en segundos",
    en: "Your professional response is ready in seconds",
  },

  // Business types
  "businesses.title": { es: "Para todo tipo de negocios", en: "For all types of businesses" },
  "biz.restaurant": { es: "Restaurantes", en: "Restaurants" },
  "biz.dentist": { es: "Dentistas / Clínicas", en: "Dentists / Clinics" },
  "biz.hotel": { es: "Hoteles", en: "Hotels" },
  "biz.store": { es: "Tiendas", en: "Stores" },
  "biz.salon": { es: "Peluquerías", en: "Salons" },
  "biz.gym": { es: "Gimnasios", en: "Gyms" },
  "biz.other": { es: "Otros", en: "Other" },

  // Example section
  "example.title": { es: "Mira la diferencia", en: "See the difference" },
  "example.review.label": { es: "Reseña del cliente (1 estrella)", en: "Customer review (1 star)" },
  "example.review.text": {
    es: "Pedimos 3 platos y solo llegaron 2. Cuando reclamamos la mesera fue grosera. No volvemos.",
    en: "We ordered 3 dishes and only 2 arrived. When we complained the waitress was rude. We won't be back.",
  },
  "example.without": { es: "Sin responder", en: "Without responding" },
  "example.without.text": {
    es: "Los clientes potenciales ven una queja sin resolver y eligen otro negocio.",
    en: "Potential customers see an unresolved complaint and choose another business.",
  },
  "example.with": { es: "Con ReviewReply", en: "With ReviewReply" },
  "example.with.text": {
    es: "Estimado cliente, lamentamos sinceramente lo sucedido con su pedido y el trato recibido. Esto no refleja nuestros estándares. Hemos hablado con nuestro equipo para asegurar que no se repita. Nos encantaría invitarle a volver para demostrarle la experiencia que realmente ofrecemos. Por favor contáctenos directamente para coordinar. — Café Luna",
    en: "Dear customer, we sincerely apologize for what happened with your order and the service you received. This does not reflect our standards. We have spoken with our team to ensure it doesn't happen again. We would love to invite you back to show you the experience we truly offer. Please contact us directly to coordinate. — Café Luna",
  },

  // Pricing
  "pricing.title": { es: "Precios simples", en: "Simple pricing" },
  "pricing.free.name": { es: "Gratis", en: "Free" },
  "pricing.free.price": { es: "$0/mes", en: "$0/month" },
  "pricing.free.f1": { es: "5 respuestas al mes", en: "5 responses per month" },
  "pricing.free.f2": { es: "Todos los tonos", en: "All tones" },
  "pricing.free.f3": { es: "Español e inglés", en: "Spanish & English" },
  "pricing.free.cta": { es: "Empezar gratis", en: "Start free" },
  "pricing.pro.name": { es: "Pro", en: "Pro" },
  "pricing.pro.price": { es: "$15/mes", en: "$15/month" },
  "pricing.pro.f1": { es: "Respuestas ilimitadas", en: "Unlimited responses" },
  "pricing.pro.f2": { es: "Tono personalizado", en: "Custom tone" },
  "pricing.pro.f3": { es: "Tips de mejora", en: "Improvement tips" },
  "pricing.pro.cta": { es: "Próximamente", en: "Coming soon" },
  "pricing.business.name": { es: "Business", en: "Business" },
  "pricing.business.price": { es: "$39/mes", en: "$39/month" },
  "pricing.business.f1": { es: "Multi-ubicación", en: "Multi-location" },
  "pricing.business.f2": { es: "Análisis de sentimiento", en: "Sentiment analysis" },
  "pricing.business.f3": { es: "Reportes mensuales", en: "Monthly reports" },
  "pricing.business.cta": { es: "Próximamente", en: "Coming soon" },

  // FAQ
  "faq.title": { es: "Preguntas frecuentes", en: "Frequently asked questions" },
  "faq.q1": { es: "¿Es realmente gratis?", en: "Is it really free?" },
  "faq.a1": {
    es: "Sí, 5 respuestas al mes sin costo. Sin tarjeta de crédito.",
    en: "Yes, 5 responses per month at no cost. No credit card required.",
  },
  "faq.q2": {
    es: "¿Funciona para reseñas negativas?",
    en: "Does it work for negative reviews?",
  },
  "faq.a2": {
    es: "Especialmente para esas. La IA genera respuestas empáticas que protegen tu reputación.",
    en: "Especially for those. The AI generates empathetic responses that protect your reputation.",
  },
  "faq.q3": { es: "¿En qué idiomas funciona?", en: "What languages does it support?" },
  "faq.a3": {
    es: "Español e inglés, y puede responder en el mismo idioma de la reseña.",
    en: "Spanish and English, and it can respond in the same language as the review.",
  },
  "faq.q4": {
    es: "¿Publican las respuestas automáticamente?",
    en: "Are responses published automatically?",
  },
  "faq.a4": {
    es: "No, tú copias la respuesta y la pegas en Google Business Profile. Tú tienes el control total.",
    en: "No, you copy the response and paste it into Google Business Profile. You have full control.",
  },
  "faq.q5": { es: "¿Mis reseñas se guardan?", en: "Are my reviews stored?" },
  "faq.a5": {
    es: "No almacenamos tus reseñas ni datos de tus clientes.",
    en: "We don't store your reviews or your customers' data.",
  },

  // Footer
  "footer.made": { es: "Hecho con IA por ReviewReply", en: "Made with AI by ReviewReply" },

  // Respond page
  "respond.title": { es: "Responde tu reseña", en: "Respond to your review" },
  "respond.step1": { es: "Tipo de negocio", en: "Business type" },
  "respond.step2": { es: "Nombre del negocio (opcional)", en: "Business name (optional)" },
  "respond.step2.placeholder": { es: "Ej: Café Luna", en: "E.g.: Café Luna" },
  "respond.step3": { es: "Pega la reseña del cliente", en: "Paste the customer review" },
  "respond.step3.placeholder": {
    es: "Pega aquí la reseña de tu cliente...",
    en: "Paste your customer's review here...",
  },
  "respond.step4": { es: "Estrellas de la reseña", en: "Review stars" },
  "respond.step5": { es: "Tono de respuesta", en: "Response tone" },
  "respond.step6": { es: "Idioma de la respuesta", en: "Response language" },
  "respond.generate": { es: "Generar respuesta", en: "Generate response" },
  "respond.generating": { es: "Generando...", en: "Generating..." },
  "respond.copy": { es: "Copiar al portapapeles", en: "Copy to clipboard" },
  "respond.copied": { es: "¡Copiado!", en: "Copied!" },
  "respond.regenerate": { es: "Generar otra versión", en: "Generate another version" },
  "respond.changeTone": { es: "Cambiar tono", en: "Change tone" },
  "respond.tip": { es: "Tip para tu negocio", en: "Tip for your business" },
  "respond.sentiment": { es: "Sentimiento detectado", en: "Detected sentiment" },
  "respond.issues": { es: "Problemas identificados", en: "Issues identified" },
  "respond.remaining": {
    es: "Te quedan {count} respuestas gratis este mes",
    en: "You have {count} free responses left this month",
  },
  "respond.limit": {
    es: "Llegaste al límite mensual. Plan Pro próximamente — únete a la lista de espera.",
    en: "You've reached the monthly limit. Pro Plan coming soon — join the waitlist.",
  },

  // Language options
  "lang.es": { es: "Español", en: "Spanish" },
  "lang.en": { es: "Inglés", en: "English" },
  "lang.auto": { es: "Mismo idioma de la reseña", en: "Same language as the review" },

  // Email capture modal
  "modal.title": {
    es: "Crea tu cuenta gratuita para seguir respondiendo",
    en: "Create your free account to keep responding",
  },
  "modal.name": { es: "Tu nombre", en: "Your name" },
  "modal.email": { es: "Tu email", en: "Your email" },
  "modal.submit": { es: "Crear cuenta gratis", en: "Create free account" },
  "modal.skip": { es: "Ahora no", en: "Not now" },

  // Waitlist
  "waitlist.title": {
    es: "Únete a la lista de espera del Plan Pro",
    en: "Join the Pro Plan waitlist",
  },
  "waitlist.email": { es: "Tu email", en: "Your email" },
  "waitlist.submit": { es: "Unirme a la lista", en: "Join the waitlist" },
  "waitlist.success": {
    es: "¡Listo! Te avisaremos cuando el Plan Pro esté disponible.",
    en: "Done! We'll notify you when the Pro Plan is available.",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang, replacements?: Record<string, string>): string {
  const value: string = translations[key]?.[lang] ?? key;
  if (!replacements) return value;
  return Object.entries(replacements).reduce(
    (str, [k, v]) => str.replace(`{${k}}`, v),
    value
  );
}
