"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { demoContent, DemoProject } from "@/lib/demo-content";

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
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced || !railRef.current) return;

      // Modelled on Timeline Clear and Rebuild (demos.gsap.com/demo/timeline-clear-and-rebuild)
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
          duration: Math.max(22, singleSetWidth / 65),
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
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#008080] font-heading font-semibold block mb-3">
            Portfolio
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#F5F5DC] tracking-tight">
            {demoContent.work.heading}
          </h2>
        </div>
        <p className="font-body text-[#F5F5DC]/60 max-w-md text-sm sm:text-base">
          {demoContent.work.subline}
        </p>
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
              className="group relative w-[320px] sm:w-[420px] shrink-0 rounded-2xl bg-[#0A0F0D] border border-[#F5F5DC]/15 p-6 sm:p-8 flex flex-col justify-between hover:border-[#008080] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#F5F5DC]/50 mb-6">
                  <span className="text-[#008080] uppercase tracking-wider font-semibold font-heading">
                    {project.category}
                  </span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5DC] mb-3 group-hover:text-[#008080] transition-colors">
                  {project.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-[#F5F5DC]/70 line-clamp-3 leading-relaxed mb-6">
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

                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-heading font-semibold text-[#008080] group-hover:translate-x-1 transition-transform">
                  <span>View Case Study</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
