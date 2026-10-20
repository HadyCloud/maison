import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/menu", push: vi.fn() }));
vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useRouter: () => ({ push: nav.push }),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { LangToggle } from "@/components/layout/LangToggle";
import { alternatePath, dictionaries, langFromPath } from "@/i18n";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";

describe("language routing", () => {
  it("maps every FR route to its EN twin and back", () => {
    expect(alternatePath("/", "en")).toBe("/en");
    expect(alternatePath("/menu", "en")).toBe("/en/menu");
    expect(alternatePath("/mentions-legales", "en")).toBe("/en/legal-notice");
    expect(alternatePath("/en/menu", "fr")).toBe("/menu");
    expect(alternatePath("/en/", "fr")).toBe("/");
    expect(alternatePath("/unknown", "en")).toBe("/en");
  });

  it("detects the language from the path", () => {
    expect(langFromPath("/en/menu")).toBe("en");
    expect(langFromPath("/menu")).toBe("fr");
    expect(langFromPath("/english")).toBe("fr");
  });

  it("keeps both dictionaries structurally identical", () => {
    const keys = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === "object" && !Array.isArray(v) ? keys(v).map((s) => `${k}.${s}`) : [k],
      );
    expect(keys(dictionaries.en).sort()).toEqual(keys(dictionaries.fr).sort());
  });
});

describe("<LangToggle>", () => {
  beforeEach(() => {
    nav.pathname = "/menu";
  });

  it("links the French menu to the English menu with hreflang", () => {
    render(<LangToggle dict={fr} />);
    const link = screen.getByTestId("lang-toggle");
    expect(link).toHaveAttribute("href", "/en/menu");
    expect(link).toHaveAttribute("hreflang", "en");
    expect(link).toHaveAccessibleName("EN, read in English");
  });

  it("links the English home back to the French home", () => {
    nav.pathname = "/en";
    render(<LangToggle dict={en} />);
    expect(screen.getByTestId("lang-toggle")).toHaveAttribute("href", "/");
    expect(screen.getByText("EN")).toHaveAttribute("aria-current", "true");
  });
});
