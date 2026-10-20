import { SITE_URL } from "@/config/site";
import type { Menu } from "@/content/menu-schema";
import { type Lang, routes } from "@/i18n";

export function menuJsonLd(menu: Menu, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}${routes.menu[lang]}#menu`,
    name: lang === "fr" ? "La Carte de Maison L" : "The Maison L menu",
    inLanguage: lang,
    url: `${SITE_URL}${routes.menu[lang]}`,
    hasMenuSection: menu.categories.map((c) => ({
      "@type": "MenuSection",
      name: c.title[lang],
      hasMenuItem: c.items.map((i) => ({
        "@type": "MenuItem",
        name: i.name[lang],
        ...(i.description[lang] ? { description: i.description[lang] } : {}),
        ...(i.tags.includes("VG")
          ? { suitableForDiet: "https://schema.org/VeganDiet" }
          : i.tags.includes("V")
            ? { suitableForDiet: "https://schema.org/VegetarianDiet" }
            : {}),
        ...(i.price !== null
          ? { offers: { "@type": "Offer", price: i.price.toFixed(2), priceCurrency: "EUR" } }
          : {}),
      })),
    })),
  };
}
