"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { MagneticButton } from "./MagneticButton";
import { demoContent } from "@/lib/demo-content";

export function PublicHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isAdmin = pathname?.startsWith("/admin");

  useGSAP(
    () => {
      if (isAdmin || !headerRef.current) return;

      const header = headerRef.current;
      const progressBar = progressBarRef.current;
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        gsap.set(header, { yPercent: 0, opacity: 1 });
        return;
      }

      // 1. Entrance animation (drop + fade)
      gsap.fromTo(
        header,
        { yPercent: -100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // 2. Scroll Progress Bar
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        });
      }

      // 3. Scroll effects: shrink height / background solidify & hide on scroll down, show on scroll up
      let lastScrollY = window.scrollY;

      const scrollTrigger = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const currentScrollY = self.scroll();

          // Past 40px: solidify background and shrink slightly
          if (currentScrollY > 40) {
            header.classList.add("header-scrolled");
          } else {
            header.classList.remove("header-scrolled");
          }

          // Hide on scroll down (> 150px), reveal on scroll up
          if (currentScrollY > 150) {
            if (self.direction === 1) {
              // Scrolling down
              gsap.to(header, {
                yPercent: -100,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else if (self.direction === -1) {
              // Scrolling up
              gsap.to(header, {
                yPercent: 0,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          } else {
            gsap.to(header, {
              yPercent: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          lastScrollY = currentScrollY;
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { dependencies: [isAdmin] }
  );

  // Mobile drawer GSAP animation
  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;
      if (isMobileOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    },
    { dependencies: [isMobileOpen] }
  );

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#0A0F0D]/70 backdrop-blur-md h-20 flex flex-col justify-center border-b border-transparent [&.header-scrolled]:h-16 [&.header-scrolled]:bg-[#0A0F0D]/95 [&.header-scrolled]:border-[#F5F5DC]/10 shadow-sm"
      >
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Left: Wordmark */}
          <Link
            href="/#hero"
            className="font-heading font-extrabold text-lg sm:text-xl text-[#F5F5DC] tracking-tight hover:text-[#008080] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded"
          >
            {demoContent.header.wordmark}
            <span className="text-[#008080]">.</span>
          </Link>

          {/* Center: Anchor Links with animated hover underline */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main Navigation"
          >
            {demoContent.header.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-sm font-medium text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#008080] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right: WhatsApp CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <MagneticButton
              href={demoContent.header.cta.href}
              target="_blank"
              variant="primary"
              className="!px-4 !py-1.5 !text-xs sm:!text-sm"
            >
              {demoContent.header.cta.label}
            </MagneticButton>

            {/* Mobile Hamburger to X */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-[#F5F5DC]/15 text-[#F5F5DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080]"
            >
              <span
                className={`w-5 h-0.5 bg-[#F5F5DC] transition-transform duration-300 ${
                  isMobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#F5F5DC] transition-opacity duration-300 ${
                  isMobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#F5F5DC] transition-transform duration-300 ${
                  isMobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#008080] origin-left scale-x-0"
        />
      </header>

      {/* Mobile Drawer Panel */}
      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-20 left-0 right-0 z-30 bg-[#0A0F0D]/95 backdrop-blur-xl border-b border-[#F5F5DC]/15 p-6 shadow-2xl"
        >
          <nav className="flex flex-col gap-4">
            {demoContent.header.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-heading text-lg font-semibold text-[#F5F5DC] hover:text-[#008080] py-2 border-b border-[#F5F5DC]/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
