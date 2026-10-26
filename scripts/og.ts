/**
 * OG image, `pnpm assets:og`. Rendered with Playwright from a tiny HTML template: the traced logo and the real fonts
 * (Instrument Serif + Geist Mono, OFL, scripts/fonts) are used. Output: public/og.jpg (1200×630).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const ROOT = new URL("..", import.meta.url).pathname;
const font = (file: string) =>
  `data:font/ttf;base64,${readFileSync(join(ROOT, "scripts/fonts", file)).toString("base64")}`;
const photo = join(ROOT, "public/images/table-zenith-960.webp");
const photoData = existsSync(photo) ? `data:image/webp;base64,${readFileSync(photo).toString("base64")}` : "";
const logoData = `data:image/svg+xml;base64,${readFileSync(join(ROOT, "public/brand/logo.svg")).toString("base64")}`;

const html = `<!doctype html><html><head><style>
@font-face { font-family: "IS"; src: url(${font("InstrumentSerif-Regular.ttf")}); }
@font-face { font-family: "IS"; font-style: italic; src: url(${font("InstrumentSerif-Italic.ttf")}); }
@font-face { font-family: "GM"; src: url(${font("GeistMono-VF.ttf")}); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #2e431a; color: #ffffff; position: relative; overflow: hidden; }
.photo { position: absolute; right: 0; top: 0; width: 400px; height: 630px; background: url(${photoData}) center/cover; filter: saturate(.9) brightness(.85); }
.label { font-family: "GM"; font-size: 15px; letter-spacing: .14em; text-transform: uppercase; color: #dce0d0; position: absolute; left: 64px; }
.logo { position: absolute; left: 64px; bottom: 108px; width: 672px; height: auto; }
.tag { font-family: "IS"; font-style: italic; font-size: 40px; color: #eef0e7; position: absolute; left: 64px; top: 120px; }
.rule { position: absolute; left: 64px; width: 672px; bottom: 74px; height: 1px; background: #546b40; }
</style></head><body>
<div class="photo"></div>
<div class="label" style="top:60px">Lille · Gambetta</div>
<div class="tag">La générosité, à voix basse.</div>
<img class="logo" src="${logoData}" alt="">
<div class="rule"></div>
<div class="label" style="bottom:44px;color:#b3bda0">324 rue Léon Gambetta · Métro Gambetta</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(ROOT, "public/og.jpg"), type: "jpeg", quality: 88 });
await browser.close();
console.log("Wrote public/og.jpg");
