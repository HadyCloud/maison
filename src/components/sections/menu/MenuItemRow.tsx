import type { MenuItem } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { thumbSrc } from "@/lib/media";

/**
 * Typographic row — no card. Server-rendered; the hover preview and photo sheet attach by delegation
 * through `data-preview` / `data-sheet`, so the list ships no per-row JavaScript.
 */
export function MenuItemRow({ item, dict }: { item: MenuItem; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const photoId = item.photoIds[0];
  const tags = item.tags.map((t) => dict.menuPage.tagShort[t]);
  return (
    <li
      id={item.id}
      data-preview={photoId}
      data-testid="menu-item"
      className="group grid grid-cols-[1fr_auto] gap-x-6 border-graphite-700 border-b py-6 lg:gap-x-10"
    >
      <div className="min-w-0">
        <h3 className="display text-dish text-silver-100">
          {item.name[lang]}
          {item.pieces && (
            <span className="label ml-3 align-middle text-graphite-400">
              {item.pieces} {dict.menuPage.pieces}
            </span>
          )}
        </h3>
        <p lang="ar" dir="rtl" className="mt-1 text-left text-base text-silver-300">
          {item.name.ar}
        </p>
        {item.description[lang] && (
          <p className="mt-2 max-w-[52ch] text-silver-300">{item.description[lang]}</p>
        )}
        {(tags.length > 0 || photoId) && (
          <p className="label mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.625rem] text-graphite-400">
            {item.tags.map((t) => (
              <abbr key={t} title={dict.menuPage.tags[t]} className="no-underline">
                {dict.menuPage.tagShort[t]}
              </abbr>
            ))}
            {photoId && (
              <button
                type="button"
                data-sheet={photoId}
                data-sheet-title={item.name[lang]}
                className="hidden min-h-6 items-center gap-1.5 text-silver-200 uppercase tracking-[inherit] transition-colors hover:text-silver-100 lg:inline-flex"
                aria-label={`${dict.a11y.photoOf} ${item.name[lang]}`}
              >
                <span aria-hidden="true">◉</span> {dict.menuPage.photo}
              </button>
            )}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-3">
        <p className="label tabular whitespace-nowrap pt-2 text-right text-[0.75rem] text-silver-200">
          {item.price !== null ? formatPrice(item.price, lang) : dict.menuPage.priceTbd}
          {item.priceNote && (
            <span className="block text-[0.625rem] text-graphite-400">{item.priceNote[lang]}</span>
          )}
        </p>
        {photoId && (
          <button
            type="button"
            data-sheet={photoId}
            data-sheet-title={item.name[lang]}
            aria-label={`${dict.a11y.photoOf} ${item.name[lang]}`}
            className="block size-14 overflow-hidden bg-graphite-800 lg:hidden"
          >
            <picture>
              <source type="image/avif" srcSet={thumbSrc(photoId, "avif")} />
              <img
                src={thumbSrc(photoId, "webp")}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="size-14 object-cover"
              />
            </picture>
          </button>
        )}
      </div>
    </li>
  );
}
