// Tech stack graphic for the About grid: six tools around a centre mark.
// Drawn in markup so it stays sharp at any size and can be edited here.

import { siNextdotjs, siReact, siTailwindcss, siTurborepo, siTypescript, siVite, type SimpleIcon } from "simple-icons";

// Clockwise from the top left.
const TOOLS: readonly { icon: SimpleIcon; color?: string }[] = [
  { icon: siNextdotjs, color: "#ffffff" }, // brand colour is black, which vanishes on this background
  { icon: siTailwindcss },
  { icon: siVite },
  { icon: siTypescript },
  { icon: siTurborepo },
  { icon: siReact },
];

const RADIUS = 36; // percent of the box, from the centre
const START_ANGLE = -120; // degrees; puts the first chip top left

export default function TechOrbit({ monogram }: { monogram: string }) {
  const label = `Core stack: ${TOOLS.map(({ icon }) => icon.title).join(", ")}`;

  return (
    <div className="orbit" role="img" aria-label={label}>
      <div className="orbit-ring">
        {TOOLS.map(({ icon, color }, index) => {
          const angle = ((START_ANGLE + index * (360 / TOOLS.length)) * Math.PI) / 180;
          // Rounded so the server and client render the same string.
          const left = (50 + RADIUS * Math.cos(angle)).toFixed(2);
          const top = (50 + RADIUS * Math.sin(angle)).toFixed(2);

          return (
            <span key={icon.slug} className="orbit-chip" style={{ left: `${left}%`, top: `${top}%` }}>
              <svg viewBox="0 0 24 24" fill={color ?? `#${icon.hex}`} aria-hidden="true">
                <path d={icon.path} />
              </svg>
            </span>
          );
        })}
      </div>
      <span className="orbit-core" aria-hidden="true">
        {monogram}
      </span>
    </div>
  );
}
