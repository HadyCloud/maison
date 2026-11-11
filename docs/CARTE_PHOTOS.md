# La carte — photos (Jalal's shoot, November 2026)

64 photos → 40 dishes on the carte (22 before). The home page is untouched: the carte reads its own files, `public/images/carte/`, never the shared `public/images/<id>-sq.*` thumbnails.

## How it was done

1. Every photo was looked at and matched to the dish by eye, against the printed names and descriptions.
2. Each dish got one hand-framed square crop (hands, glasses and cutlery left out wherever the shot allowed it). Originals are never modified.
3. `pnpm assets:carte` cuts the crops and writes AVIF + WebP at 240 and 480 px (sharp, light output sharpening, metadata stripped). The page picks the right size per screen (`srcset` + `sizes`). A third, larger size (up to 1280 px, `<id>-full.*`) is loaded only when a photo is tapped.
4. Photos in `jalal photos/` were renamed after their platter. `_` separates several platters visible in the same photo; `-2`, `-3` are other angles of the same dish.

## Tap to enlarge

Every photo is a button that opens a viewer (native `<dialog>`: Esc, click outside or the close button to dismiss; focus returns to the thumbnail; the page behind is frozen). It shows the enlarged crop with the dish's name, description and price, and mirrors for Arabic. Code: `src/components/sections/menu/MenuPhoto.tsx`.

To change a framing: edit its `crop` in `src/content/carte-photos.ts` (centre `cx,cy` as fractions of the photo, side `s` as a fraction of its width), then run `pnpm assets:carte`.

## To confirm with the kitchen

These matches are plausible, not certain:

- **Moutabal** — Aubergine caviar with pomegranate — the shoot has no plain moutabal, so this is the same dish as the signature one.
- **Planche de mézzé** — A table of cold mezze rather than one board of five — illustrative.
- **Makanek** — Glossy brown sausages with lemon, pine nuts and pomegranate. Confirm it is not swapped with soujouk.
- **Soujouk** — Thin red sausages in tomato sauce. Confirm it is not swapped with makanek.
- **Kebbi citrouille** — Orange crust, walnut and pomegranate centre — same dish as the cut-open pumpkin kibbeh in the shoot.
- **Rakakat fromage** — Fried cigar rolls; a sister photo shows the cheese filling.
- **Kafta** — Three plain kafta skewers with salad, fries and flatbread. Confirm it is the plain kafta plate.
- **Mézzé** — A shared table of starters — illustrative of the chef's mezze.
- **Mézzé Maison L** — Mezze board with the grill plates — illustrative of the mezze with skewers.
- **Jus de fruits** — Tomato juice (one of the four juices on the menu) — the shoot has no orange juice.

## Dishes without a photo yet

Trilogie de hommous, Salade betteraves, Halloumi grillé, Foie de volaille, Hommous charawarma, Viande aux cerises, Kebbi soujouk, Kebbi assorti, Falafel, Fatayer épinards, Chiche taouk, Brochettes d'agneau, Poulet désossé, Kafta aux poivrons rouges, Trilogie de kafta, Chawarma poulet, Chawarma bœuf, Chawarma mixte, Accompagnement, Midi express, Halawet el jeben, Ward, Limonade libanaise, Sodas, Café, Café blanc, Déca, Verre de thé à la menthe, Café au lait, Chocolat chaud.

(Fries and the two bottled waters are left out on purpose.) *Trilogie de hommous* needs one shot showing the three flavours together; the old photo was a plain hummus, so it was dropped rather than mismatched.

## Dish → photo

