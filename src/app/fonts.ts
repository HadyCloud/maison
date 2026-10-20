import { Geist, Geist_Mono, Instrument_Serif, Noto_Naskh_Arabic } from "next/font/google";

// Self-hosted at build time by next/font (no request to Google at runtime).
// Google's "latin" subset already covers œ, €, – and — so latin-ext is not shipped.
// Only the faces visible above the fold (serif, mono) are preloaded.
export const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: false,
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const arabic = Noto_Naskh_Arabic({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
  preload: false,
});

export const fontVariables = [serif.variable, sans.variable, mono.variable, arabic.variable].join(" ");
