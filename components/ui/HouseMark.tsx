/**
 * The Supreme red house.
 *
 * Client feedback (Tiffany): the branding was too subtle — there was no moment
 * where you land on the site and instantly know it's Supreme. The house is one
 * of the strongest pieces of the brand, so it needs to run through the whole
 * site rather than sitting once in the header logo.
 *
 * Inline SVG rather than <Image src="/brand/scc-symbol.svg">, because the mark
 * is used here as a design element, not just a logo: it gets recolored, scaled
 * to watermark size, and used as a section marker and list bullet. A raster or
 * <img> can't inherit currentColor, and CSS-filtering the brand red to a
 * different color is exactly what the brand guide prohibits.
 *
 * Geometry is copied verbatim from the supplied master
 * (public/brand/scc-symbol.svg) — same path, same viewBox, same fill-rule.
 * Do not redraw it.
 */

const PATH =
  "M 120 428 L 120 487 L 182 529 L 182 462 L 262 416.366197 L 342 462 L 342 498 L 404 498 L 404 428 L 262 347 Z M 404 576 L 342 534 L 342 610 L 182 610 L 182 563 L 120 563 L 120 672 L 404 672 Z M 235.225000 498.450000 L 235.225000 553.050000 L 288.775000 553.050000 L 288.775000 498.450000 Z";

const VIEW_BOX = "72.5 320 379 379";

export function HouseMark({
  size = 24,
  className = "",
  color,
  title,
}: {
  size?: number | string;
  className?: string;
  /** Defaults to brand red. Pass "currentColor" to inherit text color. */
  color?: string;
  /** Omit for decorative use — the mark is then hidden from screen readers. */
  title?: string;
}) {
  return (
    <svg
      viewBox={VIEW_BOX}
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path
        d={PATH}
        fill={color ?? "var(--supreme-red)"}
        fillRule="nonzero"
      />
    </svg>
  );
}

/**
 * Oversized, low-opacity house used as a background watermark behind sections.
 * Positioned absolutely by the caller; always decorative.
 */
export function HouseWatermark({
  className = "",
  size = 520,
  opacity = 0.04,
  color,
}: {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ opacity }}
    >
      <HouseMark size={size} color={color} />
    </div>
  );
}

/**
 * Section eyebrow with the house locked to it. This is the repeating brand
 * beat — every major section opens with the house, so the mark is never more
 * than one scroll away.
 */
export function HouseEyebrow({
  children,
  tone = "red",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "red" | "light";
  className?: string;
}) {
  const color =
    tone === "light" ? "var(--supreme-red-bright)" : "var(--supreme-red)";

  return (
    <p className={`flex items-center gap-2.5 eyebrow ${className}`} style={{ color }}>
      <HouseMark size={16} color={color} className="shrink-0" />
      {children}
    </p>
  );
}

/**
 * The house used in place of a checkmark or bullet. Keeps list content on
 * brand instead of reaching for a generic icon set.
 */
export function HouseBullet({
  size = 14,
  className = "",
  tone = "red",
}: {
  size?: number;
  className?: string;
  tone?: "red" | "light";
}) {
  return (
    <HouseMark
      size={size}
      color={tone === "light" ? "var(--supreme-red-bright)" : "var(--supreme-red)"}
      className={`shrink-0 ${className}`}
    />
  );
}
