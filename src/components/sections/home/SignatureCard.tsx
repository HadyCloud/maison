import { ImageReveal } from "@/components/motion/ImageReveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Picture } from "@/components/ui/Picture";
import type { MenuItem } from "@/content/menu-schema";
import { photoById } from "@/content/photo-map";
import { type Lang, routes } from "@/i18n";
import { formatPrice } from "@/lib/format";

export function SignatureCard({
  item,
  index,
  lang,
  priceTbd,
}: {
  item: MenuItem;
  index: number;
  lang: Lang;
  priceTbd: string;
}) {
  const photoId = item.photoIds[0];
  const photo = photoId ? photoById(photoId) : undefined;
  return (
    <article className="relative flex w-full flex-col" data-testid="signature-card">
      <span
        aria-hidden="true"
        className="index-outline pointer-events-none absolute -top-[0.42em] -left-[0.08em] z-10 text-[clamp(5.5rem,9vw,9rem)] mix-blend-difference [-webkit-text-stroke-color:var(--color-silver-200)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <TransitionLink href={`${routes.menu[lang]}#${item.id}`} className="block" aria-label={item.name[lang]}>
        <ImageReveal className="aspect-[4/5] w-full" delay={0.05 * index}>
          <Picture
            id={photoId}
            alt={photo?.alt[lang] ?? item.name[lang]}
            placeholder={item.name.fr}
            sizes="(min-width: 1024px) 30vw, 92vw"
            className="h-full w-full"
            imgClassName="transition-transform duration-[1400ms] ease-house hover:scale-[1.03]"
          />
        </ImageReveal>
      </TransitionLink>
      <div className="mt-6 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-graphite-700 border-t pt-4">
        <h3 className="display text-title text-silver-100">{item.name[lang]}</h3>
        <p className="label tabular text-silver-200">
          {item.price !== null ? formatPrice(item.price, lang) : priceTbd}
          {item.priceNote && <span className="text-graphite-400"> · {item.priceNote[lang]}</span>}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="col-span-2 text-left text-lg text-silver-300"
          style={{ textAlign: "left" }}
        >
          {item.name.ar}
        </p>
        {item.description[lang] && (
          <p className="col-span-2 mt-2 text-silver-300">{item.description[lang]}</p>
        )}
      </div>
    </article>
  );
}
