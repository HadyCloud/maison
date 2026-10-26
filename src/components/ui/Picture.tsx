import type { CSSProperties } from "react";
import { cn } from "@/lib/format";
import { fallbackSrc, getImage, objectPosition, srcSet } from "@/lib/media";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

type Props = {
  id: string | undefined;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Caption for the tonal placeholder when the photo is missing, e.g. "Kafta Maison L". */
  placeholder?: string;
  style?: CSSProperties;
};

/** Pre-processed AVIF/WebP set with an LQIP backdrop and intrinsic dimensions (no CLS). */
export function Picture({ id, alt, sizes, className, imgClassName, priority, placeholder, style }: Props) {
  const img = id ? getImage(id) : null;
  if (!img) return <PhotoPlaceholder label={placeholder ?? alt} className={className} />;
  return (
    <picture className={cn("block overflow-hidden bg-forest-light", className)} style={style}>
      <source type="image/avif" srcSet={srcSet(img.id, img.widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(img.id, img.widths, "webp")} sizes={sizes} />
      <img
        src={fallbackSrc(img)}
        alt={alt}
        width={img.w}
        height={img.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={cn("h-full w-full object-cover", imgClassName)}
        style={{
          objectPosition: objectPosition(img),
          backgroundImage: `url(${img.lqip})`,
          backgroundSize: "cover",
          backgroundPosition: objectPosition(img),
        }}
      />
    </picture>
  );
}
