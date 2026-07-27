/**
 * Angled divider between sections.
 *
 * Echoes the shape language already running through the site — the header's
 * clip-path wedge and the notched cards — so section changes read as part of
 * the same system rather than a generic wave. A brand-red hairline traces the
 * cut so the angle is legible even between two similar tones.
 *
 * `preserveAspectRatio="none"` lets the polygon stretch to any width, and the
 * hairline uses non-scaling-stroke so it stays exactly 3px however far it
 * stretches.
 */

type Tone = "white" | "light" | "ink" | "red";

const TONE: Record<Tone, string> = {
  white: "#ffffff",
  light: "var(--ink-05)",
  ink: "var(--ink-90)",
  red: "var(--supreme-red)",
};

export function SectionSplit({
  from,
  to,
  /** Which way the diagonal leans */
  direction = "right",
  className = "",
}: {
  from: Tone;
  to: Tone;
  direction?: "left" | "right";
  className?: string;
}) {
  // right: low on the left, rising to the right. left: mirrored.
  const polygon =
    direction === "right" ? "0,100 100,0 100,100" : "0,0 100,100 0,100";
  const line =
    direction === "right"
      ? { x1: 0, y1: 100, x2: 100, y2: 0 }
      : { x1: 0, y1: 0, x2: 100, y2: 100 };

  return (
    <div
      aria-hidden="true"
      className={`relative block leading-none ${className}`}
      style={{ background: TONE[from] }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="block w-full h-[clamp(38px,6vw,96px)]"
      >
        <polygon points={polygon} fill={TONE[to]} />
        <line
          {...line}
          stroke="var(--supreme-red)"
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
