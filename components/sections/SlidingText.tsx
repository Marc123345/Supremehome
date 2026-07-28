"use client";

/**
 * Oversized scrolling display band.
 * Ported from topfloor `sections/home1/Slidingtext.js` — the marquee of giant
 * headline words that fill with color on hover, with a mark between each.
 */

/* "Flat Roofs" and "Coatings" were replaced: both narrowed the company to a
   flat-roof coating applicator, which client feedback section 3 retired. */
const WORDS = [
  "Restoration",
  "Replacement",
  "Commercial",
  "Assessment",
] as const;

function Mark() {
  return (
    <span
      className="inline-block shrink-0 mx-7 lg:mx-10 w-[26px] h-[26px] lg:w-[34px] lg:h-[34px] rotate-45 bg-[var(--supreme-red)]"
      aria-hidden="true"
    />
  );
}

export function SlidingText({
  direction = "left",
}: {
  direction?: "left" | "right";
}) {
  const animation =
    direction === "left" ? "animate-ticker-left" : "animate-ticker-right";

  const row = [...WORDS, ...WORDS];

  return (
    <section
      className="relative py-10 lg:py-14 bg-[var(--ink-90)] overflow-hidden noise border-y border-white/10"
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <div className={`${animation} flex items-center w-max whitespace-nowrap`}>
          {row.map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center shrink-0">
              <span className="sliding-word display-lg">{word}</span>
              <Mark />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
