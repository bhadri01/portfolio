import { render, act } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Preloader from "./Preloader";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

/** Flush pending promise jobs while fake timers are installed. */
async function flush() {
  for (let i = 0; i < 5; i++) await act(async () => { await Promise.resolve(); });
}

describe("Preloader", () => {
  it("calls onDone and removes itself, without any animation frame running", async () => {
    vi.useFakeTimers();
    // Hard-guarantee: nothing here may depend on rAF. Chrome freezes rAF on
    // backgrounded tabs, and this overlay covers the entire site.
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);

    const onDone = vi.fn();
    const { container } = render(<Preloader onDone={onDone} />);
    expect(container.querySelector('[aria-label="Loading"]')).not.toBeNull();

    await flush();
    // Safety cap fires even if asset/chunk loading never settles.
    await act(async () => { vi.advanceTimersByTime(6000); });
    await flush();
    // Reveal delay.
    await act(async () => { vi.advanceTimersByTime(1400); });
    await flush();

    expect(onDone).toHaveBeenCalled();

    // Fade-out window, then the overlay must be gone from the DOM entirely.
    await act(async () => { vi.advanceTimersByTime(700); });
    await flush();

    expect(container.querySelector('[aria-label="Loading"]')).toBeNull();
    expect(container).toBeEmptyDOMElement();
    expect(raf).not.toHaveBeenCalled();
  });
});
