import { FadeIn, LineReveal } from "@/components/motion/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { site } from "@/config/site";
import { chefQuote } from "@/content/quotes";
import type { Dictionary, Lang } from "@/i18n";

/** The one inverted section: white ground, forest type. */
export function Chef({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const quote = chefQuote.approved ? chefQuote.text[lang] : chefQuote.fallback[lang];
  const [open, close] = lang === "fr" ? ["«\u00a0", "\u00a0»"] : ["“", "”"];
  return (
    <section id="chef" aria-labelledby="chef-title" className="on-light bg-white text-forest">
      <div className="container-x grid-12 gap-y-14 py-[clamp(6rem,12vw,11rem)]">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <PhotoPlaceholder
              label={dict.chef.portraitPlaceholder.replace(/^Photo · /, "")}
              tone="light"
              className="aspect-[3/4] w-full md:h-[min(78vh,62rem)] md:aspect-auto"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
          <LineReveal
            as="h2"
            className="display text-[clamp(5.5rem,17vw,15rem)] leading-[0.82]"
            lines={[
              <em key="n" className="italic">
                {site.chef.name}
              </em>,
            ]}
          />
          <span id="chef-title" className="sr-only">
            {site.chef.name}, {site.chef.role[lang]}
          </span>
          <p className="label mt-6 text-line">{site.chef.role[lang]}</p>

          <FadeIn className="mt-14 flex max-w-xl flex-col gap-6 text-lead text-line">
            {dict.chef.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </FadeIn>

          <FadeIn className="mt-16 max-w-xl border-forest/20 border-l pl-6">
            {chefQuote.approved ? (
              <blockquote className="display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1]">
                <p>
                  <span aria-hidden="true">{open}</span>
                  <em className="italic">{quote}</em>
                  <span aria-hidden="true">{close}</span>
                </p>
                <footer className="label mt-4 text-line">{chefQuote.author}</footer>
              </blockquote>
            ) : (
              <p className="display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1]" data-testid="chef-line">
                <em className="italic">{quote}</em>
              </p>
            )}
          </FadeIn>

          <ul className="label mt-20 border-forest/20 border-t">
            {dict.chef.facts.map((f) => (
              <li key={f} className="flex items-center justify-between border-forest/20 border-b py-4">
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
