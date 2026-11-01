// Single source of truth for personal details, SEO copy and social links.
// Edit this file to change text across the hero, footer, contact and metadata.

export const site = {
  name: "Gideon Adeniran",
  shortName: "Gideon",
  role: "Frontend Engineer",
  tagline: "Building products and brands",
  // Hero copy
  intro:
    "Frontend engineer building products and brands for the web, with a focus on React, Next.js, TypeScript and Shopify.",
  availability: "Available for new projects",
  description:
    "Portfolio of Gideon Adeniran, a frontend engineer building fast, accessible web products with React, Next.js, TypeScript and Shopify.",
  email: "adeniranakinloluwa2000@gmail.com",
  location: "Nigeria",
  // IANA zone used for the live local-time readout in the hero.
  timezone: "Africa/Lagos",
  timezoneLabel: "WAT",
  available: true,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gideons3dporfolio.vercel.app").replace(/\/$/, ""),
  locale: "en_US",
  keywords: [
    "Gideon Adeniran",
    "Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Shopify Developer",
    "Nigeria",
    "Portfolio",
  ],
  skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shopify Liquid"],
  // Only links with an href are rendered. Fill in the rest when ready.
  socials: [
    { name: "GitHub", href: "https://github.com/Gideon-dev", icon: "/assets/github.svg" },
    { name: "Twitter", href: "", icon: "/assets/twitter.svg" },
    { name: "Instagram", href: "", icon: "/assets/instagram.svg" },
  ],
} as const;

export const activeSocials = site.socials.filter((social) => social.href);
