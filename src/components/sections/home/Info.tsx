import { HoursTable } from "@/components/layout/HoursTable";
import { Arcade } from "@/components/ui/Arcade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { SocialLinks } from "@/components/ui/SocialLinks";
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
      className="theme-sand relative bg-[#dccfae] md:bg-[#e8dcb8] py-[clamp(2.5rem,5vw,4rem)] lg:py-24"
    >
      <Arcade className="text-[#dccfae] md:text-[#e8dcb8]" />
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 id="info-title" className="display text-headline text-fg">
              <Emphasis text={i.title} />
            </h2>
          </div>
          <ul className="label hidden flex-wrap justify-end gap-x-5 gap-y-1 text-muted md:flex">
            {i.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span aria-hidden="true" className="block size-1 rotate-45 bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 grid items-stretch gap-4 md:mt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8">
          <MapPlan dict={dict} />

          <div className="flex flex-col justify-between gap-4 rounded-[1.5rem] bg-[#ebe0c6] md:bg-[#f3ead2] p-4 shadow-[0_1px_0_rgb(0_0_0/0.05)] md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="label mb-2 text-accent">{i.address}</p>
                  <address className="text-fg not-italic leading-snug">
                    {site.address.street}
                    <br />
                    {site.address.postalCode.value} {site.address.city}
                  </address>
                  <p className="label mt-1.5 text-[0.65rem] text-muted">{site.address.metro}</p>
                  <div className="hidden sm:block">
                    <ButtonLink href={site.google.directionsUrl} variant="underline" className="mt-2">
                      {i.directions} ↗
                    </ButtonLink>
                  </div>
                </div>
                <div>
                  <p className="label mb-2 text-accent">{i.byPhone}</p>
                  <a
                    href={telHref()}
                    className="display inline-block text-[clamp(1.5rem,2.2vw,1.75rem)] text-fg leading-none tabular"
                    aria-label={`${site.phone.primary.display}, ${dict.a11y.phoneCall}`}
                    data-testid="reserve-phone"
                  >
                    {site.phone.primary.display}
                  </a>
                  {site.reservationUrl && (
                    <div className="mt-3">
                      <ButtonLink href={site.reservationUrl} variant="fill" testId="reserve-online">
                        {i.online}
                      </ButtonLink>
                    </div>
                  )}
                </div>
                <SocialLinks dict={dict} className="hidden flex-wrap items-center gap-x-3 gap-y-1 md:flex" />
              </div>
              <div className="hidden sm:block">
                <p className="label mb-2 text-accent">{i.hours}</p>
                <HoursTable dict={dict} />
              </div>
              <div className="sm:hidden">
                <p className="label mb-2 text-accent">{i.hours}</p>
                <HoursTable dict={dict} grouped />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-rule border-t pt-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <div>
                <p className="label mb-1 text-accent">{i.privatisation.label}</p>
                <p className="display text-[1.25rem] text-fg leading-snug md:text-[1.4rem]">
                  <Emphasis text={i.privatisation.line} />
                </p>
              </div>
              <div className="hidden shrink-0 self-start md:block md:self-center">
                <ButtonLink href={telHref()} variant="outline">
                  {i.privatisation.cta}
                </ButtonLink>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:hidden">
              <SocialLinks dict={dict} className="flex items-center gap-2" />
              <ul className="label flex flex-wrap items-center gap-x-5 gap-y-1 text-muted">
                {i.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span aria-hidden="true" className="block size-1 rotate-45 bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
