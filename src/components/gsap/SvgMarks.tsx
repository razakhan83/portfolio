"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

/**
 * Tiny 4-pointed hand-drawn spark / star mark.
 */
export function SparkMark({ className = "w-4 h-4 text-[#008080]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`inline-block ${className}`}
    >
      <path d="M12 2 C12 7.5 7.5 12 2 12 C7.5 12 12 16.5 12 22 C12 16.5 16.5 12 22 12 C16.5 12 12 7.5 12 2 Z" />
    </svg>
  );
}

/**
 * Hand-drawn SVG stroke icons for skills and process cards.
 */
export function StrokeIcon({
  name,
  className = "w-5 h-5 text-[#008080]",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "brackets":
    case "bracket":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case "cart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "chart":
    case "gauge":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4.5c1.45-1.47 4.5-2 4.5-2" />
          <path d="M12 15v5s3.03-.55 4.5-2c1.47-1.45 2-4.5 2-4.5" />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "database":
    case "server":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "cpu":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 6h6a3 3 0 0 1 3 3v6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
  }
}

/**
 * Section Heading with SplitText line reveal and self-drawing SVG underline.
 */
export function SectionHeading({
  eyebrow,
  title,
  subline,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subline?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const underlineRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!containerRef.current || !titleRef.current || !underlineRef.current) return;

      const underline = underlineRef.current;
      const length = underline.getTotalLength ? underline.getTotalLength() : 300;

      if (isReduced) {
        gsap.set(underline, { strokeDashoffset: 0, opacity: 1 });
        return;
      }

      // Initialize stroke dash
      gsap.set(underline, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.9,
      });

      // SplitText lines reveal
      const split = new SplitText(titleRef.current, {
        type: "lines",
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // 1. Lines reveal
      tl.fromTo(
        split.lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // 2. Hand-drawn underline draws itself
      tl.to(
        underline,
        {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`mb-12 sm:mb-16 ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <SparkMark className="w-3.5 h-3.5 text-[#008080]" />
          <span className="text-xs uppercase tracking-widest text-[#008080] font-heading font-semibold">
            {eyebrow}
          </span>
        </div>
      )}

      <div className="relative inline-block">
        <h2
          ref={titleRef}
          className="font-heading font-bold text-3xl sm:text-5xl text-[#F5F5DC] tracking-tight pb-2"
        >
          {title}
        </h2>

        {/* Hand-drawn curved underline stroke */}
        <svg
          className="absolute -bottom-2 left-0 w-full h-4 overflow-visible pointer-events-none"
          viewBox="0 0 300 16"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={underlineRef}
            d="M 2 8 C 80 14, 180 2, 298 9"
            stroke="#008080"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {subline && (
        <p className="font-body text-[#F5F5DC]/60 max-w-xl text-base sm:text-lg mt-4">
          {subline}
        </p>
      )}
    </div>
  );
}
