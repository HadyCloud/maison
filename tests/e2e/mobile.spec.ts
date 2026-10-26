import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("phone top bar shows every link and the language selector, with no hamburger", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  for (const name of ["Accueil", "La Carte", "Infos"])
    await expect(nav.getByRole("link", { name })).toBeVisible();
  await expect(page.getByTestId("lang-fr")).toBeVisible();
  await expect(page.getByTestId("lang-en")).toBeVisible();
  await expect(page.getByRole("button", { name: /menu/i })).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true);
  await expectNoA11yViolations(page);

  // The links work from the bar: Infos scrolls to the last section, La Carte opens the menu.
  await nav.getByRole("link", { name: "Infos" }).click();
  await expect(page.locator("#infos")).toBeInViewport({ ratio: 0.15 });
  await page.getByTestId("lang-en").click();
  const navEn = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navEn.getByRole("link", { name: "Home" })).toBeVisible();
  await navEn.getByRole("link", { name: "Menu" }).click();
  await expect(page).toHaveURL(/\/menu$/);
});

test("mobile menu page: sticky tabs stay under the header while scrolling", async ({ page }) => {
  await page.goto("/menu", { waitUntil: "networkidle" });
  const tabs = page.getByTestId("menu-tabs");
  await expect(tabs).toBeVisible();
  await page.locator("#grillades").scrollIntoViewIfNeeded();
  await expect(tabs).toBeInViewport();
  await expect(tabs.getByRole("link", { name: /Grillades/ })).toHaveAttribute("aria-current", "true", {
    timeout: 5000,
  });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true);
});
