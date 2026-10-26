import { Arcade } from "@/components/ui/Arcade";
import type { MenuCategory } from "@/content/menu-schema";
import type { Dictionary, Lang } from "@/i18n";
import { MenuItemRow } from "./MenuItemRow";

/** A category: a full-width creamy-green band with the arcade edge, then its dishes in a centred column. */
export function MenuSection({ category, dict }: { category: MenuCategory; dict: Dictionary }) {
  const lang = dict.lang as Lang;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-40 pt-12 first:pt-8 md:pt-16 md:first:pt-12"
    >
      <header className="relative bg-[#d6b88e] text-wood-dark md:bg-[#dde3c9] md:text-forest">
        <Arcade className="text-[#d6b88e] md:text-[#dde3c9]" />
        <div className="container-x mx-auto max-w-6xl py-4 md:py-5 md:text-center">
          <h2 id={`${category.id}-title`} className="display text-title">
            {category.title[lang]}
          </h2>
        </div>
      </header>
      <div className="container-x mx-auto max-w-6xl">
        {category.note && <p className="label mt-4 text-muted md:text-center">{category.note[lang]}</p>}
        <ul>
          {category.items.map((item) => (
            <MenuItemRow key={item.id} item={item} dict={dict} />
          ))}
        </ul>
      </div>
    </section>
  );
}
