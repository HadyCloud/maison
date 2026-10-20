/**
 * `pnpm assets` — re-runs every asset pipeline in order. Safe to re-run after adding photos or a new video.
 *   logo   → public/brand/logo.svg + logo-mark.svg (traced from brand/maison-l-logo-source.webp)
 *   photos → public/images + src/content/generated/images.ts
 *   video  → public/video (+ backup of the original in video/original/)
 *   map    → public/images/plan-gambetta.svg (network; keeps the previous file if OSM is unreachable)
 *   og     → public/og.jpg (uses the processed photos)
 *   docs   → docs/PHOTO_MAP.md + docs/thumbs/
 */
import { execFileSync } from "node:child_process";

const steps: [string, string[], boolean][] = [
  ["logo", ["scripts/logo.ts"], true],
  ["photos", ["scripts/photos.ts"], true],
  ["video", ["scripts/video.ts", "--poster=0.2"], true],
  ["map", ["scripts/map.ts"], false],
  ["og", ["scripts/og.ts"], true],
  ["docs", ["scripts/photo-docs.ts"], true],
];

for (const [name, args, required] of steps) {
  console.log(`\n— ${name}`);
  try {
    execFileSync(process.execPath, args, { stdio: "inherit" });
  } catch (err) {
    if (required) throw err;
    console.warn(`  ${name} failed — keeping the previous output.`);
  }
}
