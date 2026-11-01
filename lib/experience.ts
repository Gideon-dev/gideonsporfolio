// Content for the Experience section (poster reveal + stacked role cards).
// Edit the data here; the animation components never need to change.

export type Media =
  | { type: "video"; src: string; label: string }
  | { type: "image"; src: string; alt: string; width: number; height: number };

export type ExperienceRevealContent = {
  headingLines: readonly [string, string];
  /** Up to five posters converge into a stack. Extra items are ignored. */
  posters: readonly (Media & { id: string })[];
};

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
  href?: string;
  media?: Media;
};

export type ExperienceStackContent = {
  ariaLabel: string;
  roles: readonly Role[];
};

export const experienceReveal: ExperienceRevealContent = {
  headingLines: ["Work &", "Experience"],
  posters: [
    { id: "unitoria", type: "video", src: "/textures/project/project-unitoria.mp4", label: "Unitoria learning platform" },
    { id: "livedoc", type: "video", src: "/textures/project/project2.mp4", label: "LiveDoc collaborative editor" },
    { id: "carepulse", type: "video", src: "/textures/project/project3.mp4", label: "CarePulse health platform" },
    { id: "horizon", type: "video", src: "/textures/project/project4.mp4", label: "Horizon banking dashboard" },
    { id: "imaginify", type: "video", src: "/textures/project/project5.mp4", label: "Imaginify image editor" },
  ],
};

// TODO(gideon): replace these placeholder roles, periods and highlights with real ones.
export const experienceStack: ExperienceStackContent = {
  ariaLabel: "Roles and experience",
  roles: [
    {
      id: "unitoria",
      company: "Unitoria",
      role: "Frontend Engineer",
      period: "2024 — Present",
      location: "Remote",
      summary:
        "Building the learning platform end to end on the frontend: course discovery, tutor content and the creator earnings flow.",
      highlights: [
        "Shipped the Next.js app router codebase with TypeScript and Tailwind CSS",
        "Built the creator dashboard and course player",
        "Set up Cloudflare delivery for course media",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      href: "https://unitoriamvp.vercel.app/",
      media: { type: "video", src: "/textures/project/project-unitoria.mp4", label: "Unitoria product walkthrough" },
    },
    {
      id: "shopify",
      company: "Freelance",
      role: "Shopify Developer",
      period: "2023 — Present",
      location: "Remote",
      summary: "Custom Shopify themes and storefront features for small brands, from design handoff to launch.",
      highlights: [
        "Built and customised themes in Shopify Liquid",
        "Improved storefront performance and Core Web Vitals",
        "Integrated apps and custom sections for merchandisers",
      ],
      stack: ["Shopify Liquid", "JavaScript", "CSS"],
      // TODO(gideon): add a storefront screenshot, e.g. { type: "image", src: "/experience/store.png", alt: "...", width, height }
    },
    {
      id: "product-builds",
      company: "Independent",
      role: "Frontend Developer",
      period: "2023 — 2024",
      summary:
        "Full-stack product builds to sharpen real-time, payments and data-heavy UI work: LiveDoc, CarePulse, Horizon and Imaginify.",
      highlights: [
        "Real-time collaborative editing with Liveblocks",
        "Banking dashboard with Plaid and Dwolla integrations",
        "Image tooling with Cloudinary AI and Stripe credits",
      ],
      stack: ["React", "Next.js", "TypeScript", "Appwrite"],
      media: { type: "video", src: "/textures/project/project4.mp4", label: "Horizon banking dashboard walkthrough" },
    },
  ],
};
