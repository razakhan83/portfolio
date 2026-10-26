"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "./MagneticButton";
import { demoContent } from "@/lib/demo-content";
import { SparkMark } from "./SvgMarks";

export function ContactSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const underlineRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!headingRef.current || !containerRef.current) return;

      if (isReduced) {
        gsap.set(headingRef.current, {
          color: "#F5F5DC",
          WebkitTextStroke: "0px transparent",
        });
        if (underlineRef.current) {
          gsap.set(underlineRef.current, { strokeDashoffset: 0 });
        }
        return;
      }

      const underline = underlineRef.current;
      const length = underline?.getTotalLength ? underline.getTotalLength() : 300;

      if (underline) {
        gsap.set(underline, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      // Outline-to-fill text effect as it scrolls into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headingRef.current,
        {
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(245, 245, 220, 0.35)",
        },
        {
          color: "#F5F5DC",
          WebkitTextStroke: "0px transparent",
          duration: 1.1,
          ease: "power2.out",
        }
      );

      if (underline) {
        tl.to(
          underline,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-[#F5F5DC]/10"
    >
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <SparkMark className="w-3.5 h-3.5 text-[#008080]" />
          <span className="text-xs uppercase tracking-widest text-[#008080] font-heading font-semibold">
            Initiate Contact
          </span>
        </div>

        <div className="relative inline-block mb-6">
          <h2
            ref={headingRef}
            className="font-heading font-bold text-4xl sm:text-6xl text-[#F5F5DC] tracking-tight transition-colors will-change-transform pb-2"
          >
            {demoContent.contact.heading}
          </h2>

          {/* Hand-drawn SVG underline */}
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

        <p className="font-body text-[#F5F5DC]/70 text-base sm:text-xl leading-relaxed mb-10">
          {demoContent.contact.subline}
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <MagneticButton
            href={demoContent.contact.buttonHref}
            target="_blank"
            variant="primary"
            className="min-w-[180px]"
          >
            {demoContent.contact.buttonLabel}
          </MagneticButton>
          <a
            href={`mailto:${demoContent.contact.email}`}
            className="font-mono text-sm sm:text-base text-[#F5F5DC]/60 hover:text-[#008080] transition-colors"
          >
            {demoContent.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
