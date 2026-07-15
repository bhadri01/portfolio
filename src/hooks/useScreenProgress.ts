import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

/**
 * How far an element's centre has travelled across the viewport:
 *
 *   0   → centre sitting on the bottom edge (just arriving)
 *   0.5 → centre exactly mid-screen
 *   1   → centre sitting on the top edge (just leaving)
 *
 * Measured straight from getBoundingClientRect rather than framer's useScroll,
 * whose offset maths walks the offsetParent chain and silently yields a frozen
 * progress when an ancestor is statically positioned. This only cares about
 * where the element actually is on screen, so no layout assumptions can break
 * it — and it gives a symmetric value that runs on the way out as well as in.
 */
export function useScreenProgress(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centre = rect.top + rect.height / 2;
      const raw = 1 - centre / window.innerHeight;
      progress.set(Math.max(0, Math.min(1, raw)));
    };

    // Coalesce bursts of scroll events into one measurement per frame.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, enabled, progress]);

  return progress;
}
