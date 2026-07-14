import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Below-the-fold sections are code-split into their own chunks
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Footer = lazy(() => import("./components/Footer"));

/**
 * With lazy-loaded sections the page height keeps growing as chunks resolve,
 * so a deep link like /#experience would land off-target. This waits for the
 * hash target to mount, scrolls to it, then re-aligns once layout settles.
 */
function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          // re-align after lazy content + images settle the layout
          window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
        } else if (tries++ < 60) {
          requestAnimationFrame(tick);
        }
      };
      tick();
    };

    if (window.location.hash) scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

function App() {
  useHashScroll();

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0358fc] focus:text-white focus:text-sm"
      >
        Skip to content
      </a>
      <div className="min-h-dvh bg-[#f6f9fe] dark:bg-[#0a0f1c] text-[#000b1b] dark:text-slate-100 overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default App;
