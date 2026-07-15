import { useState } from "react";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * Is this device beefy enough to be worth sending three.js to (~252KB gzipped)?
 *
 * Used to gate the real WebGL emblem on phones: strong phones get the 3D scene,
 * everything else falls back to the lightweight static mark.
 */
export function useStrongDevice(): boolean {
  // Hardware doesn't change mid-session, so decide once and never re-render.
  const [strong] = useState(() => {
    if (typeof navigator === "undefined") return false;
    const nav = navigator as NavigatorWithHints;

    // Never burn a metered/limited connection on a decorative download.
    if (nav.connection?.saveData) return false;

    // deviceMemory is Chromium-only — iOS Safari omits it entirely, so an
    // absent value must not be read as "weak". Assume mid-range there and let
    // the core count decide.
    const memory = nav.deviceMemory ?? 4;
    const cores = nav.hardwareConcurrency ?? 2;

    return memory >= 4 && cores >= 6;
  });

  return strong;
}
