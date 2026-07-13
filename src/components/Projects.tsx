import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import { ArrowUpRight, Star, X, Github, ExternalLink, Code2, TrendingUp, ShieldCheck, RadioTower, BrainCircuit, Sparkles, Smartphone } from "lucide-react";
import { SiFastapi, SiRust, SiDocker, SiWireguard, SiReact, SiGo } from "react-icons/si";
import { projects, type Project } from "../data/projects";

type IconType = ComponentType<{ size?: number; className?: string }>;

// Per-project cover art: a representative icon + accent colour
const coverMeta: Record<string, { color: string; Icon: IconType }> = {
  "AlgoTrade Platform": { color: "#0358fc", Icon: TrendingUp },
  ZeroVPN: { color: "#B7410E", Icon: SiRust },
  NullVeil: { color: "#3f4756", Icon: SiRust },
  "FastAPI QueryBuilder": { color: "#009688", Icon: SiFastapi },
  "FastAPI SSE Events": { color: "#7C3AED", Icon: RadioTower },
  "RAG Knowledge System": { color: "#0246d4", Icon: BrainCircuit },
  Hackminds: { color: "#10A37F", Icon: Sparkles },
  "Crypton API": { color: "#1e40af", Icon: ShieldCheck },
  "WireGuard VPN Platform": { color: "#88171A", Icon: SiWireguard },
  "Docker Stats Monitor": { color: "#2496ED", Icon: SiDocker },
  Voxiloud: { color: "#087EA4", Icon: Smartphone },
  "Crime Records CRM": { color: "#00ADD8", Icon: SiGo },
  "Bha3.me Portfolio": { color: "#149ECA", Icon: SiReact },
};
const coverFor = (title: string) => coverMeta[title] ?? { color: "#0358fc", Icon: Code2 };

function shade(hex: string, amt: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amt);
  const g = clamp(((n >> 8) & 0xff) + amt);
  const b = clamp((n & 0xff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <LayoutGroup>
      <section id="projects" className="relative py-20 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden scroll-mt-24">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[700px] h-[300px] rounded-full bg-[#0358fc]/8 blur-[120px] pointer-events-none" />

        <motion.div
          className="max-w-5xl mx-auto"
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="font-brand text-xs text-[#0358fc] tracking-[0.2em] uppercase">
              02 / Work
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#0358fc]/30 to-transparent" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-brand text-3xl md:text-4xl text-[#000b1b] dark:text-slate-100 tracking-tight mb-12"
          >
            Selected <span className="gradient-text">Projects</span>
          </motion.h2>

          {/* List */}
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <ProjectRow key={p.title} project={p} onOpen={() => setSelected(p)} />
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}

/* ---------- Collapsed list row ---------- */
function ProjectRow({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cover = coverFor(project.title);
  const [imgOk, setImgOk] = useState(true);
  return (
    <motion.article
      layoutId={`project-${project.title}`}
      variants={fadeUp}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
      className="group relative cursor-pointer flex items-center gap-4 md:gap-6 overflow-hidden bg-white dark:bg-[#0f1a2e] rounded-2xl border border-slate-200 dark:border-white/10 p-4 md:p-5 hover:border-[#0358fc]/50 hover:bg-[#0358fc]/[0.035] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0358fc]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f9fe] dark:ring-offset-[#0a0f1c]"
    >
      {/* Cover tile */}
      <motion.div
        layout="position"
        className="relative shrink-0 w-14 h-14 md:w-[68px] md:h-[68px] rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(140deg, ${cover.color}, ${shade(cover.color, -42)})` }}
      >
        <cover.Icon className="absolute -right-2 -bottom-2 w-12 h-12 text-white/15" />
        <cover.Icon className="relative w-6 h-6 md:w-7 md:h-7 text-white" />
        {project.cover && imgOk && (
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1">
          <motion.h3
            layout="position"
            className="text-base md:text-lg font-semibold text-[#000b1b] dark:text-slate-100 group-hover:text-[#0358fc] transition-colors truncate"
          >
            {project.title}
          </motion.h3>
          {project.featured && <Star size={13} className="fill-[#0358fc] text-[#0358fc] shrink-0" />}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-1 md:line-clamp-2 mb-2.5">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] text-slate-500 dark:text-slate-400 tracking-wide bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">+{project.tech.length - 4}</span>
          )}
        </div>
      </div>

      {/* Right meta */}
      <div className="flex flex-col items-end gap-3 shrink-0 self-stretch">
        <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 tracking-wider">{project.year}</span>
        <span className="mt-auto w-9 h-9 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10 group-hover:border-[#0358fc]/30 group-hover:text-[#0358fc] group-hover:bg-[#0358fc]/5 transition-all duration-300">
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </motion.article>
  );
}

/* ---------- Expanded detail card (shared-element morph) ---------- */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const cover = coverFor(project.title);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#000b1b]/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        layoutId={`project-${project.title}`}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-white dark:bg-[#0f1a2e] rounded-3xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
      >
        {/* Header with project cover accent (or a real screenshot if provided) */}
        <div
          className="relative shrink-0 px-6 md:px-8 pt-7 pb-6 overflow-hidden"
          style={{ background: `linear-gradient(150deg, ${cover.color} 0%, ${shade(cover.color, -46)} 100%)` }}
        >
          {project.cover ? (
            <>
              <img
                src={project.cover}
                alt={`${project.title} screenshot`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
            </>
          ) : (
            <>
              <cover.Icon className="absolute -right-6 -bottom-10 w-52 h-52 text-white/10 rotate-[-8deg]" />
              <div className="absolute -right-10 -top-14 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            </>
          )}

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/80 bg-white/10 hover:bg-white/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X size={16} />
          </button>

          <div className="relative flex items-center gap-3 mb-4">
            <span className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <cover.Icon className="w-6 h-6 text-white" />
            </span>
            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white uppercase bg-white/15 px-2.5 py-1 rounded-full">
                  <Star size={10} className="fill-white" /> Featured
                </span>
              )}
              <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">
                {project.year}
              </span>
            </div>
          </div>

          <motion.h3
            layout="position"
            className="relative font-brand text-2xl md:text-[1.7rem] text-white tracking-tight mb-3"
          >
            {project.title}
          </motion.h3>

          <p className="relative text-sm md:text-[0.95rem] text-white/85 leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        {/* Body (scrolls) */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 md:px-8 pt-6 pb-7">
          <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-4">
            What I built
          </h4>
          <ul className="space-y-3 mb-7">
            {project.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.35 }}
                className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                <span
                  className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: cover.color }}
                />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>

          <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-3">
            Stack
          </h4>
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-slate-600 dark:text-slate-300 tracking-wide bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.live || project.github) && (
            <div className="flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0358fc] text-white text-sm font-medium hover:bg-[#0246d4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0358fc]/50 focus-visible:ring-offset-2"
                >
                  <ExternalLink size={15} /> Visit live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-[#0358fc] hover:text-[#0358fc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0358fc]/50 focus-visible:ring-offset-2"
                >
                  <Github size={15} /> View source
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
