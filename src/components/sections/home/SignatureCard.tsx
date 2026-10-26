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
    <article
      className="relative flex w-full flex-col pt-[calc(var(--num)*0.82)]"
      data-testid="signature-card"
    >
      <span
        aria-hidden="true"
        className="index-outline pointer-events-none absolute top-0 -left-[0.04em] text-[length:var(--num)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <TransitionLink href={`${routes.menu}#${item.id}`} className="block" aria-label={item.name[lang]}>
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
      <div className="mt-4 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-rule border-t pt-3">
        <h3 className="display text-title text-fg">{item.name[lang]}</h3>
        <p className="label tabular text-accent">
          {item.price !== null ? formatPrice(item.price, lang) : priceTbd}
          {item.priceNote && <span className="text-muted"> · {item.priceNote[lang]}</span>}
        </p>
        {item.description[lang] && <p className="col-span-2 mt-2 text-muted">{item.description[lang]}</p>}
      </div>
    </article>
  );
}
