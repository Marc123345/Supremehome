import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Layered image block: an offset brand-color plate behind a notched media
 * pane, with a slow scale on hover. Replaces the flat full-bleed crops so the
 * image sections read as two planes rather than one.
 */
export function ImageFrame({
  src,
  alt,
  ratio = "4/5",
  sizes = "(max-width: 1024px) 100vw, 40vw",
  priority = false,
  notch = "lg",
  className = "",
  overlay,
  scrim = false,
}: {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4/5" or "5/4" */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  notch?: "sm" | "lg" | "none";
  className?: string;
  /** Content pinned to the bottom of the image */
  overlay?: ReactNode;
  /** Darken the lower half so overlay text stays legible */
  scrim?: boolean;
}) {
  const notchClass =
    notch === "lg" ? "clip-notch-lg" : notch === "sm" ? "clip-notch" : "";

  return (
    <div className={`image-frame ${className}`}>
      <div
        className={`image-frame__media ${notchClass}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />

        {(scrim || overlay) && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 42%, rgba(0,0,0,0.78) 100%)",
            }}
          />
        )}

        {overlay && (
          <div className="absolute bottom-0 inset-x-0 p-6 lg:p-7 text-white">
            {overlay}
          </div>
        )}

        <span className="absolute bottom-0 inset-x-0 h-[4px] bg-[var(--supreme-red)] z-[1]" />
      </div>
    </div>
  );
}
