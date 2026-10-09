import type { ComponentType } from "react";
import { lightweightRendering } from "../lib/renderPolicy";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportOnce, easeOut } from "../lib/motion";
import { useSpotlight } from "../hooks/useSpotlight";
import { Briefcase, GraduationCap, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { achievements } from "../data/achievements";

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
    title: "Lead Engineer — EdTech Platform",
    org: "BloomSkillTech",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "Jan 2025 — Present",
    description:
      "Architected a multi-tenant EdTech platform spanning React interfaces, FastAPI, PostgreSQL and LLM API integrations. Built RAG and multi-agent pipelines using LangChain, LangGraph and MCP. Optimized RAG indexing and vector queries, reducing response latency by 40% under concurrent workloads. Established CI/CD, automated tests and deployment workflows; mentored 6+ engineers through code reviews and architecture guidance.",
    accentGradient: "from-[#0358fc] to-[#4b8dff]",
    label: "Full-time",
    Icon: Briefcase,
  },
  {
    title: "Senior Software Engineer",
    org: "BloomSkillTech",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "May 2023 — Dec 2024",
    description:
      "Developed a cloud labs platform with interactive coding environments, secure VPN access and isolated Docker workspaces. Built FastAPI microservices for container lifecycles, resource management and real-time sessions. Implemented Redis caching and asynchronous job queues, improving API throughput by 50%.",
    accentGradient: "from-[#4b8dff] to-[#0358fc]",
    label: "Full-time",
    Icon: Briefcase,
  },
  {
    title: "Software Developer",
    org: "BloomSkillTech",
    location: "Salem, Tamil Nadu",
    period: "Dec 2022 — May 2023",
    description:
      "Built a law enforcement CRM with React interfaces, Go REST APIs, PostgreSQL and Docker. Delivered case timelines, full-text record search and tracking.",
    accentGradient: "from-[#0358fc] to-[#6aa1ff]",
    label: "Full-time",
    Icon: Briefcase,
  },
  {
    title: "Software Development Intern",
    org: "Salem City Cyber Crime Police",
    location: "Salem, Tamil Nadu · Hybrid",
    period: "Aug 2021 — Dec 2022",
    description:
      "Developed a website incorporating the station's database and continued software maintenance and support until joining BloomSkillTech. Received a Certificate of Appreciation from Salem City Police in December 2021 for website development contributions.",
    accentGradient: "from-[#0358fc] to-[#6aa1ff]",
    label: "Internship",
    Icon: ShieldCheck,
  },
  {
    title: "B.E. Electronics and Communication Engineering",
    org: "Muthayammal Engineering College",
    location: "Namakkal, Tamil Nadu",
    period: "2019 — 2023",
    description:
      "Graduated in First Class. Built a final-year gesture-controlled electronics project that lets users control electronic components through gestures, applying IoT prototyping and hardware-software integration.",
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
          <span className="font-brand text-xs text-[#0358fc] dark:text-[#4b8dff] tracking-[0.2em] uppercase">
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 ml-0 sm:ml-16 md:ml-28 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0f1a2e]"
        >
          <h3 className="font-brand text-lg text-[#000b1b] dark:text-slate-100">Training & mentorship</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Trained 1,000+ students from multiple colleges, sharing practical software development experience alongside my engineering work.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-5 ml-0 sm:ml-16 md:ml-28 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0f1a2e]"
        >
          <h3 className="font-brand text-lg text-[#000b1b] dark:text-slate-100">Achievements & interests</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <div key={achievement.title}>
                <h4 className="text-sm font-semibold text-[#0358fc] dark:text-[#4b8dff]">{achievement.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{achievement.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineCard({ item, idx }: { item: TimelineItem; idx: number }) {
  const spotlight = useSpotlight();
  return (
    <div className="group relative pl-16 md:pl-28">
      {/* Node */}
      <motion.div
        initial={lightweightRendering ? false : { scale: 0.3, opacity: 0, rotate: -12 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 360, damping: 18 }}
        className={`absolute left-[6px] md:left-[14px] top-4 z-20 w-11 h-11 rounded-2xl bg-gradient-to-br ${item.accentGradient} ring-4 ring-[#f6f9fe] dark:ring-[#0a0f1c] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
      >
        <item.Icon size={18} />
      </motion.div>

      {/* Card */}
      <motion.article
        initial={lightweightRendering ? false : { opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: easeOut }}
        whileHover={{ y: -4 }}
        // card-spotlight has been on these cards all along, but nothing ever set
        // --mx/--my, so the glow sat pinned to the centre. Now it tracks.
        onPointerMove={spotlight}
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
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#0358fc] dark:text-[#4b8dff] bg-[#0358fc]/10 border border-[#0358fc]/15 px-2.5 py-0.5 rounded-full">
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
