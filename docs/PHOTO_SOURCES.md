# Photo sources

## 1. Folder photos — `photos/` (primary, never modified)

19 JPEGs exported from the restaurant's Instagram (file names `SnapInsta.to_…`), plus one video file. Details and mapping: [PHOTO_MAP.md](PHOTO_MAP.md).

## 2. Online photos — `photos-online/` (gitignored, fills gaps only)

Downloaded on **20 Oct 2026**, only from listings where the restaurant publishes its own marketing photos, as the brief allows. They went through the same pipeline and are marked `source: "online"` in `src/content/photo-map.ts`.

| Local file | Source URL | Published on | Used as |
|---|---|---|---|
| eatbu-houmous-betterave.jpg | https://cdn.website.dish.co/media/23/41/8215490/MAISON-L-DSC0572-jpg.jpg | maison-l.eatbu.com gallery ("Hommous betterave") | `houmous-betterave` — **signature** + menu |
| eatbu-osmalliyeh.jpg | https://cdn.website.dish.co/media/58/80/8215437/MAISON-L-DSC0356-copie-jpg.jpg | eatbu gallery ("Osmalliyeh") | `osmalliyeh` — **signature** + menu |
| eatbu-houmous.jpg | https://cdn.website.dish.co/media/b2/0f/8215500/MAISON-L-DSC0579-jpg.jpg | eatbu gallery ("Hommous") | `houmous` — menu |
| eatbu-moutabal.jpg | https://cdn.website.dish.co/media/2e/09/8233577/MAISON-L-DSC0516-jpg.jpg | eatbu gallery ("Moutabal") | `moutabal` — menu |
| eatbu-labneh.jpg | https://cdn.website.dish.co/media/ab/95/8233588/MAISON-L-DSC0567-jpg.jpg | eatbu gallery ("Labneh") | `labneh` — menu |
| eatbu-chankliche.jpg | https://cdn.website.dish.co/media/eb/2a/8233522/MAISON-L-DSC0659-jpg.jpg | eatbu gallery ("Chankliche") | `chankliche` — menu |
| eatbu-moussaka.jpg | https://cdn.website.dish.co/media/c9/9f/8233594/MAISON-L-DSC0583-jpg.jpg | eatbu gallery ("Moussaka") | `moussaka` — menu |
| eatbu-fattouche.jpg | https://cdn.website.dish.co/media/61/8b/8233532/MAISON-L-DSC0642-jpg.jpg | eatbu gallery ("Fattouche") | `fattouche` — menu |
| eatbu-grillades.jpg | https://cdn.website.dish.co/media/eb/f3/8233547/MAISON-L-DSC0712-jpg.jpg | eatbu gallery ("Grillades") | `grillades-feu` — menu (grillade mixte) |
| eatbu-planche-beignets.jpg | https://cdn.website.dish.co/media/56/12/8215495/MAISON-L-DSC0776-jpg.jpg | eatbu gallery ("Planche de beignets") | `planche-beignets` — menu (assortiment du chef, to confirm) |
| privateaser-486207.jpg | https://privateaser-media.s3.eu-west-1.amazonaws.com/etab_photos/54563/1500x750/486207.jpg | Privateaser, lieu 54563 | `salle` — La Maison section |
| privateaser-486208.jpg | https://privateaser-media.s3.eu-west-1.amazonaws.com/etab_photos/54563/1500x750/486208.jpg | Privateaser, lieu 54563 | `facade` — processed, kept in reserve |
| privateaser-486201.jpg | https://privateaser-media.s3.eu-west-1.amazonaws.com/etab_photos/54563/1500x750/486201.jpg | Privateaser, lieu 54563 | `salle-banquette` — not used (second room? to confirm) |
| eatbu-mouhammara.jpg | https://cdn.website.dish.co/media/17/53/8215483/MAISON-L-DSC0510-jpg.jpg | eatbu gallery | not used — folder photo preferred |
| eatbu-salade-du-moine.jpg | https://cdn.website.dish.co/media/11/6a/8233583/MAISON-L-DSC0547-jpg.jpg | eatbu gallery | not used — folder photo preferred |
| eatbu-warak-enab.jpg | https://cdn.website.dish.co/media/5c/c4/8233507/MAISON-L-DSC0597-jpg.jpg | eatbu gallery | not used — folder photo preferred |
| eatbu-mouhalabiyeh.jpg | https://cdn.website.dish.co/media/9a/ea/8233599/MAISON-L-DSC0762-jpg.jpg | eatbu gallery | not used — folder photo preferred |
| eatbu-image-principale.jpg | https://cdn.website.dish.co/media/fe/77/8215426/MAISON-L-Image-principale-site-maison-L-png.jpg | eatbu hero image | not used — crop of folder photo `table-zenith` |
| eatbu-image-principale-b.jpg | https://cdn.website.dish.co/media/7c/29/8215425/MAISON-L-Image-principale-site-maison-L-png.jpg | eatbu hero image (other size) | not used — same image |

**Deliveroo** item photos could not be retrieved: the menu page returns HTTP 403 to automated requests, so none were used.

## 3. Not used, by rule

- No customer-uploaded photos (Google reviews, TripAdvisor, Wanderlog…).
- No scraping of Instagram, Facebook or TikTok. The folder photos were exported by the restaurant side and provided in `photos/`.
- No stock photography.

## 4. Other third-party data

- **Street plan** (`public/images/plan-gambetta.svg`): OpenStreetMap data (© OpenStreetMap contributors, ODbL), fetched once by `scripts/map.ts` and credited on the page and in the mentions légales.
- **OG fonts** (`scripts/fonts/`): Instrument Serif and Geist Mono, SIL Open Font License, used only to render `public/og.jpg`.