| Dish | Item id | Photo | Original name | Crop (side @ centre) | Status |
|---|---|---|---|---|---|
| Hommous | `houmous` | `houmous.jpg` | PHOTO-2026-11-07-16-52-11 10 | 100% @ 50,38 | ✓ |
| Mousakka | `moussaka-libanaise` | `moussaka-libanaise.jpg` | PHOTO-2026-11-07-16-52-11 12 | 46% @ 50,45 | ✓ |
| Mouhammara | `mouhammara` | `mouhammara.jpg` | PHOTO-2026-11-07-16-52-11 9 | 100% @ 50,38 | ✓ |
| Moutabal | `moutabal` | `moutabal.jpg` | PHOTO-2026-11-07-16-52-11 | 50% @ 56,22 | to confirm |
| Warak enab | `warak-enab` | `warak-enab.jpg` | PHOTO-2026-11-07-16-52-11 11 | 50% @ 50,55 | ✓ |
| Labneh bel toum | `labneh-bel-toum` | `labneh-bel-toum.jpg` | PHOTO-2026-11-07-16-52-11 13 | 52% @ 50,49 | ✓ |
| Planche de mézzé | `planche-mezze` | `planche-mezze.jpg` | PHOTO-2026-11-07-16-52-11 8 | 66% @ 58,30 | to confirm |
| Moutabbal noix grenade | `moutabbal-noix-grenade` | `moutabbal-noix-grenade.jpg` | PHOTO-2026-11-07-16-52-11 14 | 100% @ 50,38 | ✓ |
| Hommous au basilic | `houmous-basilic` | `houmous-basilic.jpg` | PHOTO-2026-11-07-16-53-14 4 | 92% @ 51,49 | ✓ |
| Hommous aux betteraves | `houmous-betterave` | `houmous-betterave.jpg` | PHOTO-2026-11-07-16-52-11 15 | 100% @ 50,40 | ✓ |
| Labneh bil makdous | `labneh-makdous` | `labneh-makdous.jpg` | PHOTO-2026-11-07-16-53-15 10 | 100% @ 55,38 | ✓ |
| Chankliche | `chankliche` | `chankliche.jpg` | PHOTO-2026-11-07-16-52-11 2 | 46% @ 58,44 | ✓ |
| Taboulé | `taboule` | `taboule.jpg` | PHOTO-2026-11-07-16-52-12 10 | 50% @ 44,61 | ✓ |
| Fattouche | `fattouche` | `fattouche.jpg` | PHOTO-2026-11-07-16-52-11 4 | 72% @ 52,39 | ✓ |
| Salade du moine | `salade-du-moine` | `salade-du-moine.jpg` | PHOTO-2026-11-07-16-52-12 8 | 78% @ 61,30 | ✓ |
| Hommous viande | `houmous-viande` | `houmous-viande.jpg` | PHOTO-2026-11-07-16-53-11 | 96% @ 51,49 | ✓ |
| Batata harra | `batata-harra` | `batata-harra.jpg` | PHOTO-2026-11-07-16-53-15 11 | 80% @ 40,52 | ✓ |
| Makanek | `makanek` | `makanek.jpg` | PHOTO-2026-11-07-16-52-12 6 | 85% @ 45,31 | to confirm |
| Soujouk | `soujouk` | `soujouk.jpg` | PHOTO-2026-11-07-16-52-12 3 | 77% @ 47,53 | to confirm |
| Planche de beignets | `planche-beignets` | `planche-beignets.jpg` | PHOTO-2026-11-07-16-52-12 2 | 100% @ 50,50 | ✓ |
| Kebbi viande | `kebbe-viande` | `kebbe-viande.jpg` | PHOTO-2026-11-07-16-52-12 5 | 100% @ 50,47 | ✓ |
| Kebbi citrouille | `kebbe-citrouille` | `kebbe-citrouille.jpg` | PHOTO-2026-11-07-16-53-15 13 | 90% @ 50,50 | to confirm |
| Kebbi cup | `kebbe-cup` | `rakakat-fromage_kebbe-cup.jpg` | PHOTO-2026-11-07-16-53-11 2 | 44% @ 25,80 | ✓ |
| Sambousek viande | `samboussek-viande` | `samboussek-viande.jpg` | PHOTO-2026-11-07-16-53-15 2 | 78% @ 62,50 | ✓ |
| Rakakat fromage | `rakakat-fromage` | `rakakat-fromage_kebbe-cup.jpg` | PHOTO-2026-11-07-16-53-11 2 | 60% @ 70,80 | to confirm |
| Grillades mixtes | `grillade-mixte` | `grillade-mixte.jpg` | PHOTO-2026-11-07-16-52-12 4 | 64% @ 68,50 | ✓ |
| Kafta Maison L | `kafta-maison-l` | `kafta-maison-l.jpg` | PHOTO-2026-11-07-16-52-12 | 100% @ 50,46 | ✓ |
| Kafta | `kafta` | `kafta.jpg` | PHOTO-2026-11-07-16-53-15 5 | 62% @ 55,52 | to confirm |
| Arayess | `arayess` | `arayess.jpg` | PHOTO-2026-11-07-16-53-14 5 | 70% @ 38,30 | ✓ |
| Mézzé | `mezze-chef` | `mezze-chef.jpg` | PHOTO-2026-11-07-16-53-15 | 54% @ 72,37 | to confirm |
| Mézzé Maison L | `mezze-maison-l` | `mezze-maison-l.jpg` | PHOTO-2026-11-07-16-52-13 2 | 68% @ 60,70 | to confirm |
| Nammoura | `nammoura` | `cafe-douceur_nammoura_aych-el-saray.jpg` | PHOTO-2026-11-07-16-53-16 2 | 36% @ 15,46 | ✓ |
| Mouhalabiyé | `mouhalabiyeh` | `mouhalabiyeh.jpg` | PHOTO-2026-11-07-16-53-16 | 100% @ 50,50 | ✓ |
| Baklawa | `baklawa` | `baklawa.jpg` | PHOTO-2026-11-07-16-53-16 4 | 60% @ 46,55 | ✓ |
| Aych el saray | `aych-el-saray` | `cafe-douceur_nammoura_aych-el-saray.jpg` | PHOTO-2026-11-07-16-53-16 2 | 50% @ 78,50 | ✓ |
| Osmaliye | `osmalliyeh` | `osmalliyeh.jpg` | PHOTO-2026-11-07-16-53-16 3 | 58% @ 46,45 | ✓ |
| Maison L | `boisson-maison-l` | `boisson-maison-l_jallab.jpg` | PHOTO-2026-11-07-16-53-06 | 50% @ 66,30 | ✓ |
| Jallab | `jallab` | `boisson-maison-l_jallab.jpg` | PHOTO-2026-11-07-16-53-06 | 36% @ 22,34 | ✓ |
| Jus de fruits | `jus-fruits` | `jus-fruits_kebbe-cup.jpg` | PHOTO-2026-11-07-16-53-06 2 | 34% @ 62,70 | to confirm |
| Café ou thé douceur | `cafe-douceur` | `cafe-douceur_nammoura_aych-el-saray.jpg` | PHOTO-2026-11-07-16-53-16 2 | 100% @ 50,50 | ✓ |

