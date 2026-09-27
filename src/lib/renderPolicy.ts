/** WebKit gets a lightweight path; iPadOS can advertise itself as macOS. */
export function needsLightweightRendering(ua: string, touchPoints = 0): boolean {
  const appleMobile = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touchPoints > 1);
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua);
  return appleMobile || safari;
}

export const lightweightRendering = typeof navigator !== "undefined" &&
  needsLightweightRendering(navigator.userAgent, navigator.maxTouchPoints);
