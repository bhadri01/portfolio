import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../lib/motion";
import { MapPin, Briefcase, GitBranch, Github, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { useSpotlight } from "../hooks/useSpotlight";

// Numbers a reader can weigh, rather than implementation trivia. Every one is
// straight off the résumé — 16k downloads is third-party proof that the tools
// get used, which no amount of self-description buys.
const stats = [
  { number: "16K+", label: "PyPI downloads", gradient: "from-[#0358fc] to-[#4b8dff]" },
  { number: "4 yrs", label: "Shipping production", gradient: "from-[#0246d4] to-[#0358fc]" },
  { number: "2", label: "Packages published", gradient: "from-[#3b6fff] to-[#0358fc]" },
];

const focus = [
  "Rust & Systems",
  "Backend APIs",
  "RAG & Agents",
  "Real-time & SSE",
  "DevOps",
  "Security",
];

export default function About() {
  const spotlight = useSpotlight();

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

        {/* Two columns rather than a row-spanning bento. The intro used to span
            two grid rows, which stretched Currently and Focus to fill ~831px of
            row height they only had ~200px of content for — 215px of dead space
            inside each. The side column now stacks and sizes to content, and the
            stats moved into it so both columns come out about even. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Intro — large card */}
          <motion.div
            variants={scaleIn}
            onPointerMove={spotlight}
            className="card-spotlight relative md:col-span-2 overflow-hidden bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 md:p-10 flex flex-col transition-colors duration-300 hover:border-[#0358fc]/40"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#0358fc]/10 to-transparent blur-2xl pointer-events-none" />

            {/* Identity row */}
            <div className="relative flex items-center gap-3 mb-8">
              <Logo size={40} showWordmark={false} />
              <div>
                <p className="font-brand text-sm text-[#000b1b] dark:text-slate-100 tracking-tight">Bhadrinathan</p>
                <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 tracking-wide">
                  Technical Lead · Software Engineer
                </p>
              </div>
            </div>

            <motion.h2
              variants={fadeUp}
              className="relative font-brand text-2xl md:text-[2rem] leading-snug tracking-tight text-[#000b1b] dark:text-slate-100 mb-6"
            >
              I build systems people trust with
              <span className="gradient-text-cyan"> untrusted input </span>
              — and tools other developers install.
            </motion.h2>

            <motion.p variants={fadeUp} className="relative text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-5">
              Four years shipping production software end to end — from a police
              records CRM to cloud lab infrastructure, and now leading the build of
              an edtech platform as Technical Lead. I wrote{" "}
              <span className="text-[#0358fc] dark:text-[#4b8dff] font-medium">fastapi-querybuilder</span>, which
              other people's projects have pulled down more than 16,000 times.
            </motion.p>

            <motion.p variants={fadeUp} className="relative text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              Lately that means Rust where correctness has to be structural — a
              sandbox that runs untrusted code behind eight independent isolation
              layers, a read-only forensics tool that physically can't write to the
              disk it reads. And Python where speed matters: FastAPI, pgvector, and
              agent workflows on LangGraph. I like owning the whole stack, but I'm
              happiest close to the metal.
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

          {/* Side column. Stretches to the intro's height and the two cards share
              the surplus via flex-1 — a little breathing room inside each beats a
              hole under the shorter column. */}
          <div className="flex flex-col gap-4 md:gap-5">
          {/* Currently card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -4 }}
            onPointerMove={spotlight}
            className="card-spotlight relative flex-1 overflow-hidden bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 hover:border-[#0358fc]/40 transition-colors duration-300"
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
                  {/* Matches Experience — this said "Software Engineer", which
                      contradicted the timeline further down the page. */}
                  <p className="text-sm font-medium text-[#000b1b] dark:text-slate-100">Technical Lead</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">BloomSkillTech · since Jan 2025</p>
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
                  <p className="text-xs text-slate-500 dark:text-slate-400">fastapi-querybuilder · MIT</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Focus card */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -4 }}
            onPointerMove={spotlight}
            className="card-spotlight relative flex-1 overflow-hidden bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 hover:border-[#0358fc]/40 transition-colors duration-300"
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
          </div>

          {/* Stats — full-width row under both columns. Stacking them in the side
              column made it 920px against the intro's 583px, which just moved the
              gap to the other side. */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              onPointerMove={spotlight}
              className="card-spotlight relative overflow-hidden bg-white dark:bg-[#0f1a2e] rounded-3xl border border-slate-200 dark:border-white/10 p-7 hover:border-[#0358fc]/40 transition-colors duration-300"
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
        </div>
      </motion.div>
    </section>
  );
}
