import { cn } from "@/lib/format";

/** Intentional tonal block for shots still to come (docs/PHOTO_REQUEST.md). */
export function PhotoPlaceholder({
  label,
  className,
  tone = "dark",
}: {
  label: string;
  className?: string | undefined;
  tone?: "dark" | "light";
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-end overflow-hidden p-5",
        tone === "dark" ? "bg-forest-light" : "bg-cream-light",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-5 border", tone === "dark" ? "border-line" : "border-sage/40")}
      />
      <span className={cn("label relative", tone === "dark" ? "text-cream" : "text-line")}>
        Photo · {label}
      </span>
    </div>
  );
}
