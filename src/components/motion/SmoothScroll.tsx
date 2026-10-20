"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

function ResetOnRoute() {
  const lenis = useLenis();
  const pathname = usePathname();
  // biome-ignore lint/correctness/useExhaustiveDependencies: `pathname` is the trigger — reset scroll on each route change
  useEffect(() => {
    if (!lenis || window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);
  return null;
}

/** Lenis smooth scroll (duration 1.2). Disabled entirely under prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ duration: 1.2, autoRaf: true, anchors: { offset: -80 } }}>
      <ResetOnRoute />
      {children}
    </ReactLenis>
  );
}
