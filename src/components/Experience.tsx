import type { ComponentType } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportOnce, easeOut } from "../lib/motion";
import { Briefcase, GraduationCap, ShieldCheck, MapPin, Calendar } from "lucide-react";

type IconType = ComponentType<{ size?: number; className?: string }>;

type TimelineItem = {
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
  accentGradient: string;
  label: string;
  Icon: IconType;
};

const timeline: TimelineItem[] = [
  {
    title: "Technical Lead — EdTech Platform",
    org: "BloomSkillTech",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "Jan 2025 — Present",
    description:
      "Leading the engineering team and technical direction. Drove the end-to-end build of a two-sided edtech marketplace connecting trainers with institutions — from system architecture and data modelling to production launch. Own the technical roadmap across frontend, backend, and cloud, and established the team's CI/CD, automated testing, and code-review processes.",
    accentGradient: "from-[#0358fc] to-[#4b8dff]",
    label: "Full-time",
    Icon: Briefcase,
  },
  {
    title: "Senior Software Developer",
    org: "BloomSkillTech",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "Mar 2024 — Dec 2024",
    description:
      "Promoted to take greater ownership of platform architecture and security. Designed a secure VPN layer for isolated, per-session access to lab environments, and built the orchestration layer that spins up, scales, and tears down containerized environments automatically to optimize cloud cost.",
    accentGradient: "from-[#0246d4] to-[#0358fc]",
    label: "Full-time",
    Icon: Briefcase,
  },
  {
    title: "Software Developer",
    org: "BloomSkillTech",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "May 2023 — Feb 2024",
    description:
      "Built a cloud-based lab platform that provisions isolated, browser-accessible development environments on demand — no local setup required. Developed the full stack: user-facing frontend, backend APIs, and environment-provisioning services, with containerized labs for consistent, reproducible sessions.",
    accentGradient: "from-[#4b8dff] to-[#0358fc]",
    label: "Full-time",
    Icon: Briefcase,
  },
  {
    title: "Software Engineer Intern",
    org: "Cyber Crime Police Station, Salem",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "Mar 2022 — Mar 2023",
    description:
      "Single-handedly built a complete CRM digitizing crime records with end-to-end case-timeline tracking — React frontend, Go backend APIs, and a PostgreSQL database, deployed with Docker — so officers could log, search, and monitor investigations from one system.",
    accentGradient: "from-[#0358fc] to-[#6aa1ff]",
    label: "Internship",
    Icon: ShieldCheck,
  },
  {
    title: "Bachelor of Engineering",
    org: "Muthayammal Engineering College",
    location: "Rasipuram, Tamil Nadu",
    period: "2020 — 2024",
    description:
      "Studied engineering with a focus on software development, networking, and cloud infrastructure — building full-stack, DevOps, and real-time systems projects alongside coursework, including the police-station CRM during my final-year internship.",
    accentGradient: "from-[#0246d4] to-[#4b8dff]",
    label: "Education",
    Icon: GraduationCap,
  },
];

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden scroll-mt-24"
    >
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#0358fc]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-brand text-xs text-[#0358fc] tracking-[0.2em] uppercase">
            03 / Experience
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#0358fc]/30 to-transparent" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="font-brand text-3xl md:text-4xl text-[#000b1b] dark:text-slate-100 tracking-tight mb-14"
        >
          Where I've <span className="gradient-text">been</span>
        </motion.h2>

        {/* Timeline */}
        <div ref={railRef} className="relative">
          {/* Rail track — base, scroll fill, and travelling dot share one range */}
          <div className="absolute left-[27px] md:left-[35px] top-5 bottom-5 w-0.5">
            <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-white/10" />
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#0358fc] via-[#4b8dff] to-[#0358fc]"
            />
            <motion.div
              style={{ top: dotTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-3.5 h-3.5 rounded-full bg-[#0358fc] ring-4 ring-[#f6f9fe] dark:ring-[#0a0f1c] shadow-[0_0_16px_rgba(3,88,252,0.7)]"
            />
          </div>

          <div className="space-y-5 md:space-y-6">
            {timeline.map((item, idx) => (
              <TimelineCard key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, idx }: { item: TimelineItem; idx: number }) {
  return (
    <div className="group relative pl-16 md:pl-28">
      {/* Node */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotate: -12 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 360, damping: 18 }}
        className={`absolute left-[6px] md:left-[14px] top-4 z-20 w-11 h-11 rounded-2xl bg-gradient-to-br ${item.accentGradient} ring-4 ring-[#f6f9fe] dark:ring-[#0a0f1c] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
      >
        <item.Icon size={18} />
      </motion.div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: easeOut }}
        whileHover={{ y: -4 }}
        className="card-spotlight relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1a2e] hover:border-[#0358fc]/40 transition-colors duration-300"
      >
        {/* Left accent bar */}
        <span
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.accentGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
        />
        <div className="relative p-5 md:p-6 pl-6 md:pl-7">
          {/* Top row: pills (left) + index number (right corner) */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#0358fc] bg-[#0358fc]/10 border border-[#0358fc]/15 px-2.5 py-0.5 rounded-full">
                <Calendar size={11} />
                {item.period}
              </span>
              <span className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">
                {item.label}
              </span>
            </div>
            <span className="shrink-0 font-brand text-4xl md:text-5xl leading-none text-slate-200 dark:text-white/[0.07] select-none -mt-1">
              {String(idx + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-[#000b1b] dark:text-slate-100 mb-1">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-3">
            <span className="font-medium text-slate-600 dark:text-slate-300">{item.org}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <MapPin size={11} className="shrink-0" />
              {item.location}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {item.description}
          </p>
        </div>
      </motion.article>
    </div>
  );
}
