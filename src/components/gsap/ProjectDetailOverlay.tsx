"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { DemoProject } from "@/lib/demo-content";
import { MagneticButton } from "./MagneticButton";

export interface ProjectDetailOverlayProps {
  project: DemoProject | null;
  onClose: () => void;
}

export function ProjectDetailOverlay({
  project,
  onClose,
}: ProjectDetailOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const wipePathRef = useRef<SVGPathElement | null>(null);
  const contentPanelRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (isAnimatingRef.current || !overlayRef.current) return;

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      overlayRef.current.style.pointerEvents = "none";
      overlayRef.current.style.visibility = "hidden";
      onClose();
      return;
    }

    isAnimatingRef.current = true;
    const path = wipePathRef.current;
    const content = contentPanelRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
          overlayRef.current.style.visibility = "hidden";
        }
        isAnimatingRef.current = false;
        onClose();
      },
    });

    if (path && content) {
      // Sweep across to cover, then hide and exit
      tl.to(content, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      })
        .to(
          path,
          {
            duration: 0.4,
            ease: "power2.inOut",
            attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 0 Z" },
          },
          "-=0.1"
        )
        .to(path, {
          duration: 0.35,
          ease: "power2.in",
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 Z" },
        });
    } else {
      onClose();
    }
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project && !isAnimatingRef.current) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, handleClose]);

  // Handle open animation when project changes
  useEffect(() => {
    if (!project || !overlayRef.current) return;

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    isAnimatingRef.current = true;
    overlayRef.current.style.pointerEvents = "auto";
    overlayRef.current.style.visibility = "visible";

    if (isReduced) {
      if (contentPanelRef.current) {
        gsap.set(contentPanelRef.current, { opacity: 1, y: 0 });
      }
      isAnimatingRef.current = false;
      return;
    }

    // Curve Swipe entrance
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    const path = wipePathRef.current;
    const content = contentPanelRef.current;

    if (path && content) {
      // Step 1: Wipe sweeps in with curved leading edge
      gsap.set(content, { opacity: 0, y: 40 });
      gsap.set(path, {
        attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 Z" },
        opacity: 1,
      });

      tl.to(path, {
        duration: 0.45,
        ease: "power2.in",
        attr: { d: "M 0 100 V 40 Q 50 0 100 40 V 100 Z" },
      })
        .to(path, {
          duration: 0.35,
          ease: "power2.out",
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 Z" },
        })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )
        // Sweep out the wipe to reveal the full content
        .to(
          path,
          {
            duration: 0.45,
            ease: "power2.inOut",
            attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 Z" },
          },
          "-=0.3"
        );
    }
  }, [project]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={project?.title || "Project details"}
      className="fixed inset-0 z-50 pointer-events-none invisible flex items-center justify-center p-4 sm:p-8"
    >
      {/* Background Dimmer */}
      <div
        className="absolute inset-0 bg-[#0A0F0D]/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Curve Swipe SVG Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={wipePathRef}
          fill="#008080"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 Z"
        />
      </svg>

      {/* Main Content Modal Panel */}
      <div
        ref={contentPanelRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A0F0D] border border-[#F5F5DC]/20 shadow-2xl p-6 sm:p-10 lg:p-12 text-[#F5F5DC] opacity-0"
      >
        {/* Top bar with project category & close button */}
        <div className="flex items-center justify-between border-b border-[#F5F5DC]/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#008080] font-heading font-semibold">
              {project?.category}
            </span>
            <span className="text-xs text-[#F5F5DC]/40 font-mono">
              · {project?.year}
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close project details"
            className="w-10 h-10 rounded-full border border-[#F5F5DC]/20 flex items-center justify-center text-[#F5F5DC] hover:border-[#008080] hover:text-[#008080] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080]"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        {/* Title */}
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
          {project?.title}
        </h2>

        {/* Overview */}
        <p className="font-body text-base sm:text-lg text-[#F5F5DC]/80 leading-relaxed mb-8">
          {project?.overview}
        </p>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="font-heading font-semibold text-lg text-[#008080] mb-4">
            Architecture Highlights
          </h3>
          <ul className="space-y-2.5">
            {project?.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-body text-sm sm:text-base text-[#F5F5DC]/70"
              >
                <span className="text-[#008080] font-mono text-sm leading-none mt-1">
                  &bull;
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-10">
          <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#F5F5DC]/50 mb-3">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project?.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono bg-[#F5F5DC]/5 border border-[#F5F5DC]/10 text-[#F5F5DC]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#F5F5DC]/10">
          {project?.demoUrl && (
            <MagneticButton
              href={project.demoUrl}
              target="_blank"
              variant="primary"
            >
              Explore Live
            </MagneticButton>
          )}
          {project?.githubUrl && (
            <MagneticButton
              href={project.githubUrl}
              target="_blank"
              variant="outline"
            >
              Source Code
            </MagneticButton>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="ml-auto text-sm text-[#F5F5DC]/60 hover:text-[#F5F5DC] transition-colors py-2 px-4"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
