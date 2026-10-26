"use client";

import { useState } from "react";
import type { Review } from "@/content/reviews";
import { cn } from "@/lib/format";

function Card({ review }: { review: Review }) {
  return (
    <li className="flex w-[17.5rem] shrink-0 flex-col justify-between gap-4 rounded-[1.25rem] bg-paper p-5 text-forest md:w-[26rem] md:p-6">
      <p className="leading-relaxed">
        <span aria-hidden="true" className="text-accent">
          «&nbsp;
        </span>
        {review.text}
        <span aria-hidden="true" className="text-accent">
          &nbsp;»
        </span>
      </p>
      <div className="flex items-center justify-between gap-3">
        <span className="label text-moss">{review.author}</span>
        <span className="label text-[0.65rem] text-wood-ink" role="img" aria-label={`${review.rating}/5`}>
          {"★".repeat(review.rating)}
          <span className="opacity-30">{"★".repeat(5 - review.rating)}</span>
        </span>
      </div>
    </li>
  );
}

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const list = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-4 pr-4" aria-hidden={hidden || undefined}>
      {items.map((r) => (
        <Card key={r.id} review={r} />
      ))}
    </ul>
  );
  return (
    <div className="marquee-track" data-reverse={reverse ? "true" : "false"}>
      {list(false)}
      {list(true)}
    </div>
  );
}

/** Two rows of review cards moving in opposite directions, with a pause control (and pause on hover). */
export function ReviewsMarquee({
  reviews,
  pauseLabel,
  playLabel,
}: {
  reviews: Review[];
  pauseLabel: string;
  playLabel: string;
}) {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(reviews.length / 2);
  return (
    <div>
      <div data-paused={paused} className="marquee flex flex-col gap-4 overflow-hidden">
        <Row items={reviews.slice(0, half)} />
        <Row items={reviews.slice(half)} reverse />
      </div>
      <div className="container-x mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className={cn(
            "label inline-flex min-h-10 items-center gap-2 rounded-full border border-forest/40 px-4 text-forest transition-colors duration-500 hover:bg-forest hover:text-paper",
          )}
        >
          <span aria-hidden="true">{paused ? "▶" : "❙❙"}</span>
          {paused ? playLabel : pauseLabel}
        </button>
      </div>
    </div>
  );
}
