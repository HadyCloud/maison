import { Arcade } from "@/components/ui/Arcade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/config/site";
import { reviews } from "@/content/reviews";
import type { Dictionary } from "@/i18n";
import { ReviewsMarquee } from "./ReviewsMarquee";
import { ReviewsVideo } from "./ReviewsVideo";

/** Guest reviews: a wide clip on top, two rows of review cards drifting in opposite directions underneath. */
export function Reviews({ dict }: { dict: Dictionary }) {
  const r = dict.reviews;
  const { score, count } = site.google.rating.value;
  const ratingText = `${String(score).replace(".", ",")}/5 ${r.on} ${count} ${r.googleReviews}`;
  return (
    <section
      id="avis"
      aria-label={r.label}
      className="theme-forest relative bg-[#454f24] py-[clamp(2.5rem,5vw,4rem)] lg:py-24"
    >
      <Arcade className="text-[#454f24]" />
      <div className="container-x lg:ms-[var(--align-l,var(--gutter))] lg:me-[var(--align-r,var(--gutter))] lg:px-0">
        <ReviewsVideo>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between">
            <p
              className="flex items-center gap-3 rounded-tr-[1.25rem] bg-[#36401b] py-3 pr-5 pl-4 text-paper md:gap-4 md:rounded-tr-[1.75rem] md:py-4 md:pr-8 md:pl-6"
              role="img"
              aria-label={ratingText}
            >
              <span
                aria-hidden="true"
                className="text-[0.95rem] text-wood-light tracking-[0.15em] md:text-xl"
              >
                ★★★★★
              </span>
              <span aria-hidden="true" className="label text-[0.65rem] md:text-sm">
                {ratingText}
              </span>
            </p>
            <div className="hidden pr-4 md:block lg:pr-6">
              <ButtonLink href={site.google.writeReviewUrl} variant="fill">
                {r.write}{" "}
                <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                  →
                </span>
              </ButtonLink>
            </div>
          </div>
        </ReviewsVideo>
        <div className="mt-5 flex justify-center md:hidden">
          <ButtonLink href={site.google.writeReviewUrl} variant="fill">
            {r.write}{" "}
            <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
              →
            </span>
          </ButtonLink>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <ReviewsMarquee reviews={reviews} />
      </div>
    </section>
  );
}
