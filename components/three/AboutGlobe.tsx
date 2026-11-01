"use client";

import { useEffect, useRef } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";

// Lagos, Nigeria
const HOME = { lat: 6.5244, lng: 3.3792 };

const AboutGlobe = () => {
  const globe = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    globe.current?.pointOfView({ ...HOME, altitude: 2 }, 0);
  }, []);

  return (
    <Globe
      ref={globe}
      height={326}
      width={326}
      backgroundColor="rgba(0,0,0,0)"
      showAtmosphere
      showGraticules
      globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
      labelsData={[{ ...HOME, text: "I'm here!" }]}
      labelColor={() => "white"}
      labelSize={1.6}
      labelDotRadius={0.5}
    />
  );
};

export default AboutGlobe;
