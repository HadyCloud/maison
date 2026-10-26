import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

const BOOKING = process.env.NEXT_PUBLIC_RESERVATION_URL || "tel:+33955316701";

test("reservation links point to the booking URL or the phone", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("hero-reserve")).toHaveAttribute("href", BOOKING);

  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "Infos" })
    .click();
  await expect(page.locator("#infos")).toBeInViewport({ ratio: 0.2 });
  await expect(page.getByTestId("reserve-phone")).toHaveAttribute("href", "tel:+33955316701");
  await expect(page.getByTestId("reserve-phone")).toHaveText("09 55 31 67 01");
  await expect(page.getByRole("link", { name: /Itinéraire/ }).first()).toHaveAttribute(
    "href",
    /google\.com\/maps/,
  );
  await expectNoA11yViolations(page);
});
