import { Arcade } from "@/components/ui/Arcade";
import { Emphasis } from "@/components/ui/Emphasis";
import { JsonLd } from "@/components/ui/JsonLd";
import { dineInCategories, menu, takeawayCategories } from "@/content/menu";
import type { Dictionary, Lang } from "@/i18n";
import { menuJsonLd } from "@/lib/menu-jsonld";
import { MenuSection } from "./MenuSection";
import { MenuTabs } from "./MenuTabs";
import { Takeaway } from "./Takeaway";

export function MenuPage({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const tabs = [...dineInCategories, ...takeawayCategories].map((c) => ({ id: c.id, title: c.title[lang] }));

  return (
    <>
      <header className="theme-forest bg-surface pt-[calc(var(--header-h)+clamp(1.5rem,4vh,2.5rem))] pb-12 md:pb-14">
        <div className="container-x mx-auto max-w-6xl md:text-center">
          <h1 className="display text-display text-fg">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rise [animation-delay:120ms]">
                <Emphasis text={dict.menuPage.title} />
              </span>
            </span>
          </h1>
        </div>
      </header>

      <div className="theme-paper relative bg-surface pb-24">
        <Arcade className="text-paper" />
        <MenuTabs tabs={tabs} label={dict.a11y.categories} />
        <div id="menu-list">
          {dineInCategories.map((c) => (
            <MenuSection key={c.id} category={c} dict={dict} />
          ))}
          <div className="container-x mx-auto max-w-6xl">
            {takeawayCategories.map((c) => (
              <Takeaway key={c.id} category={c} dict={dict} />
            ))}
            <p id="allergenes" className="label mt-12 text-muted md:text-center">
              {dict.menuPage.allergens}
            </p>
          </div>
        </div>
      </div>

      <JsonLd data={menuJsonLd(menu, lang)} />
    </>
  );
}
