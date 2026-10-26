import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ refresh: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));

import { LangToggle } from "@/components/layout/LangToggle";
import { dictionaries, LANG_COOKIE, parseLang } from "@/i18n";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";

describe("language preference", () => {
  it("is French unless the cookie says English", () => {
    expect(parseLang(undefined)).toBe("fr");
    expect(parseLang("")).toBe("fr");
    expect(parseLang("de")).toBe("fr");
    expect(parseLang("en")).toBe("en");
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
    router.refresh.mockClear();
    // biome-ignore lint/suspicious/noDocumentCookie: resetting the cookie jar between tests
    document.cookie = `${LANG_COOKIE}=; max-age=0; path=/`;
  });

  it("marks the current language and offers the other one", () => {
    render(<LangToggle dict={fr} />);
    expect(screen.getByTestId("lang-fr")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("lang-en")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("lang-en")).toHaveAccessibleName("EN, English");
  });

  it("stores the choice and re-renders the same page, without navigating", () => {
    render(<LangToggle dict={fr} />);
    fireEvent.click(screen.getByTestId("lang-en"));
    expect(document.cookie).toContain(`${LANG_COOKIE}=en`);
    expect(router.refresh).toHaveBeenCalledTimes(1);
  });

  it("does nothing when the current language is clicked", () => {
    render(<LangToggle dict={en} />);
    fireEvent.click(screen.getByTestId("lang-en"));
    expect(router.refresh).not.toHaveBeenCalled();
    expect(document.cookie).not.toContain(`${LANG_COOKIE}=`);
  });
});
