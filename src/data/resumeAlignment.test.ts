import { describe, expect, it } from "vitest";
import about from "../components/About.tsx?raw";
import experience from "../components/Experience.tsx?raw";
import footer from "../components/Footer.tsx?raw";
import html from "../../index.html?raw";
import { skills } from "./skills";

describe("October 2026 resume alignment", () => {
  it("keeps all four employment periods and current titles", () => {
    for (const value of ["Lead Engineer", "Senior Software Engineer", "Software Developer", "Software Development Intern", "Jan 2025 — Present", "May 2023 — Dec 2024", "Dec 2022 — May 2023", "Aug 2021 — Dec 2022"]) {
      expect(experience).toContain(value);
    }
    expect(experience).not.toContain("Aug 2022 — Mar 2023");
    expect(about).toContain("including an internship");
  });
  it("includes the newly documented tools without invented scores", () => {
    for (const label of ["Next.js", "Qdrant", "Git"]) {
      expect(skills.find(s => s.label === label)).toMatchObject({ level: null, status: "Hands-on use" });
    }
  });
  it("keeps both resume links on the current version", () => {
    for (const source of [footer, html]) expect(source).toContain("Bhadrinathan_A_Resume.pdf?v=20261009");
    expect(html).toContain("AI Engineer & Full-Stack Development");
  });
});
