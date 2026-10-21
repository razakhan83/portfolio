"use client";

import { useEffect } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";

export interface WipeHeadingProps {
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function WipeHeading({
  title,
  className = "font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep tracking-tight mb-12 sm:mb-16",
  as: Component = "h2",
}: WipeHeadingProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      animate(".wipe-text", { opacity: 1 }, { duration: 0 });
      animate(".wipe-block", { opacity: 0 }, { duration: 0 });
      return;
    }

    const runWipe = async () => {
      // 1. Expand block across heading (scaleX 0 -> 1, origin left)
      await animate(
        ".wipe-block",
        { scaleX: 1, transformOrigin: "left" },
        { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
      );
      // 2. Reveal text underneath
      animate(".wipe-text", { opacity: 1 }, { duration: 0.01 });
      // 3. Contract block away to the right (scaleX 1 -> 0, origin right)
      await animate(
        ".wipe-block",
        { scaleX: 0, transformOrigin: "right" },
        { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
      );
    };

    runWipe();
  }, [isInView, shouldReduceMotion, animate]);

  // Strip trailing full stop if already provided so we can format the teal accent
  const cleanTitle = title.endsWith(".") ? title.slice(0, -1) : title;

  return (
    <Component ref={scope} className={className}>
      <span className="relative inline-block overflow-hidden py-1">
        {/* The Text */}
        <span
          className="wipe-text inline-block"
          style={{ opacity: shouldReduceMotion ? 1 : 0 }}
        >
          {cleanTitle}
          <span className="text-primary">.</span>
        </span>

        {/* The Teal Wipe Block */}
        {!shouldReduceMotion && (
          <span
            className="wipe-block absolute inset-0 bg-primary z-10 pointer-events-none"
            style={{
              transform: "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        )}
      </span>
    </Component>
  );
}
