"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagneticButton } from "./MagneticButton";
import { demoContent } from "@/lib/demo-content";

export function PublicHeader() {
  const pathname = usePathname();

  // Hidden on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0F0D]/90 backdrop-blur-sm border-b border-[#F5F5DC]/10">
      <div className="max-w-7xl mx-auto h-16 px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Wordmark */}
        <Link
          href="/#hero"
          className="font-heading font-extrabold text-lg sm:text-xl text-[#F5F5DC] tracking-tight hover:text-[#008080] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded"
        >
          {demoContent.header.wordmark}
          <span className="text-[#008080]">.</span>
        </Link>

        {/* Center: Anchor Links (hidden on mobile, visible on md+) */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {demoContent.header.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#F5F5DC]/70 hover:text-[#008080] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded py-1 px-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: WhatsApp Magnetic CTA */}
        <div className="flex items-center gap-3">
          <MagneticButton
            href={demoContent.header.cta.href}
            target="_blank"
            variant="primary"
            className="!px-4 !py-1.5 !text-xs sm:!text-sm"
          >
            {demoContent.header.cta.label}
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
