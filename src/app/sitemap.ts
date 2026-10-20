import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { routes } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).flatMap((pair) =>
    (["fr", "en"] as const).map((lang) => ({
      url: `${SITE_URL}${pair[lang]}`,
      lastModified: new Date("2026-10-20"),
      alternates: { languages: { fr: `${SITE_URL}${pair.fr}`, en: `${SITE_URL}${pair.en}` } },
    })),
  );
}
