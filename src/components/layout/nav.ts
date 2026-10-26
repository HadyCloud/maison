import { type Dictionary, type Lang, routes } from "@/i18n";

export type NavItem = { href: string; label: string };

/** Two entries: the menu page, and the Infos section (map + contact) at the bottom of the home page. */
export function navItems(dict: Dictionary): NavItem[] {
  const lang = dict.lang as Lang;
  const home = routes.home[lang];
  return [
    { href: routes.menu[lang], label: dict.nav.carte },
    { href: `${home === "/" ? "" : home}/#infos`, label: dict.nav.info },
  ];
}
