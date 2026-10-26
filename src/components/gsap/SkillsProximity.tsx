"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { demoContent } from "@/lib/demo-content";

export function SkillsProximity() {
  const containerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isTouch =
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches);

      if (isTouch || !gridRef.current) return;

      // Initialize quickTo setters for each tile to achieve 60fps proximity scaling
      const quickSetters = tileRefs.current.map((tile) => {
        if (!tile) return null;
        return {
          scale: gsap.quickTo(tile, "scale", { duration: 0.35, ease: "power2.out" }),
          y: gsap.quickTo(tile, "y", { duration: 0.35, ease: "power2.out" }),
          borderColor: (color: string) => {
            tile.style.borderColor = color;
          },
        };
      });

      const handlePointerMove = (e: PointerEvent) => {
        const proximityRadius = 240;

        tileRefs.current.forEach((tile, index) => {
          const setters = quickSetters[index];
          if (!tile || !setters) return;

          const rect = tile.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

          if (distance < proximityRadius) {
            const factor = 1 - distance / proximityRadius;
            // Proximity scale up to ~1.18x and slight upward lift
            setters.scale(1 + factor * 0.16);
            setters.y(-factor * 8);
            setters.borderColor(factor > 0.4 ? "#008080" : "rgba(245, 245, 220, 0.2)");
          } else {
            setters.scale(1);
            setters.y(0);
            setters.borderColor("rgba(245, 245, 220, 0.1)");
          }
        });
      };

      const handlePointerLeave = () => {
        quickSetters.forEach((setters) => {
          if (!setters) return;
          setters.scale(1);
          setters.y(0);
          setters.borderColor("rgba(245, 245, 220, 0.1)");
        });
      };

      const grid = gridRef.current;
      grid.addEventListener("pointermove", handlePointerMove);
      grid.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        grid.removeEventListener("pointermove", handlePointerMove);
        grid.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-[#F5F5DC]/10"
    >
      <div className="mb-14">
        <span className="text-xs uppercase tracking-widest text-[#008080] font-heading font-semibold block mb-3">
          Expertise & Stack
        </span>
        <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#F5F5DC] tracking-tight mb-4">
          {demoContent.skills.heading}
        </h2>
        <p className="font-body text-[#F5F5DC]/60 max-w-xl text-base sm:text-lg">
          {demoContent.skills.subline}
        </p>
      </div>

      {/* Proximity Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 select-none"
      >
        {demoContent.skills.items.map((skill, index) => (
          <div
            key={skill}
            ref={(el) => {
              tileRefs.current[index] = el;
            }}
            className="p-5 sm:p-6 rounded-2xl bg-[#0A0F0D] border border-[#F5F5DC]/10 transition-colors duration-200 flex flex-col justify-between min-h-[110px] will-change-transform"
          >
            <span className="text-xs text-[#F5F5DC]/40 font-mono">
              0{index + 1}
            </span>
            <span className="font-heading font-semibold text-base sm:text-lg text-[#F5F5DC] tracking-wide">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
