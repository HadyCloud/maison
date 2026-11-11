"use client";

import { useLenis } from "lenis/react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { carteFullSrc } from "@/content/carte-photos";
import { cn } from "@/lib/format";

type Props = {
  itemId: string;
  name: string;
  description: string;
  /** Already formatted, e.g. "8,00 €" or "Prix sur place". */
  price: string;
  enlargeLabel: string;
  closeLabel: string;
  className?: string;
  /** The thumbnail (a server-rendered <picture>). */
  children: ReactNode;
};

/** A dish thumbnail that opens the full photo, with its name, description and price, in a modal viewer. */
export function MenuPhoto({
  itemId,
  name,
  description,
  price,
  enlargeLabel,
  closeLabel,
  className,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${enlargeLabel}, ${name}`}
        onClick={() => setOpen(true)}
        className={cn("group relative block cursor-zoom-in overflow-hidden bg-paper-deep", className)}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute end-1 bottom-1 grid size-5 place-items-center rounded-full bg-paper/90 text-forest opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100 lg:size-7"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="size-3 lg:size-4"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5" />
          </svg>
        </span>
      </button>
      {open && (
        <Viewer
          itemId={itemId}
          name={name}
          description={description}
          price={price}
          closeLabel={closeLabel}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

/** Native <dialog>: focus trap, Esc to close and focus return to the thumbnail come from the platform. */
function Viewer({
  itemId,
  name,
  description,
  price,
  closeLabel,
  onClose,
}: Pick<Props, "itemId" | "name" | "description" | "price" | "closeLabel"> & { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const lenis = useLenis();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  // Freeze the page behind the viewer (Lenis when it runs, plain overflow otherwise).
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    lenis?.stop();
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
      lenis?.start();
    };
  }, [lenis]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: a click on the dimmed area closes the viewer; the keyboard has Esc (native dialog) and the close button
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      data-lenis-prevent
      className="m-0 h-dvh max-h-none w-dvw max-w-none items-center justify-center overflow-hidden border-0 bg-transparent p-0 open:flex backdrop:bg-forest-deep/95 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => ref.current?.close()}
        aria-label={closeLabel}
        className="absolute end-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 sm:end-6 sm:top-6"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <figure className="flex w-[min(92vw,calc(100dvh-12rem),42rem)] flex-col gap-5 transition duration-300 ease-out starting:scale-95 starting:opacity-0 motion-reduce:transition-none">
        <picture className="block aspect-square w-full overflow-hidden rounded-2xl bg-paper-deep shadow-2xl">
          <source type="image/avif" srcSet={carteFullSrc(itemId, "avif")} />
          <img
            src={carteFullSrc(itemId, "webp")}
            alt={name}
            decoding="async"
            fetchPriority="high"
            onLoad={() => setLoaded(true)}
            className={cn(
              "size-full object-cover transition-opacity duration-500 motion-reduce:transition-none",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        </picture>
        <figcaption className="text-paper">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id={titleId} className="display text-title">
              {name}
            </h2>
            <p className="label tabular whitespace-nowrap rounded-full bg-paper px-3.5 py-1.5 text-forest">
              {price}
            </p>
          </div>
          {description && <p className="mt-2 max-w-[56ch] text-cream lg:text-lg">{description}</p>}
        </figcaption>
      </figure>
    </dialog>
  );
}
