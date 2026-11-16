export type NavLink = { id: number; name: string; href: string };

// Root-relative so the links also work from the /work and /tools pages.
export const navLinks: NavLink[] = [
  { id: 1, name: "Home", href: "/#home" },
  { id: 2, name: "About", href: "/#about" },
  { id: 3, name: "Work", href: "/#experience" },
  { id: 4, name: "Tools", href: "/#tools" },
  { id: 5, name: "Contact", href: "/#contact" },
];
