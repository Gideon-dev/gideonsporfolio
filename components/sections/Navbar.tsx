"use client";

import { useState } from "react";
import Image from "next/image";
import { navLinks } from "@/lib/constants";
import { site } from "@/lib/site";

const NavItems = ({ onClick }: { onClick?: () => void }) => (
  <ul className="nav-ul">
    {navLinks.map(({ id, href, name }) => (
      <li key={id} className="nav-li">
        <a href={href} className="nav-li_a" onClick={onClick}>
          {name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="#home" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            {site.shortName}
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <Image src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} alt="" width={24} height={24} loading="eager" />
          </button>
          <nav className="sm:flex hidden" aria-label="Primary">
            <NavItems />
          </nav>
        </div>
      </div>
      <div id="mobile-nav" className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5" aria-label="Mobile">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
