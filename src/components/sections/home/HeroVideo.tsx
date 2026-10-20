"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Tier = "720" | "1080";
type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** 720p on phones, Save-Data or slow networks; 1080p otherwise. */
export function pickTier(width: number, connection: NetworkInfo | undefined): Tier {
  const slow = connection?.saveData === true || /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "");
  return slow || width < 768 ? "720" : "1080";
}

const whenIdle = (fn: () => void) => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fn, { timeout: 2500 });
  else setTimeout(fn, 600);
};

/**
 * Looping hero video layered over the poster (the LCP element). Starts loading after `load`,
 * fades in only once it actually plays, pauses off-screen / in hidden tabs, and never renders
 * under prefers-reduced-motion. If autoplay is refused the poster simply stays.
 */
export function HeroVideo({ basePath = "/video/hero" }: { basePath?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduce !== false) return;
    const nav = navigator as Navigator & { connection?: NetworkInfo };
    const start = () => whenIdle(() => setTier(pickTier(window.innerWidth, nav.connection)));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [reduce]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !tier) return;
    let inView = true;
    const sync = () => {
      if (inView && !document.hidden) video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [tier]);

  if (reduce !== false || !tier) return null;
  return (
    <video
      ref={ref}
      data-testid="hero-video"
      data-playing={playing}
      className={`absolute inset-0 h-full w-full object-cover object-[50%_35%] transition-opacity duration-[1400ms] ease-house ${
        playing ? "opacity-100" : "opacity-0"
      }`}
      width={1440}
      height={1080}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      disableRemotePlayback
      onPlaying={() => setPlaying(true)}
    >
      <source src={`${basePath}-${tier}.webm`} type="video/webm" />
      <source src={`${basePath}-${tier}.mp4`} type="video/mp4" />
    </video>
  );
}
