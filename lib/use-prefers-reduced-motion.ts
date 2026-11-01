"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Hydration-safe reduced-motion flag. The server and the hydration pass both
 * see `false`, then React re-renders with the real value, so markup never
 * mismatches. (framer-motion's useReducedMotion reads matchMedia during the
 * first client render, which causes a hydration error for reduced-motion users.)
 * CSS media queries hide the animated variant before hydration.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
