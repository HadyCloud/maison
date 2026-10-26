import { cn } from "@/lib/format";

/** Hairline, diamond, hairline: the small divider used under headings. Coloured by the band's accent. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-3 text-accent", className)}>
      <span className="h-px w-12 bg-current opacity-70" />
      <span className="block size-1.5 rotate-45 bg-current" />
      <span className="h-px w-12 bg-current opacity-70" />
    </div>
  );
}
