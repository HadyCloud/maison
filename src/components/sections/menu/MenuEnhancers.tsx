"use client";

import dynamic from "next/dynamic";
import type { PreviewImage } from "./HoverPreview";

// Hover preview (desktop) and photo sheet are interaction-only: split out of the first-load bundle.
const HoverPreview = dynamic(() => import("./HoverPreview").then((mod) => mod.HoverPreview), { ssr: false });
const PhotoSheet = dynamic(() => import("./PhotoSheet").then((mod) => mod.PhotoSheet), { ssr: false });

type Images = Record<string, PreviewImage & { large: string; largeAvif: string }>;

export function MenuEnhancers({ images, closeLabel }: { images: Images; closeLabel: string }) {
  return (
    <>
      <HoverPreview images={images} />
      <PhotoSheet images={images} closeLabel={closeLabel} />
    </>
  );
}
