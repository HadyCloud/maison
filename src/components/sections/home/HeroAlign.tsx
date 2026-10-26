"use client";

import { useEffect } from "react";

/** Where "CUISINE AUTHENTIQUE LIBANAISE" starts inside the logo lockup (tagline x / lockup width). */
const TAGLINE_START = 0.1397;

/**
 * Desktop only: publishes the hero's visual edges as CSS variables so the sections below can line up with them.
 * `--align-logo`: left edge of the logo frame. `--align-l`: left edge of the logo's tagline. `--align-r`: distance from the right of the page to the end of
 * the "Réserver une table" button. Falls back to the page gutter until measured (and below 1024px).
 */
export function HeroAlign() {
  useEffect(() => {
    const root = document.documentElement;
    const logo = document.querySelector<HTMLElement>("#hero-title [data-logo]");
    const reserve = document.querySelector<HTMLElement>('[data-testid="hero-reserve"]');
    if (!logo || !reserve) return;
    const measure = () => {
      if (window.innerWidth < 1024) {
        root.style.removeProperty("--align-logo");
        root.style.removeProperty("--align-l");
        root.style.removeProperty("--align-r");
        return;
      }
      const l = logo.getBoundingClientRect();
      const r = reserve.getBoundingClientRect();
      root.style.setProperty("--align-logo", `${Math.round(l.left)}px`);
      root.style.setProperty("--align-l", `${Math.round(l.left + l.width * TAGLINE_START)}px`);
      root.style.setProperty("--align-r", `${Math.round(root.clientWidth - r.right)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(logo);
    ro.observe(reserve);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return null;
}
