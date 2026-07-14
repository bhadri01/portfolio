import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { useScrollStore } from "../../lib/store";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";

const PortraitScene = lazy(() => import("./PortraitScene"));
const URL = `${import.meta.env.BASE_URL}portrait.jpg`;

/**
 * Portrait card for the About section. Renders the scroll-driven pixel-dissolve
 * when the photo + WebGL are available; falls back to a plain image, and shows a
 * hint if the photo hasn't been added yet.
 */
export default function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const webgl = useWebGLSupport();
  const [ready, setReady] = useState<boolean | null>(null); // null=checking

  // Probe the file so a missing photo never crashes the canvas.
  useEffect(() => {
    const img = new Image();
    img.onload = () => setReady(true);
    img.onerror = () => setReady(false);
    img.src = URL;
  }, []);

  // Drive the dissolve from scroll: assembled when centred, dissolved as it exits upward.
  useEffect(() => {
    if (!(ready && webgl === true) || !ref.current) return;
    const setP = useScrollStore.getState().setPortraitProgress;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current!,
        start: "center center",
        end: "top top",
        scrub: 0.6,
        onUpdate: (self) => setP(self.progress),
      });
    }, ref);
    return () => {
      ctx.revert();
      setP(0);
    };
  }, [ready, webgl]);

  return (
    <div
      ref={ref}
      className="group relative h-[380px] min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#0b1424] md:h-full"
    >
      {ready && webgl === true ? (
        <Suspense
          fallback={
            <img
              src={URL}
              alt="Bhadrinathan"
              className="absolute inset-0 h-full w-full object-cover"
            />
          }
        >
          <PortraitScene url={URL} />
        </Suspense>
      ) : ready ? (
        <img
          src={URL}
          alt="Bhadrinathan"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <p className="font-mono text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            Add <span className="text-[#0358fc] dark:text-[#4b8dff]">portrait.jpg</span>
            <br />
            to <span className="text-slate-500 dark:text-slate-300">/public</span> to see
            the 3D dissolve
          </p>
        </div>
      )}

      {/* subtle bottom gradient for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent opacity-70 dark:from-black/50" />
    </div>
  );
}
