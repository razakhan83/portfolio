"use client";

import { motion } from "motion/react";
import type { ProcessStepItem } from "@/lib/content";
import WipeHeading from "./WipeHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export interface ProcessProps {
  processSteps: ProcessStepItem[];
}

export default function Process({ processSteps }: ProcessProps) {
  const sortedSteps = [...processSteps].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="process" className="w-full bg-background border-t border-border py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading with Teal Block Wipe Reveal */}
        <WipeHeading title="Process." />

        {/* 4 columns on wide desktop, 2 on tablet, stacked on mobile with stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {sortedSteps.map((step, idx) => (
            <motion.div
              key={step.id || idx}
              variants={fadeInUp}
              className="border-t border-border pt-6 flex flex-col items-start"
            >
              {/* Big step number in primary teal Cabinet Grotesk */}
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight mb-3">
                {step.number}
              </span>

              {/* Step title in bold deep teal */}
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-deep tracking-tight mb-2">
                {step.title}
              </h3>

              {/* Step description in muted */}
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
