/** French dictionary — the reference shape. `*word*` renders as the italic serif word. */
export const fr = {
  lang: "fr",
  locale: "fr-FR",
  meta: {
    title: "Maison L, cuisine libanaise à Lille Gambetta",
    description:
      "Maison L, restaurant libanais familial rue Léon Gambetta à Lille. Mezzés, grillades au feu de bois, desserts. Réservation par téléphone.",
    menuTitle: "La Carte de Maison L, Lille",
    menuDescription:
      "La carte de Maison L : mezzés froids et chauds, beignets, grillades au feu de bois, desserts et boissons maison.",
  },
  a11y: {
    skip: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryNav: "Navigation principale",
    language: "Langue",
    langNames: { fr: "Français", en: "English" },
    home: "Maison L, accueil",
    phoneCall: "Appeler Maison L",
    categories: "Catégories de la carte",
  },
  nav: {
    home: "Accueil",
    carte: "La Carte",
    info: "Infos",
    reserve: "Réserver",
  },
  hero: {
    tagline: "La générosité, *à voix basse.*",
    reserve: "Réserver une table",
    menu: "Découvrir la carte",
    scroll: "Défiler",
  },
  status: {
    tonight: "Ce soir",
    lunch: "Ce midi",
    from: "de",
    to: "à",
    at: "à",
    closed: "Fermé",
    reopen: "réouverture",
    tomorrow: "demain",
  },
  ticker: [
    "Cuisine libanaise",
    "Lille Gambetta",
    "Grillades au feu de bois",
    "Terrasse",
    "Jusqu'à 120 convives",
    "En famille depuis 2023",
  ],
  days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  signatures: {
    label: "Signatures",
    title: "Les *signatures*",
    intro: "Cinq assiettes qui disent la maison.",
    all: "Toute la carte",
  },
  info: {
    title: "Infos *pratiques*",
    byPhone: "Réservations par téléphone",
    online: "Réserver en ligne",
    address: "Adresse",
    hours: "Horaires",
    directions: "Itinéraire",
    mapAlt: "Plan du quartier Gambetta, Maison L au 324 rue Léon Gambetta",
    closed: "Fermé",
    hoursNote: "Horaires indicatifs, à confirmer par téléphone.",
    privatisation: {
      label: "Privatisation",
      line: "Jusqu'à 120 invités · privatisation partielle ou totale · *soirées lounge*",
      cta: "Appeler pour privatiser",
    },
    amenities: ["Terrasse", "Accès PMR", "Climatisation", "Ticket Restaurant"],
  },
  footer: {
    sister: "La maison sœur\u00a0: Za'atar, boulangerie libanaise, Lille.",
    allergens: "Allergènes",
    delivery: "Livraison Deliveroo",
    legalNotes: {
      capital: "capital social",
      office: "Siège\u00a0:",
      publisher: "Directeur de la publication\u00a0:",
      host: "Hébergeur\u00a0:",
      privacy:
        "Ce site n'utilise aucun traceur ni outil de mesure d'audience. Un cookie de préférence de langue n'est déposé que si vous changez de langue.",
      map: "Plan © les contributeurs d'OpenStreetMap (ODbL).",
    },
  },
  menuPage: {
    title: "La *Carte*",
    meta: "Prix nets · Service compris · Mise à jour",
    priceTbd: "Prix sur place",
    pieces: "pièces",
    takeawayIntro: "Sandwichs et menus, à emporter ou livrés.",
    deliveroo: "Commander sur Deliveroo",
    allergens: "Liste des allergènes disponible sur demande.",
    priceDisclaimer: "Prix indicatifs en cours de validation.",
    tags: {
      V: "Végétarien",
      VG: "Végétalien",
      SG: "Sans gluten",
      EPICE: "Épicé",
      A_PARTAGER: "À partager",
      SIGNATURE: "Signature",
    },
    tagShort: {
      V: "V",
      VG: "VG",
      SG: "SG",
      EPICE: "Épicé",
      A_PARTAGER: "À partager",
      SIGNATURE: "Signature",
    },
    back: "Retour à l'accueil",
  },
  units: { currency: "€" },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof fr>;
