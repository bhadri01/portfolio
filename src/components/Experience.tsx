import type { ComponentType } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, stagger, viewportOnce, easeOut } from "../lib/motion";
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

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden scroll-mt-24">
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#0358fc]/8 blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-5xl mx-auto"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Section label */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <span className="font-brand text-xs text-[#0358fc] tracking-[0.2em] uppercase">
            03 / Experience
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#0358fc]/30 to-transparent" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-brand text-3xl md:text-4xl text-[#000b1b] tracking-tight mb-16"
        >
          Where I've <span className="gradient-text">been</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail — draws in on scroll */}
          <motion.div
            className="absolute left-[19px] md:left-[27px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#0358fc]/60 via-[#4b8dff]/50 to-[#0358fc]/20 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: easeOut }}
          />

          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.div key={idx} variants={itemVariant} className="group relative pl-14 md:pl-24">
                {/* Icon node */}
                <motion.div
                  className="absolute left-0 md:left-2 top-5 w-10 h-10 rounded-xl bg-white border-2 border-[#0358fc]/20 ring-4 ring-[#f6f9fe] flex items-center justify-center text-[#0358fc] transition-all duration-300 group-hover:border-[#0358fc]/50 group-hover:scale-110"
                  initial={{ scale: 0, rotate: -8 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={viewportOnce}
                  transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.15 + idx * 0.1 }}
                >
                  <item.Icon size={17} />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="card-spotlight relative overflow-hidden bg-white rounded-2xl border border-slate-200 hover:border-[#0358fc]/40 transition-colors duration-300"
                >
                  {/* Left accent bar */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.accentGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="p-6 md:p-7 pl-7 md:pl-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                          <h3 className="text-lg md:text-xl font-semibold text-[#000b1b]">
                            {item.title}
                          </h3>
                          <span className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase text-[#0358fc] bg-[#0358fc]/10 border border-[#0358fc]/15 px-2 py-0.5 rounded-full">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600">{item.org}</p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin size={11} className="shrink-0" />
                          {item.location}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 shrink-0 font-mono text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap self-start">
                        <Calendar size={11} className="text-[#0358fc]" />
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
