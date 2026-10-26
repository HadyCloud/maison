import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("goes from the top bar to La Carte; the tabs follow the scroll", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "La Carte" })
    .click();
  await expect(page).toHaveURL(/\/menu$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/La Carte/);

  const tabs = page.getByTestId("menu-tabs");
  await expect(tabs.getByRole("link", { name: "Mezzés froids" })).toHaveAttribute("aria-current", "true");
  await tabs.getByRole("link", { name: "Desserts" }).click();
  await expect(tabs.getByRole("link", { name: "Desserts" })).toHaveAttribute("aria-current", "true", {
    timeout: 5000,
  });
  await expect(page.locator("#desserts")).toBeInViewport();

  // Prices share one right-aligned column, in euros with two decimals.
  await expect(page.locator("#mouhalabiyeh").getByText("4,50 €")).toBeVisible();
  await expect(page.locator("#mouhalabiyeh img")).toHaveCount(1);
  await expectNoA11yViolations(page);
});

test("a signature on the home page links to its dish on the menu", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("signature-card").first().getByRole("link").click();
  await expect(page).toHaveURL(/\/menu#houmous-betterave$/);
  await expect(page.locator("#houmous-betterave")).toBeInViewport();
});
