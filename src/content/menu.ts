/**
 * La carte — seed from Deliveroo / Privateaser / eatbu (October 2026).
 * Every price is `priceConfirmed: false` until Jalal validates it (Deliveroo prices run higher than dine-in).
 */
import { type Menu, type MenuItem, type MenuTag, menuSchema } from "./menu-schema";

type Seed = {
  id: string;
  fr: string;
  en: string;
  dFr?: string;
  dEn?: string;
  price: number | null;
  pieces?: number;
  tags?: MenuTag[];
  photos?: string[];
  perPerson?: boolean;
  dineIn?: boolean;
};

const SIGNATURES = new Set([
  "houmous-betterave",
  "kebbe-citrouille",
  "mouhammara",
  "kafta-maison-l",
  "osmalliyeh",
]);

function item(s: Seed): MenuItem {
  const signature = SIGNATURES.has(s.id);
  const tags = [...(s.tags ?? []), ...(signature ? (["SIGNATURE"] as const) : [])];
  return {
    id: s.id,
    name: { fr: s.fr, en: s.en },
    description: { fr: s.dFr ?? "", en: s.dEn ?? "" },
    price: s.price,
    ...(s.perPerson ? { priceNote: { fr: "par personne", en: "per person" } } : {}),
    ...(s.pieces ? { pieces: s.pieces } : {}),
    tags,
    ...(signature ? { signature: true } : {}),
    photoIds: s.photos ?? [],
    priceConfirmed: false,
    dineIn: s.dineIn ?? true,
  };
}

