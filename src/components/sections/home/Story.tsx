import { ImageReveal } from "@/components/motion/ImageReveal";
import { FadeIn, LineReveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/ui/Emphasis";
import { Picture } from "@/components/ui/Picture";
import { photoById } from "@/content/photo-map";
import type { Dictionary, Lang } from "@/i18n";

export function Story({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const photo = photoById("salle");
  return (
    <section id="la-maison" aria-labelledby="story-title" className="container-x py-[clamp(6rem,14vw,13rem)]">
      <div className="grid-12 gap-y-16">
        <LineReveal
          as="h2"
          className="display col-span-12 text-display text-white lg:col-span-7"
          lines={dict.story.pull.map((l) => <Emphasis key={l} text={l} />)}
        />
        <span id="story-title" className="sr-only">
          {dict.story.label}
        </span>

        <div className="col-span-12 flex flex-col gap-10 md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:pt-[18vh]">
          <figure>
            <ImageReveal className="aspect-[3/2] w-full" parallax={6}>
              <Picture
                id="salle"
                alt={photo?.alt[lang] ?? ""}
                sizes="(min-width: 1024px) 32vw, (min-width: 768px) 60vw, 92vw"
                className="h-full w-full"
              />
            </ImageReveal>
            <figcaption className="label mt-3 text-sage-light">{dict.story.imageCaption}</figcaption>
          </figure>
          <FadeIn className="flex flex-col gap-5 text-lead text-cream">
            {dict.story.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </FadeIn>
        </div>
      </div>

      <ul className="label mt-24 grid grid-cols-1 border-line border-y text-cream-light sm:grid-cols-3 md:mt-32">
        {dict.story.stats.map((s) => (
          <li
            key={s}
            className="flex items-center justify-between gap-4 border-line py-5 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0 sm:px-6 sm:first:pl-0"
          >
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
