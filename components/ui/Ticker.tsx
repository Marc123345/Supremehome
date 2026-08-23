"use client";

interface TickerProps {
  items: readonly string[];
  direction?: "left" | "right";
  /** Bebas display face vs. body sans */
  display?: boolean;
  className?: string;
  dotColor?: string;
  textColor?: string;
}

/** Infinite horizontal marquee. Items are duplicated for a seamless loop. */
export function Ticker({
  items,
  direction = "left",
  display = false,
  className = "",
  dotColor = "var(--supreme-red)",
  textColor = "rgba(255,255,255,0.72)",
}: TickerProps) {
  /* The marquee is stopped site-wide, so the duplicated second copy that
     made the scroll seamless would now just overflow the right edge. One
     copy, wrapped and centred, reads as a plain strip of labels. The
     `direction` prop is kept so the animation can be restored. */
  void direction;

  return (
    <div className={className} aria-hidden="true">
      <div className="flex flex-wrap justify-center gap-y-1 py-[7px]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-5 px-5 shrink-0"
          >
            <span
              className={`${
                display ? "font-display text-[13px]" : "text-[10px] font-semibold"
              } uppercase whitespace-nowrap`}
              style={{
                color: textColor,
                letterSpacing: display ? "0.16em" : "0.24em",
              }}
            >
              {item}
            </span>
            <span
              className="w-[3px] h-[3px] shrink-0"
              style={{ backgroundColor: dotColor }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
