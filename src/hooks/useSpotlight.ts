import { useCallback, useEffect, useRef } from "react";

/**
 * Feeds the cursor's position to the `.card-spotlight` CSS effect.
 *
 * That CSS reads `radial-gradient(... at var(--mx, 50%) var(--my, 50%) ...)`,
 * so without someone setting those custom properties it silently falls back to
 * a glow pinned to the card's centre — which is what shipped.
 *
 * Pointer moves fire far faster than the screen refreshes, so the work is
 * coalesced into one write per frame. Two things matter for smoothness here:
 *
 *  - getBoundingClientRect forces a synchronous layout. Called straight from the
 *    handler it runs on every single move event, interleaved with style writes —
 *    a layout thrash loop. It happens inside the frame callback instead.
 *  - Repainting a 340px radial gradient is not free. Once per frame is plenty;
 *    more just burns paint budget for pixels nobody sees.
 */
export function useSpotlight() {
  const frame = useRef(0);
  const pending = useRef<{ el: HTMLElement; x: number; y: number } | null>(null);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    // Only the latest position matters; older ones are already stale.
    pending.current = { el: e.currentTarget, x: e.clientX, y: e.clientY };
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const next = pending.current;
      if (!next) return;
      const rect = next.el.getBoundingClientRect();
      next.el.style.setProperty("--mx", `${next.x - rect.left}px`);
      next.el.style.setProperty("--my", `${next.y - rect.top}px`);
    });
  }, []);
}
