"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";
import { EASE_HOUSE } from "./Reveal";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max parallax travel in % of the frame (≤ 8). 0 disables. */
  parallax?: number;
  delay?: number;
};

/**
 * Clip-path wipe (bottom → top) with a scale settle from 1.08 to 1, plus optional parallax ≤ 8 %.
 * Reduced motion: a plain fade, no parallax.
 */
export function ImageReveal({ children, className, parallax = 0, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = Math.min(parallax, 8);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  if (reduce) {
    return (
      <m.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE_HOUSE, delay }}
    >
      <m.div className="h-full w-full" style={travel ? { y, scale: 1 + travel / 50 } : {}}>
        <m.div
          className="h-full w-full"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.6, ease: EASE_HOUSE, delay }}
        >
          {children}
        </m.div>
      </m.div>
    </m.div>
  );
}
