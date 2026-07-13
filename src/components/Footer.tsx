import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";

export default function Footer() {
  return (
    <footer className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#eef3fd] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[900px] h-[400px] rounded-full bg-[#0358fc]/8 blur-[130px] pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto relative"
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Top divider */}
        <motion.div
          variants={fadeUp}
          className="h-px w-full bg-gradient-to-r from-transparent via-[#0358fc]/25 to-transparent mb-20"
        />

        <div className="grid md:grid-cols-2 gap-16 items-end">
          {/* Left: CTA */}
          <motion.div variants={fadeUp}>
            <p className="font-brand text-xs text-[#0358fc] tracking-[0.2em] uppercase mb-6">
              Get in touch
            </p>
            <h2 className="font-brand text-3xl md:text-4xl text-[#000b1b] leading-tight mb-10">
              Let's build something
              <br />
              <span className="gradient-text">together.</span>
            </h2>
            <motion.a
              href="mailto:bhadri2002@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0358fc] text-white font-medium hover:bg-[#0246d4] transition-colors duration-300"
            >
              bhadri2002@gmail.com
              <span>→</span>
            </motion.a>
          </motion.div>

          {/* Right: social links */}
          <motion.div variants={fadeUp} className="space-y-5">
            {[
              { label: "GitHub", href: "https://github.com/bhadri01" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/bhadrinathan-a-90b8bb361" },
              { label: "Instagram", href: "https://www.instagram.com/bhadri.01/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-8 h-px bg-gradient-to-r from-[#0358fc] to-transparent group-hover:w-16 transition-all duration-300" />
                <span className="text-slate-500 group-hover:text-[#0358fc] transition-colors duration-300 text-sm">
                  {label} ↗
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="mt-20 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <span className="font-mono text-xs text-slate-500 tracking-wider">
            &copy; {new Date().getFullYear()} Bhadrinathan A
          </span>
          <span className="font-mono text-xs text-slate-400 tracking-wider">
            Built with React + TypeScript
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
