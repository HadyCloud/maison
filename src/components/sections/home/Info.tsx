import { HoursTable } from "@/components/layout/HoursTable";
import { Arcade } from "@/components/ui/Arcade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { Ornament } from "@/components/ui/Ornament";
import { site, telHref } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { MapPlan } from "./MapPlan";

/** Last section of the home page, the target of the "Infos" link in the top bar: map, address, phone, hours. */
export function Info({ dict }: { dict: Dictionary }) {
  const i = dict.info;
  return (
    <section
      id="infos"
      aria-labelledby="info-title"
      className="theme-forest relative bg-surface py-[clamp(5rem,10vw,9rem)]"
    >
      <Arcade className="text-forest" />
      <div className="container-x">
        <h2 id="info-title" className="display text-headline text-fg">
          <Emphasis text={i.title} />
        </h2>
        <Ornament className="mt-6" />

        <div className="grid-12 mt-12 gap-y-12 md:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="border border-accent/50 p-2 md:p-3">
              <MapPlan dict={dict} />
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-10 lg:col-span-5">
            <div>
              <p className="label mb-3 text-accent">{i.address}</p>
              <address className="text-lead text-fg not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.postalCode.value} {site.address.city}
              </address>
              <p className="label mt-2 text-accent">{site.address.metro}</p>
              <ButtonLink href={site.google.directionsUrl} variant="underline" className="mt-2">
                {i.directions} ↗
              </ButtonLink>
            </div>

            <div>
              <p className="label mb-3 text-accent">{i.byPhone}</p>
              <a
                href={telHref()}
                className="display inline-block text-[clamp(2.25rem,4.4vw,3.75rem)] text-fg leading-none tabular"
                aria-label={`${site.phone.primary.display}, ${dict.a11y.phoneCall}`}
                data-testid="reserve-phone"
              >
                {site.phone.primary.display}
              </a>
              {site.reservationUrl && (
                <div className="mt-6">
                  <ButtonLink href={site.reservationUrl} variant="fill" testId="reserve-online">
                    {i.online}
                  </ButtonLink>
                </div>
              )}
            </div>

            <div>
              <p className="label mb-3 text-accent">{i.hours}</p>
              <HoursTable dict={dict} />
              {!site.hours.confirmed && <p className="mt-3 text-accent text-xs">{i.hoursNote}</p>}
            </div>
          </div>
        </div>

        <div className="grid-12 mt-16 items-center gap-y-6 border-rule border-y py-8 md:mt-20">
          <p className="label col-span-12 text-accent md:col-span-2">{i.privatisation.label}</p>
          <p className="display col-span-12 text-title text-fg md:col-span-7">
            <Emphasis text={i.privatisation.line} />
          </p>
          <div className="col-span-12 md:col-span-3 md:justify-self-end">
            <ButtonLink href={telHref()} variant="outline">
              {i.privatisation.cta}
            </ButtonLink>
          </div>
        </div>

        <ul className="label mt-8 flex flex-wrap gap-y-3 text-fg">
          {i.amenities.map((a, n) => (
            <li key={a} className="flex items-center">
              {n > 0 && <span aria-hidden="true" className="mx-5 h-3 w-px bg-rule" />}
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
