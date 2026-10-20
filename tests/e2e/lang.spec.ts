import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("switches language and keeps the same page", async ({ page }) => {
  await page.goto("/menu");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/menu$/);

  await page.getByRole("banner").getByTestId("lang-toggle").click();
  await expect(page).toHaveURL(/\/en\/menu$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/The Menu/);
  await expectNoA11yViolations(page);

  await page.getByRole("banner").getByTestId("lang-toggle").click();
  await expect(page).toHaveURL(/\/menu$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});
