"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { type Dictionary, LANG_COOKIE, type Lang } from "@/i18n";
import { cn } from "@/lib/format";

const LANGS: Lang[] = ["fr", "en", "ar"];

/**
 * FR · EN · AR buttons. Switching stays on the same page: it stores the choice in a small preference cookie
 * (only set when the visitor clicks) and asks the server to re-render the page in that language.
 */
export function LangToggle({ dict, className }: { dict: Dictionary; className?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const current = dict.lang as Lang;

  const choose = (lang: Lang) => {
    if (lang === current) return;
    // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is not available in every browser yet
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <nav
      aria-label={dict.a11y.language}
      aria-busy={pending}
      className={cn("flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.3em]", className)}
    >
      {LANGS.map((lang, i) => (
        <span key={lang} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="text-muted">
              ·
            </span>
          )}
          <button
            type="button"
            lang={lang}
            aria-pressed={lang === current}
            aria-label={`${lang.toUpperCase()}, ${dict.a11y.langNames[lang]}`}
            onClick={() => choose(lang)}
            data-testid={`lang-${lang}`}
            className={cn(
              "inline-flex min-h-11 min-w-8 items-center justify-center uppercase tracking-[inherit] transition-colors duration-500",
              lang === current ? "text-fg" : "text-muted hover:text-fg",
            )}
          >
            {lang}
          </button>
        </span>
      ))}
    </nav>
  );
}
