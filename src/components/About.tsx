import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../lib/motion";
import { MapPin, Briefcase, GitBranch, Github, Linkedin } from "lucide-react";
import Logo from "./Logo";

const stats = [
  { number: "2", label: "Published FastAPI tools", gradient: "from-[#0358fc] to-[#4b8dff]" },
  { number: "14+", label: "Query operators shipped", gradient: "from-[#0246d4] to-[#0358fc]" },
  { number: "MIT", label: "Open-source licensed", gradient: "from-[#3b6fff] to-[#0358fc]" },
];

const focus = [
  "Frontend & UI",
  "Backend APIs",
  "Real-time & SSE",
  "RAG & Agents",
  "DevOps",
  "Security",
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden scroll-mt-24">
      <div className="absolute left-0 top-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0358fc]/8 blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto"
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Section label */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
          <span className="font-brand text-xs text-[#0358fc] dark:text-[#4b8dff] tracking-[0.2em] uppercase">
            01 / About
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#0358fc]/30 to-transparent" />
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4 md:gap-5">
          {/* Intro — large card */}
          <motion.div
            variants={scaleIn}
            className="relative md:col-span-2 md:row-span-2 overflow-hidden bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 md:p-10 flex flex-col"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#0358fc]/10 to-transparent blur-2xl pointer-events-none" />

            {/* Identity row */}
            <div className="relative flex items-center gap-3 mb-8">
              <Logo size={40} showWordmark={false} />
              <div>
                <p className="font-brand text-sm text-[#000b1b] dark:text-slate-100 tracking-tight">Bhadrinathan</p>
                <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 tracking-wide">
                  Software Engineer
                </p>
              </div>
            </div>

            <motion.h2
              variants={fadeUp}
              className="relative font-brand text-2xl md:text-[2rem] leading-snug tracking-tight text-[#000b1b] dark:text-slate-100 mb-6"
            >
              I build full-stack products and
              <span className="gradient-text-cyan"> developer tools </span>
              people actually reach for.
            </motion.h2>

            <motion.p variants={fadeUp} className="relative text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-5">
              I'm a full-stack engineer who ships end-to-end — polished React and
              TypeScript interfaces on the front, scalable Python and FastAPI APIs
              behind them — and the creator of{" "}
              <span className="text-[#0358fc] dark:text-[#4b8dff] font-medium">fastapi-querybuilder</span> and{" "}
              <span className="text-[#0358fc] dark:text-[#4b8dff] font-medium">fastapi-sse-events</span>.
            </motion.p>

            <motion.p variants={fadeUp} className="relative text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              From responsive UIs and real-time dashboards to containerized
              platforms and production RAG and agentic workflows built on pgvector,
              LangChain, and LangGraph — I like owning the whole stack.
            </motion.p>

            {/* Socials */}
            <div className="relative mt-auto flex items-center gap-2">
              <a
                href="https://github.com/bhadri01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-300 hover:text-[#0358fc] hover:border-[#0358fc]/40 hover:bg-[#0358fc]/5 transition-all duration-200"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bhadrinathan-a-90b8bb361"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-300 hover:text-[#0358fc] hover:border-[#0358fc]/40 hover:bg-[#0358fc]/5 transition-all duration-200"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Currently card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 hover:border-[#0358fc]/40 transition-colors duration-300"
          >
            <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase">
              Currently
            </span>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#0358fc]/10 text-[#0358fc] dark:text-[#4b8dff] flex items-center justify-center">
                  <Briefcase size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#000b1b] dark:text-slate-100">Software Engineer</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Bloomskilltech</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#0358fc]/10 text-[#0358fc] dark:text-[#4b8dff] flex items-center justify-center">
                  <MapPin size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#000b1b] dark:text-slate-100">Salem, Tamil Nadu</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">India · Remote-friendly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#0358fc]/10 text-[#0358fc] dark:text-[#4b8dff] flex items-center justify-center">
                  <GitBranch size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#000b1b] dark:text-slate-100">Open source</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Maintaining PyPI packages</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Focus card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 hover:border-[#0358fc]/40 transition-colors duration-300"
          >
            <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase">
              Focus
            </span>
            <div className="mt-5 flex flex-wrap gap-2">
              {focus.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stat tiles */}
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 hover:border-[#0358fc]/40 transition-colors duration-300"
            >
              <span
                className={`block font-brand text-3xl md:text-4xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
              >
                {stat.number}
              </span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
