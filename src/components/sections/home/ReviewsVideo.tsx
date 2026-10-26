"use client";

import { useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

/** Wide looping clip: 720p on phones, 1080p otherwise. Plays only while on screen; the poster stays under it. */
export function ReviewsVideo({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [tier, setTier] = useState<"720" | "1080" | null>(null);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  // The video exists only on the client, so server and first client render match.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduce !== false || !mounted) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, mounted]);

  useEffect(() => {
    if (inView) setTier((t) => t ?? (window.innerWidth < 768 ? "720" : "1080"));
  }, [inView]);

  // Runs once the source is attached (tier set) and whenever the clip enters or leaves the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !tier) return;
    if (inView) el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [tier, inView]);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-paper-deep md:aspect-[21/9] md:rounded-[2rem] lg:w-[80%]">
      <picture>
        <source type="image/webp" srcSet="/video/reviews-poster.webp" />
        <img
          src="/video/reviews-poster.jpg"
          alt=""
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {mounted && reduce === false && (
        <video
          ref={ref}
          src={tier ? `/video/reviews-${tier}.mp4` : undefined}
          data-testid="reviews-video"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-house ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setPlaying(true)}
        />
      )}
      {children}
    </div>
  );
}
