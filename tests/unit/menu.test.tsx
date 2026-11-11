import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MenuItemRow } from "@/components/sections/menu/MenuItemRow";
import { MenuSection } from "@/components/sections/menu/MenuSection";
import { dineInCategories, menu, menuItemById, signatureIds } from "@/content/menu";
import { menuSchema } from "@/content/menu-schema";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";

describe("menu data", () => {
  it("validates against the Zod schema", () => {
    expect(() => menuSchema.parse(menu)).not.toThrow();
  });

  it("marks every price as confirmed (taken from the printed menu)", () => {
    expect(menu.categories.flatMap((c) => c.items).every((i) => i.priceConfirmed === true)).toBe(true);
  });

  it("has exactly six signatures, each with a mapped photo", () => {
    const sigs = menu.categories.flatMap((c) => c.items).filter((i) => i.signature);
    expect(sigs.map((s) => s.id).sort()).toEqual([...signatureIds].sort());
    for (const s of sigs) expect(s.photoIds.length).toBeGreaterThan(0);
  });

  it("formats prices with two decimals per locale", () => {
    expect(formatPrice(8.5, "fr")).toBe("8,50 €");
    expect(formatPrice(9, "en")).toBe("€9.00");
  });
});

describe("menu list rendering", () => {
  const render2 = (ui: React.ReactElement) => render(<ul>{ui}</ul>);

  it("renders name, description and price, and no Arabic name", () => {
    const item = menuItemById("mouhammara");
    if (!item) throw new Error("missing item");
    render2(<MenuItemRow item={item} dict={fr} />);
    const row = screen.getByTestId("menu-item");
    expect(within(row).getByRole("heading", { name: /^Mouhammara/ })).toBeInTheDocument();
    expect(row.querySelector('[lang="ar"]')).toBeNull();
    expect(within(row).getByText("8,00 €")).toBeInTheDocument();
  });

  it("shows 'Prix sur place' when a price is still unknown", () => {
    const base = menuItemById("labneh-bel-toum");
    if (!base) throw new Error("missing item");
    render2(<MenuItemRow item={{ ...base, price: null }} dict={fr} />);
    expect(screen.getByText("Prix sur place")).toBeInTheDocument();
  });

  it("marks per-person pricing and piece counts in English", () => {
    const mezze = menuItemById("mezze-maison-l");
    const kebbe = menuItemById("kebbe-citrouille");
    if (!mezze || !kebbe) throw new Error("missing item");
    render2(
      <>
        <MenuItemRow item={mezze} dict={en} />
        <MenuItemRow item={kebbe} dict={en} />
      </>,
    );
    expect(screen.getByText("per person")).toBeInTheDocument();
    expect(screen.getByText(/3 pieces/)).toBeInTheDocument();
  });

  it("shows a small photo only for items that have one", () => {
    const withPhoto = menuItemById("kebbe-citrouille");
    const without = menuItemById("trilogie-houmous");
    if (!withPhoto || !without) throw new Error("missing item");
    render2(
      <>
        <MenuItemRow item={withPhoto} dict={fr} />
        <MenuItemRow item={without} dict={fr} />
      </>,
    );
    const [first, second] = screen.getAllByTestId("menu-item");
    expect(first?.querySelector("img")).toHaveAttribute("src", "/images/carte/kebbe-citrouille-480.webp");
    expect(first?.querySelector("source")).toHaveAttribute(
      "srcset",
      "/images/carte/kebbe-citrouille-240.avif 240w, /images/carte/kebbe-citrouille-480.avif 480w",
    );
    expect(second?.querySelector("img")).toBeNull();
    // The photo is the only interactive element: a button that offers to enlarge it.
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(first?.querySelector("button")).toHaveAccessibleName("Agrandir la photo, Kebbi citrouille");
    expect(second?.querySelector("button")).toBeNull();
  });

  it("renders a whole category with its heading and count", () => {
    const cat = dineInCategories[0];
    if (!cat) throw new Error("no category");
    render(<MenuSection category={cat} dict={fr} />);
    expect(screen.getByRole("heading", { level: 2, name: /Entrées froides/ })).toBeInTheDocument();
    expect(screen.getAllByTestId("menu-item")).toHaveLength(cat.items.length);
  });
});
