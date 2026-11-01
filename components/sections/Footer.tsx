import Image from "next/image";
import { activeSocials, site } from "@/lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-7xl mx-auto c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <a href={`mailto:${site.email}`} className="text-white-500 hover:text-white transition-colors">
        {site.email}
      </a>
      {activeSocials.length > 0 && (
        <ul className="flex gap-3" aria-label="Social links">
          {activeSocials.map((social) => (
            <li key={social.name}>
              <a href={social.href} target="_blank" rel="noopener noreferrer me" className="social-icon" aria-label={social.name}>
                <Image src={social.icon} alt="" width={24} height={24} className="h-6 w-auto" />
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="text-white-500">
        &copy; {year} {site.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
