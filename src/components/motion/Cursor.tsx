"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type Mode = "hidden" | "default" | "link" | "view";
const SIZE: Record<Mode, number> = { hidden: 8, default: 10, link: 44, view: 88 };
const INTERACTIVE = "a, button, [role='button'], input, select, textarea, summary, label[for]";

/**
 * Desktop-only cursor (hover + fine pointer, no reduced motion): a small circle that grows on
 * interactive elements and shows "VOIR" over dish images (`data-cursor="view"`).
 * mix-blend-difference keeps it legible on the light chef section.
 */
export function Cursor({ viewLabel }: { viewLabel: string }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      if (t?.closest("[data-cursor='view']")) setMode("view");
      else if (t?.closest(INTERACTIVE)) setMode("link");
      else setMode("default");
    };
    const leave = () => setMode("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = SIZE[mode];
  return (
    <m.div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[100] ${mode === "view" ? "" : "mix-blend-difference"}`}
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-silver-100"
        animate={{
          width: size,
          height: size,
          opacity: mode === "hidden" ? 0 : 1,
          backgroundColor: mode === "link" ? "rgba(237,237,239,0)" : "rgba(237,237,239,1)",
          borderWidth: mode === "link" ? 1 : 0,
        }}
        // The one deliberate curve on the site: the brief asks for a circular cursor.
        style={{ borderColor: "#ededef", borderStyle: "solid", borderRadius: "50%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {mode === "view" && <span className="label text-ink">{viewLabel}</span>}
      </m.div>
    </m.div>
  );
}
