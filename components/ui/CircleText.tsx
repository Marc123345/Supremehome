"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Rotating curved text badge.
 * Ported from topfloor `sections/home3/Circletext.js`, which used the
 * react-curved-text package. Rebuilt as an inline SVG textPath so it needs no
 * dependency and scales cleanly.
 */
export function CircleText({
  text = "FREE ROOF ASSESSMENT · FREE ROOF ASSESSMENT · ",
  href = "/contact",
  size = 168,
  className = "",
}: {
  text?: string;
  href?: string;
  size?: number;
  className?: string;
}) {
  const repeated = text.repeat(2);

  return (
    <Link
      href={href}
      aria-label="Request a free roof assessment"
      className={`group relative grid place-items-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-circle-rotate"
        aria-hidden="true"
      >
        <defs>
          <path
            id="circle-text-path"
            d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>
        <text
          className="font-display"
          fill="currentColor"
          style={{ fontSize: 15, letterSpacing: "0.14em" }}
        >
          <textPath href="#circle-text-path" startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>

      <span className="relative grid place-items-center w-[58px] h-[58px] rounded-full bg-[var(--supreme-red)] transition-transform duration-400 group-hover:scale-110">
        <ArrowUpRight
          size={22}
          className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
