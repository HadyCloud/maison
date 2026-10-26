import { LineReveal } from "@/components/motion/Reveal";
import { Arcade } from "@/components/ui/Arcade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { Ornament } from "@/components/ui/Ornament";
import { menuItemById, signatureIds } from "@/content/menu";
import { type Dictionary, type Lang, routes } from "@/i18n";
import { SignatureCard } from "./SignatureCard";
import { SignaturesAccordion } from "./SignaturesAccordion";
import { SignaturesTrack } from "./SignaturesTrack";

export function Signatures({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const items = signatureIds.map((id) => menuItemById(id)).filter((i) => i !== undefined);
  return (
    <section
      id="signatures"
      aria-labelledby="signatures-title"
      className="theme-paper relative bg-surface pb-20 md:pb-14 lg:pb-0"
    >
      <Arcade className="text-paper" />
      <SignaturesTrack
        intro={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:w-[26vw] lg:shrink-0 lg:flex-col lg:items-start lg:justify-between lg:gap-10 lg:self-stretch">
            <div>
              <LineReveal
                as="h2"
                className="display text-headline text-fg"
                lines={[<Emphasis key="t" text={dict.signatures.title} />]}
              />
              <span id="signatures-title" className="sr-only">
                {dict.signatures.label}
              </span>
              <Ornament className="mt-4" />
            </div>
            <ButtonLink href={routes.menu} variant="underline" className="self-start">
              {dict.signatures.all} →
            </ButtonLink>
          </div>
        }
      >
        {items.map((item, i) => (
          <SignatureCard key={item.id} item={item} index={i} lang={lang} priceTbd={dict.menuPage.priceTbd} />
        ))}
      </SignaturesTrack>
      <div className="container-x hidden lg:flex lg:pt-24 lg:items-end lg:justify-between">
        <div>
          <LineReveal
            as="h2"
            className="display text-headline text-fg"
            lines={[<Emphasis key="t" text={dict.signatures.title} />]}
          />
          <Ornament className="mt-4" />
        </div>
        <ButtonLink href={routes.menu} variant="underline">
          {dict.signatures.all} →
        </ButtonLink>
      </div>
      <SignaturesAccordion
        items={items}
        lang={lang}
        priceTbd={dict.menuPage.priceTbd}
        cta={dict.signatures.discover}
      />
    </section>
  );
}
