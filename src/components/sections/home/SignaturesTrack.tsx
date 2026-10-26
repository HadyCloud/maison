"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Desktop (≥1024px, motion allowed): the section pins and vertical scroll drives the track sideways.
 * Otherwise a plain vertical stack. Pattern informed by 21st.dev "Scroll Horizontal Gallery"
 * (motiondotdev) — written from scratch on Motion's useScroll (see docs/COMPONENTS.md).
 */
export function SignaturesTrack({ children }: { children: ReactNode }) {
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
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[var(--header-h)]"
            : ""
        }
      >
        <m.div
          ref={trackRef}
          style={pinned ? { x } : {}}
          className={
            pinned
              ? "container-x flex w-max flex-row items-start gap-[6vw] pt-24 [&>article]:w-[min(30vw,46vh)] [&>article]:shrink-0"
              : "container-x flex flex-col gap-24 pt-14 md:grid md:grid-cols-2 md:gap-x-[5vw] lg:grid-cols-3"
          }
        >
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
