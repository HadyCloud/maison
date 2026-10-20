/**
 * Quotes attributed to real people render ONLY when `approved: true`.
 * Until then components show the unattributed `fallback` line instead.
 */
export type Quote = {
  id: string;
  author: "Jalal" | "Layal";
  text: { fr: string; en: string };
  /** Shown, unattributed, while the quote is not approved. */
  fallback: { fr: string; en: string };
  approved: boolean;
};

export const chefQuote: Quote = {
  id: "chef",
  author: "Jalal",
  // PROPOSAL — drafted, never said. Needs Jalal's explicit approval before `approved: true`.
  text: {
    fr: "Au Liban, on ne sert pas une assiette. On sert une table.",
    en: "In Lebanon, you don't serve a plate. You serve a table.",
  },
  fallback: {
    fr: "Ici, on ne sert pas une assiette. On sert une table.",
    en: "Here, we don't serve a plate. We serve a table.",
  },
  approved: false,
};
