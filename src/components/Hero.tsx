import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

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
      className="relative min-h-dvh flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
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

      {/* Content */}
      <motion.div
        className="max-w-5xl mx-auto w-full relative z-10 text-center"
        variants={stagger(0.12, 0.15)}
        initial="hidden"
        animate="show"
      >
        {/* Name — brand wordmark */}
        <motion.h1 variants={fadeUp} className="mb-8 flex justify-center">
          <img
            src="/bhadrinathan-wordmark.svg"
            alt="Bhadrinathan"
            className="w-full max-w-[680px] sm:max-w-[780px] md:max-w-[860px]"
          />
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.div variants={fadeUp} className="mb-8 min-h-9 flex items-center justify-center px-2">
          <span className="text-lg md:text-2xl font-medium text-slate-600 text-center">
            {display}
            <span className="animate-caret text-[#0358fc] font-normal ml-0.5">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed mb-12"
        >
          A software engineer who ships end-to-end — turning complex problems
          into reliable systems, thoughtful developer tools, and, increasingly,
          intelligent AI-driven products.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
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
            href="mailto:bhadri2002@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full bg-white border border-slate-300 text-slate-700 font-medium text-sm hover:border-[#0358fc] hover:text-[#0358fc] transition-colors duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="font-mono text-xs text-slate-400 tracking-[0.2em] uppercase">
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
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-8 px-4 text-slate-400 text-xs font-mono tracking-wider"
            >
              <span>FASTAPI</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>PYTHON</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>REACT</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>TYPESCRIPT</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>DOCKER</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>REDIS</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>LANGGRAPH</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>LANGCHAIN</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>PGVECTOR</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>WIREGUARD</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>SQLALCHEMY</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>TAILWIND</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>JENKINS</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>TRAEFIK</span>
              <span className="text-[#0358fc]/50">◆</span>
              <span>LINUX</span>
              <span className="text-[#0358fc]/50 mr-8">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
