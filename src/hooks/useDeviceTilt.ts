import { useCallback, useEffect, useRef, useState } from "react";

type DeviceOrientationEventStatic = typeof DeviceOrientationEvent & {
  /** iOS 13+ only. Must be called from inside a real user gesture. */
  requestPermission?: () => Promise<"granted" | "denied" | "default">;
};

/** Degrees of tilt that map to full deflection. Small = twitchy, large = sluggish. */
const RANGE = 26;

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Screen rotation swaps the meaning of beta/gamma, so remap them back into
 * "x = left/right, y = front/back" relative to how the user is holding it.
 */
function remap(beta: number, gamma: number, angle: number) {
  switch (angle) {
    case 90:
      return { x: beta, y: -gamma };
    case -90:
    case 270:
      return { x: -beta, y: gamma };
    case 180:
      return { x: -gamma, y: -beta };
    default:
      return { x: gamma, y: beta };
  }
}

/**
 * Feeds normalized (-1 → 1) device tilt to `onTilt`, mirroring the pointer
 * convention used on desktop so the same code can steer the emblem.
 *
 * Deliberately does NOT hold tilt in React state — the sensor fires ~60Hz and
 * that would re-render the hero on every event.
 */
export function useDeviceTilt({
  enabled,
  onTilt,
}: {
  enabled: boolean;
  onTilt: (x: number, y: number) => void;
}) {
  const onTiltRef = useRef(onTilt);
  onTiltRef.current = onTilt;

  const [granted, setGranted] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setGranted(false);
      setNeedsPermission(false);
      return;
    }
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;
    const DOE = window.DeviceOrientationEvent as DeviceOrientationEventStatic;
    // iOS gates the sensor behind an explicit tap; everywhere else it's open.
    if (typeof DOE.requestPermission === "function") setNeedsPermission(true);
    else setGranted(true);
  }, [enabled]);

  /** Call this from a user gesture (a tap/click handler), or iOS will reject it. */
  const request = useCallback(async () => {
    const DOE = window.DeviceOrientationEvent as DeviceOrientationEventStatic;
    if (typeof DOE?.requestPermission !== "function") return;
    try {
      if ((await DOE.requestPermission()) === "granted") {
        setGranted(true);
        setNeedsPermission(false);
      }
    } catch {
      // User dismissed the prompt — leave the emblem static, nothing to do.
    }
  }, []);

  useEffect(() => {
    if (!enabled || !granted) return;

    // Calibrate against the first reading so "centre" is however the person is
    // actually holding the phone, not flat on a table.
    let base: { beta: number; gamma: number } | null = null;

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      if (!base) base = { beta: e.beta, gamma: e.gamma };
      const angle =
        (window.screen?.orientation?.angle ?? 0) as number;
      const d = remap(e.beta - base.beta, e.gamma - base.gamma, angle);
      onTiltRef.current(clamp(d.x / RANGE), clamp(d.y / RANGE));
    };

    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [enabled, granted]);

  return { granted, needsPermission, request };
}
