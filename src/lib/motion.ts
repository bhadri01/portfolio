import type { Variants } from "framer-motion";

// Smooth, expo-style easing for a polished, high-end feel.
export const easeOut = [0.16, 1, 0.3, 1] as const;

// Fade + rise. The default building block for revealed content.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

// Subtle fade + rise for smaller items (pills, list rows).
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

// Gentle scale-in for cards.
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// Parent that staggers its children as they enter.
export const stagger = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Shared viewport config: play once, a little before fully in view.
export const viewportOnce = { once: true, amount: 0.2 } as const;
