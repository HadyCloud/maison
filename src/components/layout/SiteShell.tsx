import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDictionary, type Lang } from "@/i18n";
import { restaurantJsonLd } from "@/lib/seo";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Providers } from "./Providers";

/** Shared root document for the FR and EN root layouts. */
export function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dict = getDictionary(lang);
  return (
    <html lang={lang} className={fontVariables}>
      <body className="bg-ink text-silver-300">
        <a
          href="#contenu"
          className="label sr-only z-[110] bg-silver-100 px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.a11y.skip}
        </a>
        <Providers>
          <Header dict={dict} />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer dict={dict} />
        </Providers>
        <div aria-hidden="true" className="grain" />
        <JsonLd data={restaurantJsonLd(lang)} />
      </body>
    </html>
  );
}
