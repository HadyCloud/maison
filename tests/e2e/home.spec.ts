import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./axe";

test("home: hero with poster, video and live service status", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Maison L/);
  await expect(page.getByRole("heading", { level: 1, name: "Maison L" })).toBeVisible();
  await expect(page.getByTestId("hero-poster")).toBeVisible();
  await expect(page.getByTestId("hero-poster")).toHaveAttribute("fetchpriority", "high");
  await expect(page.getByTestId("service-status")).toHaveText(/CE SOIR|CE MIDI|FERMÉ/);

  const video = page.getByTestId("hero-video");
  await expect(video).toBeAttached({ timeout: 10_000 });
  await expect(video).toHaveAttribute("aria-hidden", "true");
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.playsInline)).toBe(true);
  // The poster stays the LCP element; the video only fades in once it actually plays.
  await expect(video).toHaveAttribute("data-playing", "true", { timeout: 15_000 });

  // Home is only: hero, signatures, infos.
  await expect(page.locator("main > section")).toHaveCount(3);
  await expect(page.getByTestId("signature-card")).toHaveCount(5);
  await expectNoA11yViolations(page);
});

test("home: reduced motion shows the poster only", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByTestId("hero-poster")).toBeVisible();
  await page.waitForTimeout(2500);
  await expect(page.getByTestId("hero-video")).toHaveCount(0);
  await ctx.close();
});
