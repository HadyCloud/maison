import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CARTE_DIR, CARTE_WIDTHS, cartePhotos } from "@/content/carte-photos";
import { dineInCategories, menuItemById } from "@/content/menu";

const ROOT = join(__dirname, "../..");
/** The raw shoot stays local (like photos/): only check originals when the folder is present. */
const sourcesPresent = existsSync(join(ROOT, CARTE_DIR));

describe("la carte photos", () => {
  it("only maps dishes that exist on the dine-in carte", () => {
    const ids = new Set(dineInCategories.flatMap((c) => c.items.map((i) => i.id)));
    for (const id of Object.keys(cartePhotos)) {
      expect(menuItemById(id), id).toBeDefined();
      expect(ids.has(id), `${id} is not on the dine-in carte`).toBe(true);
    }
  });

  it("uses a valid square crop for every photo", () => {
    for (const [id, p] of Object.entries(cartePhotos)) {
      expect(p.crop.s, id).toBeGreaterThan(0.2);
      expect(p.crop.s, id).toBeLessThanOrEqual(1);
      for (const c of [p.crop.cx, p.crop.cy]) {
        expect(c, id).toBeGreaterThanOrEqual(0);
        expect(c, id).toBeLessThanOrEqual(1);
      }
    }
  });

  it("never gives two dishes the same framing of the same photo", () => {
    const seen = new Map<string, string>();
    for (const [id, p] of Object.entries(cartePhotos)) {
      const key = `${p.file}|${p.crop.cx}|${p.crop.cy}|${p.crop.s}`;
      expect(seen.get(key), `${id} duplicates ${seen.get(key)}`).toBeUndefined();
      seen.set(key, id);
    }
  });

  it("explains every match that still needs the kitchen's confirmation", () => {
    for (const [id, p] of Object.entries(cartePhotos).filter(([, x]) => x.confidence === "check"))
      expect(p.note, id).toBeTruthy();
  });

  it.runIf(sourcesPresent)("points at original files that exist, named after a platter", () => {
    for (const [id, p] of Object.entries(cartePhotos)) {
      expect(existsSync(join(ROOT, CARTE_DIR, p.file)), `${id} → ${p.file}`).toBe(true);
      expect(p.file, id).toMatch(/^[a-z0-9-]+(_[a-z0-9-]+)*\.jpg$/);
    }
  });

  it("has processed AVIF + WebP outputs for every dish, at every thumbnail width and enlarged", () => {
    for (const id of Object.keys(cartePhotos)) {
      for (const w of [...CARTE_WIDTHS, "full"]) {
        for (const ext of ["avif", "webp"]) {
          expect(existsSync(join(ROOT, `public/images/carte/${id}-${w}.${ext}`)), `${id}-${w}.${ext}`).toBe(
            true,
          );
        }
      }
    }
  });
});
