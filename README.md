# Maison L — website

Site for **Maison L**, a Lebanese restaurant at 324 rue Léon Gambetta, Lille. Built with Next.js 16 (App Router, React 19), TypeScript strict, Tailwind v4, Motion, Lenis and Zod, using pnpm and Biome.

Two pages: Home (hero, signatures, Infos with map and contact) at `/`, and La Carte at `/menu`. The site is in French; the **FR · EN** buttons in the top bar switch the text in place, without changing the URL. The choice is remembered in a small `lang` cookie that is only set when a visitor clicks EN (no trackers, no analytics, so no cookie banner). Pages are rendered per request because they read that cookie. The "Infos" link in the top bar scrolls to the last section of the home page. The legal mentions are small print in the footer. If analytics are added later, use a cookieless tool (e.g. Vercel Web Analytics or Plausible) and update the footer legal text.

## Run it

```bash
pnpm install
```

```bash
pnpm dev
```

Opens on http://localhost:3000. Production build:

```bash
pnpm build && pnpm start
```

Requires Node ≥ 22.18. The asset scripts are plain `.ts` files run by Node's built-in type stripping.

### Quality gates

```bash
pnpm typecheck && pnpm lint && pnpm test
```

```bash
pnpm build && pnpm e2e
```

- **Playwright + axe** run against the production build on port 3300. The flows are home/hero, `/menu` with its category tabs, the language switch, reservation links, and the mobile overlay and photo sheet. First run needs `pnpm exec playwright install chromium`.
- `pnpm screens` takes full-page screenshots at 390, 768, 1280 and 1920 (plus reduced motion) into `reports/screens/`. It needs `pnpm start --port 3200` running.
- `node scripts/lighthouse.ts http://localhost:3200 3` runs Lighthouse mobile and takes the median of 3 runs. Reports go to `reports/`.

## Edit content

Everything editable is plain TypeScript data; components never hard-code facts.

| What | File | Notes |
|---|---|---|
| Address, phones, hours, socials, rating, legal | `src/config/site.ts` | Uncertain fields carry `confirmed: false`. The hours drive the live "CE SOIR · 19H – 23H" line (Europe/Paris). |
| Menu | `src/content/menu.ts` | Validated with Zod at build time. Set `priceConfirmed: true` once checked; `price: null` shows "Prix sur place". |
| Signatures | `SIGNATURES` / `signatureIds` in `menu.ts` | A signature must have a mapped photo, or the build fails. |
| Copy, FR / EN | `src/i18n/fr.ts`, `src/i18n/en.ts` | `*word*` renders the italic serif word. The EN dictionary is type-checked against the FR one. |
| Photo ↔ dish mapping | `src/content/photo-map.ts` | See below. |

Open questions for the restaurant are listed in [`docs/CONTENT_TO_CONFIRM.md`](docs/CONTENT_TO_CONFIRM.md).

## Add photos or a new video — `pnpm assets`

Raw sources stay local and are gitignored (`photos/`, `photos-online/`, `video/`). Processed files live in `public/`.

1. Drop photos into `photos/` (jpg, png, webp, heic; any names) or a single video into `video/` (mp4, mov or webm).
2. For each new photo, add an entry in `src/content/photo-map.ts`: `kind`, `itemIds`, `confidence`, `focalPoint`, `usage`, `alt`, `process: true`. Then attach the photo id to the dish in `menu.ts` (`photos: [...]`).
3. Run:

   ```bash
   pnpm assets
   ```

   It runs these steps in order; each can also be run on its own (`pnpm assets:photos`, `assets:video`, `assets:map`, `assets:og`):

   - **photos.** Inventory and the house grade (slightly desaturated, cooler, deeper blacks). AVIF and WebP at 480/960/1600/2400 (never upscaled), a focal square thumbnail and an LQIP. EXIF and GPS are stripped. Writes `src/content/generated/images.ts`.
   - **video.** Backs up the original to `video/original/`, removes audio, outputs 24 fps at 0.92 saturation, and crossfades the loop point by 0.6 s.
     - Encodes H.264 (CRF stepped down until under 6 MB / 2.5 MB) and two-pass VP9, at 1080 and 720.
     - Writes the poster `hero-poster[-960].{avif,webp,jpg}`, each under 150 KB.
     - To choose another poster frame, look at `.cache/video/poster-candidates.jpg` and run `node scripts/video.ts --poster=<seconds>`.
   - **map.** Static street plan in the brand greens from OpenStreetMap, written to `public/images/plan-gambetta.svg`. It keeps the previous file if OSM is unreachable.
   - **og.** `public/og.jpg`, rendered with the real fonts.
   - **docs.** Regenerates `docs/PHOTO_MAP.md` with thumbnails.

Missing shots and their ideal framing: [`docs/PHOTO_REQUEST.md`](docs/PHOTO_REQUEST.md). Until they exist, intentional placeholders render (tonal green block, "PHOTO · …" caption).

## Deploy on Vercel

1. Push the repo to GitHub/GitLab and import it in Vercel. The framework preset (Next.js) is auto-detected; leave the build command as `pnpm build`.
2. Set the environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://maison-l.fr` (canonical URLs, sitemap, OG).
   - `RESERVATION_URL`: the online booking link, if any. When empty, every "Réserver" button calls the restaurant.
3. Add the custom domain in Vercel and redeploy.

Committed assets (`public/images`, `public/video`, `public/og.jpg`) are already processed, so Vercel never runs ffmpeg or sharp. Re-run `pnpm assets` locally and commit when photos or the video change.

## Docs

- [`docs/PLAN.md`](docs/PLAN.md): architecture plan.
- [`docs/COMPONENTS.md`](docs/COMPONENTS.md): what came from 21st.dev Magic and what was changed.
- [`docs/PHOTO_MAP.md`](docs/PHOTO_MAP.md), [`docs/PHOTO_SOURCES.md`](docs/PHOTO_SOURCES.md), [`docs/PHOTO_REQUEST.md`](docs/PHOTO_REQUEST.md): photos.
- [`docs/CONTENT_TO_CONFIRM.md`](docs/CONTENT_TO_CONFIRM.md): everything to validate with the restaurant.
