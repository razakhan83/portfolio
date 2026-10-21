import type { Transition, Variants } from "motion/react";

/**
 * Shared Motion Configuration
 * Timing: 300ms - 600ms, ease-out curves
 * ONLY transform (x, y, scale, scaleX) and opacity
 * Layout-safe: zero width/height/top/left animations
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // Custom spring-like snappy ease-out
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.45,
  ease: EASE_OUT,
};

// Fade up 16px (Scroll reveal)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
    },
  },
};

// Container with slight stagger for grid children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Hero Entrance Sequence Variants
export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  },
};

// Illustration slide in from right
export const heroIllustration: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
      delay: 0.45,
    },
  },
};
