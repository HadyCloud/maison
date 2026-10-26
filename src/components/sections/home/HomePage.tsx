import type { Dictionary } from "@/i18n";
import { Hero } from "./Hero";
import { HeroAlign } from "./HeroAlign";
import { Info } from "./Info";
import { Reviews } from "./Reviews";
import { Signatures } from "./Signatures";

export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Hero dict={dict} />
      <HeroAlign />
      <Signatures dict={dict} />
      <Reviews dict={dict} />
      <Info dict={dict} />
    </>
  );
}
