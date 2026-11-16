// Page-wide ambient layer: two ribbons of sine waves, top right and bottom
// left, that drift sideways and slowly breathe. Static SVG built at render
// time; all motion is CSS transforms on HTML wrappers, so it runs on the
// compositor and costs nothing while the page scrolls.

const WAVE = {
  /** Visible width of the viewBox. */
  width: 1200,
  height: 420,
  /** One full sine period. The drift moves exactly this far, so the loop is seamless. */
  period: 400,
  amplitude: 72,
  lines: 14,
  /** Vertical gap between neighbouring lines. */
  spacing: 7,
  /** Phase step between neighbouring lines; twists the band. */
  twist: 0.2,
};

function sinePath(index: number) {
  const { width, height, period, amplitude, lines, spacing, twist } = WAVE;
  const total = width + period;
  const centre = height / 2 + (index - (lines - 1) / 2) * spacing;
  const phase = index * twist;
  // Lines near the edge of the band swing a little less, so it tapers.
  const swing = amplitude * (1 - Math.abs(index - (lines - 1) / 2) / lines);
  const points: string[] = [];

  for (let x = 0; x <= total; x += 8) {
    const y = centre + swing * Math.sin((2 * Math.PI * x) / period + phase);
    points.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

const paths = Array.from({ length: WAVE.lines }, (_, index) => sinePath(index));

function Ribbon({ id }: { id: string }) {
  const total = WAVE.width + WAVE.period;
  const mid = (WAVE.lines - 1) / 2;

  return (
    <svg
      className="ambient-wave"
      viewBox={`0 0 ${total} ${WAVE.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Repeats every period, so the colour loops as seamlessly as the shape. */}
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={WAVE.period} y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round">
        {paths.map((d, index) => (
          <path key={index} d={d} strokeOpacity={0.15 + 0.45 * (1 - Math.abs(index - mid) / mid)} />
        ))}
      </g>
    </svg>
  );
}

export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-corner ambient-corner--top">
        <div className="ambient-breathe">
          <div className="ambient-track">
            <Ribbon id="ambient-gradient-top" />
          </div>
        </div>
      </div>
      <div className="ambient-corner ambient-corner--bottom">
        <div className="ambient-breathe ambient-breathe--late">
          <div className="ambient-track ambient-track--reverse">
            <Ribbon id="ambient-gradient-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}
