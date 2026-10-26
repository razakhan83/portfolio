"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";

export interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Skip magnetic pull on touch devices or reduced motion preference
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches)
    ) {
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // GreenSock azmKBBJ dynamic tween with overwrite: true
    gsap.to(button, {
      x: relX * 0.4,
      y: relY * 0.4,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        x: relX * 0.24,
        y: relY * 0.24,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handlePointerLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    // Snap back with signature elastic.out(1, 0.4)
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
    }
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-heading font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] select-none cursor-pointer text-sm sm:text-base px-6 py-3 rounded-full border";

  const variantStyles =
    variant === "primary"
      ? "bg-[#008080] text-[#F5F5DC] border-[#008080] hover:bg-[#004C4C] hover:border-[#004C4C]"
      : variant === "outline"
      ? "bg-transparent text-[#F5F5DC] border-[#F5F5DC]/30 hover:border-[#008080] hover:text-[#008080]"
      : "bg-[#0A0F0D] text-[#F5F5DC] border-[#F5F5DC]/20 hover:border-[#F5F5DC]/50";

  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        aria-label={ariaLabel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={combinedClasses}
      >
        <span ref={labelRef} className="relative z-10 block pointer-events-none">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={combinedClasses}
    >
      <span ref={labelRef} className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </button>
  );
}
