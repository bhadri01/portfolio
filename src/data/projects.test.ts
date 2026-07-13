import { describe, it, expect } from "vitest";
import { projects, type Project } from "./projects";

describe("projects data", () => {
  it("has a non-empty list of projects", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has the required shape", () => {
    for (const p of projects) {
      expect(typeof p.title).toBe("string");
      expect(p.title.length).toBeGreaterThan(0);
      expect(typeof p.description).toBe("string");
      expect(p.description.length).toBeGreaterThan(0);
      expect(Array.isArray(p.highlights)).toBe(true);
      expect(p.highlights.length).toBeGreaterThan(0);
      expect(Array.isArray(p.tech)).toBe(true);
      expect(p.tech.length).toBeGreaterThan(0);
      expect(/^\d{4}$/.test(p.year)).toBe(true);
    }
  });

  it("has unique project titles", () => {
    const titles = projects.map((p: Project) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("only uses valid absolute URLs for links", () => {
    for (const p of projects) {
      for (const url of [p.live, p.github]) {
        if (url) expect(url).toMatch(/^https?:\/\//);
      }
    }
  });

  it("marks at least one project as featured", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });
});
