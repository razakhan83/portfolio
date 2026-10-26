"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { demoContent } from "@/lib/demo-content";
import { SectionHeading, StrokeIcon } from "./SvgMarks";

export function ProcessWaypoints() {
  const containerRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const markerRef = useRef<SVGGElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced || !pathRef.current || !markerRef.current) {
        stepRefs.current.forEach((step) => {
          if (step) {
            step.style.borderColor = "#008080";
            step.style.opacity = "1";
          }
        });
        return;
      }

      // MotionPath Waypoints timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.5,
        },
      });

      // 1. Marker travels smoothly down the curved SVG path
      tl.to(markerRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
        duration: 1,
      });

      // 2. Each step card activates (highlights) as the marker reaches its waypoint
      const totalSteps = stepRefs.current.length;
      stepRefs.current.forEach((card, i) => {
        if (!card) return;
        const waypointProgress = i / (totalSteps - 1);

        // Pre-waypoint state
        gsap.set(card, {
          borderColor: "rgba(245, 245, 220, 0.1)",
          backgroundColor: "#0A0F0D",
          opacity: 0.5,
        });

        // Activate when marker arrives at waypoint position
        tl.to(
          card,
          {
            borderColor: "#008080",
            backgroundColor: "rgba(0, 128, 128, 0.08)",
            opacity: 1,
            duration: 0.15,
            ease: "power1.out",
          },
          waypointProgress
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-[#F5F5DC]/10"
    >
      <SectionHeading
        eyebrow="Methodology"
        title={demoContent.process.heading}
        subline={demoContent.process.subline}
      />

      {/* Process Interactive Waypoints Container */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* SVG Curved Path Column (visible on md+) */}
        <div className="hidden md:flex md:col-span-3 items-center justify-center relative min-h-[640px]">
          <svg
            className="w-full h-full max-h-[700px] overflow-visible"
            viewBox="0 0 100 800"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Guide Curved Path */}
            <path
              ref={pathRef}
              id="motionpath-guide"
              d="M 50 30 C 85 160, 15 280, 50 400 C 85 520, 15 640, 50 770"
              stroke="rgba(245, 245, 220, 0.15)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Glowing Traveling Marker */}
            <g ref={markerRef}>
              <circle r="18" fill="#008080" opacity="0.25" />
              <circle
                r="8"
                fill="#008080"
                stroke="#F5F5DC"
                strokeWidth="2.5"
              />
            </g>
          </svg>
        </div>

        {/* 4 Step Cards with hand-drawn StrokeIcons */}
        <div className="md:col-span-9 flex flex-col justify-between gap-6">
          {demoContent.process.steps.map((step, idx) => (
            <div
              key={step.step}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className="p-6 sm:p-8 rounded-2xl border border-[#F5F5DC]/10 bg-[#0A0F0D] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold text-[#008080] px-2.5 py-1 rounded bg-[#008080]/15 border border-[#008080]/30">
                    {step.step}
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5DC]">
                    {step.title}
                  </h3>
                </div>
                <StrokeIcon
                  name={step.iconName}
                  className="w-6 h-6 text-[#008080] opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="font-body text-sm sm:text-base text-[#F5F5DC]/70 leading-relaxed max-w-2xl">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
