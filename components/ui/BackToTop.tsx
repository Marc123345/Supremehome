"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Scroll-to-top button with a circular progress ring.
 * Ported from topfloor `elements/BackToTop.js`, which used an SVG path stroke
 * to trace scroll progress — same idea, rebuilt with a dasharray offset.
 */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(pct, 1));
      setVisible(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="Back to top"
          /* Bottom-LEFT. The Jotform assessment agent launcher occupies the
             bottom-right corner on every page, and two floating circles in
             the same corner is one of them covering the other. The agent is
             the conversion path, so it keeps the corner people look in. */
          className="group fixed bottom-6 left-6 z-[90] w-[52px] h-[52px] grid place-items-center rounded-full bg-[var(--ink-90)] shadow-lg"
        >
          <svg
            className="absolute inset-0 -rotate-90"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            aria-hidden="true"
          >
            <circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="2"
            />
            <circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--supreme-red)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>
          <ArrowUp
            size={17}
            className="relative text-white transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </button>
  );
}
