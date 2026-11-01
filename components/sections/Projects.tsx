"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import SceneBoundary from "@/components/ui/SceneBoundary";
import { myProjects } from "@/lib/constants";

// R3F + video textures are browser-only.
const ComputerScene = dynamic(() => import("@/components/three/ComputerScene"), { ssr: false });

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProject = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  const handleNavigation = (direction: "previous" | "next") => {
    setSelectedProjectIndex((prev) =>
      direction === "previous" ? (prev - 1 + projectCount) % projectCount : (prev + 1) % projectCount,
    );
  };

  return (
    <section id="work" className="c-space my-20 scroll-mt-24" aria-labelledby="work-heading">
      <h2 id="work-heading" className="head-text">
        My Work
      </h2>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0" aria-hidden="true">
            <Image src={currentProject.spotlight} alt="" width={1038} height={936} className="w-full h-96 object-cover rounded-xl" />
          </div>
          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <Image src={currentProject.logo} alt="" width={40} height={40} className="w-10 h-10 object-contain shadow-sm" />
          </div>
          <div className="flex flex-col gap-5 text-white-600 my-5" aria-live="polite">
            <h3 className="text-white text-2xl font-semibold">{currentProject.title}</h3>
            <p>{currentProject.desc}</p>
            <p>{currentProject.subdesc}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <ul className="flex items-center gap-3" aria-label="Tech stack">
              {currentProject.tags.map((tag) => (
                <li key={tag.id} className="tech-logo">
                  <Image src={tag.path} alt={tag.name} title={tag.name} width={24} height={24} className="h-6 w-auto object-contain" />
                </li>
              ))}
            </ul>
            <a
              className="flex items-center gap-2 cursor-pointer text-white-600 hover:text-white transition-colors"
              href={currentProject.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Check Live Site</span>
              <Image src="/assets/arrow-up.png" width={12} height={12} alt="" className="h-3 w-auto" />
            </a>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button type="button" className="arrow-btn" onClick={() => handleNavigation("previous")} aria-label="Previous project">
              <Image src="/assets/left-arrow.png" alt="" width={16} height={16} className="h-4 w-auto" />
            </button>
            <button type="button" className="arrow-btn" onClick={() => handleNavigation("next")} aria-label="Next project">
              <Image src="/assets/right-arrow.png" alt="" width={16} height={16} className="h-4 w-auto" />
            </button>
          </div>
        </div>
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <SceneBoundary>
            <ComputerScene texture={currentProject.texture} />
          </SceneBoundary>
        </div>
      </div>
    </section>
  );
};

export default Projects;
