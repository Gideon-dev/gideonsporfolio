"use client";

// A stack of folders, one per project. CSS owns the pinning: each folder sticks
// one tab-height lower than the one before it, so the tabs of every earlier
// folder stay visible above the active one. Motion owns the depth: a covered
// folder shrinks and dims on a sharp ease-out curve as the next one docks.

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { cubicBezier, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import MediaFrame from "./MediaFrame";
import type { ExperienceStackContent, Role } from "@/lib/experience";

const STACK = {
  /** Scale lost per folder stacked on top. */
  scaleStep: 0.035,
  /** Shade added per folder stacked on top. */
  shadeStep: 0.22,
  maxShade: 0.6,
  /** Share of each step a folder waits before it starts to recede. */
  hold: 0.3,
};

// Expo-style ease-out: most of the move happens early, then it settles flat.
const dock = cubicBezier(0.16, 1, 0.3, 1);
const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function Folder({ role, index, count, progress }: { role: Role; index: number; count: number; progress: MotionValue<number> }) {
  // How many folders sit on top of this one, eased within each step.
  const depth = useTransform(progress, (value) => {
    const raw = Math.min(Math.max(value * (count - 1) - index, 0), count - 1 - index);
    const whole = Math.floor(raw);
    // Hold while the next folder is still far below, then snap back as it lands.
    const step = Math.max(raw - whole - STACK.hold, 0) / (1 - STACK.hold);
    return whole + dock(step);
  });
  const scale = useTransform(depth, (value) => 1 - value * STACK.scaleStep);
  const shade = useTransform(depth, (value) => Math.min(value * STACK.shadeStep, STACK.maxShade));
  const headingId = `role-${role.id}-heading`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="xp-sticky" style={{ zIndex: index + 1, "--i": index } as CSSProperties}>
      <motion.article className="xp-folder" style={{ scale }} aria-labelledby={headingId}>
        <p className="xp-tab" aria-hidden="true">
          <span className="tabular-nums">{number}</span>
          <span className="xp-tab-name">{role.company}</span>
          {role.recent && <span className="xp-tab-recent" />}
        </p>

        <div className="xp-panel">
          <motion.div
            className="xp-copy"
            variants={reveal}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.p className="xp-meta xp-reveal" variants={revealItem}>
              {role.recent && <span className="recent-badge">Recent work</span>}
              <span>{role.role}</span>
              <span aria-hidden="true">/</span>
              <span>{role.period}</span>
              {role.location && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{role.location}</span>
                </>
              )}
            </motion.p>
            <motion.h3 id={headingId} className="xp-role xp-reveal" variants={revealItem}>
              {role.company}
              <span className="xp-company">{role.kind}</span>
            </motion.h3>
            <motion.p className="xp-summary xp-reveal" variants={revealItem}>
              {role.summary}
            </motion.p>
            <motion.ul className="xp-highlights xp-reveal" variants={revealItem}>
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </motion.ul>
            <motion.div className="xp-links xp-reveal" variants={revealItem}>
              <Link href={role.caseHref} className="hero-link">
                Open case file <span aria-hidden="true">→</span>
                <span className="sr-only">: {role.company}</span>
              </Link>
              {role.href && (
                <a href={role.href} target="_blank" rel="noopener noreferrer" className="hero-link xp-link-quiet">
                  {role.linkLabel ?? "Visit"} <span aria-hidden="true">↗</span>
                </a>
              )}
              {!role.href && role.linkLabel && <span className="xp-link-note">{role.linkLabel}</span>}
            </motion.div>
          </motion.div>

          {role.media ? (
            <div className="xp-media">
              <MediaFrame media={role.media} sizes="(min-width: 1024px) 560px, 90vw" className="xp-media-el" />
            </div>
          ) : (
            <div className="xp-facts">
              <span className="xp-facts-number" aria-hidden="true">
                {number}
              </span>
              <dl>
                {role.facts.map((fact) => (
                  <div key={fact.label} className="xp-fact">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="xp-stack-tags" aria-label="Stack">
                {role.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <motion.span className="xp-shade" style={{ opacity: shade }} aria-hidden="true" />
      </motion.article>
    </div>
  );
}

export default function ExperienceStack({ content }: { content: ExperienceStackContent }) {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const count = content.roles.length;

  return (
    <section
      ref={container}
      className="xp-stack"
      aria-label={content.ariaLabel}
      style={{ "--n": count } as CSSProperties}
    >
      {content.roles.map((role, index) => (
        <Folder key={role.id} role={role} index={index} count={count} progress={scrollYProgress} />
      ))}
    </section>
  );
}
