import { Arcade } from "@/components/ui/Arcade";
import type { MenuCategory } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { MenuItemRow } from "./MenuItemRow";

export function MenuSection({ category, dict }: { category: MenuCategory; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-40 pt-12 first:pt-10 md:pt-14 md:first:pt-12"
    >
      <header className="relative flex items-center justify-between gap-6 border-fg/30 border-b pb-5 max-md:-mx-[var(--gutter)] max-md:rounded-none max-md:border-0 max-md:bg-forest max-md:px-[var(--gutter)] max-md:py-4 max-md:text-paper md:items-end">
        <Arcade className="text-forest md:hidden" />
        <h2 id={`${category.id}-title`} className="display text-title text-fg max-md:text-paper">
          {category.title[lang]}
        </h2>
        <span
          aria-hidden="true"
          className="label rounded-full bg-wood-light px-3 py-1 text-[0.65rem] text-wood-dark tabular md:hidden"
        >
          {category.items.length}
        </span>
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
