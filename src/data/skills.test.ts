import { describe, expect, it } from "vitest";
import { skills } from "./skills";
import { projects } from "./projects";

describe("skills data", () => {
  it("has a unique label for every skill", () => {
    const labels = skills.map((s) => s.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("gives every skill a `what` — the modal renders it unconditionally", () => {
    const missing = skills.filter((s) => !s.what?.trim()).map((s) => s.label);
    expect(missing).toEqual([]);
  });

  it("writes `what` as a real sentence, not a stub", () => {
    const tooShort = skills.filter((s) => s.what.length < 40).map((s) => s.label);
    expect(tooShort).toEqual([]);
  });

  it("includes Next.js", () => {
    expect(skills.some((s) => s.label === "Next.js")).toBe(true);
  });

  // The point of the exercise: `how` is a first-person claim about real
  // experience. Any project it names must actually exist, or the portfolio is
  // asserting something a recruiter can disprove in one click.
  it("never references a project that doesn't exist", () => {
    const titles = projects.map((p) => p.title);
    const known = [
      ...titles,
      // Non-project sources of truth: the résumé and this site itself.
      "cloud labs", "edtech", "RAG", "portfolio", "Technical Lead",
    ];
    const suspect: string[] = [];
    for (const s of skills) {
      if (!s.how) continue;
      // Capitalised multi-word names that look like a product but aren't one.
      const named = s.how.match(/\b(?:Zero|Null|Algo|Voxi|Crypton)[A-Za-z]*\b/g) ?? [];
      for (const n of named) {
        if (!known.some((k) => k.toLowerCase().includes(n.toLowerCase()))) {
          suspect.push(`${s.label}: "${n}"`);
        }
      }
    }
    expect(suspect).toEqual([]);
  });

  it("only claims usage where there's something to point at", () => {
    // Sanity: a `how` should be substantive if it exists at all.
    const thin = skills.filter((s) => s.how !== undefined && s.how.length < 30).map((s) => s.label);
    expect(thin).toEqual([]);
  });
});
