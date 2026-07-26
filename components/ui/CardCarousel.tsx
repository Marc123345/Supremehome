"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Paged card carousel — a track of equal-width cards that advances a page at a
 * time, with prev/next arrows, dot pagination, drag/swipe and keyboard support.
 * Cards per view is responsive (1 / 2 / 3).
 */
export function CardCarousel({
  children,
  ariaLabel = "Carousel",
  autoAdvanceMs = 0,
}: {
  children: ReactNode[];
  ariaLabel?: string;
  /** 0 disables auto-advance */
  autoAdvanceMs?: number;
}) {
  const count = children.length;
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragRef = useRef({ startX: 0, dragging: false });
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pageCount = Math.max(1, Math.ceil(count / perView));

  // Clamp when the viewport (and therefore page count) changes.
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const go = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount]
  );

  // Auto-advance, paused on hover/focus and when reduced motion is requested.
  useEffect(() => {
    if (!autoAdvanceMs || paused || pageCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => setPage((p) => (p + 1) % pageCount), autoAdvanceMs);
    return () => clearInterval(id);
  }, [autoAdvanceMs, paused, pageCount]);

  // Arrow keys only while the carousel has focus, so they don't fight the page.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(page - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(page + 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, dragging: true };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.dragging = false;
    if (Math.abs(dx) > 55) go(page + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative outline-none"
    >
      {/* Track */}
      <div
        className="overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${page * 100}%)`,
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="shrink-0 px-2.5 first:pl-0 last:pr-0"
              style={{ width: `${100 / perView}%` }}
              aria-hidden={
                i < page * perView || i >= (page + 1) * perView ? true : undefined
              }
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between gap-6 mt-9">
          <div className="flex items-center gap-2.5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide group ${i + 1} of ${pageCount}`}
                aria-current={i === page ? "true" : undefined}
                className="h-[3px] transition-all duration-300"
                style={{
                  width: i === page ? 36 : 18,
                  background:
                    i === page ? "var(--supreme-red)" : "rgba(0,0,0,0.16)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => go(page - 1)}
              aria-label="Previous"
              className="w-11 h-11 grid place-items-center border border-black/12 transition-colors hover:bg-[var(--supreme-red)] hover:border-[var(--supreme-red)] hover:text-white"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={() => go(page + 1)}
              aria-label="Next"
              className="w-11 h-11 grid place-items-center border border-black/12 transition-colors hover:bg-[var(--supreme-red)] hover:border-[var(--supreme-red)] hover:text-white"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
