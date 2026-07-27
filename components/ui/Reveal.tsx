"use client";

import { motion, type Variants } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 34;

function offsetFor(direction: Direction) {
  switch (direction) {
    case "up":
      return { y: OFFSET, x: 0 };
    case "down":
      return { y: -OFFSET, x: 0 };
    case "left":
      return { x: OFFSET, y: 0 };
    case "right":
      return { x: -OFFSET, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /** Fraction of the element that must be visible before animating */
  amount?: number;
  as?: "div" | "section" | "li" | "span" | "article";
}

/**
 * Fade/slide an element in the first time it enters the viewport.
 * On mobile and under prefers-reduced-motion this renders a plain element —
 * no scroll listeners, no transform work, content visible immediately.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const { x, y } = offsetFor(direction);
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ── Staggered group ─────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealGroup({
  children,
  className = "",
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ── Word-by-word headline reveal ────────────────────────── */

export function RevealWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: { y: "105%" },
                show: {
                  y: "0%",
                  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* The word gap must be a text node BETWEEN the wrappers. Kept
              inside the inline-block it is trailing whitespace, which CSS
              collapses — that is what jammed every heading together. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
