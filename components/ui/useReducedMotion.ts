"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * True when motion should be suppressed.
 *
 * Two triggers:
 *  · the user asked for reduced motion, or
 *  · this is a phone-sized / touch-primary device — continuous decorative
 *    motion costs battery and main-thread time there, and competes with
 *    scrolling on mid-range hardware.
 *
 * Defaults to FALSE so the first client render matches the server render.
 * Returning true initially would make every Reveal render a plain element,
 * then swap to a motion element once the effect ran — a full remount that
 * flashes the content out and back in on desktop.
 *
 * The real value is applied in a layout effect, which runs before the browser
 * paints, so phones never see a frame of animation.
 */
const QUERY =
  "(prefers-reduced-motion: reduce), (max-width: 768px), (pointer: coarse)";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
