"use client";

import { useEffect } from "react";

const scrollKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

export function SkipOnScroll() {
  useEffect(() => {
    const skip = () => {
      if (typeof document !== "undefined" && "activeViewTransition" in document) {
        (document as unknown as { activeViewTransition?: { skipTransition: () => void } }).activeViewTransition?.skipTransition();
      }
    };
    const onKey = (e: KeyboardEvent) => scrollKeys.has(e.key) && skip();
    const options = { capture: true, passive: true };
    window.addEventListener("wheel", skip, options);
    window.addEventListener("touchmove", skip, options);
    window.addEventListener("keydown", onKey, options);
    return () => {
      window.removeEventListener("wheel", skip, options);
      window.removeEventListener("touchmove", skip, options);
      window.removeEventListener("keydown", onKey, options);
    };
  }, []);
  return null;
}
