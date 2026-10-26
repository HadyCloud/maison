import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("mobile overlay menu traps focus and closes on Escape", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByTestId("menu-toggle");
  await toggle.click();
  const overlay = page.locator("#mobile-menu");
  await expect(overlay).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.waitForTimeout(1600); // let the staggered reveal finish before measuring contrast
  await expectNoA11yViolations(page);

  for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
  const inside = await page.evaluate(() => {
    const a = document.activeElement;
    return (
      !!a &&
      (document.getElementById("mobile-menu")?.contains(a) || a.getAttribute("data-testid") === "menu-toggle")
    );
  });
  expect(inside).toBe(true);

  await page.keyboard.press("Escape");
  await expect(overlay).toHaveCount(0);
  await expect(toggle).toBeFocused();
});

test("mobile menu: sticky chips and full-screen photo sheet", async ({ page }) => {
  await page.goto("/menu", { waitUntil: "networkidle" }); // the photo sheet is lazy-loaded: wait until it is ready
  await expect(page.getByTestId("menu-chips")).toBeVisible();
  await page.locator("#kebbe-citrouille").scrollIntoViewIfNeeded();
  await page
    .locator("#kebbe-citrouille")
    .getByRole("button", { name: /Voir la photo/ })
    .last()
    .click();
  const sheet = page.getByTestId("photo-sheet");
  await expect(sheet).toBeVisible();
  await expect(sheet.locator("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
});
