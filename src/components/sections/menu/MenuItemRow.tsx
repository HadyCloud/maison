import type { MenuItem } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { thumbSrc } from "@/lib/media";

/** One dish: name and price on the first line, description, tags. A small photo on the right when mapped. */
export function MenuItemRow({ item, dict }: { item: MenuItem; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const photoId = item.photoIds[0];
  return (
    <li
      id={item.id}
      data-testid="menu-item"
      className="grid grid-cols-[1fr_4rem] gap-x-5 border-rule border-b py-5 sm:grid-cols-[1fr_5rem] sm:gap-x-6"
    >
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-dish text-fg">
            {item.name[lang]}
            {item.pieces && (
              <span className="label ml-3 align-middle text-muted">
                {item.pieces} {dict.menuPage.pieces}
              </span>
            )}
          </h3>
          <p className="label tabular whitespace-nowrap text-accent">
            {item.price !== null ? formatPrice(item.price, lang) : dict.menuPage.priceTbd}
            {item.priceNote && <span className="ml-2 text-muted">{item.priceNote[lang]}</span>}
          </p>
        </div>
        {item.description[lang] && <p className="mt-2 max-w-[56ch] text-fg/85">{item.description[lang]}</p>}
        {item.tags.length > 0 && (
          <p className="label mt-2 flex flex-wrap gap-x-3 text-[0.625rem] text-muted">
            {item.tags.map((t) => (
              <abbr key={t} title={dict.menuPage.tags[t]} className="no-underline">
                {dict.menuPage.tagShort[t]}
              </abbr>
            ))}
          </p>
        )}
      </div>
      {photoId && (
        <picture className="block size-16 self-start overflow-hidden bg-paper-deep sm:size-20">
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
