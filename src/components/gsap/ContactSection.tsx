"use client";

import React from "react";
import { MagneticButton } from "./MagneticButton";
import { demoContent } from "@/lib/demo-content";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-[#F5F5DC]/10"
    >
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-[#008080] font-heading font-semibold block mb-4">
          Initiate Contact
        </span>
        <h2 className="font-heading font-bold text-4xl sm:text-6xl text-[#F5F5DC] tracking-tight mb-6">
          {demoContent.contact.heading}
        </h2>
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
