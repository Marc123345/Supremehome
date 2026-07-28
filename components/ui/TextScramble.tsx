"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useReducedMotion } from "./useReducedMotion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface TextScrambleProps {
  phrases: readonly string[];
  /** Time each phrase stays fully revealed (ms) */
  holdDuration?: number;
  /** Time for the scramble-in transition (ms) */
  scrambleDuration?: number;
  className?: string;
  /** Color of characters that have resolved */
  resolvedColor?: string;
  /** Color of characters still scrambling */
  scramblingColor?: string;
}

/** Ease-out cubic for a decelerating reveal */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * TextScramble — character-by-character decode effect.
 * Ported from the Vharanani Group hero banner.
 */
export const TextScramble = memo(function TextScramble({
  phrases,
  holdDuration = 4200,
  scrambleDuration = 1900,
  className = "",
  resolvedColor = "var(--supreme-red)",
  scramblingColor = "rgba(255,255,255,0.28)",
}: TextScrambleProps) {
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0] ?? "");
  const [isScrambling, setIsScrambling] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTickTime = useRef(0);

  const TICK_INTERVAL = 70; // ms between random char changes

  const scrambleTo = useCallback(
    (target: string) => {
      setIsScrambling(true);
      setOpacity(1);
      const startTime = performance.now();
      const totalChars = target.length;
      let cachedRandom = Array.from(
        { length: totalChars },
        () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      );

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / scrambleDuration, 1);
        const progress = easeOutCubic(rawProgress);
        const resolved = Math.floor(progress * totalChars);

        if (now - lastTickTime.current > TICK_INTERVAL) {
          lastTickTime.current = now;
          cachedRandom = cachedRandom.map((ch, i) =>
            i >= resolved && target[i] !== " "
              ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
              : ch
          );
        }

        let result = "";
        for (let i = 0; i < totalChars; i++) {
          if (i < resolved) result += target[i];
          else if (target[i] === " ") result += " ";
          else result += cachedRandom[i];
        }

        setDisplayText(result);

        if (rawProgress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayText(target);
          setIsScrambling(false);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    },
    [scrambleDuration]
  );

  useEffect(() => {
    // Mobile / reduced motion: cycle the phrases with no per-character
    // decode work (that ran a rAF loop for ~2s per phrase, forever).
    if (reduced) {
      setDisplayText(phrases[currentIndex]);
      setIsScrambling(false);
      timerRef.current = setTimeout(
        () => setCurrentIndex((p) => (p + 1) % phrases.length),
        holdDuration + scrambleDuration
      );
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    scrambleTo(phrases[currentIndex]);

    const fadeDuration = 550;
    fadeTimerRef.current = setTimeout(
      () => setOpacity(0),
      scrambleDuration + holdDuration - fadeDuration
    );
    timerRef.current = setTimeout(
      () => setCurrentIndex((p) => (p + 1) % phrases.length),
      scrambleDuration + holdDuration
    );

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [currentIndex, phrases, scrambleTo, scrambleDuration, holdDuration, reduced]);

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        opacity,
        transition: "opacity 0.55s ease",
      }}
      aria-label={phrases[currentIndex]}
    >
      {displayText.split("").map((char, i) => {
        const isResolved =
          !isScrambling || char === phrases[currentIndex]?.[i];
        return (
          <span
            key={`${currentIndex}-${i}`}
            aria-hidden="true"
            style={{
              display: "inline-block",
              color: isResolved ? resolvedColor : scramblingColor,
              transition: "color 0.35s ease",
              minWidth: char === " " ? "0.3em" : undefined,
            }}
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
    </span>
  );
});
