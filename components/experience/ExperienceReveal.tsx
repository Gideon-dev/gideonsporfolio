"use client";

// Ported from animation-sections-app/app/shared-component/LiveExperiences.tsx.
// Posters fly in from the corners and settle into a stack while the heading fades.

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import MediaFrame from "./MediaFrame";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { ExperienceRevealContent } from "@/lib/experience";

type Poster = ExperienceRevealContent["posters"][number];

// Keep timing and geometry together for tuning.
const ANIMATION = {
  travel: [0, 0.7],
  heading: [0.35, 0.7],
  spring: { stiffness: 300, damping: 50, mass: 0.2 },
  offscreenPadding: 320,
};

const POSTER_POSITIONS = [
  { from: [-1, -1], stack: { x: -10, y: -8, rotate: -10, z: 0 } },
  { from: [1, -1], stack: { x: 8, y: -4, rotate: 6, z: 1 } },
  { from: [-1, 1], stack: { x: -18, y: 4, rotate: -14, z: 2 } },
  { from: [1, 1], stack: { x: 0, y: 0, rotate: 0, z: 4 } },
  { from: [0, 1], stack: { x: 0, y: 0, rotate: 12, z: 3 } },
] as const;

const POSTER_SIZES = "(min-width: 768px) 320px, 224px";

function AnimatedPoster({
  poster,
  position,
  progress,
  width,
  height,
}: {
  poster: Poster;
  position: (typeof POSTER_POSITIONS)[number];
  progress: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
}) {
  const travel = useTransform(progress, ANIMATION.travel, [0, 1]);
  const x = useTransform(() => {
    const start = position.from[0] * (width.get() / 2 + ANIMATION.offscreenPadding);
    return start + (position.stack.x - start) * travel.get();
  });
  const y = useTransform(() => {
    const start = position.from[1] * (height.get() / 2 + ANIMATION.offscreenPadding);
    return start + (position.stack.y - start) * travel.get();
  });
  const rotate = useTransform(progress, ANIMATION.travel, [0, position.stack.rotate]);

  return (
    <motion.div className="xp-poster" style={{ x, y, rotate, zIndex: position.stack.z }}>
      <MediaFrame media={poster} sizes={POSTER_SIZES} className="xp-poster-media" />
    </motion.div>
  );
}

function AnimatedStage({ content }: { content: ExperienceRevealContent }) {
  const section = useRef<HTMLElement>(null);
  const width = useMotionValue(1440);
  const height = useMotionValue(900);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, ANIMATION.spring);
  const opacity = useTransform(progress, ANIMATION.heading, [1, 0]);
  const scale = useTransform(progress, ANIMATION.heading, [1, 0.2]);

  useEffect(() => {
    const resize = () => {
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    };
    resize();
    // Wait for Motion's subscriptions and browser scroll restoration before syncing.
    let restoreFrame = requestAnimationFrame(() => {
      restoreFrame = requestAnimationFrame(() => {
        if (!section.current) return;
        const rect = section.current.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        progress.jump(distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0);
      });
    });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(restoreFrame);
      window.removeEventListener("resize", resize);
    };
  }, [width, height, progress]);

  return (
    <section ref={section} className="xp-scroll" aria-labelledby="experience-heading">
      <div className="xp-stage">
        <div className="xp-heading-position">
          <motion.h2 id="experience-heading" className="xp-heading" style={{ opacity, scale }}>
            {content.headingLines[0]}
            <br />
            {content.headingLines[1]}
          </motion.h2>
        </div>
        {content.posters.slice(0, POSTER_POSITIONS.length).map((poster, index) => (
          <AnimatedPoster
            key={poster.id}
            poster={poster}
            position={POSTER_POSITIONS[index]}
            progress={progress}
            width={width}
            height={height}
          />
        ))}
      </div>
    </section>
  );
}

export default function ExperienceReveal({ content }: { content: ExperienceRevealContent }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div id="experience" className="scroll-mt-20">
      {!reducedMotion && <AnimatedStage content={content} />}
      {/* CSS also shows this fallback before hydration for reduced-motion visitors. */}
      <section className="xp-static" aria-labelledby="static-experience-heading">
        <h2 id="static-experience-heading" className="xp-heading">
          {content.headingLines[0]} {content.headingLines[1]}
        </h2>
        <div className="xp-static-posters">
          {content.posters.slice(0, POSTER_POSITIONS.length).map((poster) => (
            <MediaFrame key={poster.id} media={poster} sizes={POSTER_SIZES} className="xp-poster-media" />
          ))}
        </div>
      </section>
    </div>
  );
}
