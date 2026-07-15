import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Skills from "./Skills";

/** Force window.matchMedia to report a given viewport width. */
function setViewport(width: number) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    const max = /max-width:\s*(\d+)px/.exec(query);
    const min = /min-width:\s*(\d+)px/.exec(query);
    let matches = false;
    if (max) matches = width <= Number(max[1]);
    else if (min) matches = width >= Number(min[1]);
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}

afterEach(() => vi.restoreAllMocks());

describe("Skills", () => {
  it("renders the skill list on mobile viewports", () => {
    setViewport(390);
    const { container } = render(<Skills />);

    const rows = container.querySelectorAll('button[aria-label*="proficiency"]');
    expect(rows.length).toBeGreaterThan(20);

    // The vertical list must be reachable, not hidden behind a horizontal scroller.
    expect(container.querySelector(".min-w-\\[760px\\]")).toBeNull();

    // A representative skill is actually in the document.
    expect(screen.getAllByLabelText(/^Python,/).length).toBe(1);
  });

  it("renders the treemap on desktop viewports", () => {
    setViewport(1440);
    const { container } = render(<Skills />);

    // The treemap canvas exists...
    expect(container.querySelector(".min-w-\\[760px\\]")).not.toBeNull();
  });

  it("never renders both layouts at once (duplicate layoutIds hide the mobile rows)", () => {
    for (const width of [390, 1440]) {
      setViewport(width);
      const { container, unmount } = render(<Skills />);
      const labels = [...container.querySelectorAll('button[aria-label*="proficiency"]')].map(
        (b) => b.getAttribute("aria-label"),
      );
      expect(new Set(labels).size).toBe(labels.length);
      unmount();
    }
  });
});
