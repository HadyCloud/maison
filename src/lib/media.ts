import { type GeneratedImage, images } from "@/content/generated/images";

export type ImageSet = GeneratedImage & { id: string };

export function getImage(id: string): ImageSet | null {
  const img = images[id];
  return img ? { ...img, id } : null;
}

export function srcSet(id: string, widths: readonly number[], ext: "avif" | "webp"): string {
  return widths.map((w) => `/images/${id}-${w}.${ext} ${w}w`).join(", ");
}

export function fallbackSrc(img: ImageSet): string {
  const w = img.widths.find((x) => x >= 960) ?? img.widths.at(-1);
  return `/images/${img.id}-${w}.webp`;
}

export function objectPosition(img: Pick<GeneratedImage, "focal">): string {
  return `${Math.round(img.focal.x * 100)}% ${Math.round(img.focal.y * 100)}%`;
}

export const thumbSrc = (id: string, ext: "avif" | "webp") => `/images/${id}-sq.${ext}`;
