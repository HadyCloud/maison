# Components & 21st.dev Magic log

21st.dev Magic MCP (`magic`, user scope) was connected and used to search the catalogue for every building block the brief lists.

**Limit hit:** the account is on the **free tier, 2 code retrievals per day**. Both went to the two most complex pieces (overlay menu with focus trap, cursor-following list preview). The other blocks were written by hand, informed by what the catalogue search returned (descriptions and behaviour only, no code). Re-running `get_component` after the quota resets (daily, 00:00 UTC) won't change anything: every output was rebuilt to the house tokens anyway.

No API key is stored in the repo. `PROMPT.md`, which contains one, is gitignored.

## Taken from Magic (code retrieved), then rebuilt

| Ours | Magic source | What we kept | What we changed / stripped |
|---|---|---|---|
| _(removed)_ `MobileMenu.tsx`, `useFocusTrap.ts` | Full-screen overlay menu from 21st.dev "Immersive Full Screen Navigation" | Removed: on phones the top bar now shows every link and FR · EN directly, no hamburger. |

## Searched on Magic, hand-written (no code retrieved)

| Ours | Closest Magic result(s) consulted | Notes |
|---|---|---|
| `Header.tsx` | Header 1 / Header 3 (efferd), Mega Menu Navbar | Transparent → ink 90 % + blur on scroll, outline "Réserver" that fills from the bottom, FR/EN toggle. No rounded pills, no dropdowns. |
| `ButtonLink.tsx` (CTA hovers) | — | Fill wipes `scaleY` from the bottom (700 ms, house ease); underline links draw left to right. |
| `Reveal.tsx` (`LineReveal`, `FadeIn`) | Text Reveal (Mask) — soralabs | Lines are authored explicitly (no SplitText dependency); 0.9 s, `cubic-bezier(.22,1,.36,1)`, 90 ms stagger; reduced motion → fade. Hero and `/menu` titles use a pure-CSS `.rise` so the LCP text never waits for hydration. |
| `ImageReveal.tsx` | Mask Reveal — balick; Scroll Reveal Image — unlumen | Clip-path wipe + scale settle 1.08 → 1 + optional parallax ≤ 8 %. Border-radius animation from the reference removed. |
| `SignaturesAccordion.tsx` (desktop hover) · `SignaturesTrack.tsx` (mobile swipe row) | Scroll Horizontal Gallery — motiondotdev; Horizontal Scroll Gallery — pulkitxm | Motion `useScroll` on a pinned section; height computed from the real track width; progress hairline. Mobile and reduced motion → vertical / 3-column grid. |
| `Footer.tsx` | — | Giant cropped wordmark drawn as an SVG `<text>` (decorative, outside contrast audits). |
| `Curtain.tsx` + `TransitionLink.tsx` | — | 300 ms ink cover + 300 ms reveal; same-page anchors scroll with Lenis; FR↔EN does a hard load (two root layouts). |

## Final look: what makes it not a 21st.dev demo

- Tailwind's default colours, radii and shadows are **wiped in `@theme`**, so no component can reintroduce them.
- Every interactive surface is square, monochrome and typographic. Colour only comes from food photography and the video.
- Layout is asymmetric on a 12-column grid with mono section indexes and hairlines. There are no cards on the menu, no carousels, no gradients beyond the ink hero overlay.

## Component map

```
src/components/
  layout/   SiteShell · Providers · Header · LangToggle · Footer · HoursTable · nav
  motion/   SmoothScroll (Lenis) · Curtain · TransitionLink · Reveal · ImageReveal · motion-features
  ui/       Picture · PhotoPlaceholder · ButtonLink · SectionLabel · Emphasis · JsonLd
  sections/ home/  Hero · HeroVideo · ServiceStatus · Signatures · SignaturesTrack · SignatureCard
                   Info · MapPlan · HomePage
            menu/  MenuPage · MenuSection · MenuItemRow · MenuTabs
                   Takeaway
```

## Revision (Oct 2026)

The two components taken from Magic code (the hover image list and, earlier, the cursor-follow ideas) are gone with the cursor and the menu hover preview. What remains from Magic is the full-screen mobile menu and its focus trap (`MobileMenu.tsx`, `useFocusTrap.ts`). The menu tabs (`MenuTabs.tsx`) and the signatures scroll (`SignaturesTrack.tsx`) are hand-written.

## Revision (Oct 2026): palette

New shared pieces: `Ticker` (layout), `Arcade` (ui), band themes in `globals.css`. `ButtonLink`, `LangToggle`, `HoursTable` and the menu components use semantic colours so they follow the band they sit on.
