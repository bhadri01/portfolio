import { describe, expect, it } from "vitest";
import { practices, skills } from "./skills";
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

  // The list is deliberately short. A long flat list rated 66-95 tells a reader
  // nothing about where the depth actually is, so the tiers — and the cap — are
  // the signal. If this fails, the list has drifted back toward a dump.
  it("stays a curated list, not a dump", () => {
    expect(skills.length).toBeLessThanOrEqual(24);
  });

  it("groups every skill into one of the three tiers", () => {
    const tiers = ["Core", "AI Engineering", "Also ship with"];
    const stray = skills.filter((s) => !tiers.includes(s.cat)).map((s) => s.label);
    expect(stray).toEqual([]);
    for (const t of tiers) {
      expect(skills.some((s) => s.cat === t)).toBe(true);
    }
  });

  it("leads with the stack the résumé leads with", () => {
    for (const label of ["Python", "FastAPI", "PostgreSQL", "Docker"]) {
      expect(skills.find((s) => s.label === label)?.cat).toBe("Core");
    }
  });

  // The résumé's TECHNICAL SKILLS block is the source of truth for this list.
  // If someone edits one and not the other, a recruiter reading both sees two
  // different candidates — so pin the exact membership of each row.
  it("matches the résumé's Core row", () => {
    const core = skills.filter((s) => s.cat === "Core").map((s) => s.label).sort();
    expect(core).toEqual(
      ["Docker", "FastAPI", "Linux", "PostgreSQL", "Python", "REST & SSE APIs", "Redis", "SQLAlchemy"].sort(),
    );
  });

  it("matches the résumé's AI Engineering row", () => {
    const ai = skills.filter((s) => s.cat === "AI Engineering").map((s) => s.label).sort();
    expect(ai).toEqual(["LangChain", "LangGraph", "MCP Servers", "OpenAI API", "RAG (pgvector)"].sort());
  });
});

describe("practices", () => {
  it("carries the résumé's fourth skills row", () => {
    expect(practices.map((p) => p.label)).toEqual([
      "System design (HLD/LLD)",
      "Code review",
      "Automated testing",
      "CI/CD",
      "Phased delivery",
    ]);
  });

  // These render as plain boxes with no proficiency badge. The description is
  // the entire content of the box, so a stub leaves an empty card on the page.
  it("explains every practice in a real sentence", () => {
    const thin = practices.filter((p) => p.what.trim().length < 60).map((p) => p.label);
    expect(thin).toEqual([]);
  });

  it("keeps practices out of the scored skill list", () => {
    const labels = new Set(skills.map((s) => s.label));
    const scored = practices.filter((p) => labels.has(p.label)).map((p) => p.label);
    expect(scored).toEqual([]);
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
