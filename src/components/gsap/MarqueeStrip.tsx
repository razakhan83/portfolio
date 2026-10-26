"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { demoContent } from "@/lib/demo-content";
import { SparkMark } from "./SvgMarks";

export function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Repeat items for seamless horizontal loop
  const marqueeItems = [
    ...demoContent.marquee,
    ...demoContent.marquee,
    ...demoContent.marquee,
  ];

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced || !trackRef.current) return;

      const track = trackRef.current;
      const singleSetWidth = track.scrollWidth / 3;

      if (singleSetWidth <= 0) return;

      tweenRef.current = gsap.to(track, {
        x: -singleSetWidth,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tweenRef.current?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-[#F5F5DC]/10 py-4 bg-[#0A0F0D] select-none"
      onPointerEnter={() => tweenRef.current?.pause()}
      onPointerLeave={() => tweenRef.current?.play()}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex gap-8 sm:gap-12 w-max will-change-transform items-center"
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 sm:gap-12 shrink-0">
            <span className="font-heading font-medium tracking-wider uppercase text-xs sm:text-sm text-[#F5F5DC]/70 hover:text-[#008080] transition-colors">
              {item}
            </span>
            <SparkMark className="w-3 h-3 text-[#008080]" />
          </div>
        ))}
      </div>
    </div>
  );
}
