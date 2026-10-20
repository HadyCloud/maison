/**
 * QA screenshots — `pnpm screens [baseUrl]` (default http://localhost:3200, a `pnpm start` server).
 * Full-page captures of / and /menu at 390 / 768 / 1280 / 1920, plus a reduced-motion pass.
 * Scrolls through each page first so every reveal has played. Flags horizontal overflow.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Page } from "@playwright/test";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "reports/screens");
const BASE = process.argv[2] ?? "http://localhost:3200";
const WIDTHS: [number, number][] = [
  [390, 844],
  [768, 1024],
  [1280, 800],
  [1920, 1080],
];
const PAGES = ["/", "/menu"];

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(1400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const issues: string[] = [];
  for (const reduced of [false, true]) {
    for (const [w, h] of reduced ? WIDTHS.filter(([x]) => x === 390 || x === 1280) : WIDTHS) {
      const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 1,
        reducedMotion: reduced ? "reduce" : "no-preference",
      });
      const page = await ctx.newPage();
      for (const path of PAGES) {
        await page.goto(BASE + path, { waitUntil: "networkidle" });
        await scrollThrough(page);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        if (overflow > 0) issues.push(`${path} @${w}: horizontal overflow ${overflow}px`);
        const name = `${path === "/" ? "home" : path.slice(1)}-${w}${reduced ? "-reduced" : ""}`;
        await page.screenshot({ path: join(OUT, `${name}.jpg`), fullPage: true, type: "jpeg", quality: 70 });
        await page.screenshot({ path: join(OUT, `${name}-fold.jpg`), type: "jpeg", quality: 80 });
        console.log(`  ✓ ${name}`);
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(issues.length ? `Issues:\n  ${issues.join("\n  ")}` : "No horizontal overflow.");
}

await main();