## Photos not used on the page (alternate angles, kept for later)

`scene-labneh-houmous-mouhammara.jpg` (PHOTO-2026-11-07-16-52-07 2), `houmous-betterave-2.jpg` (PHOTO-2026-11-07-16-52-07 3), `mouhammara-2.jpg` (PHOTO-2026-11-07-16-52-07 4), `moutabal-2.jpg` (PHOTO-2026-11-07-16-52-07), `mouhammara-3.jpg` (PHOTO-2026-11-07-16-52-11 16), `moutabal-3.jpg` (PHOTO-2026-11-07-16-52-11 3), `warak-enab-2.jpg` (PHOTO-2026-11-07-16-52-11 5), `warak-enab-3.jpg` (PHOTO-2026-11-07-16-52-11 6), `taboule-2.jpg` (PHOTO-2026-11-07-16-52-11 7), `fattouche-2.jpg` (PHOTO-2026-11-07-16-52-12 7), `houmous-2.jpg` (PHOTO-2026-11-07-16-52-12 9), `mezze-maison-l-2.jpg` (PHOTO-2026-11-07-16-52-13 3), `scene-arak-mezze-grills.jpg` (PHOTO-2026-11-07-16-52-13 4), `falafel-sandwich.jpg` (PHOTO-2026-11-07-16-52-13), `kebbe-cup-2.jpg` (PHOTO-2026-11-07-16-53-06 3), `kebbe-cup-3.jpg` (PHOTO-2026-11-07-16-53-08), `labneh-makdous-2.jpg` (PHOTO-2026-11-07-16-53-14 2), `rakakat-fromage-2.jpg` (PHOTO-2026-11-07-16-53-14 3), `rakakat-fromage-3.jpg` (PHOTO-2026-11-07-16-53-14 6), `arayess-2.jpg` (PHOTO-2026-11-07-16-53-14), `kafta-2.jpg` (PHOTO-2026-11-07-16-53-15 12), `kebbe-citrouille-2.jpg` (PHOTO-2026-11-07-16-53-15 14), `batata-harra-2.jpg` (PHOTO-2026-11-07-16-53-15 3), `kafta-3.jpg` (PHOTO-2026-11-07-16-53-15 4), `mezze-chef-2.jpg` (PHOTO-2026-11-07-16-53-15 6), `kebbe-citrouille-3.jpg` (PHOTO-2026-11-07-16-53-15 7), `kafta-4.jpg` (PHOTO-2026-11-07-16-53-15 8), `labneh-makdous-3.jpg` (PHOTO-2026-11-07-16-53-15 9).
