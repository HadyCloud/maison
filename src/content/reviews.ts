/**
 * Verbatim Google reviews only — first name + initial, never edited, never invented.
 * Ships empty: the quote block stays hidden until real reviews are added here.
 */
export type Review = {
  text: string;
  /** e.g. "Camille R." */
  author: string;
  /** ISO date of the review. */
  date: string;
  lang: "fr" | "en";
  source: "Avis Google";
};

export const reviews: Review[] = [];
