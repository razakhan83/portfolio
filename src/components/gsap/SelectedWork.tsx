"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { demoContent, DemoProject } from "@/lib/demo-content";
import { SectionHeading } from "./SvgMarks";

export interface SelectedWorkProps {
  onSelectProject: (project: DemoProject) => void;
}

export function SelectedWork({ onSelectProject }: SelectedWorkProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const loopTweenRef = useRef<gsap.core.Tween | null>(null);

  // Duplicated panels for seamless loop
  const displayProjects = [
    ...demoContent.work.projects,
    ...demoContent.work.projects,
  ];

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced || !railRef.current) return;

      // Modelled on Timeline Clear and Rebuild
      const buildLoop = () => {
        if (!railRef.current) return;

        // 1. Fully kill existing tween and cleanup
        if (loopTweenRef.current) {
          loopTweenRef.current.kill();
          loopTweenRef.current = null;
        }

        // 2. Reset position
        gsap.set(railRef.current, { x: 0 });

        // 3. Calculate width of one single full set
        const totalWidth = railRef.current.scrollWidth;
        const singleSetWidth = totalWidth / 2;

        if (singleSetWidth <= 0) return;

        // 4. Build smooth infinite loop timeline with consistent speed
        loopTweenRef.current = gsap.to(railRef.current, {
          x: -singleSetWidth,
          duration: Math.max(26, singleSetWidth / 65),
          ease: "none",
          repeat: -1,
        });
      };

      // Initial build
      buildLoop();

      // Debounced resize rebuild to handle breakpoint changes cleanly
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          buildLoop();
        }, 150);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
        if (loopTweenRef.current) {
          loopTweenRef.current.kill();
          loopTweenRef.current = null;
        }
      };
    },
    { scope: containerRef }
  );

  const handlePointerEnter = () => {
    loopTweenRef.current?.pause();
  };

  const handlePointerLeave = () => {
    loopTweenRef.current?.play();
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="py-24 sm:py-32 overflow-hidden border-t border-[#F5F5DC]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12">
        <SectionHeading
          eyebrow="Portfolio"
          title={demoContent.work.heading}
          subline={demoContent.work.subline}
        />
      </div>

      {/* Looped Rail Viewport */}
      <div
        className="w-full relative"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={railRef}
          className="flex gap-6 sm:gap-8 w-max will-change-transform px-6 select-none"
        >
          {displayProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              className="group relative w-[340px] sm:w-[440px] shrink-0 rounded-2xl bg-[#0A0F0D] border border-[#F5F5DC]/15 overflow-hidden flex flex-col justify-between hover:border-[#008080] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080]"
            >
              {/* Cover Image with smooth scale-up on hover */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A0F0D]">
                <Image
                  src={project.image}
                  alt={`${project.title} live interface preview`}
                  fill
                  sizes="440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F5F5DC]/80 bg-[#0A0F0D]/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#F5F5DC]/10">
                  <span className="text-[#008080] uppercase tracking-wider font-semibold font-heading">
                    {project.category}
                  </span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5DC] mb-3 group-hover:text-[#008080] transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#F5F5DC]/70 line-clamp-2 leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#F5F5DC]/5 border border-[#F5F5DC]/10 text-[#F5F5DC]/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-heading font-semibold text-[#008080] group-hover:translate-x-1.5 transition-transform duration-200">
                    <span>View Case Study</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
