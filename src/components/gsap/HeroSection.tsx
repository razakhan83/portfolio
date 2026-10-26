"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "./MagneticButton";
import { demoContent } from "@/lib/demo-content";
import { SparkMark } from "./SvgMarks";

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const visualWrapperRef = useRef<HTMLDivElement | null>(null);
  const visualCardRef = useRef<HTMLDivElement | null>(null);
  const dotGridRef = useRef<SVGSVGElement | null>(null);
  const rotatingWordRef = useRef<HTMLSpanElement | null>(null);

  const [wordIndex, setWordIndex] = useState(0);
  const words = demoContent.hero.rotatingWords;

  // Rotating word flip timer
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const interval = setInterval(() => {
      if (!rotatingWordRef.current) return;

      // Animate out current word
      gsap.to(rotatingWordRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % words.length);
          if (rotatingWordRef.current) {
            gsap.fromTo(
              rotatingWordRef.current,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
              }
            );
          }
        },
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [words.length]);

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
            gsap.set(
              [
                badgeRef.current,
                headlineLineRefs.current,
                sublineRef.current,
                ctaContainerRef.current,
                visualWrapperRef.current,
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

          // Ambient subtle drift of dot grid
          if (dotGridRef.current) {
            gsap.to(dotGridRef.current, {
              x: 25,
              y: 20,
              duration: 18,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          }

          // Orchestrated EaseReverse: single choreographed timeline
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

          // 4. Action buttons follow
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

          // 5. Visual panel entrance + scroll parallax
          if (visualWrapperRef.current) {
            tl.fromTo(
              visualWrapperRef.current,
              { opacity: 0, scale: 0.94, y: 40 },
              { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
              "-=0.7"
            );

            gsap.to(visualWrapperRef.current, {
              y: 70,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
              },
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  // Pointer interactive 3D tilt on visual card
  const handlePointerMove = (e: React.PointerEvent) => {
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches)
    ) {
      return;
    }

    const card = visualCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handlePointerLeave = () => {
    const card = visualCardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center pt-32 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <svg
        ref={dotGridRef}
        className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] pointer-events-none opacity-[0.06] select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero-dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#F5F5DC" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
      </svg>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Availability pill */}
          <div ref={badgeRef} className="mb-6 opacity-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#008080]/30 bg-[#008080]/10 text-xs sm:text-sm font-body text-[#F5F5DC]">
              <span className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
              <span>Available for contracts & freelance development</span>
              <SparkMark className="w-3 h-3 text-[#008080] ml-1" />
            </div>
          </div>

          {/* Main Display Headline with masked line wraps & rotating word */}
          <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] tracking-tight text-[#F5F5DC] leading-[1.08] mb-8">
            <span className="block overflow-hidden py-1">
              <span
                ref={(el) => {
                  headlineLineRefs.current[0] = el;
                }}
                className="inline-block opacity-0 will-change-transform"
              >
                Building high-impact
              </span>
            </span>

            <span className="block overflow-hidden py-1">
              <span
                ref={(el) => {
                  headlineLineRefs.current[1] = el;
                }}
                className="inline-flex items-baseline flex-wrap gap-x-3 opacity-0 will-change-transform"
              >
                <span className="overflow-hidden inline-block h-[1.15em] relative align-baseline">
                  <span
                    ref={rotatingWordRef}
                    className="inline-block text-[#008080] font-extrabold will-change-transform"
                  >
                    {words[wordIndex]}
                  </span>
                </span>
                <span>that scale.</span>
              </span>
            </span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="font-body text-base sm:text-lg md:text-xl text-[#F5F5DC]/70 max-w-xl leading-relaxed mb-10 opacity-0"
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
        </div>

        {/* Right Column: Hero Graphic Panel with interactive tilt */}
        <div
          ref={visualWrapperRef}
          className="lg:col-span-5 flex justify-center lg:justify-end opacity-0"
        >
          <div
            ref={visualCardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative w-full max-w-[500px] aspect-[16/11] rounded-3xl p-2 bg-[#0A0F0D] border border-[#F5F5DC]/20 shadow-2xl transition-shadow duration-300 hover:shadow-[#008080]/10 hover:border-[#008080]/50 will-change-transform group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={demoContent.hero.visual}
                alt="Ahmed Raza developer workspace setup with code editor and e-commerce analytics dashboards"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F5F5DC]/80">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#008080]" />
                  Karachi Studio · Next.js 16
                </span>
                <span className="text-[#008080] font-semibold">Live Systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
