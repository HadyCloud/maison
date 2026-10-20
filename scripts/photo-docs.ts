/**
 * `node scripts/photo-docs.ts` — regenerates docs/PHOTO_MAP.md (+ docs/thumbs/) from src/content/photo-map.ts.
 * Low-confidence matches are listed first so they can be checked quickly.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { type PhotoEntry, photoMap } from "../src/content/photo-map.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const THUMBS = join(ROOT, "docs/thumbs");
mkdirSync(THUMBS, { recursive: true });

const order: Record<PhotoEntry["confidence"], number> = { low: 0, medium: 1, high: 2 };
const rows = [...photoMap].sort(
  (a, b) => order[a.confidence] - order[b.confidence] || a.id.localeCompare(b.id),
);

const lines: string[] = [];
for (const p of rows) {
  const src = join(ROOT, p.file);
  if (existsSync(src))
    await sharp(src)
      .rotate()
      .resize(140, 140, { fit: "cover" })
      .jpeg({ quality: 70 })
      .toFile(join(THUMBS, `${p.id}.jpg`));
  const file = p.file.split("/").pop() ?? p.file;
  lines.push(
    `| <img src="thumbs/${p.id}.jpg" width="90" alt=""> | \`${p.id}\` | ${p.confidence} | ${p.kind} | ${p.itemIds.map((i) => `\`${i}\``).join(", ") || "—"} | ${p.usage.join(", ") || "—"} | ${p.process ? "✓" : "—"} | ${p.source} | ${p.notes.replaceAll("|", "/")} <br><sub>${file}</sub> |`,
  );
}

const counts = {
  total: photoMap.length,
  folder: photoMap.filter((p) => p.source === "folder").length,
  online: photoMap.filter((p) => p.source === "online").length,
  used: photoMap.filter((p) => p.process).length,
  high: photoMap.filter((p) => p.confidence === "high").length,
  medium: photoMap.filter((p) => p.confidence === "medium").length,
  low: photoMap.filter((p) => p.confidence === "low").length,
};

const md = `# Photo map

Generated from \`src/content/photo-map.ts\` by \`node scripts/photo-docs.ts\` — edit the TS file, not this table.

**${counts.total} photos inventoried** (${counts.folder} from \`photos/\`, ${counts.online} downloaded from the restaurant's own listings) ·
**${counts.used} processed** for the site · confidence: **${counts.high} high**, ${counts.medium} medium, ${counts.low} low.
No photo of the printed menu was found in \`photos/\`, so the seed menu (Deliveroo / Privateaser / eatbu) stands.

Low-confidence rows come first. "Used" = processed into \`public/images\` (AVIF + WebP, 480/960/1600/2400 capped at source width, focal-crop square thumb, LQIP, EXIF/GPS stripped, house grade).

| | id | confidence | kind | menu items | usage | used | source | notes / original |
|---|---|---|---|---|---|---|---|---|
${lines.join("\n")}
`;
writeFileSync(join(ROOT, "docs/PHOTO_MAP.md"), md);
console.log(`Wrote docs/PHOTO_MAP.md (${rows.length} rows)`);
