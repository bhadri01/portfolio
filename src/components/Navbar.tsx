import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
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
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    let obs: IntersectionObserver | null = null;
    let raf = 0;

    // The sections are lazy-loaded, so they may not be in the DOM when the
    // navbar mounts. Retry until they all exist, then observe for scroll-spy.
    const setup = () => {
      const els = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (els.length < ids.length) {
        raf = requestAnimationFrame(setup);
        return;
      }
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      els.forEach((el) => obs!.observe(el));
    };
    setup();

    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

          {/* Desktop links — one active underline that slides between items */}
          <ul
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const slug = link.href.slice(1);
              const isActive = active === slug;
              const showLine = (hovered ?? active) === slug;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    onMouseEnter={() => setHovered(slug)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-[#0358fc] dark:text-[#4b8dff]"
                        : "text-slate-500 dark:text-slate-400 hover:text-[#0358fc] dark:hover:text-[#4b8dff]"
                    }`}
                  >
                    {link.label}
                    {showLine && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#0358fc] dark:bg-[#4b8dff]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop social */}
          <div className="hidden md:flex items-center gap-1">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
