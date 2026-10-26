"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Picture } from "@/components/ui/Picture";
import type { MenuItem } from "@/content/menu-schema";
import { photoById } from "@/content/photo-map";
import { type Lang, routes } from "@/i18n";
import { cn, formatPrice } from "@/lib/format";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/** Desktop only (≥1024px): one block of tall panels; hovering or focusing one widens it to show the full photo and text. */
export function SignaturesAccordion({
  items,
  lang,
  priceTbd,
  cta,
}: {
  items: MenuItem[];
  lang: Lang;
  priceTbd: string;
  cta: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="container-x hidden pt-10 pb-24 lg:block">
      <div className="mx-auto flex h-[clamp(26rem,56svh,35rem)] max-w-[70rem] overflow-hidden rounded-[1.75rem]">
        {items.map((item, i) => {
          const photoId = item.photoIds[0];
          const photo = photoId ? photoById(photoId) : undefined;
          const open = i === active;
          const name = item.name[lang];
          return (
            <article
              key={item.id}
              data-testid="signature-card"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "relative min-w-0 overflow-hidden text-paper transition-[flex-grow] duration-700 ease-house",
                open ? "grow-[5]" : "grow-[1]",
              )}
              style={{ flexBasis: 0 }}
            >
              <TransitionLink
                href={`${routes.menu}#${item.id}`}
                className="absolute inset-0 block"
                aria-label={name}
              >
                <Picture
                  id={photoId}
                  alt={photo?.alt[lang] ?? name}
                  placeholder={item.name.fr}
                  sizes="60vw"
                  eager
                  className="absolute inset-0 h-full w-full"
                  imgClassName={cn(
                    "transition-transform duration-[1400ms] ease-house",
                    open && "scale-[1.03]",
                  )}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30"
                />
                <span
                  aria-hidden="true"
                  className="label absolute top-5 left-1/2 -translate-x-1/2 text-accent"
                >
                  {ROMAN[i]}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "display absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 text-title whitespace-nowrap [writing-mode:vertical-rl] transition-opacity duration-500",
                    open ? "opacity-0" : "opacity-100 delay-300",
                  )}
                >
                  {name}
                </span>
                <span
                  className={cn(
                    "absolute right-8 bottom-8 left-8 flex flex-col gap-2 transition-all duration-500",
                    open
                      ? "translate-y-0 opacity-100 delay-300"
                      : "pointer-events-none translate-y-3 opacity-0",
                  )}
                >
                  <span className="display text-headline">{name}</span>
                  <span className="label tabular text-accent">
                    {item.price !== null ? formatPrice(item.price, lang) : priceTbd}
                    {item.priceNote && <span className="text-paper/70"> · {item.priceNote[lang]}</span>}
                  </span>
                  {item.description[lang] && (
                    <span className="max-w-[36ch] text-paper/85">{item.description[lang]}</span>
                  )}
                  <span className="label mt-2">{cta} →</span>
                </span>
              </TransitionLink>
            </article>
          );
        })}
      </div>
    </div>
  );
}
