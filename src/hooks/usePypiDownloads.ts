import { useEffect, useState } from "react";

// pepy.tech's public lifetime badge is cached by its server for 12 hours.
// Its JSON endpoint requires an API key, so read the public SVG without
// putting credentials in this static site's client bundle.
export const downloadStatsUrl = "https://pepy.tech/projects/fastapi-querybuilder";
export const downloadBadgeUrl = "https://api.pepy.tech/personalized-badge/fastapi-querybuilder?period=total&units=none&left_text=downloads";

export function usePypiDownloads() {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(downloadBadgeUrl, { signal: controller.signal });
        if (!response.ok) return;
        const svg = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
        const values = Array.from(svg.querySelectorAll("text"))
          .map((node) => node.textContent?.trim() ?? "")
          .filter((value) => /^\d[\d,]*$/.test(value));
        const count = Number(values.at(-1)?.replaceAll(",", ""));
        if (Number.isSafeInteger(count) && count >= 0) setDownloads(count);
      } catch {
        // The public SVG badge remains available as a no-JS/CORS fallback.
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return downloads;
}
