# Content to confirm with Jalal & Layal

Everything here is published with a `confirmed: false` / `priceConfirmed: false` / `approved: false` flag in code.
Checked online on 20 Oct 2026.

## 1. Priority — practical information

| # | Item | What the site shows now | Why it needs confirming |
|---|---|---|---|
| 1 | **Phone** | **09 55 31 67 01** (primary), `site.phone.primary` | Google + PagesJaunes list 09 55 31 67 01. Their current eatbu site and its imprint list **07 66 16 16 19**. Which one takes bookings? |
| 2 | **Opening hours** | Google hours: Mon 19:00–22:30, Tue–Sat 12:00–15:00 / 19:00–23:00, Sun 12:00–15:00 / 19:00–22:00, with the note "Horaires indicatifs" | **PagesJaunes** (updated 07/08/2026) says *closed Monday*, evenings 18:00–22:00 (Sat 23:00) and Sunday 11:00–16:00 / 18:00–22:00. **Privateaser** booking hours run Fri–Sat until midnight. The live "CE SOIR · …" line in the hero depends on these. |
| 3 | **Online booking URL** | `tel:` fallback everywhere | eatbu shows a "Réserver en ligne" button but no direct URL. If a booking link exists, set `RESERVATION_URL` (Vercel env). |
| 4 | **Email** | Hidden (`email: null`) | The eatbu imprint lists a **personal Gmail address**, so it isn't published. Send a professional address to show. |
| 5 | **Google rating** | **4,8/5 · 826 avis**, "relevé le 20.10.2026" | The brief's aggregator snapshot. The live Google figure couldn't be read automatically, and Restaurants-de-France shows 4.8 / 545 (older). Update `site.google.rating` and `lastChecked`. |
| 6 | **Postcode** | 59000 | Set to `confirmed: true`, because eatbu imprint, Le Bonbon and PagesJaunes all say 59000. Privateaser's 59260 (Hellemmes) looks wrong. |
| 7 | **Legal representative** | **Kamal Ghantous** (mentions légales) | Taken from the eatbu imprint fields "Prénom: KAMAL / Nom: GHANTOUS". Please confirm, since Jalal is presented as chef & owner. |
| 8 | **Company identity** | SAS Maison L, capital 2 000 €, RCS Lille Métropole 922 730 023, VAT FR07922730023 | Matches the eatbu imprint. PagesJaunes lists another trade name, **"ST.JOHN"**, at the same address and SIREN. Worth confirming which names should appear. |
| 9 | **Host** | Vercel Inc. (mentions légales) | Assumes deployment on Vercel. Change `site.legal.host` if hosted elsewhere. |
| 10 | **TikTok** | Not linked (`social.tiktok: null`) | No account found for "Maison L Lille". |
| 11 | **Za'atar** (sister bakery) | Footer line without a link (`sister.url: null`) | Nothing found online. Send the URL or address. |
| 12 | **Site URL** | `https://maison-l.fr` (placeholder) | Set `NEXT_PUBLIC_SITE_URL` to the real domain (canonical, sitemap, OG). |

## 2. Menu (`src/content/menu.ts`)

- **No photo of the printed menu** was in `photos/`, so the seed menu stands. Every price has `priceConfirmed: false` and `/menu` shows "Prix indicatifs en cours de validation".
- **Prices that differ between sources** (seed = Deliveroo):
  - Kafta: 20,50 € (Deliveroo) vs **21 €** (Privateaser, "3 brochettes, accompagnement, salade, frites").
  - Falafel: 9 € vs **8 €**.
  - Fattouche: 10 € vs **8,50 €**.
