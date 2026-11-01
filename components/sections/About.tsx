"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SceneBoundary from "@/components/ui/SceneBoundary";
import { site } from "@/lib/site";

// react-globe.gl touches `window` on import, so it only loads in the browser.
const AboutGlobe = dynamic(() => import("@/components/three/AboutGlobe"), {
  ssr: false,
  loading: () => <div className="h-[326px] w-[326px]" aria-hidden="true" />,
});

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section className="c-space my-20 scroll-mt-24" id="about" aria-labelledby="about-heading">
      <h2 id="about-heading" className="sr-only">
        About me
      </h2>
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <Image src="/assets/grid1.png" alt="" width={816} height={672} className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <h3 className="grid-headtext">Hi, I&apos;m {site.shortName}</h3>
              <p className="grid-subtext">
                With 2 years of experience, I have honed my skills in frontend development, with a primary focus on
                animated 3D websites.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <Image src="/assets/grid2.png" alt="" width={676} height={672} className="w-full sm:w-[276px] h-fit object-contain" />
            <div>
              <h3 className="grid-headtext">Tech Stack</h3>
              <p className="grid-subtext">
                I specialize in JavaScript/TypeScript with a focus on the React and Next.js ecosystems, as well as Shopify
                Liquid development and the wider Shopify ecosystem.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <SceneBoundary>
                <AboutGlobe />
              </SceneBoundary>
            </div>
            <div>
              <h3 className="grid-headtext">I work remotely across most timezones</h3>
              <p className="grid-subtext">I&apos;m based in {site.location}, with remote services available.</p>
              <Button name="Contact me" href="#contact" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <Image src="/assets/grid3.png" alt="" width={1608} height={648} className="w-full sm:h-[266px] h-fit object-contain" />
            <div>
              <h3 className="grid-headtext">My passion for coding</h3>
              <p className="grid-subtext">
                I love solving problems and building things through code. Coding isn&apos;t just my profession, it&apos;s
                my passion.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <Image
              src="/assets/grid4.png"
              alt=""
              width={720}
              height={544}
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <button type="button" className="copy-container" onClick={handleCopy} aria-label={`Copy email address ${site.email}`}>
                <Image src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"} width={20} height={20} alt="" className="h-5 w-auto" />
                <span className="w-full lg:text-2xl xl:text-lg md:text-base font-medium text-gray_gradient break-all">
                  {site.email}
                </span>
              </button>
              <p className="sr-only" aria-live="polite">
                {hasCopied ? "Email copied to clipboard" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
