import { Amiri, Geist, Geist_Mono, Instrument_Serif, Noto_Sans_Arabic } from "next/font/google";

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

// Arabic faces: only fetched by browsers when Arabic text is on screen (unicode-range subsets).
export const arabicSerif = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const arabicSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  serif.variable,
  sans.variable,
  mono.variable,
  arabicSerif.variable,
  arabicSans.variable,
].join(" ");
