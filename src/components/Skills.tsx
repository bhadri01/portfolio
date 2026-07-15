import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { X } from "lucide-react";
import { skills, type Skill } from "../data/skills";

type Selected = { skill: Skill; rect: DOMRect };

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

// Tile area is driven by skill weight (importance), not the proficiency %.
// Linear, not squared: squaring turned a 3–10 weight range into a 9–100 area
// range, so the lightest skills collapsed to 34x16px — too short to fit their
// own label. Area now tracks weight directly, which is also what the caption
// under the heading actually claims.
const val = (wt: number) => wt;

// ---------- layout (computed once, all skills in one map) ----------
const W = 100;
// Taller than it was (58). 59 tiles in a 100x58 box leaves even an average one
// around 50px square — the lightest ones had nowhere to go. Extra height buys
// every tile room rather than robbing the big ones to pay the small.
const H = 76;
const order = skills.map((_, i) => i).sort((a, b) => val(skills[b].wt) - val(skills[a].wt));
const rects = squarify(order.map((idx) => ({ value: val(skills[idx].wt), index: idx })), { x: 0, y: 0, w: W, h: H });
const tiles = rects.map((r) => ({ s: skills[r.index], x: r.x, y: r.y, w: r.w, h: r.h }));

const pct = (v: number, span: number) => `${(v / span) * 100}%`;

/** Fallback for skills without a specific, evidence-backed usage story. Kept
 *  general on purpose — better a true generality than an invented specific. */
const catNote: Record<string, string> = {
  Languages: "A core language I reach for across backend services, tooling, and automation.",
  Backend: "Used to design APIs, data models, and real-time systems in production.",
  "AI Engineering": "Applied while building the RAG knowledge system and agentic experiments.",
  Frontend: "Used to build this portfolio and internal product dashboards.",
  Infrastructure: "Part of my deployment, networking, and monitoring stack.",
  "Security & Testing": "Used for network and web-application testing and API validation.",
};

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
        className="relative w-full max-w-lg max-h-[90dvh] flex flex-col bg-white dark:bg-[#0f1a2e] rounded-3xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
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
          {/* What it is — objective, and true no matter who's reading */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
              What it is
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{skill.what}</p>

          {/* How I use it — the specific story where there's one to tell, and an
              honest generality where there isn't. */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
              How I use it
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{levelTag(skill.level)}</span>
          </div>
          <div
            className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.03] p-4 pl-5 overflow-hidden"
          >
            <span className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: skill.color }} />
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {skill.how ?? catNote[skill.cat]}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<Selected | null>(null);
  // Render EITHER the mobile list or the treemap — never both, so the shared
  // layoutIds stay unique (duplicates made the mobile rows render invisible).
  const isMobile = useMediaQuery("(max-width: 767px)");

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
      {SkillsInner({ active, setActive, setSelected, isMobile })}
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
  isMobile,
}: {
  active: string | null;
  setActive: (v: string | null) => void;
  setSelected: (v: Selected | null) => void;
  isMobile: boolean;
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
              {isMobile ? "Tap a card to inspect · " : "Hover a tile to inspect · "}
              tile size = weight · colour = technology
            </span>
          )}
        </motion.div>

        {/* Unified treemap heatmap */}
        {/* Mobile: the same colour-tile cards as the treemap, stacked in a
            vertical column grid instead of a horizontally-scrolling map. */}
        {isMobile ? (
        <motion.div variants={fadeUp} className="space-y-7">
          {categories.map((cat) => {
            const inCat = skills
              .filter((s) => s.cat === cat)
              .sort((a, b) => b.wt - a.wt || b.level - a.level);
            return (
              <div key={cat}>
                <div className="mb-2.5 flex items-center gap-3">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {cat}
                  </h3>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{inCat.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {inCat.map((s, i) => {
                    const Icon = s.Icon;
                    const fg = textOn(s.color);
                    // Lead skill in each category gets a full-width card, echoing
                    // the treemap's "size = weight" language.
                    const lead = i === 0 && s.wt >= 8;
                    return (
                      <motion.button
                        key={s.label}
                        layoutId={`skill-${s.label}`}
                        type="button"
                        onClick={(e) =>
                          setSelected({
                            skill: s,
                            rect: (e.currentTarget as HTMLElement).getBoundingClientRect(),
                          })
                        }
                        aria-label={`${s.label}, ${s.level}% proficiency, ${s.cat}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileTap={{ scale: 0.96 }}
                        // The stagger delay is for the scroll-in only. Without
                        // an explicit `layout` transition it would also govern
                        // the modal morphing back into this tile on close —
                        // stalling it for up to 180ms, then tweening. Match the
                        // treemap tile's spring so both viewports close alike.
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                          delay: Math.min(i, 6) * 0.03,
                          layout: { type: "spring", stiffness: 320, damping: 24, delay: 0 },
                        }}
                        className={`relative flex flex-col justify-between overflow-hidden rounded-xl p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset ${
                          lead ? "col-span-2 min-h-[104px]" : "min-h-[104px]"
                        }`}
                        style={{ backgroundColor: s.color, color: fg }}
                      >
                        <Icon
                          className="pointer-events-none absolute -bottom-3 -right-2 h-16 w-16 opacity-[0.16]"
                          aria-hidden="true"
                        />
                        <Icon className={lead ? "h-7 w-7 shrink-0 opacity-90" : "h-6 w-6 shrink-0 opacity-90"} aria-hidden="true" />
                        <div className="relative mt-auto min-w-0">
                          <div className="truncate text-sm font-semibold leading-tight">{s.label}</div>
                          <div className="font-brand text-xl leading-none">
                            {s.level}
                            <span className="text-[0.65em] opacity-70">%</span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>

        ) : (
        /* Desktop: the treemap "stock portfolio" heatmap */
        <motion.div variants={fadeUp} layoutScroll className="overflow-x-auto no-scrollbar">
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
        )}
      </motion.div>
    </section>
  );
}
