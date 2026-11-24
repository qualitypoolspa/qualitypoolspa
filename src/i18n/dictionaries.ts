import "server-only";
import type { Locale } from "./config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

// Add a line per language when its JSON file is ready (must match en.json's shape).
const dictionaries: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (lang: Locale): Promise<Dictionary> =>
  (dictionaries[lang] ?? dictionaries.en!)();
