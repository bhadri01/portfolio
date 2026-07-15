import { describe, expect, it } from "vitest";
// ?raw goes through Vite's transform, so this needs no node typings.
import manifestRaw from "../../public/site.webmanifest?raw";
import maskable from "../../public/maskable-512.png?url";
import favicon192 from "../../public/favicon-192.png?url";
import favicon512 from "../../public/favicon-512.png?url";

const manifest = JSON.parse(manifestRaw) as {
  icons: { src: string; sizes: string; type: string; purpose?: string }[];
};

// Importing each icon is the existence check: an unresolvable path fails the
// import outright, so a manifest entry can't point at a file that isn't there.
const resolved = [maskable, favicon192, favicon512];

describe("PWA manifest icons", () => {
  it("points at files that exist", () => {
    expect(resolved.every(Boolean)).toBe(true);
    const declared = manifest.icons.map((i) => i.src);
    for (const src of declared) {
      expect(resolved.some((r) => r.includes(src.replace("/", "")))).toBe(true);
    }
  });

  it("declares a maskable icon", () => {
    expect(manifest.icons.some((i) => i.purpose?.split(" ").includes("maskable"))).toBe(true);
  });

  // "any maskable" on one file is the trap: the two purposes want different
  // artwork. An `any` icon is drawn as-is, so it's designed edge to edge; a
  // maskable icon is cropped to a circle/squircle by the launcher and needs a
  // ~20% safe zone. Tagging one file as both means it's wrong in one context —
  // here it meant Android cropped straight into the logo.
  it("never tags one icon as both any and maskable", () => {
    const both = manifest.icons
      .filter((i) => {
        const p = i.purpose?.split(" ") ?? [];
        return p.includes("any") && p.includes("maskable");
      })
      .map((i) => i.src);
    expect(both).toEqual([]);
  });

  it("does not reuse the same file for any and maskable", () => {
    const anySrcs = new Set(
      manifest.icons.filter((i) => i.purpose?.includes("any")).map((i) => i.src),
    );
    const maskSrcs = manifest.icons
      .filter((i) => i.purpose?.includes("maskable"))
      .map((i) => i.src);
    expect(maskSrcs.filter((s) => anySrcs.has(s))).toEqual([]);
  });

  it("gives every icon an explicit purpose", () => {
    expect(manifest.icons.filter((i) => !i.purpose).map((i) => i.src)).toEqual([]);
  });
});
