import { create } from 'zustand'

/**
 * Scroll-driven state shared between the DOM and the R3F scene.
 * The 3D scene reads `heroProgress` imperatively via `useScrollStore.getState()`
 * inside `useFrame` — it does NOT subscribe, so there are no per-frame re-renders.
 */
type ScrollState = {
  /** 0 → 1 progress through the pinned hero story. */
  heroProgress: number
  setHeroProgress: (v: number) => void
  /** 0 → 1 progress used to dissolve the About portrait as it scrolls past. */
  portraitProgress: number
  setPortraitProgress: (v: number) => void
  /** Normalized pointer position (-1 → 1) for subtle parallax. */
  pointer: { x: number; y: number }
  setPointer: (x: number, y: number) => void
}

export const useScrollStore = create<ScrollState>((set) => ({
  heroProgress: 0,
  setHeroProgress: (v) => set({ heroProgress: v }),
  portraitProgress: 0,
  setPortraitProgress: (v) => set({ portraitProgress: v }),
  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),
}))
