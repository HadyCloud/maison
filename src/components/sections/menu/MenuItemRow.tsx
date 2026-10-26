import type { MenuItem } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { cn, formatPrice } from "@/lib/format";
import { thumbSrc } from "@/lib/media";

/** One dish: name and price on the first line, description, tags. A small photo on the right when mapped. */
export function MenuItemRow({ item, dict }: { item: MenuItem; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const photoId = item.photoIds[0];
  return (
    <li
      id={item.id}
      data-testid="menu-item"
      className={cn(
        "grid grid-cols-[1fr_4rem] gap-x-5 border-rule border-b py-5 sm:grid-cols-[1fr_5rem] sm:gap-x-6",
        "lg:items-center lg:gap-x-6 lg:rounded-[1.5rem] lg:border-0 lg:bg-paper-deep/60 lg:p-5",
        photoId ? "lg:grid-cols-[8.5rem_1fr]" : "lg:grid-cols-1",
      )}
    >
      <div className="min-w-0 lg:order-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-dish text-fg lg:text-[1.65rem]">
            {item.name[lang]}
            {item.pieces && (
              <span className="label ml-3 align-middle text-muted">
                {item.pieces} {dict.menuPage.pieces}
              </span>
            )}
          </h3>
          <span
            aria-hidden="true"
            className="hidden flex-1 -translate-y-1.5 self-end border-fg/25 border-b border-dotted lg:block"
          />
          <p className="label tabular whitespace-nowrap rounded-full bg-paper-deep px-2.5 py-0.5 text-wood-ink lg:bg-forest lg:px-4 lg:py-1.5 lg:text-base lg:text-paper">
            {item.price !== null ? formatPrice(item.price, lang) : dict.menuPage.priceTbd}
            {item.priceNote && <span className="ml-2 text-muted">{item.priceNote[lang]}</span>}
          </p>
        </div>
        {item.description[lang] && (
          <p className="mt-2 max-w-[56ch] text-fg/85 lg:text-lg">{item.description[lang]}</p>
        )}
      </div>
      {photoId && (
        <picture className="block size-16 self-start overflow-hidden rounded-xl bg-paper-deep sm:size-20 lg:order-1 lg:size-[8.5rem] lg:self-center">
          <source type="image/avif" srcSet={thumbSrc(photoId, "avif")} />
          <img
            src={thumbSrc(photoId, "webp")}
            alt=""
            width={160}
            height={160}
            loading="lazy"
            className="size-full object-cover"
          />
        </picture>
      )}
    </li>
  );
}
