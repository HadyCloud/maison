import { en } from "./en";
import { type Dictionary, fr } from "./fr";

export type Lang = "fr" | "en";
export type { Dictionary };

export const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Route pairs used for the language toggle and hreflang. */
export const routes = {
  home: { fr: "/", en: "/en" },
  menu: { fr: "/menu", en: "/en/menu" },
} as const;

export type RouteKey = keyof typeof routes;

export function alternatePath(pathname: string, target: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const pair of Object.values(routes)) {
    if (pair.fr === clean || pair.en === clean) return pair[target];
  }
  return routes.home[target];
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}
