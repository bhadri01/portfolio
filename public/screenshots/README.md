# Project screenshots

Drop project screenshot images in this folder, then point the project at it via the
`cover` field in `src/data/projects.ts`.

## How to add one

1. Save a screenshot here, e.g. `public/screenshots/algotrade.png`
   (PNG or JPG, ideally ~1200×750, landscape).
2. In `src/data/projects.ts`, add a `cover` to that project:

   ```ts
   {
     title: "AlgoTrade Platform",
     // ...
     cover: "/screenshots/algotrade.png",
   }
   ```

That's it — the image appears in the project list row and as the banner in the
expanded detail card. If the file is missing, it gracefully falls back to the
icon cover, so nothing breaks.

## Suggested files (your live projects)

- `algotrade.png` — a capture of https://algo.bha3.me
- `portfolio.png`  — a capture of https://bha3.me

Any landscape screenshot works; the row crops it to a square thumbnail and the
modal shows it as a wide banner (top-aligned).
