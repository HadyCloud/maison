/**
 * La carte photo pipeline — `pnpm assets:carte`
 * For each entry of src/content/carte-photos.ts: cut its square crop from the original in "jalal photos/"
 * (originals are never modified), resize to every CARTE_WIDTHS (row thumbnails) plus one "-full" size
 * (tap-to-enlarge viewer), encode AVIF + WebP into public/images/carte/.
 * Metadata (EXIF/GPS) is dropped by sharp. Outputs no longer in the manifest are removed.
 * The shared pipeline (`pnpm assets:photos`, used by the home page) is not involved.
 */
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import {
  CARTE_DIR,
  CARTE_FULL_WIDTH,
  CARTE_WIDTHS,
  type CartePhoto,
  cartePhotos,
} from "../src/content/carte-photos.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, CARTE_DIR);
const OUT = join(ROOT, "public/images/carte");

async function box(file: string, crop: CartePhoto["crop"]) {
  const meta = await sharp(file).metadata();
  const w = meta.autoOrient?.width ?? meta.width;
  const h = meta.autoOrient?.height ?? meta.height;
  const side = Math.min(Math.round(crop.s * w), w, h);
  const left = Math.min(Math.max(Math.round(crop.cx * w - side / 2), 0), w - side);
  const top = Math.min(Math.max(Math.round(crop.cy * h - side / 2), 0), h - side);
  return { left, top, width: side, height: side };
}

async function render(itemId: string, photo: CartePhoto): Promise<number> {
  const file = join(SRC, photo.file);
  if (!existsSync(file)) throw new Error(`carte photo "${itemId}" points to a missing file: ${photo.file}`);
  const region = await box(file, photo.crop);
  // Never upscale: skip widths larger than the crop, but always keep at least the largest that fits.
  const fitting = CARTE_WIDTHS.filter((w) => w <= region.width);
  const widths = fitting.length ? fitting : [region.width];
  for (const w of widths) {
    const square = sharp(file)
      .rotate()
      .extract(region)
      .resize(w, w, { kernel: "lanczos3" })
      .sharpen({ sigma: 0.5 });
    await square
      .clone()
      .avif({ quality: 62, effort: 6 })
      .toFile(join(OUT, `${itemId}-${w}.avif`));
    await square
      .clone()
      .webp({ quality: 82, effort: 6 })
      .toFile(join(OUT, `${itemId}-${w}.webp`));
  }

  // Enlarged version for the viewer: same crop, up to CARTE_FULL_WIDTH, never upscaled, sharpened only if shrunk.
  const full = Math.min(CARTE_FULL_WIDTH, region.width);
  let big = sharp(file).rotate().extract(region);
  if (full < region.width) big = big.resize(full, full, { kernel: "lanczos3" }).sharpen({ sigma: 0.4 });
  await big
    .clone()
    .avif({ quality: 58, effort: 6 })
    .toFile(join(OUT, `${itemId}-full.avif`));
  await big
    .clone()
    .webp({ quality: 78, effort: 6 })
    .toFile(join(OUT, `${itemId}-full.webp`));
  return region.width;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const entries = Object.entries(cartePhotos);
  for (const [itemId, photo] of entries) {
    const side = await render(itemId, photo);
    console.log(`  ✓ ${itemId.padEnd(24)} ← ${photo.file} (crop ${side}px)`);
  }

  const keep = new Set(
    entries.flatMap(([id]) =>
      [...CARTE_WIDTHS, "full"].flatMap((w) => [`${id}-${w}.avif`, `${id}-${w}.webp`]),
    ),
  );
  for (const name of readdirSync(OUT).filter((n) => !keep.has(n))) {
    unlinkSync(join(OUT, name));
    console.log(`  – removed stale ${name}`);
  }
  const bytes = readdirSync(OUT).reduce((n, f) => n + statSync(join(OUT, f)).size, 0);
  console.log(
    `Wrote ${readdirSync(OUT).length} files for ${entries.length} dishes (${(bytes / 1e6).toFixed(1)} MB).`,
  );
}

await main();
