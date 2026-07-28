"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * 3D arc slider — ported from marc-portfolio-nextjs `components/ArcSlider.tsx`
 * and restyled onto the Supreme design system (red accent, Bebas display,
 * square corners). Behavior is unchanged: rotateY arc, pointer tilt on the
 * active card, drag to advance, arrow-key nav, dots, and a horizontal
 * scroll-snap fallback under 768px.
 */

const ACCENT = "#e00116";

export type ArcCard = {
  id: string;
  title: string;
  category: string;
  blurb: string;
  href: string;
  bullets?: readonly string[];
};

/** Arc geometry, shared by the SSR pass and runtime repositioning so the
 *  cards are never painted stacked on top of one another. */
function arcStyle(offset: number, cardWidth: number) {
  const abs = Math.abs(offset);
  if (abs === 0) return { x: 0, rotateY: 0, z: 0, scale: 1, opacity: 1, zIndex: 10 };
  if (abs === 1)
    return {
      x: offset * cardWidth * 0.82,
      rotateY: offset < 0 ? 32 : -32,
      z: -120,
      scale: 0.82,
      opacity: 0.55,
      zIndex: 5,
    };
  if (abs === 2)
    return {
      x: offset * cardWidth * 1.3,
      rotateY: offset < 0 ? 48 : -48,
      z: -240,
      scale: 0.64,
      opacity: 0.18,
      zIndex: 2,
    };
  return {
    x: offset * cardWidth * 1.75,
    rotateY: offset < 0 ? 55 : -55,
    z: -350,
    scale: 0.5,
    opacity: 0,
    zIndex: 1,
  };
}

