import { en } from "./en";
import { type Dictionary, fr } from "./fr";

export type Lang = "fr" | "en";
export type { Dictionary };

export const dictionaries: Record<Lang, Dictionary> = { fr, en };

/** One URL per page: the language is a preference (cookie), French by default. */
export const LANG_COOKIE = "lang";

export function parseLang(value: string | undefined | null): Lang {
  return value === "en" ? "en" : "fr";
}

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export const routes = { home: "/", menu: "/menu" } as const;
export type RouteKey = keyof typeof routes;