const rawMenu: Menu = {
  updatedAt: "2026-10-20",
  categories: [
    {
      id: "mezzes-froids",
      title: { fr: "Mezzés froids", en: "Cold mezze" },
      items: [
        item({
          id: "houmous",
          fr: "Houmous",
          en: "Hummus",

          dFr: "Pois chiches, crème de sésame, huile d'olive.",
          dEn: "Chickpeas, sesame cream, olive oil.",
          price: 8.5,
          tags: ["VG"],
          photos: ["houmous"],
        }),
        item({
          id: "houmous-basilic",
          fr: "Houmous au basilic",
          en: "Basil hummus",

          dFr: "Sauce basilic, pignons grillés.",
          dEn: "Basil sauce, toasted pine nuts.",
          price: 9,
          tags: ["V"],
          photos: ["houmous-basilic"],
        }),
        item({
          id: "houmous-betterave",
          fr: "Houmous de betterave",
          en: "Beetroot hummus",

          dFr: "Le houmous, teinté de betterave.",
          dEn: "Hummus, coloured with beetroot.",
          price: 8,
          tags: ["V"],
          photos: ["houmous-betterave"],
        }),
        item({
          id: "moutabal",
          fr: "Moutabal",
          en: "Moutabal",

          dFr: "Caviar d'aubergine, crème de sésame.",
          dEn: "Aubergine caviar, sesame cream.",
          price: 9.5,
          tags: ["VG"],
          photos: ["moutabal"],
        }),
        item({
          id: "mouhammara",
          fr: "Mouhammara",
          en: "Mouhammara",

          dFr: "Poivrons rouges, noix, ail, citron, mélasse de grenade, huile d'olive.",
          dEn: "Red peppers, walnuts, garlic, lemon, pomegranate molasses, olive oil.",
          price: 9,
          tags: ["VG"],
          photos: ["mouhammara"],
        }),
        item({
          id: "moussaka-libanaise",
          fr: "Moussaka libanaise",
          en: "Lebanese moussaka",

          dFr: "Aubergines et pois chiches cuisinés.",
          dEn: "Aubergines and chickpeas, cooked together.",
          price: 9,
          tags: ["VG"],
          photos: ["moussaka"],
        }),
        item({
          id: "warak-enab",
          fr: "Warak enab",
          en: "Warak enab",

          dFr: "Feuilles de vigne farcies de riz citronné.",
          dEn: "Vine leaves filled with lemony rice.",
          price: 9,
          tags: ["VG"],
          photos: ["warak-enab"],
        }),
        item({
          id: "labneh",
          fr: "Labneh",
          en: "Labneh",

          price: null,
          tags: ["V"],
          photos: ["labneh"],
        }),
        item({
          id: "chankliche",
          fr: "Chankliche",
          en: "Shanklish",

          price: null,
          tags: ["V"],
          photos: ["chankliche"],
        }),
      ],
    },
    {
      id: "salades",
      title: { fr: "Salades", en: "Salads" },
      items: [
        item({
          id: "taboule",
          fr: "Taboulé",
          en: "Tabbouleh",

          dFr: "Persil, tomate, huile d'olive, citron.",
          dEn: "Parsley, tomato, olive oil, lemon.",
          price: 9,
          tags: ["VG"],
        }),
        item({
          id: "fattouche",
          fr: "Fattouche",
          en: "Fattoush",

          dFr: "Crudités, sumac, ail, pain libanais grillé.",
          dEn: "Raw vegetables, sumac, garlic, toasted Lebanese bread.",
          price: 10,
          tags: ["VG"],
          photos: ["fattouche"],
        }),
        item({
          id: "salade-du-moine",
          fr: "Salade du moine",
          en: "Monk's salad",

          dFr: "Aubergines grillées, tomates, oignons, persil, citron, mélasse de grenade.",
          dEn: "Grilled aubergines, tomatoes, onions, parsley, lemon, pomegranate molasses.",
          price: 12,
          tags: ["VG"],
          photos: ["salade-du-moine"],
        }),
      ],
    },
    {
      id: "mezzes-chauds",
      title: { fr: "Mezzés chauds", en: "Hot mezze" },
      items: [
        item({
          id: "moussabbaha",
          fr: "Moussabbaha",
          en: "Msabbaha",

          dFr: "Pois chiches, crème de sésame aillée.",
          dEn: "Chickpeas, garlicky sesame cream.",
          price: 9,
          tags: ["VG"],
        }),
        item({
          id: "houmous-viande",
          fr: "Houmous à la viande",
          en: "Hummus with lamb",

          dFr: "Émincé d'agneau, pignons.",
          dEn: "Sliced lamb, pine nuts.",
          price: 10,
        }),
        item({
          id: "houmous-balila",
          fr: "Houmous balila",
          en: "Hummus balila",

          dFr: "Pois chiches, sauce du chef.",
          dEn: "Chickpeas, the chef's sauce.",
          price: 8,
        }),
        item({
          id: "fattet-houmous",
          fr: "Fattet houmous",
          en: "Fatteh hummus",

          dFr: "Pois chiches, yaourt, ail, pignons.",
          dEn: "Chickpeas, yoghurt, garlic, pine nuts.",
          price: 14,
          tags: ["V"],
        }),
        item({
          id: "batata-harra",
          fr: "Batata harra",
          en: "Batata harra",

          dFr: "Pommes de terre, ail, coriandre.",
          dEn: "Potatoes, garlic, coriander.",
          price: 9,
          tags: ["VG", "EPICE"],
          photos: ["batata-harra"],
        }),
        item({
          id: "foie-de-volaille",
          fr: "Foie de volaille",
          en: "Chicken livers",

          dFr: "Mélasse de grenade, ail.",
          dEn: "Pomegranate molasses, garlic.",
          price: 9.5,
        }),
        item({
          id: "makanek",
          fr: "Makanek",
          en: "Makanek",

          dFr: "Saucisses libanaises, citron, mélasse de grenade.",
          dEn: "Lebanese sausages, lemon, pomegranate molasses.",
          price: 9.5,
        }),
      ],
    },
    {
      id: "beignets",
      title: { fr: "Beignets & feuilletés", en: "Fritters & pastries" },
      items: [
        item({
          id: "kebbe-viande",
          fr: "Kebbé viande",
          en: "Meat kebbeh",

          price: 9,
          pieces: 3,
          photos: ["kebbe-viande"],
        }),
        item({
          id: "kebbe-houmous",
          fr: "Kebbé houmous",
          en: "Hummus kebbeh",

          price: 9,
          pieces: 4,
        }),
        item({
          id: "kebbe-aubergine",
          fr: "Kebbé d'aubergines",
          en: "Aubergine kebbeh",

          price: 9,
          pieces: 4,
        }),
        item({
          id: "kebbe-soudjouk",
          fr: "Kebbé soudjouk",
          en: "Soujouk kebbeh",

          price: 9,
          pieces: 3,
        }),
        item({
          id: "kebbe-citrouille",
          fr: "Kebbé citrouille",
          en: "Pumpkin kebbeh",

          dFr: "Farce de blettes et pois chiches.",
          dEn: "Filled with chard and chickpeas.",
          price: 9,
          pieces: 3,
          tags: ["V"],
          photos: ["kebbe-citrouille"],
        }),
        item({
          id: "kebbe-assortis",
          fr: "Kebbé assortis",
          en: "Kebbeh selection",

          dFr: "Viande, houmous, aubergine, soudjouk, citrouille.",
          dEn: "Meat, hummus, aubergine, soujouk, pumpkin.",
          price: 11,
          pieces: 5,
        }),
        item({
          id: "falafel",
          fr: "Falafel",
          en: "Falafel",

          dFr: "Fèves et pois chiches, crème de sésame.",
          dEn: "Broad beans and chickpeas, sesame cream.",
          price: 9,
          pieces: 4,
          tags: ["VG"],
        }),
        item({
          id: "samboussek-viande",
          fr: "Samboussek viande",
          en: "Meat sambousek",

          price: 9,
          pieces: 4,
          photos: ["samboussek"],
        }),
        item({
          id: "fatayer-epinards",
          fr: "Fatayer épinards",
          en: "Spinach fatayer",

          price: 8,
          pieces: 4,
          tags: ["V"],
        }),
        item({
          id: "rakakat-fromage",
          fr: "Rakakat fromage",
          en: "Cheese rakakat",

          dFr: "Feuilleté, feta fondue.",
          dEn: "Pastry, melted feta.",
          price: 9,
          pieces: 5,
          tags: ["V"],
        }),
      ],
    },
    {
      id: "a-partager",
      title: { fr: "À partager", en: "To share" },
      items: [
        item({
          id: "assortiment-mezzes-chef",
          fr: "Assortiment de mezzés du chef",
          en: "The chef's mezze selection",

          dFr: "Entrées et beignets choisis par le chef.",
          dEn: "Starters and fritters chosen by the chef.",
          price: 25,
          tags: ["A_PARTAGER"],
          photos: ["planche-beignets"],
        }),
        item({
          id: "mezze-maison-l",
          fr: "Mezzé Maison L",
          en: "Mezze Maison L",

          dFr: "La table de la maison.",
          dEn: "The house table.",
          price: 36,
          perPerson: true,
          tags: ["A_PARTAGER"],
        }),
        item({
          id: "assiette-vegetarienne",
          fr: "Assiette végétarienne",
          en: "Vegetarian plate",

          dFr: "Houmous, moutabal, fattouche, falafel, fatayer.",
          dEn: "Hummus, moutabal, fattoush, falafel, fatayer.",
          price: 20.9,
          tags: ["V"],
        }),
        item({
          id: "assiette-gourmande",
          fr: "Assiette gourmande",
          en: "Gourmet plate",

          dFr: "Neuf hors-d'œuvre, froids et chauds.",
          dEn: "Nine starters, cold and hot.",
          price: 22.9,
        }),
        item({
          id: "assiette-beyrouth",
          fr: "Assiette Beyrouth",
          en: "Beirut plate",

          dFr: "Neuf hors-d'œuvre et deux brochettes.",
          dEn: "Nine starters and two skewers.",
          price: 29.9,
        }),
      ],
    },
    {
      id: "grillades",
      title: { fr: "Grillades au feu de bois", en: "Wood-fired grill" },
      items: [
        item({
          id: "kafta",
          fr: "Kafta",
          en: "Kafta",

          dFr: "Agneau haché, oignon, persil ; houmous.",
          dEn: "Minced lamb, onion, parsley; hummus.",
          price: 20.5,
          pieces: 3,
        }),
        item({
          id: "kafta-poivrons",
          fr: "Kafta aux poivrons rouges",
          en: "Kafta with red peppers",

          dFr: "Servie avec houmous.",
          dEn: "Served with hummus.",
          price: 20.5,
          pieces: 3,
        }),
        item({
          id: "kafta-maison-l",
          fr: "Kafta Maison L",
          en: "Kafta Maison L",

          dFr: "Grillée au feu de bois, sauce tomate, oignons grillés, houmous.",
          dEn: "Wood-fired, tomato sauce, grilled onions, hummus.",
          price: 21.9,
          pieces: 3,
          photos: ["kafta-maison-l"],
        }),
        item({
          id: "chiche-taouk",
          fr: "Chiche taouk",
          en: "Shish taouk",

          dFr: "Poulet mariné ail et citron, crème d'ail, frites, salade.",
          dEn: "Chicken marinated in garlic and lemon, garlic cream, fries, salad.",
          price: 20.5,
          pieces: 2,
        }),
        item({
          id: "brochettes-agneau",
          fr: "Brochettes d'agneau",
          en: "Lamb skewers",

          dFr: "Oignons, tomates et poivrons grillés, houmous.",
          dEn: "Grilled onions, tomatoes and peppers, hummus.",
          price: 24,
          pieces: 2,
        }),
        item({
          id: "grillade-mixte",
          fr: "Grillade mixte",
          en: "Mixed grill",

          dFr: "Kafta, taouk, agneau ; houmous, crème d'ail, frites, salade.",
          dEn: "Kafta, taouk, lamb; hummus, garlic cream, fries, salad.",
          price: 22,
          photos: ["grillades-feu"],
        }),
        item({
          id: "chawarma-poulet",
          fr: "Chawarma poulet",
          en: "Chicken shawarma",

          dFr: "Crème d'ail, frites.",
          dEn: "Garlic cream, fries.",
          price: 19.9,
        }),
        item({
          id: "chawarma-boeuf",
          fr: "Chawarma bœuf",
          en: "Beef shawarma",

          dFr: "Sauce tarator, tomate grillée.",
          dEn: "Tarator sauce, grilled tomato.",
          price: 21.9,
        }),
        item({
          id: "frites",
          fr: "Frites",
          en: "Fries",

          dFr: "En accompagnement.",
          dEn: "On the side.",
          price: 5,
          tags: ["VG"],
        }),
      ],
    },
    {
      id: "desserts",
      title: { fr: "Desserts", en: "Desserts" },
      items: [
        item({
          id: "aych-el-saray",
          fr: "Aych el saray",
          en: "Aish el saraya",

          dFr: "Crème de lait, biscuit caramélisé, pistache.",
          dEn: "Milk cream, caramelised biscuit, pistachio.",
          price: 4.5,
          tags: ["V"],
        }),
        item({
          id: "nammoura",
          fr: "Nammoura",
          en: "Namoura",

          dFr: "Semoule, miel, fleur d'oranger, eau de rose, amande.",
          dEn: "Semolina, honey, orange blossom, rose water, almond.",
          price: 4.5,
          tags: ["V"],
        }),
        item({
          id: "mouhalabiyeh",
          fr: "Mouhalabiyeh",
          en: "Mouhalabieh",

          dFr: "Flan à la fleur d'oranger, sirop, pistaches, amandes.",
          dEn: "Orange-blossom milk pudding, syrup, pistachios, almonds.",
          price: 4.5,
          tags: ["V"],
          photos: ["mouhalabiyeh"],
        }),
        item({
          id: "baklawa",
          fr: "Baklawa noix de cajou",
          en: "Cashew baklava",

          price: 4.5,
          tags: ["V"],
        }),
        item({
          id: "osmalliyeh",
          fr: "Osmalliyeh",
          en: "Osmalieh",

          dFr: "Pâte filée croustillante, crème.",
          dEn: "Crisp shredded pastry, cream.",
          price: null,
          tags: ["V"],
          photos: ["osmalliyeh"],
        }),
      ],
    },
    {
      id: "boissons",
      title: { fr: "Boissons maison", en: "House drinks" },
      note: {
        fr: "Cocktails signature, vins et arak : carte des boissons sur place.",
        en: "Signature cocktails, wines and arak: drinks list at the table.",
      },
      items: [
        item({
          id: "boisson-maison-l",
          fr: "Maison L",
          en: "Maison L",

          dFr: "Ananas, orange, sirop de rose.",
          dEn: "Pineapple, orange, rose syrup.",
          price: 6,
        }),
        item({
          id: "ward",
          fr: "Ward",
          en: "Ward",

          dFr: "Sirop de rose.",
          dEn: "Rose syrup.",
          price: 5,
        }),
        item({
          id: "limonade",
          fr: "Limonade libanaise",
          en: "Lebanese lemonade",

          dFr: "Citron pressé, fleur d'oranger. Option pétillante.",
          dEn: "Fresh lemon, orange blossom. Sparkling on request.",
          price: 7,
        }),
        item({
          id: "jallab",
          fr: "Jallab",
          en: "Jallab",

          dFr: "Sirop de dattes, pignons.",
          dEn: "Date syrup, pine nuts.",
          price: 6,
        }),
        item({ id: "the-menthe", fr: "Thé à la menthe", en: "Mint tea", price: null }),
        item({ id: "cafe", fr: "Café", en: "Coffee", price: null }),
        item({ id: "eaux", fr: "Eaux 50 cl", en: "Water 50 cl", price: 3.9 }),
        item({ id: "softs", fr: "Softs", en: "Soft drinks", price: 2.9 }),
      ],
    },
    {
      id: "a-emporter",
      title: { fr: "À emporter & livraison", en: "Takeaway & delivery" },
      note: {
        fr: "Menus sandwich : un accompagnement et une boisson, de 14,50 à 16,50 €.",
        en: "Sandwich menus: one side and one drink, from €14.50 to €16.50.",
      },
      items: [
        item({
          id: "sandwich-lahme",
          fr: "Sandwich lahmé",
          en: "Lahmeh sandwich",

          price: 11,
          dineIn: false,
        }),
        item({
          id: "sandwich-taouk",
          fr: "Sandwich chiche taouk",
          en: "Shish taouk sandwich",

          price: 10,
          dineIn: false,
        }),
        item({
          id: "sandwich-kafta",
          fr: "Sandwich kafta",
          en: "Kafta sandwich",

          price: 10,
          dineIn: false,
        }),
        item({
          id: "sandwich-falafel",
          fr: "Sandwich falafel",
          en: "Falafel sandwich",

          price: 9,
          tags: ["VG"],
          photos: ["sandwich-falafel"],
          dineIn: false,
        }),
        item({
          id: "sandwich-chawarma-poulet",
          fr: "Sandwich chawarma poulet",
          en: "Chicken shawarma sandwich",

          price: 10,
          dineIn: false,
        }),
        item({
          id: "sandwich-chawarma-boeuf",
          fr: "Sandwich chawarma bœuf",
          en: "Beef shawarma sandwich",

          price: 11,
          dineIn: false,
        }),
      ],
    },
  ],
};

export const menu: Menu = menuSchema.parse(rawMenu);

export const dineInCategories = menu.categories.filter((c) => c.items.every((i) => i.dineIn));
export const takeawayCategories = menu.categories.filter((c) => c.items.some((i) => !i.dineIn));

export function menuItemById(id: string): MenuItem | undefined {
  for (const c of menu.categories) {
    const found = c.items.find((i) => i.id === id);
    if (found) return found;
  }
  return undefined;
}

export const signatureIds = [
  "houmous-betterave",
  "kebbe-citrouille",
  "mouhammara",
  "kafta-maison-l",
  "osmalliyeh",
] as const;
