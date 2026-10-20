/**
 * Logo pipeline — `pnpm assets:logo`
 * Vectorises brand/maison-l-logo-source.webp (white lockup on green) into clean single-colour SVGs:
 *   public/brand/logo.svg       full lockup (frame + MAISON L + CUISINE AUTHENTIQUE LIBANAISE)
 *   public/brand/logo-mark.svg  frame + MAISON L only (for small sizes: header, curtain)
 * Paths are filled with #EDEDEF; components tint them through CSS masks, so any house grey works.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
// @ts-expect-error — potrace ships no type definitions
import potrace from "potrace";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "brand/maison-l-logo-source.webp");
const OUT = join(ROOT, "public/brand");
const SCALE = 2; // trace at 2× for smooth curves

const trace = (buf: Buffer): Promise<string> =>
  new Promise((resolve, reject) =>
    potrace.trace(
      buf,
      { threshold: 128, turdSize: 4, optTolerance: 0.4, color: "#EDEDEF", background: "transparent" },
      (err: Error | null, svg: string) => (err ? reject(err) : resolve(svg)),
    ),
  );

/** White strokes → black-on-white bitmap for potrace (it traces dark shapes). */
async function bitmap(region: { left: number; top: number; width: number; height: number }) {
  return sharp(SRC)
    .extract(region)
    .greyscale()
    .resize({ width: region.width * SCALE, kernel: "lanczos3" })
    .normalise()
    .negate()
    .png()
    .toBuffer();
}

/** Tight viewBox around the traced paths, expressed in source pixels. */
function finalize(svg: string, w: number, h: number, title: string): string {
  const paths = [...svg.matchAll(/<path[^>]*d="([^"]+)"[^>]*\/>/g)].map((m) => m[1]).join(" ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w * SCALE} ${h * SCALE}" width="${w}" height="${h}" role="img"><title>${title}</title><path fill="#EDEDEF" fill-rule="evenodd" d="${paths}"/></svg>\n`;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const meta = await sharp(SRC).metadata();
  // Find the lockup's bounding box: rows/cols that contain light pixels.
  const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width,
    minY = info.height,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if ((data[y * info.width + x] ?? 0) > 150) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
  const pad = 6;
  const full = {
    left: minX - pad,
    top: minY - pad,
    width: maxX - minX + pad * 2,
    height: maxY - minY + pad * 2,
  };
  console.log(`source ${meta.width}×${meta.height}, lockup at`, full);

  writeFileSync(
    join(OUT, "logo.svg"),
    finalize(
      await trace(await bitmap(full)),
      full.width,
      full.height,
      "Maison L, cuisine authentique libanaise",
    ),
  );

  // Mark: same frame, cropped just below the frame's bottom rule (tagline removed).
  let frameBottom = full.top;
  for (let y = full.top; y < full.top + full.height; y++) {
    let lit = 0;
    for (let x = full.left; x < full.left + 200; x++) if ((data[y * info.width + x] ?? 0) > 150) lit++;
    if (lit > 120) frameBottom = y; // the long horizontal stroke at the bottom-left of the frame
  }
  const mark = { ...full, height: frameBottom - full.top + pad };
  // Paint out the tagline (it sits between the frame's two bottom stubs), then trace like the full lockup.
  const raw = await sharp(SRC).extract(mark).greyscale().raw().toBuffer();
  const x0 = Math.round(mark.width * 0.12);
  const x1 = Math.round(mark.width * 0.88);
  for (let y = 205; y < mark.height; y++) raw.fill(0, y * mark.width + x0, y * mark.width + x1);
  const markBitmap = await sharp(raw, { raw: { width: mark.width, height: mark.height, channels: 1 } })
    .resize({ width: mark.width * SCALE, kernel: "lanczos3" })
    .normalise()
    .negate()
    .png()
    .toBuffer();
  writeFileSync(
    join(OUT, "logo-mark.svg"),
    finalize(await trace(markBitmap), mark.width, mark.height, "Maison L"),
  );
  console.log(
    `Wrote public/brand/logo.svg (${full.width}×${full.height}) and logo-mark.svg (${mark.width}×${mark.height})`,
  );
}

await main();
