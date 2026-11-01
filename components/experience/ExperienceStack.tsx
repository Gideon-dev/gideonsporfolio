"use client";

// Ported from animation-sections-app/app/shared-component/FeatureStack.tsx.
// One sticky card per role. CSS owns the pinning, Motion owns the depth:
// each outgoing card scales down, lifts and fades as the next one covers it.

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import MediaFrame from "./MediaFrame";
import type { ExperienceStackContent, Role } from "@/lib/experience";

const STACK = { scale: 0.9, lift: -40, fadeDelay: 0.1, fadeDuration: 0.06 };

function RoleCard({ role, index, count, progress }: { role: Role; index: number; count: number; progress: MotionValue<number> }) {
  const last = index === count - 1;
  const range = [index / count, (index + 1) / count];
  const scale = useTransform(progress, range, [1, last ? 1 : STACK.scale]);
  const y = useTransform(progress, range, [0, last ? 0 : STACK.lift]);
  const fadeStart = Math.min(range[1] + STACK.fadeDelay, 1 - STACK.fadeDuration);
  // Keyframe offsets must stay within [0, 1], even for the last card's constant opacity.
  const opacity = useTransform(progress, last ? [0, 1] : [fadeStart, fadeStart + STACK.fadeDuration], [1, last ? 1 : 0]);
  const headingId = `role-${role.id}-heading`;

  return (
    <div className="xp-sticky" style={{ zIndex: index + 1 }}>
      <motion.article className="xp-panel" style={{ scale, y, opacity }} aria-labelledby={headingId}>
        <div className="xp-copy">
          <p className="xp-meta">
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true">/</span>
            <span>{role.period}</span>
            {role.location && (
              <>
                <span aria-hidden="true">/</span>
                <span>{role.location}</span>
              </>
            )}
          </p>
          <h3 id={headingId} className="xp-role">
            {role.role}
            <span className="xp-company">
              {role.href ? (
                <a href={role.href} target="_blank" rel="noopener noreferrer" className="hero-link">
                  {role.company} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                role.company
              )}
            </span>
          </h3>
          <p className="xp-summary">{role.summary}</p>
          <ul className="xp-highlights">
            {role.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <ul className="xp-stack-tags" aria-label="Stack">
            {role.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {role.media && (
          <div className="xp-media">
            <MediaFrame media={role.media} sizes="(min-width: 1024px) 560px, 90vw" className="xp-media-el" />
          </div>
        )}
      </motion.article>
    </div>
  );
}

export default function ExperienceStack({ content }: { content: ExperienceStackContent }) {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  // Keep every property on one measured progress value rather than mixing
  // native ViewTimeline opacity with JS-driven transforms.
  const progress = useTransform(() => scrollYProgress.get());

  return (
    <section ref={container} className="xp-stack" aria-label={content.ariaLabel}>
      {content.roles.map((role, index) => (
        <RoleCard key={role.id} role={role} index={index} count={content.roles.length} progress={progress} />
      ))}
    </section>
  );
}
