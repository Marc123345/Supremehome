"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/layout/Logo";

const WORD = "RESTORATION";

/**
 * Branded loading screen.
 * Ported from topfloor `elements/Preloader.js` — the letter-flip animation and
 * spinner, rebuilt on the Supreme palette and dismissed on window load.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Never trap the user: dismiss on load, and hard-cap at 2.2s regardless.
    const finish = () => setDone(true);

    if (document.readyState === "complete") {
      const t = setTimeout(finish, 420);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", finish);
    const cap = setTimeout(finish, 2200);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(cap);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center bg-[var(--ink-90)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-8 px-6">
            {/* Reverse lockup — the loader is ink, which is a compliant
                background for it per the SCC colour spec. */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo variant="light" height={54} priority />
            </motion.div>

            <span className="preloader-spinner block w-9 h-9 rounded-full border-2 border-white/12 border-t-[var(--supreme-red)]" />

            <span className="font-display text-[1.15rem] tracking-[0.3em] text-white/70">
              {WORD.split("").map((letter, i) => (
                <span
                  key={i}
                  className="preloader-letter"
                  style={{ animationDelay: `${i * 0.09}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
