import type { MenuCategory } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { MenuItemRow } from "./MenuItemRow";

export function MenuSection({ category, dict }: { category: MenuCategory; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      data-spy
      className="scroll-mt-36 pt-16 first:pt-0"
    >
      <header className="flex items-end justify-between gap-6 border-silver-100/30 border-b pb-5">
        <h2 id={`${category.id}-title`} className="display text-title text-silver-100">
          {category.title[lang]}
        </h2>
      </header>
      {category.note && <p className="label mt-4 text-graphite-400">{category.note[lang]}</p>}
      <ul>
        {category.items.map((item) => (
          <MenuItemRow key={item.id} item={item} dict={dict} />
        ))}
      </ul>
    </section>
  );
}
