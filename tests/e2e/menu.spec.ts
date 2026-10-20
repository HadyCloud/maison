import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("navigates from the header to /menu and the index follows the scroll", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "La Carte" })
    .click();
  await expect(page).toHaveURL(/\/menu$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/La Carte/);

  const index = page.getByTestId("menu-index");
  await expect(index.getByRole("link", { name: /Mezzés froids/ })).toHaveAttribute("aria-current", "true");

  await index.getByRole("link", { name: /Desserts/ }).click();
  await expect(index.getByRole("link", { name: /Desserts/ })).toHaveAttribute("aria-current", "true", {
    timeout: 5000,
  });
  await expect(page.locator("#desserts")).toBeInViewport();

  // Hover preview appears over items that have a photo.
  await page.locator("#mouhalabiyeh").hover();
  await expect(page.getByTestId("hover-preview").locator("img")).toBeVisible();

  // Prices are right-aligned, mono, tabular.
  const price = page.locator("#mouhalabiyeh").getByText("4,50 €");
  await expect(price).toHaveCSS("text-align", "right");
  await expectNoA11yViolations(page);
});
