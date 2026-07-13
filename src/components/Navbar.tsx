import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, Sun, Moon } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [dark, setDark] = useState(false);

  const applyThemeColor = (isDark: boolean) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#0a0f1c" : "#f6f9fe");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    applyThemeColor(isDark);
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      applyThemeColor(next);
      return next;
    });
  };

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerCls = open
    ? "glass border border-slate-200/80 dark:border-white/10 rounded-2xl px-5 py-3"
    : scrolled
      ? "glass border border-slate-200/80 dark:border-white/10 rounded-full px-5 py-2"
      : "px-0 py-4";

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 pt-4 md:pt-5 px-4 md:px-6"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <div className={`max-w-5xl mx-auto transition-all duration-500 ${containerCls}`}>
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
            <Logo size={32} showWordmark={false} />
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`px-4 py-2 rounded-lg text-sm tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-[#0358fc] dark:text-[#4b8dff] bg-[#0358fc]/10"
                        : "text-slate-500 dark:text-slate-400 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop social */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="https://github.com/bhadri01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
            >
              <Github size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/bhadrinathan-a-90b8bb361"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
            >
              <Linkedin size={19} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden p-2 -mr-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: easeOut }}
            >
              <motion.ul
                className="flex flex-col pt-3"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              >
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(link.href);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={`block px-3 py-2.5 rounded-lg text-[15px] transition-all duration-200 ${
                          isActive
                            ? "text-[#0358fc] dark:text-[#4b8dff] bg-[#0358fc]/10"
                            : "text-slate-600 dark:text-slate-300 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div className="flex items-center gap-2 mt-2 pt-3 px-3 border-t border-slate-200/70 dark:border-white/10">
                <a
                  href="https://github.com/bhadri01"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhadrinathan-a-90b8bb361"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                >
                  <Linkedin size={20} />
                </a>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-[#0358fc] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                  {dark ? "Light" : "Dark"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
