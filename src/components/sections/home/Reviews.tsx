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
  return (
    <section
      id="avis"
      aria-label={r.label}
      className="theme-paper relative bg-[#dde3c9] py-[clamp(2.5rem,5vw,4rem)]"
    >
      <Arcade className="text-[#dde3c9]" />
      <div className="container-x">
        <ReviewsVideo />
        <div className="mt-5 flex flex-col items-center gap-3 md:mt-6 md:flex-row md:justify-center md:gap-6">
          <p className="label text-fg">
            <span className="text-accent">★</span>{" "}
            {site.google.rating.value.score.toString().replace(".", ",")}/5 · {site.google.rating.value.count}{" "}
            {r.googleReviews}
          </p>
          <ButtonLink href={site.google.writeReviewUrl} variant="outline">
            {r.write} →
          </ButtonLink>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <ReviewsMarquee reviews={reviews} pauseLabel={r.pause} playLabel={r.play} />
      </div>
    </section>
  );
}
