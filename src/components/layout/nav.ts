import { type Dictionary, type Lang, routes } from "@/i18n";

export type NavItem = { href: string; label: string };

export function navItems(dict: Dictionary): NavItem[] {
  const lang = dict.lang as Lang;
  const home = routes.home[lang];
  const anchor = (id: string) => (home === "/" ? `/#${id}` : `${home}#${id}`);
  return [
    { href: routes.menu[lang], label: dict.nav.carte },
    { href: anchor("chef"), label: dict.nav.chef },
    { href: anchor("signatures"), label: dict.nav.signatures },
    { href: anchor("contact"), label: dict.nav.contact },
  ];
}
