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
