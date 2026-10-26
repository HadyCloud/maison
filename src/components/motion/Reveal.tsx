"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_HOUSE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type LineProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "div";
};

/** Masked line reveal: each line rises out of its own mask, 0.9 s, staggered. */
export function LineReveal({ lines, className, lineClassName, delay = 0, as = "div" }: LineProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag className={className} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <m.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "105%" },
              shown: reduce ? { opacity: 1 } : { y: "0%" },
            }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE_HOUSE, delay: delay + i * 0.09 }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
