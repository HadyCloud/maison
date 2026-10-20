import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { images } from "@/content/generated/images";
import { menu } from "@/content/menu";
import { photoMap } from "@/content/photo-map";

const ROOT = join(__dirname, "../..");
const sourcesPresent = existsSync(join(ROOT, "photos"));

describe("photo map", () => {
  it("has unique ids and focal points inside the frame", () => {
    const ids = photoMap.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of photoMap) {
      expect(p.focalPoint.x).toBeGreaterThanOrEqual(0);
      expect(p.focalPoint.x).toBeLessThanOrEqual(1);
      expect(p.focalPoint.y).toBeGreaterThanOrEqual(0);
      expect(p.focalPoint.y).toBeLessThanOrEqual(1);
    }
  });

  it.runIf(sourcesPresent)("points every entry at an existing original", () => {
    for (const p of photoMap) expect(existsSync(join(ROOT, p.file)), p.file).toBe(true);
  });

  it("records the source URL of every online photo", () => {
    for (const p of photoMap.filter((x) => x.source === "online"))
      expect(p.sourceUrl, p.id).toMatch(/^https:\/\//);
  });

  it("has processed outputs for every photo the site uses", () => {
    for (const p of photoMap.filter((x) => x.process)) {
      const gen = images[p.id];
      expect(gen, p.id).toBeDefined();
      for (const w of gen?.widths ?? []) {
        expect(existsSync(join(ROOT, `public/images/${p.id}-${w}.avif`)), `${p.id}-${w}.avif`).toBe(true);
        expect(existsSync(join(ROOT, `public/images/${p.id}-${w}.webp`)), `${p.id}-${w}.webp`).toBe(true);
      }
      expect(gen?.lqip).toMatch(/^data:image\/webp;base64,/);
    }
  });

  it("only links menu items to processed photos that are mapped to them", () => {
    for (const item of menu.categories.flatMap((c) => c.items)) {
      for (const id of item.photoIds) {
        const entry = photoMap.find((p) => p.id === id);
        expect(entry?.process, `${item.id} → ${id}`).toBe(true);
        expect(entry?.itemIds, `${item.id} → ${id}`).toContain(item.id);
      }
    }
  });

  it("never uses low-confidence matches for signatures", () => {
    for (const p of photoMap.filter((x) => x.usage.includes("signature")))
      expect(p.confidence).not.toBe("low");
  });
});
