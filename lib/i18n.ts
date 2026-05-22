export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

const dictionary = {
  heroTitle: {
    es: "Construyo sistemas que hacen que tu operación funcione sola.",
    en: "I build systems that make your operations run on their own.",
  },
  heroCopy: {
    es: "Soy Gabriel Uviedo, desarrollador con 7+ años creando software a medida para negocios que necesitan ordenar, automatizar y escalar su operación.",
    en: "I'm Gabriel Uviedo, a software engineer with 7+ years building custom software for businesses that need structure, automation and scale.",
  },
} satisfies Record<string, Record<Locale, string>>;

export type MessageKey = keyof typeof dictionary;

export function t(key: MessageKey, locale: Locale = defaultLocale) {
  return dictionary[key][locale] ?? dictionary[key][defaultLocale];
}