- **Prices still unknown** (shown as "Prix sur place"): Labneh, Chankliche, Osmalliyeh, Thé à la menthe, Café.
- **Mezzé Maison L 36 €** is shown as **"par personne"** because reviews suggest it. Please confirm.
- **Drinks:** signature cocktails, wines and arak are not listed. The site shows "Cocktails signature, vins et arak : carte des boissons sur place".
- **Takeaway:** sandwich menus are shown as one line, "de 14,50 à 16,50 €". The sandwich prices are from Deliveroo.
- **Descriptions I added or reworded.** I didn't add ingredients; please check the wording:
  - Houmous de betterave: "Le houmous, teinté de betterave."
  - Osmalliyeh: "Pâte filée croustillante, crème." (from the photo and the dish's classic form)
  - Mezzé Maison L: "La table de la maison."
  - Kafta aux poivrons rouges: "Servie avec houmous."
  - Frites: "En accompagnement."
  - Moussaka libanaise: "Aubergines et pois chiches cuisinés."
- **Dietary tags:**
  - V and VG are inferred only from the listed ingredients.
  - "Épicé" appears only on batata harra.
  - **No "SG" (gluten-free) tag is shown anywhere.** Please confirm each tag, especially VG on houmous, moutabal, falafel and taboulé (possible yoghurt or butter in the kitchen).
- **Dishes seen in photos but not on the menu.** Should they be added?
  - Raw kebbé / kafta nayé (`table-crus`, `table-zenith`).
  - Grilled bread stuffed with meat, arayes? (`arayes`).
  - Braised stuffed aubergines on labneh with walnuts and pomegranate (`aubergine-labneh`). This is *not* the foie de volaille.
- **Unclear items:**
  - "Kebbé houmous": what is it exactly? The Arabic name is a guess.
  - Is the eatbu "Planche de beignets" photo the "Assortiment de mezzés du chef"?

### Arabic names, to validate (`name.ar`)

| Dish | Proposed | Dish | Proposed |
|---|---|---|---|
| Houmous | حمّص | Kebbé viande | كبّة باللحمة |
| Houmous au basilic | حمّص بالحبق | Kebbé houmous | كبّة حمّص |
| Houmous de betterave | حمّص بالشمندر | Kebbé d'aubergines | كبّة باذنجان |
| Moutabal | متبّل | Kebbé soudjouk | كبّة سجق |
| Mouhammara | محمّرة | Kebbé citrouille | كبّة يقطين |
| Moussaka libanaise | مسقّعة | Kebbé assortis | كبّة مشكّلة |
| Warak enab | ورق عنب | Falafel | فلافل |
| Labneh | لبنة | Samboussek viande | سمبوسك باللحمة |
| Chankliche | شنكليش | Fatayer épinards | فطاير سبانخ |
| Taboulé | تبّولة | Rakakat fromage | رقاقات بالجبنة |
| Fattouche | فتّوش | Assortiment du chef | تشكيلة مازة الشيف |
| Salade du moine | سلطة الراهب | Mezzé Maison L | مازة ميزون إل |
| Moussabbaha | مسبّحة | Assiette végétarienne | صحن نباتي |
| Houmous à la viande | حمّص باللحمة | Assiette gourmande | صحن الذوّاقة |
| Houmous balila | حمّص بليلة | Assiette Beyrouth | صحن بيروت |
| Fattet houmous | فتّة حمّص | Kafta | كفتة |
| Batata harra | بطاطا حرّة | Kafta aux poivrons rouges | كفتة بالفليفلة الحمراء |
| Foie de volaille | سودة دجاج | Kafta Maison L | كفتة ميزون إل |
| Makanek | مقانق | Chiche taouk | شيش طاووق |
| Brochettes d'agneau | شقف غنم | Grillade mixte | مشاوي مشكّلة |
| Chawarma poulet | شاورما دجاج | Chawarma bœuf | شاورما لحمة |
| Frites | بطاطا مقليّة | Aych el saray | عيش السرايا |
| Nammoura | نمّورة | Mouhalabiyeh | مهلّبيّة |
| Baklawa noix de cajou | بقلاوة بالكاجو | Osmalliyeh | عثمليّة |
| Maison L (boisson) | ميزون إل | Ward | ورد |
| Limonade libanaise | ليموناضة | Jallab | جلّاب |
| Thé à la menthe | شاي بالنعناع | Café | قهوة |
| Eaux | مياه | Softs | مشروبات غازيّة |
| Sandwich lahmé | سندويش لحمة | Sandwich chiche taouk | سندويش طاووق |
| Sandwich kafta | سندويش كفتة | Sandwich falafel | سندويش فلافل |
| Sandwich chawarma poulet | سندويش شاورما دجاج | Sandwich chawarma bœuf | سندويش شاورما لحمة |

"Maison L" is transliterated as **ميزون إل**. Jalal may prefer another spelling, or to keep it in Latin letters.

## 3. Copy & quotes

- **Chef quote (proposal, NOT published):** « Au Liban, on ne sert pas une assiette. On sert une table. »
  - It sits in `src/content/quotes.ts` with `approved: false`, so the site shows an *unattributed* line instead ("Ici, on ne sert pas une assiette. On sert une table.").
  - Set `approved: true` only if Jalal says he wants it under his name, or replace it with his own words.
- **Story wording** built from the real story:
  - "Jalal est en cuisine ; Layal reçoit." Layal's welcome is often mentioned in reviews. Please confirm this division of roles.
  - "Vingt ans de restauration à Dubaï avant de poser ses couteaux à Lille." Is "restauration" (restaurants in general) the right word, or was he a chef the whole time?
- **"Prix nets · Service compris"** on `/menu` is the standard French legal wording. Keep it only if it matches the printed menu.
- **Press:** the site quotes Le Bonbon Lille's heading *« Maison L : le Liban version stylée »* (15 May 2025, article by Valentine Ballot) and links to it. The EN pages use the English edition's heading.
- **Reviews:** `src/content/reviews.ts` is empty, so no customer quote is shown. Add real Google reviews verbatim (first name + initial) to show the block.

## 4. Hero video

- Source used: `video/hero.mp4` (4:3, 1112×834, 24p stored at 60 fps, 10 s, with audio).
- Treatment:
  - Audio removed, 24 fps, very light desaturation (0.92) to sit on the graphite UI.
  - 0.6 s crossfade at the loop point.
  - **The "1080" tier is upscaled from 834p (Lanczos).** A native 1080p export would look sharper.
- **There is also a 16:9, 1600×900 edit at `photos/maison_l_website_hero_10s.mp4`** (crossfaded, no audio). If that is the intended hero:
  - Move it into `video/` (alone).
  - Run `pnpm assets:video`.
- Poster: the night-façade frame (t ≈ 0.2 s). It matches the first frame of the loop, so the fade from poster to video is seamless.

## 5. Design decisions to be aware of

- An extra grey token **`graphite-400 #8B8B91`** was added. `graphite-500` (#6F6F75) fails WCAG AA for 11–12 px mono labels on ink (3.8:1), so it is kept for large or decorative use only.
- The custom cursor is the only rounded shape (the brief asks for a circle).
- **Lighthouse (mobile, simulated slow 4G):**
  - Home 90, menu 92. Accessibility, best practices and SEO are 100.
  - CLS 0, TBT ≈ 60–70 ms.
  - **Simulated LCP is 3.4–3.6 s (target < 2.5 s).** Observed LCP is ~130 ms. The simulation is dominated by about 210 KB of framework + Motion JS requested in `<head>`.
  - Real-device numbers on Vercel (HTTP/2, Brotli) should be better, but check field data after launch.
