/**
 * Single source of truth for every fact about the restaurant.
 * Each uncertain field carries `confirmed: false` — see docs/CONTENT_TO_CONFIRM.md.
 * Never add a fact here that has not been verified or flagged.
 */

export type Checked<T> = {
  readonly value: T;
  readonly confirmed: boolean;
  readonly source: string;
  readonly note?: string;
};

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday (JS convention)

/** "HH:MM" 24h. A close time ≤ open time means "after midnight". */
export type ServiceWindow = { readonly open: string; readonly close: string };

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maison-l.fr";

export const site = {
  name: "Maison L",
  legalTradeName: "Maison Libanaise",
  /** "L" stands for Libanaise — the only meaning we may use. */
  wordmarkMeaning: "Libanaise",
  timeZone: "Europe/Paris",

  story: {
    founders: ["Jalal", "Layal"] as const,
    yearsInDubai: 20,
    openedYear: 2023,
    confirmed: true,
    source: "maison-l.eatbu.com (texte « Notre histoire »)",
  },

  chef: {
    name: "Jalal",
    role: { fr: "Chef & fondateur", en: "Chef & founder" },
    confirmed: true,
  },

  address: {
    street: "324 rue Léon Gambetta",
    postalCode: {
      value: "59000",
      confirmed: true,
      source: "Imprint eatbu, Le Bonbon, PagesJaunes",
      note: "Privateaser affiche 59260 (code d'Hellemmes), erreur probable de leur côté.",
    } satisfies Checked<string>,
    city: "Lille",
    neighbourhood: "Wazemmes · Gambetta",
    country: "FR",
    metro: "Métro M1 · Gambetta",
    geo: { lat: 50.6274298, lng: 3.0493908 },
  },

  google: {
    placeId: "ChIJ_Wa7_mTVwkcRiQO4re17a6M",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ_Wa7_mTVwkcRiQO4re17a6M",
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ_Wa7_mTVwkcRiQO4re17a6M",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Maison+L+Lille&destination_place_id=ChIJ_Wa7_mTVwkcRiQO4re17a6M",
    rating: {
      value: { score: 4.8, count: 826 },
      confirmed: false,
      lastChecked: "2026-10-20",
      source: "Instantané agrégateur fourni dans le brief. Fiche Google non lisible automatiquement",
    },
  },

  phone: {
    primary: {
      value: "+33955316701",
      display: "09 55 31 67 01",
      confirmed: false,
      source: "Fiche Google + PagesJaunes",
    },
    secondary: {
      value: "+33766161619",
      display: "07 66 16 16 19",
      confirmed: false,
      source: "maison-l.eatbu.com (bouton Réserver + imprint)",
    },
  },

  /** Not confirmed for publication: hidden everywhere while null. */
  email: null as string | null,

  /**
   * Opening hours per weekday (0 = Sunday). Google listing values.
   * Conflicts: PagesJaunes (lundi fermé, soir 18h–22h), Privateaser (ven–sam réservations jusqu'à minuit).
   */
  hours: {
    confirmed: false,
    source: "Fiche Google (brief du 20/10/2026)",
    week: {
      0: [
        { open: "12:00", close: "15:00" },
        { open: "19:00", close: "22:00" },
      ],
      1: [{ open: "19:00", close: "22:30" }],
      2: [
        { open: "12:00", close: "15:00" },
        { open: "19:00", close: "23:00" },
      ],
      3: [
        { open: "12:00", close: "15:00" },
        { open: "19:00", close: "23:00" },
      ],
      4: [
        { open: "12:00", close: "15:00" },
        { open: "19:00", close: "23:00" },
      ],
      5: [
        { open: "12:00", close: "15:00" },
        { open: "19:00", close: "23:00" },
      ],
      6: [
        { open: "12:00", close: "15:00" },
        { open: "19:00", close: "23:00" },
      ],
    } satisfies Record<Weekday, readonly ServiceWindow[]>,
  },

  venue: {
    capacity: 120,
    privatisation: true,
    terrace: true,
    accessible: true,
    airConditioning: true,
    wifi: true,
    ticketRestaurant: true,
    services: ["dine-in", "takeaway", "delivery", "catering", "private-events"] as const,
    confirmed: true,
    source: "Privateaser (lieu 54563), maison-l.eatbu.com",
  },

  /** Online booking (env RESERVATION_URL, see next.config.ts). Falls back to tel: when unset. */
  reservationUrl: process.env.NEXT_PUBLIC_RESERVATION_URL || null,

  social: {
    instagram: "https://www.instagram.com/maison_l.lille/",
    facebook: "https://www.facebook.com/profile.php?id=100093612533232",
    /** Not verifiably theirs (searched 20/10/2026) — keep null until confirmed. */
    tiktok: null as string | null,
  },

  delivery: {
    deliveroo: "https://deliveroo.fr/fr/menu/lille/lille-gambetta/maison-l",
  },

  press: {
    outlet: "Le Bonbon Lille",
    date: "2025-05-15",
    fr: {
      heading: "Maison L : le Liban version stylée",
      url: "https://www.lebonbon.fr/lille/les-tops-food-et-drink/top-7-meilleurs-restos-libanais-lille/",
    },
    en: {
      heading: "Maison L: the Stylish Version of Lebanon",
      url: "https://en.lebonbon.fr/lille/tops-food-and-drink/top-7-best-lebanese-restaurants",
    },
    confirmed: true,
  },

  sister: {
    name: "Za'atar",
    kind: { fr: "boulangerie libanaise", en: "Lebanese bakery" },
    city: "Lille",
    /** URL TBD — not found online on 20/10/2026. */
    url: null as string | null,
    confirmed: false,
  },

  legal: {
    company: "SAS Maison L",
    form: "SAS",
    capital: "2 000 €",
    rcs: "RCS Lille Métropole 922 730 023",
    vat: "FR07922730023",
    registeredOffice: "324 rue Léon Gambetta, 59000 Lille",
    representative: {
      value: "Kamal Ghantous",
      confirmed: false,
      source: "Imprint de maison-l.eatbu.com (champs Prénom/Nom)",
    } satisfies Checked<string>,
    host: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      url: "https://vercel.com",
    },
  },

  currentSite: "https://maison-l.eatbu.com",
} as const;

export type Site = typeof site;

export function telHref(): string {
  return `tel:${site.phone.primary.value}`;
}

export function bookingHref(): string {
  return site.reservationUrl ?? telHref();
}
