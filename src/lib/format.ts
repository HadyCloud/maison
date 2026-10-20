import type { Lang } from "@/i18n";

/** Prices always carry two decimals so the column aligns: FR "8,50 €", EN "€8.50". */
export function formatPrice(value: number, lang: Lang): string {
  const n = value.toFixed(2);
  return lang === "fr" ? `${n.replace(".", ",")} €` : `€${n}`;
}

/** "2026-10-20" → FR "20.10.2026" · EN "20.10.2026" (mono, unambiguous in both). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function formatRating(score: number, lang: Lang): string {
  return lang === "fr" ? score.toFixed(1).replace(".", ",") : score.toFixed(1);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
