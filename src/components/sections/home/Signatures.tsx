import { LineReveal } from "@/components/motion/Reveal";
import { Arcade } from "@/components/ui/Arcade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { Ornament } from "@/components/ui/Ornament";
import { menuItemById, signatureIds } from "@/content/menu";
import { type Dictionary, type Lang, routes } from "@/i18n";
import { SignaturesAccordion } from "./SignaturesAccordion";
import { SignaturesStack } from "./SignaturesStack";

export function Signatures({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const items = signatureIds.map((id) => menuItemById(id)).filter((i) => i !== undefined);
  return (
    <section
      id="signatures"
      aria-labelledby="signatures-title"
      className="theme-paper relative bg-surface pb-10 md:pb-14 lg:pb-0"
    >
      <Arcade className="text-paper" />
      <div className="container-x flex flex-col gap-4 pt-[var(--band-gap)] md:flex-row md:items-end md:justify-between lg:hidden">
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
      <SignaturesStack
        items={items}
        lang={lang}
        priceTbd={dict.menuPage.priceTbd}
        cta={dict.signatures.discover}
      />
      <div className="container-x hidden pt-[var(--band-gap)] lg:flex lg:items-end lg:justify-between">
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
