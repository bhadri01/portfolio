import { describe, it, expect } from "vitest";
import { fadeUp, fadeUpSm, scaleIn, stagger, viewportOnce, easeOut } from "./motion";

describe("motion helpers", () => {
  it("fadeUp defines hidden and show states", () => {
    expect(fadeUp.hidden).toMatchObject({ opacity: 0 });
    expect(fadeUp.show).toMatchObject({ opacity: 1, y: 0 });
  });

  it("fadeUpSm and scaleIn animate to fully visible", () => {
    expect(fadeUpSm.show).toMatchObject({ opacity: 1 });
    expect(scaleIn.show).toMatchObject({ opacity: 1, scale: 1 });
  });

  it("stagger returns a variants object with staggerChildren", () => {
    const v = stagger(0.1, 0.2);
    // @ts-expect-error runtime shape check
    expect(v.show.transition.staggerChildren).toBe(0.1);
    // @ts-expect-error runtime shape check
    expect(v.show.transition.delayChildren).toBe(0.2);
  });

  it("viewportOnce only plays once", () => {
    expect(viewportOnce.once).toBe(true);
  });

  // Regression: a ratio-based `amount` is unreachable for elements much taller
  // than the viewport, leaving whole sections stuck at opacity 0 on phones.
  it("viewportOnce triggers independently of element height", () => {
    expect(viewportOnce).not.toHaveProperty("amount");
    expect(viewportOnce.margin).toBeTypeOf("string");
  });

  it("easeOut is a 4-point cubic bezier", () => {
    expect(easeOut).toHaveLength(4);
  });
});
