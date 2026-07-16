/**
 * Generates the neofetch-style profile card used on the GitHub profile README.
 *
 * Run:  npx vite-node scripts/gen-profile-card.tsx
 *
 * Like the treemap it replaces, this imports src/data/skills.ts directly, so the
 * README and bha3.me are the same data and cannot drift. Adding a skill to the
 * site and regenerating is the whole update process.
 *
 * Why this and not the treemap: a treemap sizes tiles by weight, so with 59
 * skills in an ~850px README column the tail is always too small to read. That's
 * inherent to the format, not a bug that could be tuned out. A terminal readout
 * gives every skill the same legible size and spends its space on text instead
 * of geometry — and monospace means character count *is* width, so line breaking
 * is exact rather than estimated.
 *
 * GitHub constraints this output is written against:
 *  - Inline <svg> in Markdown is stripped. The SVG must be a file behind <img>,
 *    which means no external CSS and no JS.
 *  - An <img>-loaded SVG can't see the page's colour scheme, so two files +
 *    <picture> is the only route to light/dark.
 *  - No webfonts load either. This uses a monospace stack and assumes nothing
 *    beyond it.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { skills, type Skill } from "../src/data/skills";

// ---------- type metrics ----------
// The one real advantage of monospace: advance width is a constant, so wrapping
// is arithmetic rather than the per-character estimation the treemap needed.
// 0.6em is the advance for SF Mono, Menlo, Consolas and DejaVu Sans Mono alike;
// 0.62 buys a little headroom in case the viewer's fallback is wider.
const CH = 0.62;
const FS = 12.5; // body font size
const LH = 18.5; // line height
const ADV = FS * CH;

const PAD = 22;
const GUTTER = 30;
const LABEL_COLS = 12;

const CELL = 9.5; // one "pixel" of the block-letter art
const BODY_COLS = 104; // value columns available after the label
const TITLEBAR = 32;

/**
 * "b3" as a pixel grid, drawn with rects rather than block characters.
 *
 * The first version used U+2588 FULL BLOCK, which is the authentic way to do
 * this but is at the mercy of the viewer's font: the glyph doesn't fill its line
 * box in every face, so consecutive rows don't join and the letters fall apart
 * into a field of squares. Rects render identically everywhere and can't tofu.
 * Same look, none of the dependency.
 */
const ART = [
  "XX.....  XXXXX.",
  "XX.....  ....XX",
  "XX.....  ....XX",
  "XXXXX..  .XXXX.",
  "XX...XX  ....XX",
  "XX...XX  ....XX",
  "XX...XX  ....XX",
  "XXXXX..  XXXXX.",
];
const ART_W = Math.max(...ART.map((r) => r.length)) * CELL;
const ART_H = ART.length * CELL;

const textX = PAD + ART_W + GUTTER;
const W = Math.ceil(textX + (LABEL_COLS + BODY_COLS) * ADV + PAD);

type Theme = {
  name: "light" | "dark";
  bg: string;      // page behind the window
  win: string;     // terminal background
  chrome: string;  // title bar
  border: string;
  title: string;
  label: string;   // key colour
  value: string;   // value colour
  accent: string;
  dim: string;
};

const THEMES: Theme[] = [
  {
    name: "dark",
    bg: "#0a0f1c", win: "#0d1424", chrome: "#161f33", border: "rgba(255,255,255,0.09)",
    title: "#8ca0bd", label: "#4b8dff", value: "#c8d4e6", accent: "#4b8dff", dim: "#5b6b85",
  },
  {
    name: "light",
    bg: "#f6f9fe", win: "#ffffff", chrome: "#eef3fb", border: "rgba(2,6,23,0.10)",
    title: "#64748b", label: "#0358fc", value: "#33415c", accent: "#0358fc", dim: "#94a3b8",
  },
];

function esc(s: string) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
  );
}

/** Skills of a category, heaviest first — the order the site ranks them in. */
function inCat(cat: string): Skill[] {
  return skills.filter((s) => s.cat === cat).sort((a, b) => b.wt - a.wt || a.label.localeCompare(b.label));
}

