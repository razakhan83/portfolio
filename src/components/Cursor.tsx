"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const subscribeFinePointer = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const m = window.matchMedia("(pointer: fine)");
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
};

const getFinePointer = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
};

const getServerFinePointer = () => false;

export default function Cursor() {
  const shouldReduceMotion = useReducedMotion();
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointer,
    getServerFinePointer
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Stiff springs for crisp, responsive tracking without lag spikes
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60 });

  const ringX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    if (shouldReduceMotion || !isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Check if target is an interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "a, button, [data-cursor], [role='button'], [role='tab'], input, textarea, select"
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, shouldReduceMotion, isFinePointer]);

  if (!isFinePointer || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered
            ? "rgba(0, 128, 128, 0.12)"
            : "rgba(0, 128, 128, 0)",
          borderColor: isHovered
            ? "rgba(0, 128, 128, 0.9)"
            : "rgba(0, 128, 128, 0.45)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Center Teal Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none shadow-xs"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
