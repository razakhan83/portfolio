"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "./MagneticButton";
import { demoContent } from "@/lib/demo-content";

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isNormal: "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isReduced } = context.conditions as {
            isNormal: boolean;
            isReduced: boolean;
          };

          if (isReduced) {
            // Instantly display all hero elements in final state
            gsap.set(
              [
                badgeRef.current,
                headlineLineRefs.current,
                sublineRef.current,
                ctaContainerRef.current,
              ],
              {
                opacity: 1,
                y: 0,
                yPercent: 0,
                clearProps: "all",
              }
            );
            return;
          }

          // Orchestrated EaseReverse: single choreographed timeline with signature power4.out ease
          const tl = gsap.timeline({
            defaults: {
              ease: "power4.out",
            },
          });

          // 1. Availability badge fade-in
          if (badgeRef.current) {
            tl.fromTo(
              badgeRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.8 },
              0
            );
          }

          // 2. Headline lines rise in sequence from masked overflow containers
          if (headlineLineRefs.current.length > 0) {
            tl.fromTo(
              headlineLineRefs.current,
              { yPercent: 120, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.15,
                stagger: 0.18,
              },
              0.15
            );
          }

          // 3. Sub-line rises and fades into place
          if (sublineRef.current) {
            tl.fromTo(
              sublineRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.95 },
              "-=0.6"
            );
          }

          // 4. Action buttons follow with dynamic feel
          if (ctaContainerRef.current) {
            tl.fromTo(
              ctaContainerRef.current.children,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
              },
              "-=0.55"
            );
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Availability pill */}
      <div ref={badgeRef} className="mb-6 opacity-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#008080]/30 bg-[#008080]/10 text-xs sm:text-sm font-body text-[#F5F5DC]">
          <span className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
          <span>Available for contracts & freelance development</span>
        </div>
      </div>

      {/* Main Display Headline with masked line wraps */}
      <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F5DC] leading-[1.08] mb-8">
        {demoContent.hero.displayLines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden py-1">
            <span
              ref={(el) => {
                headlineLineRefs.current[idx] = el;
              }}
              className="inline-block opacity-0 will-change-transform"
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      {/* Subline */}
      <p
        ref={sublineRef}
        className="font-body text-base sm:text-lg md:text-xl text-[#F5F5DC]/70 max-w-2xl leading-relaxed mb-10 opacity-0"
      >
        {demoContent.hero.subline}
      </p>

      {/* Primary and Secondary Magnetic CTAs */}
      <div
        ref={ctaContainerRef}
        className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
      >
        <MagneticButton
          href={demoContent.hero.primaryCta.href}
          variant="primary"
          className="min-w-[150px]"
        >
          {demoContent.hero.primaryCta.label}
        </MagneticButton>
        <MagneticButton
          href={demoContent.hero.secondaryCta.href}
          variant="outline"
          className="min-w-[150px]"
        >
          {demoContent.hero.secondaryCta.label}
        </MagneticButton>
      </div>
    </section>
  );
}
