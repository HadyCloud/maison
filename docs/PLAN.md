# Plan (written before coding, kept for reference)

1. **Stack.** Next.js 16 App Router, React 19 and TypeScript strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`). Tailwind v4 is CSS-first, with `@theme` tokens and Tailwind's default palette, radii and shadows wiped. Also Motion, Lenis, Zod, Biome and pnpm.
2. **Routes.** There are two root layouts:
   - `app/(fr)` serves `/`, `/menu` and `/mentions-legales` with `<html lang="fr">`.
   - `app/(en)/en` serves `/en`, `/en/menu` and `/en/legal-notice`.
   - Language pairs live in `src/i18n` and drive the toggle, hreflang and the sitemap.
3. **Rendering.** Everything is statically prerendered. Server Components are the default. Client components are reserved for interactive leaves: hero video, live "ce soir" line, Lenis, curtain, cursor, header, mobile overlay, scroll-spy, hover preview, photo sheet and the signatures scroll.
4. **Content as data.**
   - `src/config/site.ts` holds the facts, each with a `confirmed` flag.
   - `src/content/menu.ts` is the menu, Zod-validated.
   - `src/content/photo-map.ts` is the photo classification.
   - `src/content/reviews.ts` ships empty.
   - `src/content/quotes.ts` holds the chef quote with `approved: false`.
   - `src/i18n/{fr,en}.ts` are the dictionaries.
5. **Assets.** `pnpm assets` runs these pipelines, each re-runnable:
   - **photos:** sharp, grade, AVIF/WebP, focal thumbnail, LQIP.
   - **video:** ffmpeg, crossfade loop, H.264 and two-pass VP9 at 1080 and 720, poster.
   - **map:** OSM data drawn as a static greyscale SVG plan.
   - **og:** rendered by Playwright with the real fonts.
   - **docs:** regenerates `PHOTO_MAP.md`.
6. **Design.**
   - Greys only, square corners, no shadows, 1 px hairlines, mono section indexes, film grain at about 4 %.
   - Instrument Serif for display, Geist for body, Geist Mono for labels, Noto Naskh Arabic for Arabic names.
   - The chef section is the single inverted (light) block.
   - Food photos are the only colour on the page.
7. **Motion.**
   - Masked line reveals: 0.9 s, `cubic-bezier(.22,1,.36,1)`.
   - Images: clip-path wipe with a scale settle from 1.08 to 1, plus parallax up to 8 %.
   - Lenis at 1.2, a 600 ms curtain between pages, a desktop cursor.
   - Under reduced motion, all of this collapses to fades.
8. **Signatures.** Five dishes, chosen by photo quality and taken from the brief's list:
   - Houmous de betterave, Kebbé citrouille, Mouhammara, Kafta Maison L, Osmalliyeh.
   - Mezzé Maison L and Aych el saray have no photo, so they cannot be signatures.
9. **QA.**
   - Vitest: menu, hours, language, video fallback, photo map.
   - Playwright with axe: home and hero, `/menu` and scroll-spy, language switch, reservation, plus mobile overlay and sheet.
   - Screenshots at 390, 768, 1280 and 1920, Lighthouse on mobile, then a critique pass.
