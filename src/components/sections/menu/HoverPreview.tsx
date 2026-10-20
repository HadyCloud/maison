"use client";

import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type PreviewImage = { avif: string; webp: string; alt: string };

const W = 280;
const H = 350;
// Spring values kept from the 21st.dev "Hover Image List" source (educalvolpz), slowed for a heavier lag.
const SPRING = { damping: 30, stiffness: 180, mass: 0.9 };
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cursor-following dish preview for the desktop menu (hover + fine pointer only).
 * Attaches by delegation to `[data-preview]` rows inside #menu-list, so rows stay server-rendered.
 * Adapted from 21st.dev "Hover Image List": rAF-batched pointer tracking + spring follow;
 * skew, rounded corners and shadow removed, a clip-path reveal added.
 */
export function HoverPreview({ images }: { images: Record<string, PreviewImage> }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const list = document.getElementById("menu-list");
    if (!enabled || !list) return;
    const onMove = (e: PointerEvent) => {
      const row = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-preview]") : null;
      const id = row?.dataset.preview;
      setActive(id && images[id] ? id : null);
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        x.set(e.clientX + 32);
        y.set(Math.min(e.clientY - H / 2, window.innerHeight - H - 16));
      });
    };
    const onLeave = () => setActive(null);
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled, images, x, y]);

  if (!enabled) return null;
  const img = active ? images[active] : undefined;
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40"
      style={{ x: reduce ? x : sx, y: reduce ? y : sy, width: W, height: H }}
      data-testid="hover-preview"
    >
      <AnimatePresence mode="popLayout">
        {img && active && (
          <m.picture
            key={active}
            className="absolute inset-0 block overflow-hidden bg-graphite-800"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE }}
          >
            <source type="image/avif" srcSet={img.avif} />
            <img src={img.webp} alt="" width={W} height={H} className="h-full w-full object-cover" />
          </m.picture>
        )}
      </AnimatePresence>
    </m.div>
  );
}
