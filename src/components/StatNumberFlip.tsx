"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

export interface StatNumberFlipProps {
  value: string;
  className?: string;
}

export default function StatNumberFlip({ value, className = "" }: StatNumberFlipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>(value);

  // Parse numeric part and prefix/suffix
  const match = value.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
  const prefix = match ? match[1] : "";
  const targetNum = match ? parseInt(match[2], 10) : null;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (!isInView || targetNum === null || shouldReduceMotion) {
      return;
    }

    // Start rolling count from 0 to targetNum
    const controls = animate(0, targetNum, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplayValue(`${prefix}${Math.round(latest)}${suffix}`);
      },
      onComplete() {
        setDisplayValue(value);
      },
    });

    return () => controls.stop();
  }, [isInView, targetNum, prefix, suffix, value, shouldReduceMotion]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shouldReduceMotion ? value : displayValue}
    </span>
  );
}
