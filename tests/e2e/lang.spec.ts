import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("French by default; the button switches language in place and remembers it", async ({ page }) => {
  await page.goto("/menu");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/La Carte/);
  expect((await page.context().cookies()).find((c) => c.name === "lang")).toBeUndefined();

  await page.getByRole("banner").getByTestId("lang-en").click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Menu/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveURL(/\/menu$/);
  await expectNoA11yViolations(page);

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();

  await page.getByRole("banner").getByTestId("lang-fr").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});
