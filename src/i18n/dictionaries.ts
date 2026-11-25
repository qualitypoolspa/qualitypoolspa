import "server-only";
import type { Locale } from "./config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

// Add a line per language when its JSON file is ready (must match en.json's shape).
const dictionaries: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  sv: () => import("./dictionaries/sv.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
};

export const getDictionary = async (lang: Locale): Promise<Dictionary> =>
  (dictionaries[lang] ?? dictionaries.en!)();
