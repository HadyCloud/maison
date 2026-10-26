"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Picture } from "@/components/ui/Picture";
import type { MenuItem } from "@/content/menu-schema";
import { photoById } from "@/content/photo-map";
import { type Lang, routes } from "@/i18n";
import { cn, formatPrice } from "@/lib/format";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * Phones and tablets (<1024px): the five dishes become one rounded block of stacked strips that fits the screen.
 * Tap a strip and it opens downward to the full photo, name, price and a link; the others fold back to slim bands.
 * Desktop uses the hover version, SignaturesAccordion.
 */
export function SignaturesStack({
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
    <div className="container-x pt-6 lg:hidden">
      <div className="mx-auto flex h-[clamp(28rem,74svh,38rem)] max-w-2xl flex-col overflow-hidden rounded-[1.5rem]">
        {items.map((item, i) => {
          const photoId = item.photoIds[0];
          const photo = photoId ? photoById(photoId) : undefined;
          const open = i === active;
          const name = item.name[lang];
          return (
            <article
              key={item.id}
              data-testid="signature-card"
              className={cn(
                "relative min-h-0 overflow-hidden border-paper/20 border-t text-paper transition-[flex-grow] duration-700 ease-house first:border-t-0",
                open ? "grow-[8]" : "grow-[1]",
              )}
              style={{ flexBasis: 0 }}
            >
              <Picture
                id={photoId}
                alt={photo?.alt[lang] ?? name}
                placeholder={item.name.fr}
                sizes="(min-width: 768px) 672px, 100vw"
                eager
                className="absolute inset-0 h-full w-full"
                imgClassName={cn("transition-transform duration-[1400ms] ease-house", open && "scale-[1.04]")}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 transition-colors duration-700",
                  open ? "bg-gradient-to-t from-black/85 via-black/10 to-black/25" : "bg-black/55",
                )}
              />
              {/* Slim band: numeral + name, always at the top of the strip. */}
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActive(i)}
                className="absolute inset-x-0 top-0 z-10 flex h-12 [text-shadow:0_1px_8px_rgb(0_0_0/0.65)] items-center gap-3 px-5 text-left"
              >
                <span className="label w-6 shrink-0 text-accent">{ROMAN[i]}</span>
                <span
                  className={cn(
                    "display text-title transition-opacity duration-500",
                    open ? "opacity-0" : "opacity-100 delay-200",
                  )}
                >
                  {name}
                </span>
              </button>
              <div
                className={cn(
                  "absolute right-5 bottom-5 left-5 flex flex-col gap-1.5 [text-shadow:0_1px_10px_rgb(0_0_0/0.65)] transition-all duration-500",
                  open
                    ? "translate-y-0 opacity-100 delay-300"
                    : "pointer-events-none translate-y-3 opacity-0",
                )}
                aria-hidden={!open}
              >
                <span className="display text-headline">{name}</span>
                <span className="label tabular text-accent">
                  {item.price !== null ? formatPrice(item.price, lang) : priceTbd}
                  {item.priceNote && <span className="text-paper/70"> · {item.priceNote[lang]}</span>}
                </span>
                {item.description[lang] && (
                  <span className="line-clamp-2 text-paper/85">{item.description[lang]}</span>
                )}
                <TransitionLink
                  href={`${routes.menu}#${item.id}`}
                  tabIndex={open ? 0 : -1}
                  className="label mt-1 inline-flex min-h-11 items-center self-start"
                >
                  {cta} →
                </TransitionLink>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
