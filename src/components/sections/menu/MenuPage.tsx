import { Arcade } from "@/components/ui/Arcade";
import { Emphasis } from "@/components/ui/Emphasis";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ornament } from "@/components/ui/Ornament";
import { dineInCategories, menu, takeawayCategories } from "@/content/menu";
import type { Dictionary, Lang } from "@/i18n";
import { formatDate } from "@/lib/format";
import { menuJsonLd } from "@/lib/menu-jsonld";
import { MenuSection } from "./MenuSection";
import { MenuTabs } from "./MenuTabs";
import { Takeaway } from "./Takeaway";

export function MenuPage({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const tabs = [...dineInCategories, ...takeawayCategories].map((c) => ({ id: c.id, title: c.title[lang] }));
  const unconfirmed = menu.categories.some((c) => c.items.some((i) => !i.priceConfirmed));

  return (
    <>
      <header className="theme-forest bg-surface pt-[calc(var(--header-h)+clamp(3rem,8vh,6rem))] pb-24">
        <div className="container-x mx-auto max-w-3xl">
          <h1 className="display text-display text-fg">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rise [animation-delay:120ms]">
                <Emphasis text={dict.menuPage.title} />
              </span>
            </span>
          </h1>
          <Ornament className="mt-6" />
          <p className="label mt-6 text-fg">
            {dict.menuPage.meta} {formatDate(menu.updatedAt)}
          </p>
          {unconfirmed && <p className="label mt-2 text-accent">{dict.menuPage.priceDisclaimer}</p>}
        </div>
      </header>

      <div className="theme-paper relative bg-surface pb-24">
        <Arcade className="text-paper" />
        <MenuTabs tabs={tabs} label={dict.a11y.categories} />
        <div id="menu-list" className="container-x mx-auto max-w-3xl">
          {dineInCategories.map((c) => (
            <MenuSection key={c.id} category={c} dict={dict} />
          ))}
          {takeawayCategories.map((c) => (
            <Takeaway key={c.id} category={c} dict={dict} />
          ))}
          <p id="allergenes" className="label mt-12 text-muted">
            {dict.menuPage.allergens}
          </p>
        </div>
      </div>

      <JsonLd data={menuJsonLd(menu, lang)} />
    </>
  );
}
