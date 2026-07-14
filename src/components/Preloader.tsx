import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Assets worth having in cache before the reveal. */
const ASSETS = [
  "/logo-mark.svg",
  "/logo-mark-dark.svg",
  "/bhadrinathan-wordmark.svg",
  "/bhadrinathan-wordmark-dark.svg",
  "/portrait.png",
];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * Branded loading screen. While it's up, the heavy resources (the three.js
 * bundle, fonts and images) download in the background; once they're ready it
 * fades out to reveal the site.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    const total = ASSETS.length + 2; // + fonts + the 3D bundle

    const bump = () => {
      loaded += 1;
      if (mounted) setProgress(Math.min(99, Math.round((loaded / total) * 100)));
    };

    const tasks: Promise<unknown>[] = ASSETS.map((a) => preloadImage(a).then(bump));

    // web fonts
    const fonts =
      (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts
        ?.ready ?? Promise.resolve();
    tasks.push(fonts.then(bump, bump));

    // pull the heavy 3D bundle down now so the hero paints instantly later
    tasks.push(import("./hero3d/HeroScene").then(bump, bump));

    const finish = () => {
      if (!mounted) return;
      setProgress(100);
      // brief hold so 100% is visible, then reveal
      setTimeout(() => mounted && setDone(true), 260);
    };

    Promise.all(tasks).finally(finish);
    const cap = setTimeout(finish, 6000); // safety cap

    return () => {
      mounted = false;
      clearTimeout(cap);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[#f6f9fe] dark:bg-[#0a0f1c]"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-7">
            <div className="relative grid place-items-center">
              <div className="pointer-events-none absolute h-28 w-28 rounded-full bg-[#0358fc]/15 blur-2xl" />
              <motion.img
                src="/logo-mark.svg"
                alt=""
                aria-hidden
                className="relative h-16 w-16 dark:hidden"
                animate={{ scale: [1, 1.09, 1], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img
                src="/logo-mark-dark.svg"
                alt=""
                aria-hidden
                className="relative hidden h-16 w-16 dark:block"
                animate={{ scale: [1, 1.09, 1], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[#0358fc]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.4 }}
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.3em] text-slate-400 dark:text-slate-500">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
