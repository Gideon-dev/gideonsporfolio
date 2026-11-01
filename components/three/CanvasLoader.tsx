"use client";

import { useProgress } from "@react-three/drei";

// Plain DOM overlay rendered next to (not inside) the <Canvas>.
// drei's <Html> fallback throws a removeChild error when it unmounts under React 19.
const CanvasLoader = () => {
  const { active, progress } = useProgress();
  if (!active && progress >= 100) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4" role="status">
      <span className="canvas-loader" aria-hidden="true" />
      <p className="text-sm font-semibold text-white-800">{progress > 0 ? `${progress.toFixed(0)}%` : "Loading..."}</p>
    </div>
  );
};

export default CanvasLoader;
