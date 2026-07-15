import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, LayoutGroup,
  useScroll, useTransform, useMotionValue, useSpring,
} from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ArrowUpRight, Star, X, Github, ExternalLink, Code2, TrendingUp, ShieldCheck, RadioTower, Smartphone, GraduationCap, Globe, Lock } from "lucide-react";
import { SiFastapi, SiRust, SiDocker, SiWireguard, SiGo } from "react-icons/si";
import { projects, type Project } from "../data/projects";

type IconType = ComponentType<{ size?: number; className?: string }>;

// Per-project cover art: a representative icon + accent colour
const coverMeta: Record<string, { color: string; Icon: IconType }> = {
  "AlgoTrade Platform": { color: "#0358fc", Icon: TrendingUp },
  "Succeedex — EdTech Platform": { color: "#7c3aed", Icon: GraduationCap },
  ZeroVPN: { color: "#B7410E", Icon: SiRust },
  NullVeil: { color: "#3f4756", Icon: SiRust },
  "FastAPI QueryBuilder": { color: "#009688", Icon: SiFastapi },
  "FastAPI SSE Events": { color: "#7C3AED", Icon: RadioTower },
  "Crypton API": { color: "#1e40af", Icon: ShieldCheck },
  "WireGuard VPN Platform": { color: "#88171A", Icon: SiWireguard },
  "Docker Stats Monitor": { color: "#2496ED", Icon: SiDocker },
  Voxiloud: { color: "#087EA4", Icon: Smartphone },
  "Crime Records CRM": { color: "#00ADD8", Icon: SiGo },
};
const coverFor = (title: string) => coverMeta[title] ?? { color: "#0358fc", Icon: Code2 };

/** Small Public / Private status pill. */
function VisibilityBadge({ visibility }: { visibility: Project["visibility"] }) {
  if (visibility === "public") {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wide uppercase text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
        <Globe size={10} /> Public
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wide uppercase text-slate-500 dark:text-slate-400 bg-slate-500/10 border border-slate-400/20 px-2 py-0.5 rounded-full">
      <Lock size={10} /> Private
    </span>
  );
}

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
            <span className="font-brand text-xs text-[#0358fc] dark:text-[#4b8dff] tracking-[0.2em] uppercase">
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

          {/* Grid — 2 up on desktop, 1 up on mobile. The shared perspective on
              the container is what bends the columns toward each other, so the
              grid reads as the inside of a concave mirror. */}
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
            style={{ perspective: "2400px", transformStyle: "preserve-3d" }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} onOpen={() => setSelected(p)} />
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

/* ---------- Grid card: concave arrangement + scroll bend + hover tilt ---------- */
const TILT_MAX = 9; // degrees of hover tilt at the card's edge

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const cover = coverFor(project.title);
  const [imgOk, setImgOk] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const animate = isDesktop && !reduced;

  // Concave mirror: the left column faces right, the right column faces left,
  // so the two columns lean in toward each other. A single mobile column has
  // nothing to lean toward, so it stays flat.
  // Kept small on purpose — rotateX and rotateY compose into a rotation about a
  // diagonal axis, so large values read as a twist rather than a curve.
  const baseRotateY = animate ? (index % 2 === 0 ? 5 : -5) : 0;

  // Scroll: each card starts bowed away from the viewer and straightens as it
  // rises into view. It settles well before the centre so most of the time
  // you're reading flat, upright cards.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 60%"],
  });
  const bendX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const riseY = useTransform(scrollYProgress, [0, 1], [44, 0]);
  const growth = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  const rotateX = useSpring(bendX, { stiffness: 90, damping: 20 });
  const y = useSpring(riseY, { stiffness: 90, damping: 20 });

  // Hover tilt — pointer position normalised to -0.5..0.5 across the card.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 260, damping: 18, mass: 0.5 };
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]), spring);
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]), spring);
  // A spring bound to a source follows that source, so it has to be driven by
  // setting the source — calling .set() on the spring itself gets overridden.
  const liftTarget = useMotionValue(0);
  const lift = useSpring(liftTarget, spring);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!animate) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    liftTarget.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={
        animate
          ? { rotateY: baseRotateY, rotateX, y, scale: growth, opacity: fade, transformStyle: "preserve-3d" }
          : undefined
      }
      className="h-full [transform-style:preserve-3d]"
    >
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerEnter={() => animate && liftTarget.set(-8)}
        style={animate ? { rotateX: tiltX, rotateY: tiltY, y: lift, transformStyle: "preserve-3d" } : undefined}
        className="h-full"
      >
        <motion.article
          layoutId={`project-${project.title}`}
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
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
          className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 hover:border-[#0358fc]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0358fc]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f9fe] dark:border-white/10 dark:bg-[#0f1a2e] dark:ring-offset-[#0a0f1c]"
        >
          {/* Cover */}
          <div
            className="relative h-28 shrink-0 overflow-hidden md:h-32"
            style={{ background: `linear-gradient(140deg, ${cover.color}, ${shade(cover.color, -42)})` }}
          >
            <cover.Icon className="absolute -right-4 -bottom-6 h-28 w-28 text-white/15 rotate-[-8deg]" />
            <cover.Icon className="absolute left-4 top-4 h-7 w-7 text-white" />
            {project.cover && imgOk && (
              <img
                src={project.cover}
                alt=""
                loading="lazy"
                onError={() => setImgOk(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute right-3 top-3">
              <VisibilityBadge visibility={project.visibility} />
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4 md:p-5">
            <div className="mb-1.5 flex items-center gap-2">
              <motion.h3
                layout="position"
                className="truncate text-base font-semibold text-[#000b1b] transition-colors group-hover:text-[#0358fc] dark:text-slate-100 md:text-lg"
              >
                {project.title}
              </motion.h3>
              {project.featured && (
                <Star size={13} className="shrink-0 fill-[#0358fc] text-[#0358fc] dark:text-[#4b8dff]" />
              )}
            </div>

            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {project.description}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 font-mono text-[10px] tracking-wide text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider text-slate-400 dark:text-slate-500">
                {project.year}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-[#0358fc]/30 group-hover:bg-[#0358fc]/5 group-hover:text-[#0358fc] dark:border-white/10 dark:text-slate-500">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </motion.div>
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
        className="relative w-full max-w-2xl max-h-[90dvh] flex flex-col bg-white dark:bg-[#0f1a2e] rounded-3xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white uppercase bg-white/15 px-2.5 py-1 rounded-full">
                {project.visibility === "public" ? <Globe size={10} /> : <Lock size={10} />}
                {project.visibility}
              </span>
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

          {/* Links — only for public projects */}
          {project.visibility === "public" && (project.live || project.github) ? (
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
          ) : (
            <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Lock size={14} /> Private project — source isn't publicly available.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
