import { useCallback } from "react";

/**
 * Feeds the cursor's position to the `.card-spotlight` CSS effect.
 *
 * That CSS reads `radial-gradient(... at var(--mx, 50%) var(--my, 50%) ...)`,
 * so without someone setting those custom properties it silently falls back to
 * a glow pinned to the card's centre — which is what shipped. This writes them
 * on pointer move, so the glow actually tracks the cursor.
 *
 * Deliberately writes straight to the node rather than going through React
 * state: this fires on every pointer move, and re-rendering the card each time
 * would be pointless work.
 */
export function useSpotlight() {
  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}
