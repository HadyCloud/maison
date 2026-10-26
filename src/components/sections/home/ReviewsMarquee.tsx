import type { Review } from "@/content/reviews";

function Card({ review }: { review: Review }) {
  return (
    <li className="flex w-[15rem] shrink-0 flex-col gap-3 rounded-[1.1rem] bg-paper p-4 text-forest text-sm md:w-[21rem] md:p-5 md:text-base">
      <p className="line-clamp-3 min-h-[4.875em] leading-relaxed">
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
    <ul className="flex shrink-0 items-start gap-3 pr-3" aria-hidden={hidden || undefined}>
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

/** Two rows of review cards drifting in opposite directions, non-stop. */
export function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  const half = Math.ceil(reviews.length / 2);
  return (
    <div className="marquee flex flex-col gap-3 overflow-hidden">
      <Row items={reviews.slice(0, half)} />
      <Row items={reviews.slice(half)} reverse />
    </div>
  );
}