/** Greedy wrap on ", " boundaries. Never splits a skill name across lines. */
function wrap(items: string[], cols: number): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const it of items) {
    const next = cur ? `${cur}, ${it}` : it;
    if (next.length > cols && cur) {
      lines.push(`${cur},`);
      cur = it;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

type Row = { label: string; lines: string[] };

/**
 * The card's content.
 *
 * Deliberately mirrors what neofetch prints — OS/Host/Uptime/Shell/Packages —
 * because the joke only lands if the shape is familiar. Every value is drawn
 * from the résumé, projects.ts or skills.ts; the format is a costume, not a
 * licence to invent.
 */
function rows(): Row[] {
  const cats: [string, string][] = [
    ["Languages", "Languages"],
    ["Backend", "Backend"],
    ["AI Engineering", "AI"],
    ["Frontend", "Frontend"],
    ["Infrastructure", "Infra"],
    ["Security & Testing", "Security"],
  ];

  const out: Row[] = [
    { label: "Role", lines: ["Technical Lead @ BloomSkillTech"] },
    { label: "Host", lines: ["Salem, Tamil Nadu, India · remote-friendly"] },
    { label: "Uptime", lines: ["4 years shipping production software"] },
    { label: "Kernel", lines: ["Linux — namespaces, cgroups v2, seccomp BPF, Landlock"] },
    { label: "Shell", lines: ["rust · python3"] },
    {
      label: "Packages",
      lines: wrap(
        ["fastapi-querybuilder (16K+ installs)", "fastapi_sse_events"],
        BODY_COLS,
      ),
    },
    { label: "", lines: [] }, // spacer
  ];

  for (const [cat, label] of cats) {
    out.push({ label, lines: wrap(inCat(cat).map((s) => s.label), BODY_COLS) });
  }

  out.push({ label: "", lines: [] });
  out.push({ label: "Web", lines: ["bha3.me · github.com/bhadri01"] });
  return out;
}

/** The palette strip neofetch prints at the bottom. Real brand colours, taken
 *  from the heaviest skill of each category, so it isn't decorative filler. */
function palette(): string[] {
  const cats = [...new Set(skills.map((s) => s.cat))];
  return cats.map((c) => inCat(c)[0].color);
}

function build(t: Theme) {
  const R = rows();
  const bodyLines = R.reduce((a, r) => a + Math.max(1, r.lines.length), 0);

  const bodyTop = TITLEBAR + PAD + FS;
  const textH = bodyLines * LH + 2 * LH; // + user@host and the rule
  const swatch = 13;
  const H = Math.ceil(TITLEBAR + PAD + Math.max(ART_H + 10, textH) + swatch + PAD + 8);
  // Centre the art against the body rather than pinning it to the top — it's a
  // short block next to a tall one, and top-aligned it just looks dropped.
  const artTop = TITLEBAR + (H - TITLEBAR - ART_H) / 2 - 6;

  const mono = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'DejaVu Sans Mono',monospace";

  // ---- title bar ----
  const dots = ["#ff5f57", "#febc2e", "#28c840"]
    .map((c, i) => `<circle cx="${PAD + 6 + i * 15}" cy="${TITLEBAR / 2}" r="5" fill="${c}"/>`)
    .join("");
  const chrome = `
  <path d="M0 10 a10 10 0 0 1 10 -10 h${W - 20} a10 10 0 0 1 10 10 v${TITLEBAR - 10} h${-W} z" fill="${t.chrome}"/>
  ${dots}
  <text x="${W / 2}" y="${TITLEBAR / 2 + 4}" text-anchor="middle" fill="${t.title}" font-family="${mono}" font-size="11.5">bhadri@github: ~</text>
  <line x1="0" y1="${TITLEBAR}" x2="${W}" y2="${TITLEBAR}" stroke="${t.border}"/>`;

  // ---- block-letter art ----
  const art = ART.flatMap((row, ry) =>
    [...row].map((c, cx) =>
      c === "X"
        ? `<rect x="${PAD + cx * CELL}" y="${artTop + ry * CELL}" width="${CELL - 1.5}" height="${CELL - 1.5}" rx="1.5" fill="url(#artg)"/>`
        : "",
    ),
  ).join("");

  // ---- body ----
  let y = bodyTop;
  const out: string[] = [];

  out.push(
    `<text x="${textX}" y="${y}" font-family="${mono}" font-size="${FS}" font-weight="700" fill="${t.accent}">bhadri<tspan fill="${t.dim}" font-weight="400">@</tspan>github</text>`,
  );
  y += LH;
  out.push(
    `<text x="${textX}" y="${y}" font-family="${mono}" font-size="${FS}" fill="${t.dim}" xml:space="preserve">${"─".repeat(20)}</text>`,
  );
  y += LH;

  // Two positioned <text> elements per line rather than one with a space-padded
  // label tspan. Padding to LABEL_COLS and trusting the font to be monospace is
  // how the columns ended up ragged — it only holds if every viewer resolves a
  // real monospace face, and the fallback chain has no guarantee at the end of
  // it. A fixed x for the value is geometry, and geometry doesn't depend on
  // whose font loaded.
  const valueX = textX + LABEL_COLS * ADV;
  for (const r of R) {
    if (!r.lines.length) { y += LH * 0.55; continue; }
    r.lines.forEach((ln, i) => {
      if (i === 0 && r.label)
        out.push(
          `<text x="${textX}" y="${y}" font-family="${mono}" font-size="${FS}" font-weight="700" fill="${t.label}">${esc(r.label)}</text>`,
        );
      out.push(
        `<text x="${valueX}" y="${y}" font-family="${mono}" font-size="${FS}" fill="${t.value}">${esc(ln)}</text>`,
      );
      y += LH;
    });
  }

  // ---- palette strip ----
  const pal = palette();
  const py = H - PAD - swatch + 2;
  const strip = pal
    .map((c, i) => `<rect x="${textX + i * (swatch + 5)}" y="${py}" width="${swatch}" height="${swatch}" rx="3" fill="${c}"/>`)
    .join("");

  const skillCount = skills.length;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Terminal-style profile card for Bhadrinathan: Technical Lead at BloomSkillTech, ${skillCount} technologies across ${new Set(skills.map((s) => s.cat)).size} categories">
  <title>bhadri@github — ${skillCount} technologies</title>
  <defs>
    <linearGradient id="artg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.accent}"/>
      <stop offset="1" stop-color="${t.name === "dark" ? "#8ab4ff" : "#0246d4"}"/>
    </linearGradient>
    <clipPath id="win"><rect width="${W}" height="${H}" rx="10"/></clipPath>
  </defs>
  <g clip-path="url(#win)">
    <rect width="${W}" height="${H}" fill="${t.win}"/>
    ${chrome}
    ${art}
    ${out.join("\n    ")}
    ${strip}
  </g>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="9.5" fill="none" stroke="${t.border}"/>
</svg>`;
}

/**
 * Fail rather than emit a card that's quietly wrong.
 *
 * The failure mode here isn't geometry, it's omission: a skill that silently
 * doesn't appear looks exactly like a skill that isn't there. Since this is a
 * static image on a public profile, nobody gets an error message but me, now.
 */
function verify() {
  const errs: string[] = [];
  const R = rows();
  const printed = R.flatMap((r) => r.lines).join(" ");

  for (const s of skills) {
    if (!printed.includes(s.label)) errs.push(`${s.label} never appears on the card`);
  }

  const cats = new Set(skills.map((s) => s.cat));
  const covered = new Set(["Languages", "Backend", "AI Engineering", "Frontend", "Infrastructure", "Security & Testing"]);
  for (const c of cats) if (!covered.has(c)) errs.push(`category "${c}" has no row — its skills would vanish`);

  for (const r of R)
    for (const ln of r.lines)
      if (ln.length > BODY_COLS) errs.push(`line overflows ${BODY_COLS} cols (${ln.length}): ${ln.slice(0, 40)}…`);

  if (errs.length) {
    console.error("FAILED:\n  " + errs.slice(0, 12).join("\n  "));
    process.exit(1);
  }
  console.log(`verified: all ${skills.length} skills printed, ${cats.size} categories, no line over ${BODY_COLS} cols`);
}

verify();

const outDir = resolve(process.cwd(), "profile-assets");
mkdirSync(outDir, { recursive: true });
for (const t of THEMES) {
  const file = resolve(outDir, `skills-${t.name}.svg`);
  writeFileSync(file, build(t), "utf8");
  console.log(`wrote ${file}`);
}
