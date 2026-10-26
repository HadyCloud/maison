"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Desktop (≥1024px, motion allowed): the section pins and vertical scroll drives the track sideways.
 * Otherwise (phones, tablets, reduced motion): the intro on top, then the dishes as a swipeable row that snaps card by card. Pattern informed by 21st.dev "Scroll Horizontal Gallery"
 * (motiondotdev) — written from scratch on Motion's useScroll (see docs/COMPONENTS.md).
 */
export function SignaturesTrack({ intro, children }: { intro: ReactNode; children: ReactNode }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const enabled = mq.matches && reduce === false;
      setPinned(enabled);
      const track = trackRef.current;
      setDistance(enabled && track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={pinned ? { height: `calc(100svh - var(--header-h) + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-start overflow-hidden pt-[var(--band-gap)]"
            : "pt-[var(--band-gap)]"
        }
      >
        {!pinned && <div className="container-x">{intro}</div>}
        <m.div
          ref={trackRef}
          style={pinned ? { x } : {}}
          className={
            pinned
              ? "container-x flex w-max flex-row items-start gap-[6vw] [&>article]:w-[min(30vw,calc((100svh-var(--header-h)-var(--band-gap)-var(--num)*0.82-11rem)*0.8))] [&>article]:shrink-0"
              : "flex snap-x snap-mandatory flex-row items-start gap-5 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pt-8 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden [&>article]:w-[72vw] [&>article]:max-w-[21rem] [&>article]:shrink-0 [&>article]:snap-start"
          }
        >
          {pinned && intro}
          {children}
        </m.div>
        {pinned && (
          <div aria-hidden="true" className="container-x absolute inset-x-0 bottom-8">
            <div className="h-px w-full bg-rule">
              <m.div className="h-px bg-accent" style={{ width: progress }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
