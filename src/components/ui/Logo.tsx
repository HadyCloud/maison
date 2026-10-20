import type { CSSProperties } from "react";
import { cn } from "@/lib/format";

/** Traced from the restaurant's lockup by scripts/logo.ts (public/brand). */
const VARIANTS = {
  full: { src: "/brand/logo.svg", w: 1797, h: 291 },
  mark: { src: "/brand/logo-mark.svg", w: 1797, h: 245 },
} as const;

type Props = {
  /** `full`: frame + MAISON L + CUISINE AUTHENTIQUE LIBANAISE · `mark`: frame + MAISON L (small sizes). */
  variant?: keyof typeof VARIANTS;
  /** Accessible name. Omit when the logo sits next to a visible or sr-only name (decorative). */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * The Maison L logo as a CSS mask: one cached SVG request, tinted with `currentColor`,
 * so it takes any house grey (`text-silver-100`, `text-graphite-800`, `text-ink`…).
 */
export function Logo({ variant = "full", label, className, style }: Props) {
  const v = VARIANTS[variant];
  const mask = `url(${v.src}) center / 100% 100% no-repeat`;
  const common = {
    "data-logo": variant,
    className: cn("block bg-current", className),
    style: { aspectRatio: `${v.w} / ${v.h}`, mask, WebkitMask: mask, ...style },
  };
  return label ? <span role="img" aria-label={label} {...common} /> : <span aria-hidden="true" {...common} />;
}
