import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { MenuItemRow } from "@/components/sections/menu/MenuItemRow";
import { menuItemById } from "@/content/menu";
import type { Dictionary } from "@/i18n";
import { ar } from "@/i18n/ar";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";

// jsdom has no modal <dialog>: give it the minimum the viewer relies on.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

function row(id: string, dict: Dictionary = fr) {
  const item = menuItemById(id);
  if (!item) throw new Error(`missing item ${id}`);
  render(
    <ul>
      <MenuItemRow item={item} dict={dict} />
    </ul>,
  );
}

describe("tap-to-enlarge photo", () => {
  it("opens the full photo with the dish name, description and price", async () => {
    row("mouhalabiyeh");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Agrandir la photo, Mouhalabiyé" }));

    const dialog = screen.getByRole("dialog", { name: "Mouhalabiyé" });
    const img = dialog.querySelector("img");
    expect(img).toHaveAttribute("src", "/images/carte/mouhalabiyeh-full.webp");
    expect(img).toHaveAttribute("alt", "Mouhalabiyé");
    expect(dialog.querySelector("source")).toHaveAttribute("srcset", "/images/carte/mouhalabiyeh-full.avif");
    expect(dialog).toHaveTextContent("4,50 €");
    expect(dialog).toHaveTextContent(/Flan libanais/);
  });

  it("closes from the close button and puts the page back", async () => {
    row("mouhalabiyeh");
    await userEvent.click(screen.getByRole("button", { name: /Agrandir la photo/ }));
    expect(document.documentElement.style.overflow).toBe("hidden");

    await userEvent.click(screen.getByRole("button", { name: "Fermer la photo" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("closes when the dimmed area is clicked, but not when the photo is", async () => {
    row("mouhalabiyeh");
    await userEvent.click(screen.getByRole("button", { name: /Agrandir la photo/ }));
    const dialog = screen.getByRole("dialog", { hidden: true });

    await userEvent.click(dialog.querySelector("img") as HTMLElement);
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();

    await userEvent.click(dialog);
    expect(screen.queryByRole("dialog", { hidden: true })).not.toBeInTheDocument();
  });

  it("is labelled in English", () => {
    row("mouhalabiyeh", en);
    expect(screen.getByRole("button", { name: /^Enlarge photo, / })).toBeInTheDocument();
  });

  it("is labelled in Arabic", () => {
    row("mouhalabiyeh", ar);
    expect(screen.getByRole("button", { name: /^تكبير الصورة, / })).toBeInTheDocument();
  });
});
