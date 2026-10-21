"use client";

import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Morph RouteTransition
 * Keyed by pathname so every route navigation animates smoothly.
 * Shared view transition "page" with vt-fade/vt-blur crossfade.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} name="page" share="vt-fade" default="none">
      <div className="w-full">{children}</div>
    </ViewTransition>
  );
}
