import type { Lang } from "@/i18n";

/** Prices always carry two decimals so the column aligns: FR "8,50 €", EN "€8.50", AR "8.50 €" (Latin digits). */
export function formatPrice(value: number, lang: Lang): string {
  const n = value.toFixed(2);
  if (lang === "fr") return `${n.replace(".", ",")} €`;
  return lang === "ar" ? `\u200E${n} €\u200E` : `€${n}`;
}

/** "2026-10-20" → FR "20.10.2026" · EN "20.10.2026" (mono, unambiguous in both). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
