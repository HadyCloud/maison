import type { MenuCategory } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { MenuItemRow } from "./MenuItemRow";

export function MenuSection({ category, dict }: { category: MenuCategory; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-40 pt-14 first:pt-12"
    >
      <header className="flex items-end justify-between gap-6 border-fg/30 border-b pb-5">
        <h2 id={`${category.id}-title`} className="display text-title text-fg">
          {category.title[lang]}
        </h2>
      </header>
      {category.note && <p className="label mt-4 text-muted">{category.note[lang]}</p>}
      <ul>
        {category.items.map((item) => (
          <MenuItemRow key={item.id} item={item} dict={dict} />
        ))}
      </ul>
    </section>
  );
}
