"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Count-up number that starts when it scrolls into view.
 *
 * Ported from topfloor `elements/Counter.js` + `CounterUp.js`. The original
 * ran a setInterval on mount regardless of visibility and queried the DOM by
 * class name, so every counter on a page shared one trigger. This version uses
 * one IntersectionObserver per instance and a rAF eased tween.
 */
export function CounterUp({
  end,
  duration = 1800,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(end * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setValue(end);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
