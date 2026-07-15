import type { ComponentType } from "react";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import { useWebGLSupport } from "../hooks/useWebGLSupport";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useDeviceTilt } from "../hooks/useDeviceTilt";
import { useStrongDevice } from "../hooks/useStrongDevice";
import { useScrollStore } from "../lib/store";

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

export default function Hero({ start = true }: { start?: boolean }) {
  const [display, setDisplay] = useState("");
  const webgl = useWebGLSupport();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const strongDevice = useStrongDevice();
  const [pi, setPi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // three.js is a ~252KB gzipped download, so phones only get the real 3D scene
  // if they can comfortably afford it. Everything else keeps the static mark.
  const use3D = webgl === true && (isDesktop || strongDevice);

  const setPointer = useScrollStore((s) => s.setPointer);
  const flatEmblemRef = useRef<HTMLDivElement>(null);

  // Gyroscope steering. The 3D scene already reads `pointer` from the store, so
  // tilt just feeds the same channel the cursor does; the static mark instead
  // gets a CSS transform written straight to the node (no re-render per event).
  const handleTilt = useCallback(
    (x: number, y: number) => {
      if (use3D) {
        setPointer(x, y);
        return;
      }
      const el = flatEmblemRef.current;
      if (el) {
        el.style.transform = `perspective(700px) rotateY(${x * 16}deg) rotateX(${y * 16}deg)`;
      }
    },
    [use3D, setPointer]
  );

  const { needsPermission, request: requestTilt } = useDeviceTilt({
    enabled: !isDesktop && !reducedMotion,
    onTilt: handleTilt,
  });

  useEffect(() => {
    if (!start) return; // wait for the preloader to finish
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
  }, [display, deleting, pi, start]);

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center px-5 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,26,51,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(12,26,51,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ambient glow behind the emblem */}
      <div className="pointer-events-none absolute right-[8%] top-1/2 h-[55vh] w-[55vh] -translate-y-1/2 rounded-full bg-[#0358fc]/10 blur-[130px]" />

      {/* pb on mobile reserves room for the scroll hint + marquee pinned to the
          section's bottom edge, which the CTAs used to sit on top of. */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 pb-32 pt-24 md:grid-cols-[1.06fr_0.94fr] md:gap-10 md:pb-0 md:pt-0">
      {/* Content */}
      <motion.div
        className="text-center md:text-left"
        variants={stagger(0.12, 0.15)}
        initial="hidden"
        animate={start ? "show" : "hidden"}
      >
        {/* Name — brand wordmark */}
        <motion.h1 variants={fadeUp} className="mb-6 flex justify-center md:justify-start">
          <img
            src="/bhadrinathan-wordmark.svg"
            alt="Bhadrinathan"
            className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] dark:hidden"
          />
          <img
            src="/bhadrinathan-wordmark-dark.svg"
            alt="Bhadrinathan"
            className="hidden w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] dark:block"
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
          className="max-w-xl mx-auto md:mx-0 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-9"
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

        {/* 3D B3 emblem — right side, steered by cursor (desktop) or gyro (mobile) */}
        <motion.div
          className={`relative order-first mx-auto aspect-square w-full max-w-[260px] sm:max-w-[320px] md:order-none md:ml-auto md:max-w-[460px] ${
            needsPermission ? "cursor-pointer" : "pointer-events-none"
          }`}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          // iOS refuses to hand over motion data unless asked from a real tap.
          onClick={needsPermission ? requestTilt : undefined}
          onKeyDown={
            needsPermission
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    requestTilt();
                  }
                }
              : undefined
          }
          role={needsPermission ? "button" : undefined}
          tabIndex={needsPermission ? 0 : undefined}
          aria-label={needsPermission ? "Activate motion effect on the logo" : undefined}
        >
          {use3D ? (
            <Suspense
              fallback={
                <img
                  src="/logo-mark-dark.svg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-contain p-6 opacity-90"
                />
              }
            >
              <HeroScene />
            </Suspense>
          ) : (
            <div
              ref={flatEmblemRef}
              className="absolute inset-0 transition-transform duration-150 ease-out [transform-style:preserve-3d] [will-change:transform]"
            >
              <img
                src="/logo-mark.svg"
                alt="Bhadrinathan logo"
                className="absolute inset-0 h-full w-full object-contain p-6 dark:hidden"
              />
              <img
                src="/logo-mark-dark.svg"
                alt="Bhadrinathan logo"
                className="absolute inset-0 hidden h-full w-full object-contain p-6 dark:block"
              />
            </div>
          )}

          {needsPermission && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Tap to activate
            </span>
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
