import { Emphasis } from "@/components/ui/Emphasis";
import { JsonLd } from "@/components/ui/JsonLd";
import { dineInCategories, menu, takeawayCategories } from "@/content/menu";
import { photoById } from "@/content/photo-map";
import type { Dictionary, Lang } from "@/i18n";
import { formatDate } from "@/lib/format";
import { getImage } from "@/lib/media";
import { menuJsonLd } from "@/lib/menu-jsonld";
import type { PreviewImage } from "./HoverPreview";
import { MenuEnhancers } from "./MenuEnhancers";
import { MenuChips, MenuIndex } from "./MenuIndex";
import { MenuSection } from "./MenuSection";
import { Takeaway } from "./Takeaway";

function previewImages(lang: Lang) {
  const out: Record<string, PreviewImage & { large: string; largeAvif: string }> = {};
  for (const id of new Set(menu.categories.flatMap((c) => c.items.flatMap((i) => i.photoIds)))) {
    const img = getImage(id);
    if (!img) continue;
    const large = img.widths.find((w) => w >= 960) ?? img.widths.at(-1);
    out[id] = {
      avif: `/images/${id}-480.avif`,
      webp: `/images/${id}-480.webp`,
      large: `/images/${id}-${large}.webp`,
      largeAvif: `/images/${id}-${large}.avif`,
      alt: photoById(id)?.alt[lang] ?? "",
    };
  }
  return out;
}

export function MenuPage({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const entries = [...dineInCategories, ...takeawayCategories].map((c) => ({
    id: c.id,
    title: c.title[lang],
  }));
  const images = previewImages(lang);
  const unconfirmed = menu.categories.some((c) => c.items.some((i) => !i.priceConfirmed));

  return (
    <>
      <section className="container-x pt-[calc(var(--header-h)+clamp(4rem,12vh,9rem))] pb-14 md:pb-20">
        <h1 className="display text-display text-silver-100">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="rise [animation-delay:120ms]">
              <Emphasis text={dict.menuPage.title} />
            </span>
          </span>
        </h1>
        <div className="mt-8 flex flex-col gap-2 border-graphite-700 border-t pt-4 md:flex-row md:items-center md:justify-between">
          <p className="label text-silver-200">
            {dict.menuPage.meta} {formatDate(menu.updatedAt)}
          </p>
          {unconfirmed && <p className="label text-graphite-400">{dict.menuPage.priceDisclaimer}</p>}
        </div>
      </section>

      <div className="container-x grid-12 pb-24">
        <MenuChips entries={entries} label={dict.a11y.categories} />
        <aside className="col-span-3 hidden lg:block">
          <MenuIndex entries={entries} label={dict.a11y.categories} />
        </aside>
        <div id="menu-list" className="col-span-12 pt-8 lg:col-span-8 lg:col-start-5 lg:pt-0">
          {dineInCategories.map((c) => (
            <MenuSection key={c.id} category={c} dict={dict} />
          ))}
          {takeawayCategories.map((c) => (
            <Takeaway key={c.id} category={c} dict={dict} />
          ))}
          <p id="allergenes" className="label mt-12 text-silver-300">
            {dict.menuPage.allergens}
          </p>
        </div>
      </div>

      <MenuEnhancers images={images} closeLabel={dict.a11y.closePhoto} />
      <JsonLd data={menuJsonLd(menu, lang)} />
    </>
  );
}
