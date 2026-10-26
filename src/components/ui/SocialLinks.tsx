import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

const icon = "size-5 fill-current";

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
      <path d="M12 7.400A4.600 4.600 0 1 0 12 16.600 4.600 4.600 0 0 0 12 7.400Zm0 7.600a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      <circle cx="17.500" cy="6.500" r="1.200" />
      <path d="M7.800 2h8.400A5.800 5.800 0 0 1 22 7.800v8.400a5.800 5.800 0 0 1-5.800 5.800H7.800A5.800 5.800 0 0 1 2 16.200V7.800A5.800 5.800 0 0 1 7.800 2Zm-.2 2A3.600 3.600 0 0 0 4 7.600v8.800A3.600 3.600 0 0 0 7.600 20h8.800a3.600 3.600 0 0 0 3.600-3.600V7.600A3.600 3.600 0 0 0 16.400 4H7.600Z" />
    </svg>
  );
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
      <path d="M13.500 22v-8.200h2.800l.5-3.300h-3.300V8.400c0-.9.400-1.700 1.800-1.700h1.600V3.800S15.600 3.500 14.400 3.500c-2.600 0-4.200 1.600-4.200 4.400v2.600H7.500v3.300h2.700V22h3.300Z" />
    </svg>
  );
}

function TikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
      <path d="M16.600 2h-3.200v13.300a2.800 2.800 0 1 1-2.800-2.800c.3 0 .6 0 .8.100V9.300a6 6 0 1 0 5.200 5.900V8.600a7.200 7.200 0 0 0 4.200 1.300V6.700A4.300 4.300 0 0 1 16.600 2Z" />
    </svg>
  );
}

const linkClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-rule text-fg transition-colors duration-500 hover:border-accent hover:text-accent";

/** Social and delivery icons: in the footer on phones, in the Infos card on desktop. */
export function SocialLinks({ dict, className }: { dict: Dictionary; className?: string }) {
  const f = dict.footer;
  return (
    <ul className={className}>
      <li>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={linkClass}
        >
          <Instagram />
        </a>
      </li>
      <li>
        <a
          href={site.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={linkClass}
        >
          <Facebook />
        </a>
      </li>
      {site.social.tiktok && (
        <li>
          <a
            href={site.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={linkClass}
          >
            <TikTok />
          </a>
        </li>
      )}
      <li>
        <a
          href={site.delivery.deliveroo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={f.delivery}
          className={linkClass}
        >
          <img src="/brand/deliveroo.png" alt="" width={103} height={128} className="h-5 w-auto" />
        </a>
      </li>
    </ul>
  );
}
