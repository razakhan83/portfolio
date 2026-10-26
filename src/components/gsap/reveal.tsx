"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [delay] }
  );

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}

export default Reveal;
