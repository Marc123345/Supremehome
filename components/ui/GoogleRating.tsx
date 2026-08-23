import { Star, StarHalf } from "lucide-react";
import { googleProfile } from "@/lib/reviews";

/** Google "G" — official four-color mark, inline so it needs no network request. */
export function GoogleG({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/**
 * Google rating badge.
 *
 * The rating and count come from the live Google Business knowledge panel
 * (4.8 · 21 reviews) — see `googleProfile` in lib/reviews.ts. They are real
 * figures, not placeholders, so update them there when the profile moves.
 *
 * The half star is rendered because the average is 4.8, not 5.0. Showing five
 * full stars for a 4.8 would overstate it.
 */
export function GoogleRating({
  variant = "dark",
  className = "",
}: {
  /** "dark" = on a dark background, "light" = on white */
  variant?: "dark" | "light";
  className?: string;
}) {
  const { rating, reviewCount, shareUrl } = googleProfile;
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;

  const onDark = variant === "dark";

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${rating} out of 5 from ${reviewCount} Google reviews — read them on Google`}
      className={`group inline-flex items-center gap-3 px-4 py-2.5 transition-colors duration-300 ${className}`}
      style={{
        background: onDark ? "rgba(255,255,255,0.08)" : "#ffffff",
        border: onDark
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(0,0,0,0.1)",
        backdropFilter: onDark ? "blur(6px)" : undefined,
      }}
    >
      <GoogleG size={20} className="shrink-0" />

      <span className="flex items-center gap-2">
        <span
          className="font-display text-[1.15rem] leading-none"
          style={{ color: onDark ? "#fff" : "var(--ink)" }}
        >
          {rating.toFixed(1)}
        </span>

        <span className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: full }).map((_, i) => (
            <Star key={i} size={13} className="fill-[#FBBC05] text-[#FBBC05]" />
          ))}
          {hasHalf && (
            <StarHalf size={13} className="fill-[#FBBC05] text-[#FBBC05]" />
          )}
        </span>

        <span
          className="text-[1rem] font-semibold whitespace-nowrap"
          style={{ color: onDark ? "rgba(255,255,255,0.72)" : "var(--ink-50)" }}
        >
          {reviewCount} Google reviews
        </span>
      </span>
    </a>
  );
}
