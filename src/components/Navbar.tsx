import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { easeOut } from "../lib/motion";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 pt-5 px-6"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <div
        className={`max-w-5xl mx-auto transition-all duration-500 ${
          scrolled
            ? "glass border border-slate-200/80 rounded-full px-5 py-2"
            : "px-0 py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#home");
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center hover:opacity-90 transition-opacity"
            aria-label="Bhadrinathan — home"
          >
            <Logo size={34} showWordmark={false} />
          </motion.a>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-[#0358fc] hover:bg-slate-100 transition-all duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com/bhadri01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-slate-500 hover:text-[#0358fc] hover:bg-slate-100 transition-all duration-200"
            >
              <Github size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/bhadrinathan-a-90b8bb361"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-slate-500 hover:text-[#0358fc] hover:bg-slate-100 transition-all duration-200"
            >
              <Linkedin size={19} />
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
