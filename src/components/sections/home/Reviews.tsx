import { LineReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { site } from "@/config/site";
import { reviews } from "@/content/reviews";
import type { Dictionary, Lang } from "@/i18n";
import { formatDate, formatRating } from "@/lib/format";

export function Reviews({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const { score, count } = site.google.rating.value;
  const press = site.press[lang];
  const shown = reviews.filter((r) => r.lang === lang).slice(0, 3);
  return (
    <section id="avis" aria-labelledby="reviews-title" className="container-x py-[clamp(6rem,12vw,11rem)]">
      <h2 id="reviews-title" className="sr-only">
        {dict.reviews.label}
      </h2>

      <div className="grid-12 gap-y-20">
        <div className="col-span-12 lg:col-span-6">
          <LineReveal
            className="display text-[clamp(9rem,26vw,24rem)] text-silver-100 leading-[0.8]"
            lines={[
              <span key="r" className="tabular">
                {formatRating(score, lang)}
                <span className="align-top text-[0.22em] text-graphite-500">/5</span>
              </span>,
            ]}
          />
          <p className="label mt-6 text-silver-200">
            {count} {dict.reviews.count}
            <span className="text-graphite-400">
              {" "}
              · {dict.reviews.checked} {formatDate(site.google.rating.lastChecked)}
            </span>
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <ButtonLink href={site.google.mapsUrl} variant="underline">
              {dict.reviews.read} ↗
            </ButtonLink>
            <ButtonLink href={site.google.writeReviewUrl} variant="underline">
              {dict.reviews.write} ↗
            </ButtonLink>
          </div>
        </div>

        <div className="col-span-12 flex flex-col justify-end lg:col-span-5 lg:col-start-8">
          <p className="label text-graphite-400">
            {site.press.outlet} · {formatDate(site.press.date)}
          </p>
          <p className="display mt-6 text-title text-silver-100">
            <span aria-hidden="true">{lang === "fr" ? "« " : "“"}</span>
            <q className="italic [quotes:none]" cite={press.url}>
              {press.heading}
            </q>
            <span aria-hidden="true">{lang === "fr" ? " »" : "”"}</span>
          </p>
          <ButtonLink href={press.url} variant="underline" className="mt-6 self-start">
            {dict.reviews.pressRead} ↗
          </ButtonLink>
        </div>
      </div>

      {shown.length > 0 && (
        <ul className="grid-12 mt-24 gap-y-10 border-graphite-700 border-t pt-10" data-testid="review-quotes">
          {shown.map((r) => (
            <li key={r.author + r.date} className="col-span-12 md:col-span-4">
              <blockquote>
                <p className="display text-2xl text-silver-200 leading-snug">
                  <Emphasis text={r.text} />
                </p>
                <footer className="label mt-4 text-graphite-400">
                  {r.author} · {dict.reviews.reviewSource}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
