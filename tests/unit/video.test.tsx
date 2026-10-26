import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Motion caches the reduced-motion query globally; drive it directly instead.
const motionPref = vi.hoisted(() => ({ reduce: false }));
vi.mock("motion/react", () => ({ useReducedMotion: () => motionPref.reduce }));

import { HeroVideo, pickTier } from "@/components/sections/home/HeroVideo";
import { observers } from "../setup";

describe("pickTier", () => {
  it("serves 720p on phones, Save-Data and slow networks", () => {
    expect(pickTier(390, undefined)).toBe("720");
    expect(pickTier(1440, { saveData: true })).toBe("720");
    expect(pickTier(1440, { effectiveType: "3g" })).toBe("720");
    expect(pickTier(1440, { effectiveType: "slow-2g" })).toBe("720");
    expect(pickTier(1440, { effectiveType: "4g" })).toBe("1080");
  });
});

describe("<HeroVideo> fallback", () => {
  let play: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observers.length = 0;
    motionPref.reduce = false;
    play = vi.fn().mockRejectedValue(new DOMException("autoplay blocked", "NotAllowedError"));
    Object.defineProperty(HTMLMediaElement.prototype, "play", { configurable: true, value: play });
    Object.defineProperty(HTMLMediaElement.prototype, "pause", { configurable: true, value: vi.fn() });
  });
  it("never renders a video under prefers-reduced-motion (poster only)", async () => {
    motionPref.reduce = true;
    render(<HeroVideo />);
    await new Promise((r) => setTimeout(r, 800));
    expect(screen.queryByTestId("hero-video")).not.toBeInTheDocument();
  });

  it("stays invisible over the poster when autoplay is refused", async () => {
    render(<HeroVideo />);
    const video = await screen.findByTestId("hero-video", {}, { timeout: 2000 });
    expect(video.querySelector("source")?.getAttribute("src")).toMatch(/hero-(720|1080)\.mp4$/);
    await act(async () => {
      for (const o of observers) o.cb([{ isIntersecting: true, target: video }]);
    });
    await waitFor(() => expect(play).toHaveBeenCalled());
    expect(video).toHaveAttribute("data-playing", "false");
    expect(video.className).toContain("opacity-0");
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect((video as HTMLVideoElement).muted).toBe(true);
  });

  it("fades in once playback actually starts", async () => {
    play.mockResolvedValue(undefined);
    render(<HeroVideo />);
    const video = await screen.findByTestId("hero-video", {}, { timeout: 2000 });
    fireEvent.playing(video);
    expect(video).toHaveAttribute("data-playing", "true");
    expect(video.className).toContain("opacity-100");
  });
});
