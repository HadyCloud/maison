"use client";

import { LazyMotion } from "motion/react";
import { type ReactNode, useEffect } from "react";
import { CurtainProvider } from "@/components/motion/Curtain";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const loadFeatures = () => import("@/components/motion/motion-features").then((mod) => mod.default);

/** After `load`, swap in the below-the-fold faces (Geist body, Naskh Arabic) — off the critical path. */
function useDeferredFonts() {
  useEffect(() => {
    const enable = () => document.documentElement.classList.add("fonts-ready");
    if (document.readyState === "complete") enable();
    else window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
  }, []);
}

export function Providers({ children }: { children: ReactNode }) {
  useDeferredFonts();
  return (
    <LazyMotion features={loadFeatures} strict>
      <SmoothScroll>
        <CurtainProvider>{children}</CurtainProvider>
      </SmoothScroll>
    </LazyMotion>
  );
}
