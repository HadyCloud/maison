import { existsSync } from "node:fs";
import { join } from "node:path";
import { preload } from "react-dom";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { Picture } from "@/components/ui/Picture";
import { bookingHref } from "@/config/site";
import { type Dictionary, routes } from "@/i18n";
import { HeroVideo } from "./HeroVideo";

const hasVideo = () => existsSync(join(process.cwd(), "public/video/hero-1080.mp4"));

function Poster() {
  return (
    <picture>
      <source media="(max-width: 767px)" type="image/avif" srcSet="/video/hero-poster-960.avif" />
      <source media="(max-width: 767px)" type="image/webp" srcSet="/video/hero-poster-960.webp" />
      <source type="image/avif" srcSet="/video/hero-poster.avif" />
      <source type="image/webp" srcSet="/video/hero-poster.webp" />
      <img
        src="/video/hero-poster.jpg"
        alt=""
        width={1440}
        height={1080}
        fetchPriority="high"
        decoding="sync"
        data-testid="hero-poster"
        className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
      />
    </picture>
  );
}

export function Hero({ dict }: { dict: Dictionary }) {
  // The lockup is a CSS mask (fetched in CORS mode): preload it to match.
  preload("/brand/logo.svg", { as: "image", crossOrigin: "anonymous", fetchPriority: "high" });
  const video = hasVideo();
  return (
    <section
      aria-labelledby="hero-title"
      className="theme-forest relative h-[100svh] min-h-[600px] overflow-hidden bg-wood-dark"
    >
      <div className="absolute inset-0">
        {video ? (
          <>
            <Poster />
            <HeroVideo />
          </>
        ) : (
          <Picture id="salle" alt="" sizes="100vw" priority className="absolute inset-0 h-full w-full" />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,10,0.42)_0%,rgba(26,18,10,0.4)_45%,rgba(26,18,10,0.82)_100%)]"
        />
      </div>

      <div className="container-x absolute inset-x-0 bottom-0 pb-[calc(var(--band-gap)*0.8)]">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 id="hero-title" className="text-white">
              <span className="sr-only">Maison L, cuisine authentique libanaise</span>
              {/* The logo is the LCP element: painted immediately, no entrance delay. */}
              <Logo className="w-full max-w-[min(100%,60rem)]" />
            </h1>
          </div>
          <div className="fade-in col-span-12 flex flex-wrap items-center gap-x-8 gap-y-3 [animation-delay:650ms] lg:col-span-4 lg:justify-end">
            <ButtonLink href={bookingHref()} variant="fill" testId="hero-reserve">
              {dict.hero.reserve}
            </ButtonLink>
            <ButtonLink href={routes.menu} variant="underline">
              {dict.hero.menu}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
