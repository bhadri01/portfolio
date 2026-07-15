import { describe, expect, it } from "vitest";
import { squarify } from "./treemap";
import { skills } from "../data/skills";

const box = { x: 0, y: 0, w: 100, h: 76 };
const area = (r: { w: number; h: number }) => r.w * r.h;
const coverage = (rects: { w: number; h: number }[], b = box) =>
  rects.reduce((a, r) => a + area(r), 0) / area(b);

describe("squarify", () => {
  it("places every item exactly once", () => {
    const items = skills.map((s, i) => ({ value: s.wt, index: i }));
    const out = squarify(items, box);
    expect(out).toHaveLength(items.length);
    expect(new Set(out.map((r) => r.index)).size).toBe(items.length);
  });

  // The invariant that matters. A treemap that doesn't fill its rectangle is
  // silently throwing away space — the real skills map was covering ~20%, which
  // made every tile ~5x smaller than it needed to be and the section far taller
  // than it needed to be. Nothing about that is visible by eye.
  it("covers the whole rectangle", () => {
    const items = skills.map((s, i) => ({ value: s.wt, index: i }));
    expect(coverage(squarify(items, box))).toBeCloseTo(1, 2);
  });

  it("covers the rectangle for any weight distribution", () => {
    const cases: number[][] = [
      [1],
      [1, 1],
      [5, 3, 2],
      [10, 1, 1, 1, 1, 1],
      Array.from({ length: 60 }, (_, i) => (i % 8) + 3),
      Array.from({ length: 12 }, () => 7), // all equal
    ];
    for (const weights of cases) {
      const out = squarify(weights.map((v, i) => ({ value: v, index: i })), box);
      expect(coverage(out), `weights ${weights.length}`).toBeCloseTo(1, 2);
    }
  });

  it("keeps every tile inside the rectangle", () => {
    const items = skills.map((s, i) => ({ value: s.wt, index: i }));
    const escaped = squarify(items, box).filter(
      (r) => r.x < -0.01 || r.y < -0.01 || r.x + r.w > box.w + 0.01 || r.y + r.h > box.h + 0.01,
    );
    expect(escaped).toEqual([]);
  });

  it("gives area in proportion to weight", () => {
    const items = [
      { value: 10, index: 0 },
      { value: 5, index: 1 },
    ];
    const out = squarify(items, box);
    const big = out.find((r) => r.index === 0)!;
    const small = out.find((r) => r.index === 1)!;
    expect(area(big) / area(small)).toBeCloseTo(2, 1);
  });

  it("returns nothing for empty or zero-weight input", () => {
    expect(squarify([], box)).toEqual([]);
    expect(squarify([{ value: 0, index: 0 }], box)).toEqual([]);
  });
});
