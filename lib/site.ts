// Single source of truth for personal details, SEO copy and social links.
// Edit this file to change text across the hero, about, footer, contact and metadata.

export const site = {
  name: "Gideon Adeniran",
  shortName: "Gideon",
  // Name as it appears on the CV, so search engines connect the two.
  legalName: "Akinloluwa Adeniran",
  role: "Frontend Engineer",
  tagline: "Building multi-role products for the web",
  // Hero copy
  intro:
    "Frontend engineer with 2+ years building web applications in React, Next.js and TypeScript: multi-role platforms, complex product workflows and reusable component systems.",
  availability: "Open to frontend roles",
  description:
    "Portfolio of Gideon Adeniran, a frontend engineer with 2+ years building multi-role platforms, complex product workflows and reusable component systems with React, Next.js and TypeScript.",
  email: "adeniranakinloluwa2000@gmail.com",
  location: "Nigeria",
  // IANA zone used for the live local-time readout in the hero.
  timezone: "Africa/Lagos",
  timezoneLabel: "WAT",
  available: true,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gideons3dporfolio.vercel.app").replace(/\/$/, ""),
  locale: "en_US",
  // Public link to the CV (for example a Google Doc). "View CV" links only render when this is set.
  cvUrl: "https://docs.google.com/document/d/1OpFan5fjb_3-DcrPixSVRyRfNXA99VStvFt_Uva3Nhg/edit?usp=sharing",
  keywords: [
    "Gideon Adeniran",
    "Akinloluwa Adeniran",
    "Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Turborepo",
    "Nigeria",
    "Portfolio",
  ],
  // Shown in the hero footer row.
  skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Turborepo"],
  // Fuller list for the About section, from the CV.
  toolbox: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vite",
    "Tailwind CSS",
    "shadcn/ui",
    "Radix UI",
    "Material UI",
    "Zustand",
    "Node.js / Express",
    "Turborepo",
    "NX",
    "Jest",
    "React Testing Library",
    "Git",
  ],
  education: {
    degree: "B.Sc. Computer Science",
    school: "Federal University of Technology, Minna",
    years: "2019 – 2025",
  },
  // Only links with an href are rendered. Fill in the rest when ready.
  socials: [
    { name: "GitHub", href: "https://github.com/Gideon-dev", icon: "/assets/github.svg" },
    { name: "LinkedIn", href: "", icon: "/assets/linkedin.svg" },
    { name: "Twitter", href: "", icon: "/assets/twitter.svg" },
    { name: "Instagram", href: "", icon: "/assets/instagram.svg" },
  ],
} as const;

export const activeSocials = site.socials.filter((social) => social.href);
