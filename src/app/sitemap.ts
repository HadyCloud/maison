import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { routes } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-10-20"),
  }));
}
