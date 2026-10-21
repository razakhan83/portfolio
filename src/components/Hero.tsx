"use client";

import { motion } from "motion/react";
import type { SiteSettings } from "@/lib/content";
import HeroIllustration from "./HeroIllustration";
import StatNumberFlip from "./StatNumberFlip";
import { heroContainer, heroItem, heroIllustration } from "@/lib/motion";

export interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  // Format H1 so the owner's name is highlighted in primary teal per DESIGN.md
  const renderHeroTitle = (title: string) => {
    const match = title.match(/^(.*?)(Ahmed)(\.?)(.*)$/i);
    if (match) {
      const [, before, name, dot, after] = match;
      return (
        <>
          <span className="text-deep">{before}</span>
          <span className="text-primary underline decoration-primary underline-offset-8">
            {name}
          </span>
          {dot && <span className="text-primary">{dot}</span>}
          {after && <span className="text-deep">{after}</span>}
        </>
      );
    }
    return <span className="text-deep">{title}</span>;
  };

  const cvHref = settings.cvPath || "/Ahmed-Raza-CV.pdf";
  const whatsappHref = settings.whatsappUrl || "https://wa.me/923052622043";

  return (
    <section className="w-full bg-background pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main 2-column layout (stacked on mobile, 2 columns on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Entrance on Load */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroContainer}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* 1. Eyebrow */}
            <motion.span
              variants={heroItem}
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-primary mb-4 block"
            >
              {settings.heroEyebrow}
            </motion.span>

            {/* 2. H1 */}
            <motion.h1
              variants={heroItem}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] mb-6"
            >
              {renderHeroTitle(settings.heroTitle)}
            </motion.h1>

            {/* 3. Paragraph */}
            <motion.p
              variants={heroItem}
              className="text-muted text-lg sm:text-xl font-normal leading-relaxed max-w-xl mb-9"
            >
              {settings.heroParagraph}
            </motion.p>

            {/* 4. Action Buttons */}
            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a
                href={cvHref}
                download
                className="bg-primary text-[#FFFEF7] font-semibold text-sm sm:text-base px-8 py-3.5 min-h-[44px] rounded-lg hover:bg-deep transition-all duration-150 active:scale-[0.98] inline-flex items-center justify-center tracking-wide shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                DOWNLOAD CV
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary hover:bg-primary/10 transition-all duration-150 active:scale-[0.98] font-semibold text-sm sm:text-base px-8 py-3.5 min-h-[44px] rounded-lg inline-flex items-center justify-center tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                WhatsApp Me
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Custom Flat SVG Illustration slides in from right */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroIllustration}
            className="lg:col-span-5 flex justify-center items-center w-full"
          >
            <HeroIllustration />
          </motion.div>
        </div>

        {/* 5. Stats Row with Number Flip */}
        {settings.stats && settings.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-20 pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {settings.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deep tracking-tight">
                  <StatNumberFlip value={stat.value} />
                </span>
                <span className="text-xs sm:text-sm font-medium text-muted mt-1 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
