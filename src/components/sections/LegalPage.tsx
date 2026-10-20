import type { ReactNode } from "react";
import { Emphasis } from "@/components/ui/Emphasis";
import { site } from "@/config/site";
import type { Dictionary, Lang } from "@/i18n";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid-12 gap-y-3 border-graphite-700 border-t py-8">
      <h2 className="label col-span-12 text-graphite-400 md:col-span-4">{title}</h2>
      <div className="col-span-12 text-silver-300 leading-relaxed md:col-span-8">{children}</div>
    </section>
  );
}

export function LegalPage({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const l = site.legal;
  return (
    <div className="container-x pt-[calc(var(--header-h)+clamp(4rem,12vh,9rem))] pb-28">
      <h1 className="display text-headline text-silver-100">
        <Emphasis text={dict.legal.title} />
      </h1>
      <div className="mt-16">
        <Block title={dict.legal.editor}>
          <p>
            {l.company}, {lang === "fr" ? "capital social" : "share capital"} {l.capital}
            <br />
            {l.rcs} · TVA {l.vat}
            <br />
            {l.registeredOffice}
            <br />
            <a
              href={`tel:${site.phone.primary.value}`}
              className="underline decoration-graphite-500 underline-offset-4"
            >
              {site.phone.primary.display}
            </a>
          </p>
        </Block>
        <Block title={dict.legal.representative}>
          <p>{l.representative.value}</p>
        </Block>
        <Block title={dict.legal.host}>
          <p>
            {l.host.name}, {l.host.address}
            <br />
            <a href={l.host.url} className="underline decoration-graphite-500 underline-offset-4">
              {l.host.url.replace("https://", "")}
            </a>
          </p>
        </Block>
        <Block title={dict.legal.ip}>
          <p>{dict.legal.ipText}</p>
        </Block>
        <Block title={dict.legal.privacy}>
          <p>{dict.legal.privacyText}</p>
        </Block>
        <Block title={dict.legal.map}>
          <p>{dict.legal.mapText}</p>
        </Block>
        <Block title={dict.legal.press}>
          <p>
            {site.press.outlet}
            {lang === "fr" ? "\u00a0: " : ": "}
            <a href={site.press[lang].url} className="underline decoration-graphite-500 underline-offset-4">
              {site.press[lang].heading}
            </a>
          </p>
        </Block>
      </div>
    </div>
  );
}
