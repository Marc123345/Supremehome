"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORD = "SUPREME";

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
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-7">
            <span className="preloader-spinner block w-11 h-11 rounded-full border-2 border-white/12 border-t-[var(--supreme-red)]" />

            <span className="font-display text-[2.2rem] tracking-[0.22em] text-white">
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

            <span className="eyebrow text-[var(--supreme-red-bright)]">
              Roof Restoration
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
