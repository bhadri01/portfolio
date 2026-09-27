import { describe, expect, it } from "vitest";
import { needsLightweightRendering } from "./renderPolicy";

describe("WebKit rendering safeguards", () => {
  it.each([
    ["Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Version/18.0 Mobile Safari/604.1", 5],
    ["Mozilla/5.0 (iPad) AppleWebKit/605.1.15 Version/18.0 Mobile Safari/604.1", 5],
    ["Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15", 5],
    ["Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15", 0],
  ])("uses the lightweight path on %s", (ua, touch) => {
    expect(needsLightweightRendering(ua, touch)).toBe(true);
  });
  it("retains desktop Chromium effects", () => {
    expect(needsLightweightRendering("Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/140.0 Safari/537.36", 0)).toBe(false);
  });
});
