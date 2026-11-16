// Content for the Experience section (folder stack).
// Folder content comes from lib/work.ts; the animation components never need to change.

import { projects, type Fact } from "@/lib/work";

export type Media =
  | { type: "video"; src: string; label: string }
  | { type: "image"; src: string; alt: string; width: number; height: number };

export type Role = {
  id: string;
  company: string;
  /** Short product description shown under the name. */
  kind: string;
  role: string;
  period: string;
  recent?: boolean;
  location?: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
  facts: readonly Fact[];
  /** Internal case-study page. */
  caseHref: string;
  /** Public product link. */
  href?: string;
  linkLabel?: string;
  /** Optional screenshot or clip. Replaces the facts panel when set. */
  media?: Media;
};

export type ExperienceStackContent = {
  ariaLabel: string;
  roles: readonly Role[];
};

export const experienceStack: ExperienceStackContent = {
  ariaLabel: "Projects and experience",
  roles: projects.map((project) => ({
    id: project.slug,
    company: project.name,
    kind: project.kind,
    role: project.role,
    period: project.period,
    recent: project.recent,
    location: project.location,
    summary: project.summary,
    highlights: project.highlights,
    stack: project.stack,
    facts: project.facts,
    caseHref: `/work/${project.slug}`,
    href: project.href,
    linkLabel: project.linkLabel,
  })),
};
