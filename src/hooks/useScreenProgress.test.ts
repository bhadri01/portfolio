import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useScreenProgress } from "./useScreenProgress";

/** A fake element whose vertical centre we can move around the viewport. */
function elementWithCentre(centreY: number, height = 300) {
  const el = document.createElement("div");
  el.getBoundingClientRect = () =>
    ({ top: centreY - height / 2, height, bottom: centreY + height / 2, left: 0, right: 0, width: 500, x: 0, y: centreY - height / 2, toJSON: () => ({}) }) as DOMRect;
  return el;
}

/** Let the hook's requestAnimationFrame-coalesced measurement run. */
async function settle() {
  await act(async () => {
    window.dispatchEvent(new Event("scroll"));
    await new Promise((r) => setTimeout(r, 30));
  });
}

afterEach(() => vi.restoreAllMocks());

describe("useScreenProgress", () => {
  it("maps the element's centre across the viewport to 0 → 0.5 → 1", async () => {
    window.innerHeight = 1000;
    const el = elementWithCentre(1000); // centre on the bottom edge
    const ref = { current: el };
    const { result } = renderHook(() => useScreenProgress(ref));

    await settle();
    expect(result.current.get()).toBeCloseTo(0, 3); // arriving

    el.getBoundingClientRect = elementWithCentre(500).getBoundingClientRect;
    await settle();
    expect(result.current.get()).toBeCloseTo(0.5, 3); // centred

    el.getBoundingClientRect = elementWithCentre(0).getBoundingClientRect;
    await settle();
    expect(result.current.get()).toBeCloseTo(1, 3); // leaving
  });

  it("clamps beyond the viewport so cards don't overshoot the arc", async () => {
    window.innerHeight = 1000;
    const el = elementWithCentre(2200); // far below the fold
    const ref = { current: el };
    const { result } = renderHook(() => useScreenProgress(ref));

    await settle();
    expect(result.current.get()).toBe(0);

    el.getBoundingClientRect = elementWithCentre(-900).getBoundingClientRect; // far above
    await settle();
    expect(result.current.get()).toBe(1);
  });

  it("is symmetric — equal distances above and below centre match", async () => {
    window.innerHeight = 1000;
    const above = renderHook(() => useScreenProgress({ current: elementWithCentre(250) }));
    const below = renderHook(() => useScreenProgress({ current: elementWithCentre(750) }));
    await settle();
    expect(above.result.current.get()).toBeCloseTo(0.75, 3);
    expect(below.result.current.get()).toBeCloseTo(0.25, 3);
  });

  it("does no work and stays at 0 when disabled (mobile / reduced motion)", async () => {
    window.innerHeight = 1000;
    const addSpy = vi.spyOn(window, "addEventListener");
    const { result } = renderHook(() => useScreenProgress({ current: elementWithCentre(500) }, false));
    await settle();
    expect(result.current.get()).toBe(0);
    expect(addSpy.mock.calls.some(([e]) => e === "scroll")).toBe(false);
  });
});
