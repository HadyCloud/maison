import type { Metadata } from "next";
import { SITE_URL, site } from "@/config/site";
import { type Lang, type RouteKey, routes } from "@/i18n";

export function pageMetadata(opts: {
  lang: Lang;
  route: RouteKey;
  title: string;
  description: string;
}): Metadata {
  const pair = routes[opts.route];
  return {
    metadataBase: new URL(SITE_URL),
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: pair[opts.lang],
      languages: { fr: pair.fr, en: pair.en, "x-default": pair.fr },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: opts.title,
      description: opts.description,
      url: pair[opts.lang],
      locale: opts.lang === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: opts.lang === "fr" ? "en_GB" : "fr_FR",
      images: [
        { url: "/og.jpg", width: 1200, height: 630, alt: "Maison L, cuisine authentique libanaise, Lille" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ["/og.jpg"],
    },
    icons: { icon: "/icon.svg" },
    formatDetection: { telephone: false },
  };
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

/** Restaurant JSON-LD. No aggregateRating: self-serving review markup is against Google's guidelines. */
export function restaurantJsonLd(lang: Lang) {
  const openingHoursSpecification = Object.entries(site.hours.week).flatMap(([day, windows]) =>
    windows.map((w) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAY_NAMES[Number(day)]}`,
      opens: w.open,
      closes: w.close,
    })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: site.name,
    url: `${SITE_URL}${routes.home[lang]}`,
    image: [`${SITE_URL}/og.jpg`, `${SITE_URL}/images/salle-1600.webp`],
    telephone: site.phone.primary.value,
    servesCuisine: "Lebanese",
    priceRange: "€€",
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode.value,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    hasMap: site.google.mapsUrl,
    openingHoursSpecification,
    menu: `${SITE_URL}${routes.menu[lang]}`,
    hasMenu: `${SITE_URL}${routes.menu[lang]}`,
    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok].filter(Boolean),
    paymentAccepted: "Ticket Restaurant",
  };
}
