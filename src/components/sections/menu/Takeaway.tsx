import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/config/site";
import type { MenuCategory } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { formatPrice } from "@/lib/format";

/** Understated takeaway block, kept apart from the dine-in carte. */
export function Takeaway({ category, dict }: { category: MenuCategory; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="theme-wood wood-grain mt-24 bg-surface p-6 text-fg md:p-10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id={`${category.id}-title`} className="label text-accent">
            {category.title[lang]}
          </h2>
          <p className="mt-3 max-w-md text-fg">{dict.menuPage.takeawayIntro}</p>
        </div>
        <ButtonLink href={site.delivery.deliveroo} variant="outline">
          {dict.menuPage.deliveroo} ↗
        </ButtonLink>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {category.items.map((item) => (
          <li
            key={item.id}
            id={item.id}
            className="flex items-baseline justify-between gap-4 border-rule border-b py-3"
          >
            <span className="text-fg">{item.name[lang]}</span>
            <span className="label tabular text-muted">
              {item.price !== null ? formatPrice(item.price, lang) : dict.menuPage.priceTbd}
            </span>
          </li>
        ))}
      </ul>
      {category.note && <p className="label mt-5 text-muted">{category.note[lang]}</p>}
    </section>
  );
}
