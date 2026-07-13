import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom lacks these browser APIs that some components/libraries touch.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = IO as unknown as typeof IntersectionObserver;
window.ResizeObserver = IO as unknown as typeof ResizeObserver;
