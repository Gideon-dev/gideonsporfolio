"use client";

// Section transition: like pulling jelly out of a narrow jar. As a section
// comes up from the bottom of the screen it lags behind the scroll and squeezes
// (narrower, taller). Past the release point the squeeze lets go through a
// loose spring, so the section pops free, overshoots and settles.
// Purely visual: native scrolling is never intercepted.

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const JELLY = {
  /** Scroll progress (0 = section top at viewport bottom, 1 = at 45% height) where it lets go. */
  release: 0.72,
  /** Loose on purpose: low damping gives the wobble and the overshoot. */
  spring: { stiffness: 380, damping: 13, mass: 0.9 },
  /** How far the section is held back at full squeeze, in px. */
  drag: 96,
  narrow: 0.1,
  stretch: 0.07,
  /** Smaller screens get a gentler version. */
  smallScreen: 0.6,
};

type JellySectionProps = {
  children: ReactNode;
  /**
   * "full" squeezes on both axes. "wide" skips the vertical stretch, for very
   * tall sections where stretching would move content a long way.
   */
  variant?: "full" | "wide";
};

export default function JellySection({ children, variant = "full" }: JellySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });

  // 0 = free, 1 = fully squeezed. Builds while the section is dragged in,
  // then drops straight to 0 at the release point. The spring turns that drop
  // into the burst.
  const squeezeTarget = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0 || progress >= JELLY.release) return 0;
    const pull = progress / JELLY.release;
    const amount = pull * pull; // resistance builds as it is pulled further
    const small = typeof window !== "undefined" && window.innerWidth < 768;
    return small ? amount * JELLY.smallScreen : amount;
  });
  const squeeze = useSpring(squeezeTarget, JELLY.spring);

  const y = useTransform(squeeze, (value) => value * JELLY.drag);
  const scaleX = useTransform(squeeze, (value) => 1 - value * JELLY.narrow);
  const scaleY = useTransform(squeeze, (value) => 1 + value * JELLY.stretch);

  return (
    <motion.div
      ref={ref}
      style={
        reducedMotion
          ? undefined
          : { y, scaleX, scaleY: variant === "full" ? scaleY : 1, transformOrigin: "50% 0%" }
      }
    >
      {children}
    </motion.div>
  );
}
