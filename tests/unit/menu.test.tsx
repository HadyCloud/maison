import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MenuItemRow } from "@/components/sections/menu/MenuItemRow";
import { MenuSection } from "@/components/sections/menu/MenuSection";
import { dineInCategories, menu, menuItemById, signatureIds, takeawayCategories } from "@/content/menu";
import { menuSchema } from "@/content/menu-schema";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";

describe("menu data", () => {
  it("validates against the Zod schema", () => {
    expect(() => menuSchema.parse(menu)).not.toThrow();
  });

  it("keeps every price unconfirmed until Jalal validates it", () => {
    expect(menu.categories.flatMap((c) => c.items).every((i) => i.priceConfirmed === false)).toBe(true);
  });

  it("has exactly five signatures, each with a mapped photo", () => {
    const sigs = menu.categories.flatMap((c) => c.items).filter((i) => i.signature);
    expect(sigs.map((s) => s.id).sort()).toEqual([...signatureIds].sort());
    for (const s of sigs) expect(s.photoIds.length).toBeGreaterThan(0);
  });

  it("separates the takeaway block from the dine-in carte", () => {
    expect(takeawayCategories.flatMap((c) => c.items).every((i) => !i.dineIn)).toBe(true);
    expect(dineInCategories.flatMap((c) => c.items).every((i) => i.dineIn)).toBe(true);
  });

  it("formats prices with two decimals per locale", () => {
    expect(formatPrice(8.5, "fr")).toBe("8,50 €");
    expect(formatPrice(9, "en")).toBe("€9.00");
  });
});

describe("menu list rendering", () => {
  const render2 = (ui: React.ReactElement) => render(<ul>{ui}</ul>);

  it("renders name, Arabic name (rtl), description and aligned price", () => {
    const item = menuItemById("mouhammara");
    if (!item) throw new Error("missing item");
    render2(<MenuItemRow item={item} dict={fr} />);
    const row = screen.getByTestId("menu-item");
    expect(within(row).getByRole("heading", { name: "Mouhammara" })).toBeInTheDocument();
    const ar = within(row).getByText(item.name.ar);
    expect(ar).toHaveAttribute("lang", "ar");
    expect(ar).toHaveAttribute("dir", "rtl");
    expect(within(row).getByText("9,00 €")).toBeInTheDocument();
  });

  it("shows 'Prix sur place' when a price is still unknown", () => {
    const item = menuItemById("labneh");
    if (!item) throw new Error("missing item");
    render2(<MenuItemRow item={item} dict={fr} />);
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
    const without = menuItemById("taboule");
    if (!withPhoto || !without) throw new Error("missing item");
    render2(
      <>
        <MenuItemRow item={withPhoto} dict={fr} />
        <MenuItemRow item={without} dict={fr} />
      </>,
    );
    const [first, second] = screen.getAllByTestId("menu-item");
    expect(first?.querySelector("img")).toHaveAttribute("src", "/images/kebbe-citrouille-sq.webp");
    expect(second?.querySelector("img")).toBeNull();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a whole category with its heading and count", () => {
    const cat = dineInCategories[0];
    if (!cat) throw new Error("no category");
    render(<MenuSection category={cat} dict={fr} />);
    expect(screen.getByRole("heading", { level: 2, name: /Mezzés froids/ })).toBeInTheDocument();
    expect(screen.getAllByTestId("menu-item")).toHaveLength(cat.items.length);
  });
});
