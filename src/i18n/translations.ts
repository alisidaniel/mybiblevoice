// src/i18n/translations.ts
export type Locale = "en" | "es";

export interface TranslationDict {
  // Nav
  "nav.today": string;
  "nav.week": string;
  "nav.stories": string;
  "nav.topics": string;
  "nav.journal": string;
  "nav.plans": string;
  "nav.saved": string;
  "nav.settings": string;
  "nav.community": string;

  // Greeting
  "greeting.morning": string;
  "greeting.subtitle": string;

  // Verse card
  "verse.label": string;
  "verse.listen": string;
  "verse.amen": string;
  "verse.save": string;
  "verse.saved": string;
  "verse.share": string;
  "verse.askAi.title": string;
  "verse.askAi.subtitle": string;

  // Why
  "why.title": string;
  "why.link": string;

  // Stories
  "stories.title": string;
  "stories.related": string;
  "stories.seeAll": string;
  "stories.minRead": string;
  "stories.searchPlaceholder": string;

  // Right rail
  "rail.streak": string;
  "rail.freezes": string;
  "rail.topics": string;
  "rail.prayer": string;
  "rail.continue": string;
  "rail.community": string;

  // Journal
  "journal.title": string;
  "journal.newEntry": string;
  "journal.placeholder": string;
  "journal.save": string;
  "journal.offlineNotice": string;

  // Common
  "common.back": string;
  "common.next": string;
  "common.skip": string;
  "common.save": string;
  "common.cancel": string;
  "common.delete": string;
  "common.loading": string;

  // Settings
  "settings.title": string;
  "settings.language": string;
  "settings.voice": string;
  "settings.appearance": string;
  "settings.theme.light": string;
  "settings.theme.dark": string;
  "settings.export": string;
  "settings.push": string;
}

export const translations: Record<Locale, TranslationDict> = {
  en: {
    "nav.today": "Today",
    "nav.week": "This Week",
    "nav.stories": "Stories",
    "nav.topics": "Topics",
    "nav.journal": "Journal",
    "nav.plans": "Reading Plans",
    "nav.saved": "Saved",
    "nav.settings": "Settings",
    "nav.community": "Community",

    "greeting.morning": "Good morning",
    "greeting.subtitle": "Your verse, reflection, and stories for today",

    "verse.label": "Verse of the Day",
    "verse.listen": "Listen",
    "verse.amen": "Amen",
    "verse.save": "Save",
    "verse.saved": "Saved",
    "verse.share": "Share",
    "verse.askAi.title": "Ask about this verse",
    "verse.askAi.subtitle": "Context, meaning, application — on demand.",

    "why.title": "Why this verse today",
    "why.link": "Read the reasoning",

    "stories.title": "Story Explorer",
    "stories.related": "Related stories",
    "stories.seeAll": "See all",
    "stories.minRead": "min read",
    "stories.searchPlaceholder": "Ask anything — 'God in the storm'…",

    "rail.streak": "Current streak",
    "rail.freezes": "Freezes",
    "rail.topics": "Your topics",
    "rail.prayer": "Prayer prompt",
    "rail.continue": "Continue reading",
    "rail.community": "Community picks",

    "journal.title": "Journal",
    "journal.newEntry": "New entry",
    "journal.placeholder": "What is God saying to you today?",
    "journal.save": "Save entry",
    "journal.offlineNotice":
      "You're offline — this entry will sync when you reconnect.",

    "common.back": "Back",
    "common.next": "Next",
    "common.skip": "Skip",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.loading": "Loading…",

    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.voice": "Reading voice",
    "settings.appearance": "Appearance",
    "settings.theme.light": "Light",
    "settings.theme.dark": "Dark",
    "settings.export": "Export your data",
    "settings.push": "Push notifications",
  },

  es: {
    "nav.today": "Hoy",
    "nav.week": "Esta semana",
    "nav.stories": "Historias",
    "nav.topics": "Temas",
    "nav.journal": "Diario",
    "nav.plans": "Planes de lectura",
    "nav.saved": "Guardado",
    "nav.settings": "Ajustes",
    "nav.community": "Comunidad",

    "greeting.morning": "Buenos días",
    "greeting.subtitle": "Tu versículo, reflexión e historias para hoy",

    "verse.label": "Versículo del día",
    "verse.listen": "Escuchar",
    "verse.amen": "Amén",
    "verse.save": "Guardar",
    "verse.saved": "Guardado",
    "verse.share": "Compartir",
    "verse.askAi.title": "Pregunta sobre este versículo",
    "verse.askAi.subtitle": "Contexto, significado, aplicación — al instante.",

    "why.title": "Por qué este versículo hoy",
    "why.link": "Leer el razonamiento",

    "stories.title": "Explorador de historias",
    "stories.related": "Historias relacionadas",
    "stories.seeAll": "Ver todo",
    "stories.minRead": "min de lectura",
    "stories.searchPlaceholder": "Pregunta lo que sea — 'Dios en la tormenta'…",

    "rail.streak": "Racha actual",
    "rail.freezes": "Congelaciones",
    "rail.topics": "Tus temas",
    "rail.prayer": "Oración del día",
    "rail.continue": "Continuar leyendo",
    "rail.community": "Comunidad",

    "journal.title": "Diario",
    "journal.newEntry": "Nueva entrada",
    "journal.placeholder": "¿Qué te está diciendo Dios hoy?",
    "journal.save": "Guardar entrada",
    "journal.offlineNotice":
      "Estás sin conexión — esta entrada se sincronizará cuando vuelvas.",

    "common.back": "Atrás",
    "common.next": "Siguiente",
    "common.skip": "Omitir",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.loading": "Cargando…",

    "settings.title": "Ajustes",
    "settings.language": "Idioma",
    "settings.voice": "Voz de lectura",
    "settings.appearance": "Apariencia",
    "settings.theme.light": "Claro",
    "settings.theme.dark": "Oscuro",
    "settings.export": "Exportar tus datos",
    "settings.push": "Notificaciones push",
  },
};