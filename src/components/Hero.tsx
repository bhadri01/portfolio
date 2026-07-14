import type { ComponentType } from "react";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import { useWebGLSupport } from "../hooks/useWebGLSupport";

const HeroScene = lazy(() => import("./hero3d/HeroScene"));
import {
  SiFastapi, SiPython, SiRust, SiReact, SiTypescript, SiDocker, SiRedis,
  SiPostgresql, SiLangchain, SiWireguard, SiSqlalchemy, SiTailwindcss,
  SiJenkins, SiTraefikproxy, SiLinux,
} from "react-icons/si";
import { Workflow, Boxes } from "lucide-react";

type MarqueeIcon = ComponentType<{ className?: string }>;
const marqueeSkills: { name: string; Icon: MarqueeIcon }[] = [
  { name: "FastAPI", Icon: SiFastapi },
  { name: "Python", Icon: SiPython },
  { name: "Rust", Icon: SiRust },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Docker", Icon: SiDocker },
  { name: "Redis", Icon: SiRedis },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "LangChain", Icon: SiLangchain },
  { name: "LangGraph", Icon: Workflow },
  { name: "pgvector", Icon: Boxes },
  { name: "WireGuard", Icon: SiWireguard },
  { name: "SQLAlchemy", Icon: SiSqlalchemy },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Jenkins", Icon: SiJenkins },
  { name: "Traefik", Icon: SiTraefikproxy },
  { name: "Linux", Icon: SiLinux },
];

const phrases = [
  "Software Engineer",
  "Full-Stack Developer",
  "Frontend Developer",
  "AI Engineer",
  "Security & Pentesting",
  "Open-Source Developer",
];

export default function Hero() {
  const [display, setDisplay] = useState("");
  const [pi, setPi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const webgl = useWebGLSupport();

  useEffect(() => {
    const full = phrases[pi];
    let delay = deleting ? 32 : 62;
    if (!deleting && display === full) delay = 2000;
    else if (deleting && display === "") delay = 400;
    const t = setTimeout(() => {
      if (!deleting && display === full) {
        setDeleting(true);
      } else if (deleting && display === "") {
        setDeleting(false);
        setPi((p) => (p + 1) % phrases.length);
      } else {
        setDisplay(full.slice(0, display.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [display, deleting, pi]);

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center px-5 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Two-column hero: identity left, 3D B3 emblem right */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-4 pb-24 pt-24 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:pb-0 md:pt-0">
        {/* LEFT — identity */}
        <motion.div
          className="text-center md:text-left"
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          animate="show"
        >
        {/* Name — brand wordmark */}
        <motion.h1 variants={fadeUp} className="mb-6 flex justify-center md:justify-start">
          <img
            src="/bhadrinathan-wordmark.svg"
            alt="Bhadrinathan"
            className="w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] dark:hidden"
          />
          <img
            src="/bhadrinathan-wordmark-dark.svg"
            alt="Bhadrinathan"
            className="hidden w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] dark:block"
          />
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.div variants={fadeUp} className="mb-6 min-h-9 flex items-center justify-center md:justify-start px-2 md:px-0">
          <span className="text-lg md:text-2xl font-medium text-slate-600 dark:text-slate-300">
            {display}
            <span className="animate-caret text-[#0358fc] dark:text-[#4b8dff] font-normal ml-0.5">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="mx-auto md:mx-0 max-w-xl text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-9"
        >
          A software engineer who ships end-to-end — turning complex problems
          into reliable systems, thoughtful developer tools, and, increasingly,
          intelligent AI-driven products.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full bg-[#0358fc] text-white font-medium text-sm hover:bg-[#0246d4] transition-colors duration-300"
          >
            View Work
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full bg-white dark:bg-[#0f1a2e] border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 font-medium text-sm hover:border-[#0358fc] hover:text-[#0358fc] transition-colors duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
        </motion.div>

        {/* RIGHT — 3D B3 emblem (cursor-steered, no auto-rotation) */}
        <motion.div
          className="pointer-events-none relative order-first h-[240px] w-full sm:h-[300px] md:order-none md:h-[460px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* soft glow behind the emblem */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0358fc]/20 blur-[90px] dark:bg-[#0358fc]/25" />
          {webgl === true ? (
            <Suspense
              fallback={
                <img
                  src="/logo-mark.svg"
                  alt=""
                  aria-hidden
                  className="h-full w-full object-contain opacity-90 dark:hidden"
                />
              }
            >
              <HeroScene />
            </Suspense>
          ) : (
            <>
              <img
                src="/logo-mark.svg"
                alt=""
                aria-hidden
                className="h-full w-full object-contain opacity-90 dark:hidden"
              />
              <img
                src="/logo-mark-dark.svg"
                alt=""
                aria-hidden
                className="hidden h-full w-full object-contain opacity-90 dark:block"
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3.5">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center shrink-0">
              {marqueeSkills.map((s) => (
                <span
                  key={s.name}
                  className="flex items-center gap-2 px-5 text-slate-400 dark:text-slate-500 text-xs font-mono tracking-wide"
                >
                  <s.Icon className="w-4 h-4 opacity-80" />
                  <span>{s.name}</span>
                  <span className="text-[#0358fc]/40 ml-3">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