export function ArcSlider({
  cards,
  initialIndex = 0,
}: {
  cards: ArcCard[];
  initialIndex?: number;
}) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const activeRectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef(0);
  const dragRef = useRef({ startX: 0, hasMoved: false, isDragging: false });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 150, damping: 18, mass: 0.4 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 150, damping: 18, mass: 0.4 });
  const tiltRotateX = useTransform(smoothTiltY, [-1, 1], [6, -6]);
  const tiltRotateY = useTransform(smoothTiltX, [-1, 1], [-8, 8]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigateTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= cards.length) return;
      setActiveIndex(idx);
    },
    [cards.length]
  );

  const positionCards = useCallback(
    (index: number, animate: boolean) => {
      const containerWidth = containerRef.current?.offsetWidth ?? 900;
      const cardWidth = Math.min(380, Math.max(260, containerWidth * 0.55));

      cards.forEach((_, i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        const offset = i - index;
        const abs = Math.abs(offset);
        const { x, rotateY, z, scale, opacity, zIndex } = arcStyle(
          offset,
          cardWidth
        );
        const offArc = abs > 1;

        card.style.zIndex = String(zIndex);
        card.style.transition = animate
          ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, box-shadow 0.6s ease"
          : "none";
        card.style.transform = `translateX(${x}px) rotateY(${rotateY}deg) translateZ(${z}px) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.boxShadow =
          abs === 0
            ? `0 0 0 1px ${ACCENT}55, 0 30px 80px -20px ${ACCENT}30, 0 10px 30px rgba(0,0,0,0.55)`
            : abs === 1
            ? "0 8px 30px rgba(0,0,0,0.45)"
            : "none";
        card.style.pointerEvents = offArc ? "none" : "auto";
        // Off-arc cards are visually gone but their links stayed in the tab
        // order, so keyboard users landed on invisible content.
        card.inert = offArc;
      });
    },
    [cards]
  );

  useEffect(() => {
    positionCards(activeIndex, true);
    tiltX.set(0);
    tiltY.set(0);
    activeRectRef.current = null;
  }, [activeIndex, positionCards, tiltX, tiltY]);

  useEffect(() => {
    const invalidate = () => {
      activeRectRef.current = null;
    };
    const onResize = () => {
      positionCards(activeIndex, false);
      invalidate();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", invalidate, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", invalidate);
    };
  }, [activeIndex, positionCards]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, hasMoved: false, isDragging: true };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;

    if (dragRef.current.isDragging) {
      if (Math.abs(clientX - dragRef.current.startX) > 30) {
        dragRef.current.hasMoved = true;
      }
    }

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const card = activeCardRef.current;
      if (!card) return;
      if (!activeRectRef.current) {
        activeRectRef.current = card.getBoundingClientRect();
      }
      const rect = activeRectRef.current;
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      const cx = rect.left + halfW;
      const cy = rect.top + halfH;
      const nx = (clientX - cx) / halfW;
      const ny = (clientY - cy) / halfH;
      const inside =
        Math.abs(clientX - cx) < halfW + 40 && Math.abs(clientY - cy) < halfH + 40;
      if (inside) {
        tiltX.set(Math.max(-1, Math.min(1, nx)));
        tiltY.set(Math.max(-1, Math.min(1, ny)));
      } else {
        tiltX.set(0);
        tiltY.set(0);
      }
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.isDragging = false;
    if (Math.abs(dx) > 50) navigateTo(activeIndex + (dx < 0 ? 1 : -1));
  };

  const active = cards[activeIndex];

  /* ── Mobile: horizontal scroll-snap ── */
  if (isMobile) {
    return (
      <div className="relative">
        <div className="overflow-x-auto snap-x snap-mandatory thin-scroll -mx-[var(--gutter)] px-[var(--gutter)]">
          <div className="flex gap-4 pb-5">
            {cards.map((c, i) => (
              <Link
                key={c.id}
                href={c.href}
                className="snap-center shrink-0 w-[80vw] max-w-[330px] border border-white/12 bg-[var(--ink-80)] p-7 flex flex-col"
              >
                <span className="eyebrow text-[var(--supreme-red-bright)] mb-6">
                  {String(i + 1).padStart(2, "0")} · {c.category}
                </span>
                <h3 className="display-sm text-white mb-3 mt-auto">{c.title}</h3>
                <p className="text-[0.88rem] leading-[1.65] text-white/60 mb-6">
                  {c.blurb}
                </p>
                {c.bullets && (
                  <ul className="space-y-1.5 mb-6">
                    {c.bullets.slice(0, 3).map((b) => (
                      <li
                        key={b}
                        className="flex gap-2.5 items-start text-[0.78rem] leading-[1.5] text-white/50"
                      >
                        <span className="mt-[7px] w-[4px] h-[4px] shrink-0 bg-[var(--supreme-red)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-white border-b border-white/25 pb-1 self-start">
                  See details <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop arc ── */
  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative w-full select-none"
        style={{ perspective: "1600px", height: 660 }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Services"
        tabIndex={0}
        onKeyDown={(e) => {
          // Scoped to the slider. A window-level listener stole ArrowLeft /
          // ArrowRight from the whole page, including when it was off-screen.
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            navigateTo(activeIndex - 1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            navigateTo(activeIndex + 1);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={(e) => {
          tiltX.set(0);
          tiltY.set(0);
          if (dragRef.current.isDragging) onPointerUp(e);
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cards.map((c, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={c.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                  if (isActive) activeCardRef.current = el;
                }}
                className="absolute cursor-pointer"
                style={(() => {
                  const a = arcStyle(i - initialIndex, 380);
                  return {
                    transformStyle: "preserve-3d" as const,
                    width: "min(380px, 55vw)",
                    height: 600,
                    transform: `translateX(${a.x}px) rotateY(${a.rotateY}deg) translateZ(${a.z}px) scale(${a.scale})`,
                    opacity: a.opacity,
                    zIndex: a.zIndex,
                  };
                })()}
                onClick={() => {
                  if (dragRef.current.hasMoved) return;
                  if (i !== activeIndex) navigateTo(i);
                  else router.push(c.href);
                }}
              >
                <motion.div
                  className="relative w-full h-full border border-white/12 flex flex-col p-8 overflow-hidden"
                  style={{
                    background: isActive
                      ? "linear-gradient(150deg, #1b1113 0%, #0b0b0d 62%)"
                      : "var(--ink-80)",
                    transformStyle: "preserve-3d",
                    ...(isActive
                      ? { rotateX: tiltRotateX, rotateY: tiltRotateY }
                      : null),
                  }}
                >
                  {/* Top accent draws in on the active card */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-500"
                    style={{
                      background: ACCENT,
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />

                  <div className="flex items-center justify-between gap-3 mb-7">
                    <span className="eyebrow text-[var(--supreme-red-bright)]">
                      {String(i + 1).padStart(2, "0")} · {c.category}
                    </span>
                    <span className="eyebrow text-white/35 shrink-0">Service</span>
                  </div>

                  {/* justify-end pushes content to the base of the card; the
                      min-h-0 + shrink lets long copy compress instead of
                      pushing the CTA past the card edge. */}
                  <div className="flex-1 min-h-0 flex flex-col justify-end">
                    <h3
                      className="font-display uppercase text-white mb-3.5"
                      style={{
                        fontSize: "clamp(1.7rem, 2.4vw, 2.35rem)",
                        lineHeight: 1.02,
                      }}
                    >
                      {c.title}
                    </h3>
                    <p className="text-[0.86rem] leading-[1.6] text-white/62 mb-6">
                      {c.blurb}
                    </p>

                    {c.bullets && (
                      <ul className="space-y-2 mb-7">
                        {c.bullets.slice(0, 3).map((b) => (
                          <li
                            key={b}
                            className="flex gap-2.5 items-start text-[0.8rem] leading-[1.45] text-white/50"
                          >
                            <span className="mt-[7px] w-[4px] h-[4px] shrink-0 bg-[var(--supreme-red)]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={c.href}
                      onClick={(e) => {
                        if (dragRef.current.hasMoved) e.preventDefault();
                        e.stopPropagation();
                      }}
                      aria-label={`See details for ${c.title}`}
                      className="inline-flex items-center gap-2.5 text-[0.88rem] font-bold text-white border-b border-white/25 hover:border-[var(--supreme-red-bright)] hover:text-[var(--supreme-red-bright)] pb-1 self-start transition-colors relative z-10"
                    >
                      See details
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={() => navigateTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous service"
          className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 grid place-items-center border border-white/15 bg-black/45 backdrop-blur-sm text-white hover:border-[var(--supreme-red)] hover:bg-[var(--supreme-red)] transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          onClick={() => navigateTo(activeIndex + 1)}
          disabled={activeIndex === cards.length - 1}
          aria-label="Next service"
          className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 grid place-items-center border border-white/15 bg-black/45 backdrop-blur-sm text-white hover:border-[var(--supreme-red)] hover:bg-[var(--supreme-red)] transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Caption + dots */}
      <div className="mt-10 flex flex-col items-center gap-5">
        <div className="text-center">
          <p className="eyebrow text-white/40 mb-2">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(cards.length).padStart(2, "0")}
          </p>
          <p className="display-sm text-white/85">{active.title}</p>
        </div>

        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateTo(i)}
              aria-label={`Go to service ${i + 1}`}
              className="tap h-[2px] transition-all duration-300"
              style={{
                width: i === activeIndex ? 32 : 16,
                background: i === activeIndex ? ACCENT : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
