"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/layout/Logo";

/**
 * Branded loading screen — the main SCC lockup over a progress bar that
 * always finishes at 100%.
 *
 * Progress is driven by real signals rather than a fixed timer: it eases
 * toward 90% while the document is still loading, then completes to 100% the
 * moment `load` fires. If loading stalls, a 2.2s cap completes it anyway, so
 * the bar never sticks partway and the user is never trapped.
 *
 * On the ink background the reverse treatment is the compliant one per the
 * SCC colour spec — full colour is for white/light only.
 */

const CAP_MS = 2200;
const HOLD_AFTER_COMPLETE_MS = 420;

export function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const completed = useRef(false);

  useEffect(() => {
    let raf = 0;
    let dismissTimer: ReturnType<typeof setTimeout>;

    /** Run the bar to 100%, hold briefly so it reads, then dismiss. */
    const complete = () => {
      if (completed.current) return;
      completed.current = true;
      setProgress(100);
      dismissTimer = setTimeout(() => setDone(true), HOLD_AFTER_COMPLETE_MS);
    };

    // Ease toward 90% while we wait — decelerating, so it never looks stalled
    // and never reaches 100 before the page actually finishes.
    const tick = () => {
      setProgress((p) => (completed.current ? p : p + (90 - p) * 0.06));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete);
    }
    const cap = setTimeout(complete, CAP_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      clearTimeout(dismissTimer);
      window.removeEventListener("load", complete);
    };
  }, []);

  const pct = Math.min(100, Math.round(progress));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center bg-[var(--ink-90)] noise"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="progressbar"
          aria-label="Loading"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="flex flex-col items-center px-6 w-full max-w-[340px]">
            <Logo variant="light" height={62} priority />

            {/* Track */}
            <div className="relative w-full h-[3px] mt-10 bg-white/12 overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-[var(--supreme-red)]"
                style={{
                  width: `${pct}%`,
                  transition: "width 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>

            {/* Readout */}
            <div className="flex items-baseline justify-between w-full mt-4">
              <span className="eyebrow text-white/40">
                Commercial Roof Restoration
              </span>
              <span
                className="font-display text-[1.5rem] leading-none tabular-nums text-white"
                aria-hidden="true"
              >
                {String(pct).padStart(3, "0")}
                <span className="text-[var(--supreme-red)]">%</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
