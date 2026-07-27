import Image from "next/image";
import { credentialBadges } from "@/lib/site";

/**
 * CertainTeed credential badges rendered as die-cut stickers.
 *
 * The source PNGs have genuinely transparent corners, so a stacked white
 * drop-shadow gives them a sticker rim that follows the pentagon silhouette —
 * a box-shadow would draw a rectangle around it instead.
 *
 * Deliberately CSS-only, with no entrance animation: these are the site's
 * proof of credentials, and anything gated behind a JS animation is invisible
 * until that animation runs. The rotation and rim are static; only the hover
 * lift is a transition, which mobile disables via the global rules.
 */

const ROTATIONS = ["-7deg", "5deg"] as const;

const STICKER_FILTER =
  "drop-shadow(0 0 2px rgba(255,255,255,0.95)) drop-shadow(0 0 2px rgba(255,255,255,0.85)) drop-shadow(0 10px 16px rgba(0,0,0,0.55))";

export function CertStickers({
  size = 128,
  className = "",
  overlap = true,
}: {
  size?: number;
  className?: string;
  overlap?: boolean;
}) {
  return (
    <ul className={`flex items-center ${className}`}>
      {credentialBadges.map((badge, i) => (
        <li
          key={badge.name}
          className="shrink-0"
          style={{
            marginLeft: overlap && i > 0 ? -size * 0.18 : 0,
            zIndex: credentialBadges.length - i,
          }}
        >
          <span
            className="block transition-transform duration-300 hover:scale-105"
            style={{
              transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})`,
              filter: STICKER_FILTER,
            }}
          >
            <Image
              src={badge.src}
              alt={badge.alt}
              width={size}
              height={size}
              title={`${badge.issuer} ${badge.name}`}
              className="select-none"
              draggable={false}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
