import { CARTE_SIZES, carteSrc, carteSrcSet, hasCartePhoto } from "@/content/carte-photos";
import type { MenuItem } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { cn, formatPrice } from "@/lib/format";
import { MenuPhoto } from "./MenuPhoto";

/** One dish: name and price on the first line, description, tags. A small photo on the left when the shoot has one. */
export function MenuItemRow({ item, dict }: { item: MenuItem; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const hasPhoto = hasCartePhoto(item.id);
  const priceText = item.price !== null ? formatPrice(item.price, lang) : dict.menuPage.priceTbd;
  const words = item.name[lang].split(" ");
  const last = words.pop();
  const lead = words.length ? `${words.join(" ")} ` : "";
  return (
    <li
      id={item.id}
      data-testid="menu-item"
      className={cn(
        "grid grid-cols-[1fr_4rem] gap-x-5 border-rule border-b py-5 sm:grid-cols-[1fr_5rem] sm:gap-x-6",
        "lg:min-h-[12.1rem] lg:items-center lg:gap-x-7 lg:rounded-[1.5rem] lg:border-0 lg:bg-paper-deep/60 lg:p-5",
        hasPhoto ? "lg:grid-cols-[9.35rem_1fr]" : "lg:grid-cols-1",
      )}
    >
      <div className="min-w-0 lg:order-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-dish text-fg lg:text-[1.65rem]">
            {lead}
            <span className="whitespace-nowrap">{last}</span>
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
            {priceText}
            {item.priceNote && <span className="ml-2 text-muted">{item.priceNote[lang]}</span>}
          </p>
        </div>
        {item.description[lang] && (
          <p className="mt-2 max-w-[56ch] text-fg/85 lg:text-lg">{item.description[lang]}</p>
        )}
      </div>
      {hasPhoto && (
        <MenuPhoto
          itemId={item.id}
          name={item.name[lang]}
          description={item.description[lang]}
          price={item.priceNote ? `${priceText} ${item.priceNote[lang]}` : priceText}
          enlargeLabel={dict.menuPage.enlargePhoto}
          closeLabel={dict.menuPage.closePhoto}
          className="size-16 self-start rounded-xl sm:size-20 lg:order-1 lg:size-[9.35rem] lg:self-center"
        >
          <picture className="block size-full">
            <source type="image/avif" srcSet={carteSrcSet(item.id, "avif")} sizes={CARTE_SIZES} />
            <img
              src={carteSrc(item.id)}
              srcSet={carteSrcSet(item.id, "webp")}
              sizes={CARTE_SIZES}
              alt=""
              width={480}
              height={480}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
          </picture>
        </MenuPhoto>
      )}
    </li>
  );
}
