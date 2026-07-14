import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import { X, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import {
  SiPython, SiTypescript, SiJavascript, SiC, SiGo, SiRust, SiHtml5, SiFastapi,
  SiSqlalchemy, SiNodedotjs, SiGraphql, SiRedis, SiPostgresql, SiReact,
  SiTailwindcss, SiVite, SiDocker, SiJenkins, SiTraefikproxy, SiNginx, SiLinux,
  SiWireguard, SiGit, SiLangchain, SiWireshark, SiBurpsuite, SiOwasp,
  SiPostman, SiMetasploit, SiGnubash, SiMongodb, SiCelery,
  SiPydantic, SiRabbitmq, SiPytest, SiVitest,
  SiPrometheus, SiGrafana, SiHuggingface,
  SiTimescale, SiReactquery, SiWebassembly,
} from "react-icons/si";
import {
  Database, Webhook, RadioTower, BrainCircuit, Workflow, Boxes, Gauge,
  Bot, Infinity as InfinityIcon, Radar, Cloud, Sparkles, Drama,
  Layers, Smartphone,
} from "lucide-react";

type IconType = ComponentType<{ size?: number; className?: string }>;
// wt = weight / importance in the toolkit (drives tile size); level = proficiency %
type Skill = { label: string; Icon: IconType; color: string; level: number; mom: number; cat: string; wt: number };
type Selected = { skill: Skill; rect: DOMRect };

const skills: Skill[] = [
  // Languages
  { label: "Python", Icon: SiPython, color: "#3776AB", level: 95, mom: 3.1, cat: "Languages", wt: 10 },
  { label: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: 86, mom: 5.4, cat: "Languages", wt: 7 },
  { label: "JavaScript", Icon: SiJavascript, color: "#EAB308", level: 88, mom: 2.2, cat: "Languages", wt: 6 },
  { label: "Go", Icon: SiGo, color: "#00ADD8", level: 76, mom: 6.0, cat: "Languages", wt: 4 },
  { label: "Rust", Icon: SiRust, color: "#B7410E", level: 76, mom: 9.5, cat: "Languages", wt: 7 },
  { label: "C", Icon: SiC, color: "#5A6E8C", level: 78, mom: 1.5, cat: "Languages", wt: 3 },
  { label: "SQL", Icon: Database, color: "#4479A1", level: 85, mom: 4.0, cat: "Languages", wt: 7 },
  { label: "HTML/CSS", Icon: SiHtml5, color: "#E34F26", level: 82, mom: 1.8, cat: "Languages", wt: 5 },
  // Backend
  { label: "FastAPI", Icon: SiFastapi, color: "#009688", level: 95, mom: 6.2, cat: "Backend", wt: 10 },
  { label: "SQLAlchemy", Icon: SiSqlalchemy, color: "#D71F00", level: 90, mom: 5.1, cat: "Backend", wt: 8 },
  { label: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", level: 78, mom: 3.0, cat: "Backend", wt: 5 },
  { label: "REST APIs", Icon: Webhook, color: "#0EA5E9", level: 92, mom: 4.3, cat: "Backend", wt: 8 },
  { label: "GraphQL", Icon: SiGraphql, color: "#E10098", level: 80, mom: 5.5, cat: "Backend", wt: 5 },
  { label: "Redis", Icon: SiRedis, color: "#D82C20", level: 85, mom: 6.0, cat: "Backend", wt: 7 },
  { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", level: 90, mom: 5.2, cat: "Backend", wt: 9 },
  { label: "SSE / WebSockets", Icon: RadioTower, color: "#7C3AED", level: 84, mom: 7.1, cat: "Backend", wt: 6 },
  // AI Engineering
  { label: "RAG Systems", Icon: BrainCircuit, color: "#0358fc", level: 78, mom: 22.4, cat: "AI Engineering", wt: 8 },
  { label: "LangChain", Icon: SiLangchain, color: "#1C3C3C", level: 76, mom: 20.1, cat: "AI Engineering", wt: 7 },
  { label: "LangGraph", Icon: Workflow, color: "#2563EB", level: 72, mom: 24.6, cat: "AI Engineering", wt: 6 },
  { label: "pgvector", Icon: Boxes, color: "#3E63DD", level: 74, mom: 18.3, cat: "AI Engineering", wt: 5 },
  { label: "LLM Evaluation", Icon: Gauge, color: "#0891B2", level: 70, mom: 19.2, cat: "AI Engineering", wt: 5 },
  { label: "AI Agents", Icon: Bot, color: "#0246d4", level: 73, mom: 21.5, cat: "AI Engineering", wt: 6 },
  // Frontend
  { label: "React", Icon: SiReact, color: "#149ECA", level: 82, mom: 4.1, cat: "Frontend", wt: 7 },
  { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", level: 88, mom: 3.3, cat: "Frontend", wt: 6 },
  { label: "Vite", Icon: SiVite, color: "#646CFF", level: 80, mom: 5.0, cat: "Frontend", wt: 4 },
  // Infrastructure
  { label: "Docker", Icon: SiDocker, color: "#2496ED", level: 90, mom: 5.0, cat: "Infrastructure", wt: 9 },
  { label: "Jenkins", Icon: SiJenkins, color: "#D24939", level: 80, mom: 3.2, cat: "Infrastructure", wt: 5 },
  { label: "Traefik", Icon: SiTraefikproxy, color: "#24A1C1", level: 78, mom: 4.4, cat: "Infrastructure", wt: 5 },
  { label: "Nginx", Icon: SiNginx, color: "#009639", level: 82, mom: 3.1, cat: "Infrastructure", wt: 6 },
  { label: "Linux", Icon: SiLinux, color: "#C9930A", level: 88, mom: 4.0, cat: "Infrastructure", wt: 8 },
  { label: "WireGuard", Icon: SiWireguard, color: "#88171A", level: 76, mom: 5.3, cat: "Infrastructure", wt: 5 },
  { label: "Git", Icon: SiGit, color: "#F05032", level: 92, mom: 2.1, cat: "Infrastructure", wt: 8 },
  { label: "CI/CD", Icon: InfinityIcon, color: "#0358fc", level: 85, mom: 4.2, cat: "Infrastructure", wt: 6 },
  // Security & Testing
  { label: "Nmap", Icon: Radar, color: "#5D3FD3", level: 85, mom: 3.0, cat: "Security & Testing", wt: 6 },
  { label: "Wireshark", Icon: SiWireshark, color: "#1679A7", level: 82, mom: 3.5, cat: "Security & Testing", wt: 5 },
  { label: "Burp Suite", Icon: SiBurpsuite, color: "#FF6633", level: 84, mom: 4.0, cat: "Security & Testing", wt: 6 },
  { label: "OWASP ZAP", Icon: SiOwasp, color: "#00A4A6", level: 78, mom: 4.5, cat: "Security & Testing", wt: 4 },
  { label: "Postman", Icon: SiPostman, color: "#FF6C37", level: 88, mom: 2.5, cat: "Security & Testing", wt: 6 },
  { label: "Metasploit", Icon: SiMetasploit, color: "#2A6BB0", level: 74, mom: 4.0, cat: "Security & Testing", wt: 4 },
  // More tooling
  { label: "Bash", Icon: SiGnubash, color: "#4EAA25", level: 84, mom: 2.5, cat: "Languages", wt: 6 },
  { label: "MongoDB", Icon: SiMongodb, color: "#47A248", level: 78, mom: 3.5, cat: "Backend", wt: 5 },
  { label: "Celery", Icon: SiCelery, color: "#37814A", level: 80, mom: 3.0, cat: "Backend", wt: 5 },
  { label: "Pydantic", Icon: SiPydantic, color: "#E92063", level: 88, mom: 4.0, cat: "Backend", wt: 6 },
  { label: "RabbitMQ", Icon: SiRabbitmq, color: "#FF6600", level: 74, mom: 3.5, cat: "Backend", wt: 4 },
  { label: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E", level: 74, mom: 12.0, cat: "AI Engineering", wt: 5 },
  { label: "OpenAI API", Icon: Sparkles, color: "#10A37F", level: 82, mom: 14.0, cat: "AI Engineering", wt: 6 },
  { label: "AWS", Icon: Cloud, color: "#FF9900", level: 76, mom: 8.0, cat: "Infrastructure", wt: 6 },
  { label: "Prometheus", Icon: SiPrometheus, color: "#E6522C", level: 78, mom: 3.5, cat: "Infrastructure", wt: 5 },
  { label: "Grafana", Icon: SiGrafana, color: "#F46800", level: 80, mom: 3.0, cat: "Infrastructure", wt: 5 },
  { label: "Pytest", Icon: SiPytest, color: "#0A9EDC", level: 86, mom: 3.0, cat: "Security & Testing", wt: 6 },
  { label: "Vitest", Icon: SiVitest, color: "#6E9F18", level: 84, mom: 5.0, cat: "Security & Testing", wt: 5 },
  { label: "Playwright", Icon: Drama, color: "#2EAD33", level: 82, mom: 6.0, cat: "Security & Testing", wt: 5 },
  // Surfaced from recent projects
  { label: "TimescaleDB", Icon: SiTimescale, color: "#FDB515", level: 74, mom: 6.5, cat: "Backend", wt: 4 },
  { label: "WebAssembly", Icon: SiWebassembly, color: "#654FF0", level: 66, mom: 9.0, cat: "Languages", wt: 3 },
  { label: "React Native", Icon: Smartphone, color: "#087EA4", level: 74, mom: 7.5, cat: "Frontend", wt: 5 },
  { label: "Zustand", Icon: Layers, color: "#6E5A43", level: 82, mom: 6.0, cat: "Frontend", wt: 4 },
  { label: "TanStack Query", Icon: SiReactquery, color: "#FF4154", level: 82, mom: 7.0, cat: "Frontend", wt: 5 },
];

function textOn(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#0b1220" : "#ffffff";
}

// ---------- squarified treemap ----------
type Rect = { x: number; y: number; w: number; h: number };
type Placed = Rect & { index: number };

function worstRatio(row: { value: number }[], w: number) {
  if (!row.length) return Infinity;
  const s = row.reduce((a, b) => a + b.value, 0);
  const mx = Math.max(...row.map((x) => x.value));
  const mn = Math.min(...row.map((x) => x.value));
  return Math.max((w * w * mx) / (s * s), (s * s) / (w * w * mn));
}

function squarify(items: { value: number; index: number }[], rect: Rect): Placed[] {
  const result: Placed[] = [];
  const total = items.reduce((a, b) => a + b.value, 0);
  if (total <= 0 || !items.length) return result;
  const area = rect.w * rect.h;
  let children = items.map((it) => ({ value: (it.value / total) * area, index: it.index }));
  const r = { ...rect };
  let row: { value: number; index: number }[] = [];
  let w = Math.min(r.w, r.h);

  const place = (rw: { value: number; index: number }[], len: number) => {
    const s = rw.reduce((a, b) => a + b.value, 0);
    if (r.w >= r.h) {
      const colw = s / len;
      let y = r.y;
      for (const it of rw) {
        const h = (it.value / s) * len;
        result.push({ index: it.index, x: r.x, y, w: colw, h });
        y += h;
      }
      r.x += colw;
      r.w -= colw;
    } else {
      const rowh = s / len;
      let x = r.x;
      for (const it of rw) {
        const wd = (it.value / s) * len;
        result.push({ index: it.index, x, y: r.y, w: wd, h: rowh });
        x += wd;
      }
      r.y += rowh;
      r.h -= rowh;
    }
  };

  children = children.slice();
  while (children.length) {
    const c = children[0];
    const nr = [...row, c];
    if (!row.length || worstRatio(nr, w) <= worstRatio(row, w)) {
      row = nr;
      children.shift();
    } else {
      place(row, w);
      row = [];
      w = Math.min(r.w, r.h);
    }
  }
  if (row.length) place(row, w);
  return result;
}

// tile area is driven by skill weight (importance), not the proficiency %
const val = (wt: number) => wt ** 2;

// ---------- layout (computed once, all skills in one map) ----------
const W = 100;
const H = 58;
const order = skills.map((_, i) => i).sort((a, b) => val(skills[b].wt) - val(skills[a].wt));
const rects = squarify(order.map((idx) => ({ value: val(skills[idx].wt), index: idx })), { x: 0, y: 0, w: W, h: H });
const tiles = rects.map((r) => ({ s: skills[r.index], x: r.x, y: r.y, w: r.w, h: r.h }));

const pct = (v: number, span: number) => `${(v / span) * 100}%`;

const catNote: Record<string, string> = {
  Languages: "A core language I reach for across backend services, tooling, and automation.",
  Backend: "Used to design APIs, data models, and real-time systems in production.",
  "AI Engineering": "Applied while building the RAG knowledge system and agentic experiments.",
  Frontend: "Used to build this portfolio and internal product dashboards.",
  Infrastructure: "Part of my deployment, networking, and monitoring stack.",
  "Security & Testing": "Used for network and web-application testing and API validation.",
};

function relatedProjects(label: string) {
  const key = label.toLowerCase();
  const tokens = key.split(/[^a-z0-9+#.]+/).filter((t) => t.length >= 3);
  return projects.filter((p) => {
    const techLower = p.tech.map((t) => t.toLowerCase());
    if (techLower.includes(key)) return true;
    const hay = (p.tech.join(" ") + " " + p.title + " " + p.description).toLowerCase();
    return tokens.some((t) => hay.includes(t));
  });
}

function darken(hex: string, amt: number) {
  const h = hex.replace("#", "");
  const c = [0, 2, 4].map((i) => Math.max(0, Math.min(255, parseInt(h.slice(i, i + 2), 16) + amt)));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
function levelTag(l: number) {
  return l >= 90 ? "Expert" : l >= 80 ? "Advanced" : l >= 70 ? "Proficient" : "Growing";
}

function SkillModal({ sel, onClose }: { sel: Selected; onClose: () => void }) {
  const skill = sel.skill;
  const fg = textOn(skill.color);
  const related = relatedProjects(skill.label);
  const Icon = skill.Icon;
  const hi = fg === "#ffffff" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.06)";
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#000b1b]/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        layoutId={`skill-${skill.label}`}
        className="relative w-full max-w-lg max-h-[88vh] flex flex-col bg-white dark:bg-[#0f1a2e] rounded-3xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        {/* Header */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{ color: fg, background: `linear-gradient(150deg, ${skill.color} 0%, ${darken(skill.color, -42)} 100%)` }}
        >
          <div className="absolute -right-5 -bottom-14 opacity-[0.12] rotate-[-12deg] pointer-events-none">
            <Icon size={176} />
          </div>
          <div className="absolute -top-10 -left-8 w-40 h-40 rounded-full" style={{ background: hi }} />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm"
          >
            <X size={16} />
          </button>
          <div className="relative p-6 pb-16">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 shrink-0">
                <Icon size={34} />
              </span>
              <div className="min-w-0 pt-1">
                <div className="font-brand text-2xl leading-tight truncate">{skill.label}</div>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-medium tracking-wide">{skill.cat}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-[11px] font-semibold tracking-wide">{levelTag(skill.level)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 -mt-11 px-6 grid grid-cols-2 gap-3 shrink-0">
          <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl border border-slate-200 dark:border-white/10 px-3 py-3 text-center">
            <div className="leading-none">
              <span className="font-brand text-lg text-[#000b1b] dark:text-slate-100">{skill.level}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">%</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1.5">Proficiency</div>
          </div>
          <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl border border-slate-200 dark:border-white/10 px-3 py-3 text-center">
            <div className="leading-none">
              <span className="font-brand text-lg text-[#000b1b] dark:text-slate-100">{skill.wt}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">/10</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1.5">Focus</div>
          </div>
        </div>

        {/* Body */}
        <motion.div
          className="px-6 pt-5 pb-6 flex-1 min-h-0 overflow-y-auto overscroll-contain"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.3 }}
        >
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{catNote[skill.cat]}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Where I've used it</span>
            <div className="h-px flex-1 bg-slate-200" />
            <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
              {related.length} {related.length === 1 ? "project" : "projects"}
            </span>
          </div>
          {related.length ? (
            <motion.ul className="space-y-2.5" initial="hidden" animate="show" variants={stagger(0.07, 0.05)}>
              {related.map((p) => {
                const link = p.live || p.github;
                return (
                  <motion.li key={p.title} variants={fadeUp}>
                    <a
                      href={link}
                      target={link ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`group relative block rounded-2xl border border-slate-200 dark:border-white/10 p-4 pl-5 overflow-hidden transition-all duration-300 ${
                        link ? "hover:border-[#0358fc]/40 hover:bg-slate-50 dark:bg-white/[0.04] hover:-translate-y-0.5" : "cursor-default"
                      }`}
                    >
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: skill.color }}
                      />
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#000b1b] dark:text-slate-100">{p.title}</span>
                        {link && (
                          <ArrowUpRight size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-[#0358fc] transition-colors" />
                        )}
                        <span className="ml-auto font-mono text-[10px] text-slate-400 dark:text-slate-500">{p.year}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {p.tech.slice(0, 5).map((tech) => {
                          const isCur = tech.toLowerCase() === skill.label.toLowerCase();
                          return (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${isCur ? "font-semibold" : "bg-slate-100 text-slate-500 dark:text-slate-400"}`}
                              style={isCur ? { backgroundColor: `${skill.color}1a`, color: skill.color } : undefined}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/20 p-4 text-slate-500 dark:text-slate-400">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 shrink-0">
                <Boxes size={18} />
              </span>
              <p className="text-sm leading-snug">
                Part of my broader toolkit — used in day-to-day work and experiments rather than a dedicated public project.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<Selected | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <LayoutGroup>
      {SkillsInner({ active, setActive, setSelected })}
      <AnimatePresence>
        {selected && <SkillModal sel={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function SkillsInner({
  active,
  setActive,
  setSelected,
}: {
  active: string | null;
  setActive: (v: string | null) => void;
  setSelected: (v: Selected | null) => void;
}) {
  const current = tiles.find((t) => t.s.label === active)?.s;
  const categories = [...new Set(skills.map((s) => s.cat))];
  return (
    <section id="skills" className="relative py-20 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden scroll-mt-24">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0358fc]/8 blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto"
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Section label */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
          <span className="font-brand text-xs text-[#0358fc] dark:text-[#4b8dff] tracking-[0.2em] uppercase">
            Skill Portfolio
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#0358fc]/30 to-transparent" />
        </motion.div>

        {/* Live inspect line */}
        <motion.div variants={fadeUp} className="mb-6 h-6 flex items-center text-sm">
          {current ? (
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: current.color }} />
              <span className="font-semibold text-[#000b1b] dark:text-slate-100">{current.label}</span>
              <span className="text-slate-400 dark:text-slate-500">·</span>
              <span className="text-slate-500 dark:text-slate-400">{current.cat}</span>
              <span className="text-slate-400 dark:text-slate-500">·</span>
              <span className="text-slate-600 dark:text-slate-300">{current.level}% proficiency</span>
            </span>
          ) : (
            <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
              <span className="hidden sm:inline">Hover a tile to inspect · </span>
              <span className="sm:hidden">Tap a tile · swipe to explore · </span>
              tile size = weight · colour = technology
            </span>
          )}
        </motion.div>

        {/* Unified treemap heatmap */}
        {/* Mobile / small screens: a clean vertical list (no horizontal scroll) */}
        <motion.div variants={fadeUp} className="space-y-6 md:hidden">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {cat}
              </h3>
              <div className="space-y-1.5">
                {skills
                  .filter((s) => s.cat === cat)
                  .sort((a, b) => b.level - a.level)
                  .map((s) => {
                    const Icon = s.Icon;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        onClick={(e) =>
                          setSelected({
                            skill: s,
                            rect: (e.currentTarget as HTMLElement).getBoundingClientRect(),
                          })
                        }
                        aria-label={`${s.label}, ${s.level}% proficiency`}
                        className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors hover:border-[#0358fc]/40 dark:border-white/10 dark:bg-[#0f1a2e]"
                      >
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${s.color}22`, color: s.color }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-[#000b1b] dark:text-slate-100">
                            {s.label}
                          </span>
                          <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                            <span
                              className="block h-full rounded-full"
                              style={{ width: `${s.level}%`, backgroundColor: s.color }}
                            />
                          </span>
                        </span>
                        <span className="shrink-0 font-brand text-sm text-slate-600 dark:text-slate-300">
                          {s.level}
                          <span className="text-[0.7em] opacity-70">%</span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Desktop: the treemap "stock portfolio" heatmap */}
        <motion.div variants={fadeUp} layoutScroll className="hidden overflow-x-auto no-scrollbar md:block">
          <div
            className="relative min-w-[760px]"
            style={{ aspectRatio: `${W} / ${H}` }}
            onMouseLeave={() => setActive(null)}
          >
            {tiles.map((t) => {
              const area = t.w * t.h;
              const big = t.w >= 14 && t.h >= 10;
              const med = !big && t.w >= 8 && t.h >= 6;
              const Icon = t.s.Icon;
              const fg = textOn(t.s.color);
              const isActive = active === t.s.label;
              const dim = active !== null && !isActive;
              return (
                <motion.div
                  key={t.s.label}
                  className="absolute"
                  style={{ left: pct(t.x, W), top: pct(t.y, H), width: pct(t.w, W), height: pct(t.h, H), zIndex: isActive ? 20 : 1 }}
                  initial={{ opacity: 0, scale: 0.45 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: ((t.x + t.y) / (W + H)) * 0.6 }}
                >
                  <motion.div
                    layoutId={`skill-${t.s.label}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${t.s.label}, ${t.s.level}% proficiency, ${t.s.cat}`}
                    onHoverStart={() => setActive(t.s.label)}
                    onFocus={() => setActive(t.s.label)}
                    onClick={(e) =>
                      setSelected({ skill: t.s, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected({ skill: t.s, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() });
                      }
                    }}
                    animate={{ opacity: dim ? 0.38 : 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="absolute inset-[2px] rounded-md overflow-hidden flex flex-col justify-between p-1.5 md:p-2 cursor-pointer hover:brightness-110 [container-type:size] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
                    style={{ backgroundColor: t.s.color, color: fg }}
                  >
                    <Icon className="opacity-90 shrink-0 w-[clamp(13px,38cqmin,44px)] h-[clamp(13px,38cqmin,44px)]" />
                    <div className="min-w-0 mt-auto">
                      <div
                        className={`font-semibold leading-tight truncate ${
                          big ? "text-sm md:text-base" : med ? "text-[11px] md:text-xs" : "text-[10px]"
                        }`}
                      >
                        {t.s.label}
                      </div>
                      <div className={`font-brand leading-none ${big ? "text-xl md:text-2xl" : med ? "text-sm" : "text-[11px]"}`}>
                        {t.s.level}
                        <span className="opacity-70 text-[0.65em]">%</span>
                      </div>
                    </div>
                    {area < 40 && !big && !med && <span className="sr-only">{t.s.label}</span>}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
