import type { MenuItem } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { cn, formatPrice } from "@/lib/format";
import { thumbSrc } from "@/lib/media";

/** One dish: name and price on the first line, description, tags. A small photo on the right when mapped. */
export function MenuItemRow({ item, dict }: { item: MenuItem; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const photoId = item.photoIds[0];
  const words = item.name[lang].split(" ");
  const last = words.pop();
  const lead = words.length ? `${words.join(" ")} ` : "";
  const leaf = item.tags.includes("VG")
    ? dict.menuPage.tags.VG
    : item.tags.includes("V")
      ? dict.menuPage.tags.V
      : null;
  return (
    <li
      id={item.id}
      data-testid="menu-item"
      className={cn(
        "grid grid-cols-[1fr_4rem] gap-x-5 border-rule border-b py-5 sm:grid-cols-[1fr_5rem] sm:gap-x-6",
        "lg:min-h-[12.1rem] lg:items-center lg:gap-x-7 lg:rounded-[1.5rem] lg:border-0 lg:bg-paper-deep/60 lg:p-5",
        photoId ? "lg:grid-cols-[9.35rem_1fr]" : "lg:grid-cols-1",
      )}
    >
      <div className="min-w-0 lg:order-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-dish text-fg lg:text-[1.65rem]">
            {lead}
            <span className="whitespace-nowrap">
              {last}
              {leaf && (
                <svg
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label={leaf}
                  className="ml-2 inline-block size-[0.75em] -translate-y-[0.1em] fill-[#5f8f2f]"
                >
                  <title>{leaf}</title>
                  <path d="M20.5 3.5C11 3 4.5 7.8 4.5 15c0 1.3.3 2.4.8 3.4C3.9 19.600 3 20.900 3 20.900l1.500.9s.9-1.200 2.100-2.200c1 .5 2.100.8 3.400.8 7.200 0 11-6.500 10.500-16.900ZM8 17.500c1.200-3.800 4.500-7.100 8.500-8.700-3.100 2.100-5.600 4.900-7 8.800L8 17.500Z" />
                </svg>
              )}
            </span>
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
        <picture className="block size-16 self-start overflow-hidden rounded-xl bg-paper-deep sm:size-20 lg:order-1 lg:size-[9.35rem] lg:self-center">
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
