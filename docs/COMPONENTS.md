# Components & 21st.dev Magic log

21st.dev Magic MCP (`magic`, user scope) was connected and used to search the catalogue for every building block the brief lists.

**Limit hit:** the account is on the **free tier, 2 code retrievals per day**. Both went to the two most complex pieces (overlay menu with focus trap, cursor-following list preview). The other blocks were written by hand, informed by what the catalogue search returned (descriptions and behaviour only, no code). Re-running `get_component` after the quota resets (daily, 00:00 UTC) won't change anything: every output was rebuilt to the house tokens anyway.

No API key is stored in the repo. `PROMPT.md`, which contains one, is gitignored.

## Taken from Magic (code retrieved), then rebuilt

| Ours | Magic source | What we kept | What we changed / stripped |
|---|---|---|---|
| `src/components/layout/MobileMenu.tsx` + `useFocusTrap.ts` | **Immersive Full Screen Navigation** — hyperiux (`id 27229`) | Focus-trap logic (visible-focusables filter, Tab/Shift+Tab wrap, Escape, focus restore); clip-path wipe from the bottom; staggered link reveal; body scroll lock | Rewritten from GSAP to Motion; GSAP dependency dropped. Orange overlay → `graphite-900`. Hamburger bars → mono text toggle ("MENU / FERMER"). Image row, social SVG icons and agency block removed. Links in Instrument Serif with mono indexes on hairlines. Phone, address, socials as text. Lenis paused while open. Reduced motion → 0.2 s fade. |
| `src/components/sections/menu/HoverPreview.tsx` | **Hover Image List** — educalvolpz (`id 28258`) | rAF-batched pointer tracking, spring follow (values slowed), hover-device detection, reduced-motion fallback | Rows are no longer rendered by the component: it now attaches by **event delegation** to server-rendered `[data-preview]` rows, so the menu ships no per-row JS. `rounded-2xl`, `shadow-xl`, skew effect, `lucide` arrow icon and `text-brand` colour removed. Added a clip-path reveal (bottom → top), fixed 280×350 size, a viewport clamp, and a ◉ PHOTO marker plus photo-sheet button for keyboard users. |

## Searched on Magic, hand-written (no code retrieved)

| Ours | Closest Magic result(s) consulted | Notes |
|---|---|---|
| `Header.tsx` | Header 1 / Header 3 (efferd), Mega Menu Navbar | Transparent → ink 90 % + blur on scroll, outline "Réserver" that fills from the bottom, FR/EN toggle. No rounded pills, no dropdowns. |
| `ButtonLink.tsx` (CTA hovers) | — | Fill wipes `scaleY` from the bottom (700 ms, house ease); underline links draw left to right. |
| `Reveal.tsx` (`LineReveal`, `FadeIn`) | Text Reveal (Mask) — soralabs | Lines are authored explicitly (no SplitText dependency); 0.9 s, `cubic-bezier(.22,1,.36,1)`, 90 ms stagger; reduced motion → fade. Hero and `/menu` titles use a pure-CSS `.rise` so the LCP text never waits for hydration. |
| `ImageReveal.tsx` | Mask Reveal — balick; Scroll Reveal Image — unlumen | Clip-path wipe + scale settle 1.08 → 1 + optional parallax ≤ 8 %. Border-radius animation from the reference removed. |
| `SignaturesTrack.tsx` (horizontal scroll) | Scroll Horizontal Gallery — motiondotdev; Horizontal Scroll Gallery — pulkitxm | Motion `useScroll` on a pinned section; height computed from the real track width; progress hairline. Mobile and reduced motion → vertical / 3-column grid. |
| `MenuIndex.tsx` (scroll-spy) | Scroll Spy — ddoemonn; Table of Contents — inference-sh | IntersectionObserver spy, desktop sticky index with progress hairline, mobile sticky chips (square, filled when active). No sliding pill. |
| `Footer.tsx` | — | Giant cropped wordmark drawn as an SVG `<text>` (decorative, outside contrast audits). |
| `Curtain.tsx` + `TransitionLink.tsx` | — | 300 ms ink cover + 300 ms reveal; same-page anchors scroll with Lenis; FR↔EN does a hard load (two root layouts). |

## Final look: what makes it not a 21st.dev demo

- Tailwind's default colours, radii and shadows are **wiped in `@theme`**, so no component can reintroduce them.
- Every interactive surface is square, monochrome and typographic. Colour only comes from food photography and the video.
- Layout is asymmetric on a 12-column grid with mono section indexes and hairlines. There are no cards on the menu, no carousels, no gradients beyond the ink hero overlay.

## Component map

```
src/components/
  layout/   SiteShell · Providers · Header · MobileMenu · useFocusTrap · LangToggle · Footer · HoursTable · nav
  motion/   SmoothScroll (Lenis) · Curtain · TransitionLink · Reveal · ImageReveal · motion-features
  ui/       Picture · PhotoPlaceholder · ButtonLink · SectionLabel · Emphasis · JsonLd
  sections/ home/  Hero · HeroVideo · ServiceStatus · Story · Chef · Signatures · SignaturesTrack · SignatureCard
                   Interlude · Reviews · Reserve · MapPlan · HomePage
            menu/  MenuPage · MenuSection · MenuItemRow · MenuIndex (+ MenuChips) · HoverPreview · PhotoSheet
                   MenuEnhancers · Takeaway
            LegalPage
```
