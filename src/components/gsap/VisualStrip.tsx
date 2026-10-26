"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { demoContent } from "@/lib/demo-content";
import { SparkMark } from "./SvgMarks";

export function VisualStrip() {
  const containerRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced || !imageWrapperRef.current) return;

      // Subtle vertical parallax on the workspace detail shot
      gsap.fromTo(
        imageWrapperRef.current,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      <div className="relative w-full h-72 sm:h-84 md:h-96 rounded-3xl overflow-hidden border border-[#F5F5DC]/15 shadow-2xl flex items-center justify-center text-center p-8">
        {/* Parallax Image Background */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 -top-12 -bottom-12 w-full h-[calc(100%+6rem)] will-change-transform"
        >
          <Image
            src={demoContent.visualStrip.image}
            alt="Ahmed Raza workspace detail shot with mechanical keyboard and wireframe notebook"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
          />
        </div>

        {/* Ambient Dark Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F0D]/90 via-[#0A0F0D]/70 to-[#0A0F0D]/90 pointer-events-none" />

        {/* Overlay Placement Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#008080]/15 border border-[#008080]/30 text-xs font-mono uppercase tracking-widest text-[#008080]">
            <SparkMark className="w-3 h-3 text-[#008080]" />
            <span>{demoContent.visualStrip.caption}</span>
          </div>

          <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F5DC] tracking-tight mb-3">
            {demoContent.visualStrip.quote}
          </h3>

          <p className="font-body text-sm sm:text-base text-[#F5F5DC]/70">
            {demoContent.visualStrip.subtext}
          </p>
        </div>
      </div>
    </section>
  );
}
