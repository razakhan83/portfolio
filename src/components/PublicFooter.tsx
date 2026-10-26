"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { gsap, useGSAP } from "@/lib/gsap";

export default function PublicFooter() {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // The footer must appear on public pages only — never in /admin
  const isAdmin = pathname?.startsWith("/admin");

  useGSAP(
    () => {
      if (isAdmin || !wrapperRef.current) return;

      const isReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        gsap.set(wrapperRef.current, { y: 0, opacity: 1 });
        return;
      }

      // Footer Bounce: wrapper-level soft elastic entrance when scrolled into view
      gsap.fromTo(
        wrapperRef.current,
        { y: 70, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { dependencies: [isAdmin] }
  );

  if (isAdmin) {
    return null;
  }

  return (
    <div ref={wrapperRef} className="overflow-hidden will-change-transform">
      <HalftoneWordmarkFooter
        wordmark="ahmed raza"
        label="Ahmed Raza"
        meta="©2026 · Karachi, Pakistan"
        palette={{ background: "#004C4C", ink: "#F5F5DC", warm: "#E9762B" }}
        fontFamily="'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif"
        fontWeight={800}
        columns={[
          {
            title: "Work",
            links: [
              { label: "Projects", href: "#work" },
              { label: "Skills", href: "#skills" },
              { label: "Process", href: "#process" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ],
          },
          {
            title: "Social",
            links: [
              { label: "GitHub", href: "https://github.com/razakhan83" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/razakdev" },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: "123raza83@gmail.com", href: "mailto:123raza83@gmail.com" },
              { label: "WhatsApp", href: "https://wa.me/923052622043" },
            ],
          },
        ]}
      />
    </div>
  );
}
