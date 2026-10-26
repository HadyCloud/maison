import { type Dictionary, routes } from "@/i18n";

export type NavItem = { href: string; label: string };

/** Home, the menu page, and the Infos section (map + contact) at the bottom of the home page. */
export function navItems(dict: Dictionary): NavItem[] {
  return [
    { href: routes.home, label: dict.nav.home },
    { href: routes.menu, label: dict.nav.carte },
    { href: `${routes.home}#infos`, label: dict.nav.info },
  ];
}
