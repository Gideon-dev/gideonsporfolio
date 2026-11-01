"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import DemoComputer from "./DemoComputer";

const ComputerScene = ({ texture }: { texture: string }) => {
  return (
    <div className="relative h-full w-full">
      <Canvas>
        <ambientLight intensity={Math.PI} />
        <directionalLight position={[10, 10, 5]} />
        <Center>
          <Suspense fallback={null}>
            <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
              <DemoComputer texture={texture} />
            </group>
          </Suspense>
        </Center>
        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
      </Canvas>
      <CanvasLoader />
    </div>
  );
};

export default ComputerScene;
