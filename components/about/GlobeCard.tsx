"use client";

import dynamic from "next/dynamic";
import SceneBoundary from "@/components/ui/SceneBoundary";

// react-globe.gl touches `window` on import, so it only loads in the browser.
const AboutGlobe = dynamic(() => import("@/components/three/AboutGlobe"), {
  ssr: false,
  loading: () => <div className="h-[326px] w-[326px]" aria-hidden="true" />,
});

export default function GlobeCard() {
  return (
    <SceneBoundary>
      <AboutGlobe />
    </SceneBoundary>
  );
}
