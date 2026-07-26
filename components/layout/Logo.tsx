/**
 * Wordmark reconstructed to match the mysupremehome.com lockup:
 * red house/roof glyph + "Supreme" (bold) "Home" (light).
 * Swap in the client's supplied vector when it arrives.
 */
export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const wordColor = variant === "light" ? "#ffffff" : "#000000";
  const lightWordColor = variant === "light" ? "rgba(255,255,255,0.9)" : "#000000";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Roof chevron — sits above the body with a clear gap */}
        <path
          d="M20 1.5 L39 15.5 L33.5 15.5 L20 5.6 L6.5 15.5 L1 15.5 Z"
          fill="var(--supreme-brick)"
        />
        {/* Body — walls with a negative-space opening on the right */}
        <path
          d="M5.5 19 H34.5 V38.5 H24 V29 H16 V38.5 H5.5 Z"
          fill="var(--supreme-brick)"
        />
        {/* Window cut-out */}
        <rect x="16" y="22.5" width="8" height="4" fill="var(--supreme-brick)" />
      </svg>

      <span
        className="leading-none tracking-tight"
        style={{ fontSize: "1.32rem" }}
      >
        <span style={{ color: wordColor, fontWeight: 800 }}>Supreme</span>
        <span style={{ color: lightWordColor, fontWeight: 300 }}>Home</span>
      </span>
    </span>
  );
}
