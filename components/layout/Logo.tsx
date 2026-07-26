import Image from "next/image";

/**
 * Brand lockups — the client's supplied master assets, not reconstructions.
 *
 * Primary mark is Supreme Commercial Coatings (SCC), matching the site's
 * commercial-first positioning. Supreme Home is used where residential is the
 * context. Sources:
 *   SCC  — SCC_Professional_Logo_Master_Package (minified web SVG masters)
 *   SH   — "Supreme Home Website 2" (Sized logo supreme home 2 Large.png)
 *
 * Three treatments, all supplied by the package — no CSS filters over the
 * full-colour master:
 *   dark    full colour  — black lettering + red symbol, for white backgrounds
 *   light   reverse      — white lettering + RED symbol, for dark/black only
 *   solid   white mono   — entirely white, required on red backgrounds where
 *                          the reverse file's red symbol would disappear
 */

const SCC_RATIO = 1276 / 390; // from the SVG viewBox

const SCC_SRC = {
  dark: "/brand/scc-horizontal.svg",
  light: "/brand/scc-horizontal-reverse.svg",
  solid: "/brand/scc-horizontal-white.svg",
} as const;

export function Logo({
  variant = "dark",
  height = 40,
  className = "",
  priority = false,
}: {
  variant?: keyof typeof SCC_SRC;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = SCC_SRC[variant];

  return (
    <Image
      src={src}
      alt="Supreme Commercial Coatings"
      width={Math.round(height * SCC_RATIO)}
      height={height}
      priority={priority}
      // SVG: Next's optimiser doesn't process these, and doing so would
      // rasterise a vector master.
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

/** Supreme Commercial Coatings symbol only — favicons, compact spots. */
export function LogoSymbol({
  variant = "dark",
  size = 40,
  className = "",
}: {
  variant?: "dark" | "light";
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={
        variant === "light"
          ? "/brand/scc-symbol-white.svg"
          : "/brand/scc-symbol.svg"
      }
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      unoptimized
      className={className}
    />
  );
}

/**
 * Parent-entity lockup — "SupremeHome Roofing & Construction".
 *
 * NOTE: the supplied file is only 160x35, so it is used at small sizes only
 * (footer attribution / about page). Ask the client for a vector or a 2x
 * raster before using it any larger.
 */
export function SupremeHomeRoofingLogo({
  height = 30,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/supreme-home-roofing-construction.jpg"
      alt="Supreme Home Roofing & Construction"
      width={Math.round(height * (160 / 35))}
      height={height}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

/** Supreme Home lockup — the residential side of the business. */
export function SupremeHomeLogo({
  height = 40,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/supreme-home-horizontal.png"
      alt="Supreme Home"
      width={Math.round(height * (1280 / 327))}
      height={height}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
