import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

/** matchMedia stub; tests flip `window.__media` to emulate reduced motion / pointer / width queries. */
const media: Record<string, boolean> = {};
(window as unknown as { __media: Record<string, boolean> }).__media = media;
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: Object.entries(media).some(([k, v]) => v && query.includes(k)),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
export const observers: { cb: IOCallback; targets: Element[] }[] = [];
class IO {
  targets: Element[] = [];
  constructor(public cb: IOCallback) {
    observers.push(this);
  }
  observe(el: Element) {
    this.targets.push(el);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IO });
Object.defineProperty(globalThis, "IntersectionObserver", { writable: true, value: IO });

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "ResizeObserver", { writable: true, value: RO });
