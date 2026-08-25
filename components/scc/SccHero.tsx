import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { site } from "@/lib/site";
import { googleProfile } from "@/lib/reviews";

/**
 * The commercial hero. Shared system, different image per route (file 04 §7).
 *
 * ── What this replaces, item by item ───────────────────────────────────────
 *
 * The acceptance criteria in file 04 §16 name five things in the old hero, and
 * all five are gone here:
 *
 *  · THE COATING-APPLICATION IMAGE. A man spraying coating was the first thing
 *    a commercial visitor saw, on the page whose job is to establish that SCC
 *    is not only a coating installer. The homepage now opens on assessment —
 *    roof context with a person evaluating it — and Commercial opens on a wide
 *    roof overview. Never the same image on both (§7).
 *  · THE OVERSIZED MONOGRAM. A ~200px SCC house mark floated in the right half
 *    as decoration. §2: "Do not enlarge the SCC monogram into a background
 *    graphic." The logo lives in the header, at a legible size, once.
 *  · THE GIANT PILL CTA. Replaced by one 52px rectangular button on the 6-8px
 *    radius token.
 *  · THE DETACHED ARROW CONTROL. A circular arrow button sitting beside the CTA
 *    with no label and no obvious destination.
 *  · THE HEAVY RED IMAGE WASH. The photograph was tinted brand red, which is
 *    both a §3 colour violation and the reason the roof was hard to read.
 *
 * ── The claim that came out of the copy ────────────────────────────────────
 *
 * The old supporting line said "We get on the roof at no cost". Whether the
 * assessment is free, no-cost, $0 or none of those is an OPEN QUESTION on the
 * SCC request list (file 03, D7) — the package requires one decision applied
 * across visible copy, the Jotform title, the CTA and schema together. Until
 * then the hero states what SCC does, not what it costs.
 *
 * ── Height and measure ─────────────────────────────────────────────────────
 *
 * 580-640px below the header (§7), so the capability heading is reachable in
 * one wheel movement at 1363x936. Headline capped at 720px, supporting copy
 * at 34 words against the 55-65 ceiling.
 */
export function SccHero({
  image,
  imageAlt,
  eyebrow = "Commercial Roofing · Greater Houston",
  headlineLight,
  headlineBold,
  body,
  showRating = true,
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  headlineLight: string;
  headlineBold: string;
  body: string;
  showRating?: boolean;
}) {
  return (
    <section className="relative isolate flex min-h-[560px] w-full items-center overflow-hidden bg-[var(--surface-dark)] lg:min-h-[600px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/* Legibility only — no brand wash. §3 keeps red for actions, and a red
          tint over the photograph is what made the old hero's roof unreadable.
          This is a neutral ink scrim, weighted left where the words are, so the
          right half stays a photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,17,19,0.92) 0%, rgba(15,17,19,0.80) 38%, rgba(15,17,19,0.35) 68%, rgba(15,17,19,0.15) 100%)",
        }}
      />

      <div className="shell relative z-10 py-16 lg:py-20">
        <div className="max-w-[720px]">
          <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.2em] text-white/75">
            {eyebrow}
          </p>

          {/* Bebas, but at the §4 H1 range (56-72px desktop), not the 88px the
              old page used for every heading. Two beats, light then bold. */}
          <h1 className="mt-5 font-display uppercase leading-[1.04] [font-size:var(--t-h1)] text-white">
            <span className="block font-[400]">{headlineLight}</span>
            <span className="block">{headlineBold}</span>
          </h1>

          <p className="mt-6 max-w-[62ch] [font-size:var(--t-lead)] leading-[1.6] text-white/85">
            {body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center rounded-[var(--r-control)] bg-[var(--scc-red)] px-7 text-[0.9375rem] font-[700] text-white transition-colors hover:bg-[#b80112]"
            >
              Request a Commercial Roof Assessment
            </Link>

            {/* Secondary is a compact phone text link, per §7 — not a second
                button competing with the primary action. */}
            <a
              href={site.phoneHref}
              className="inline-flex h-[52px] items-center gap-2 text-[0.9375rem] font-[700] text-white transition-colors hover:text-white/80"
            >
              <Phone size={16} className="text-[var(--scc-red)]" />
              {site.phone}
            </a>
          </div>

          {/* ONE compact, accurately labeled company-wide rating signal.
              "Company-wide" is doing real work in that label: these reviews
              include residential jobs, and the package forbids presenting them
              as commercial project evidence. The proof section carries
              commercial proof; this is a secondary brand signal and is sized
              like one. */}
          {showRating && (
            <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem] text-white/70">
              <Star size={14} className="fill-[var(--scc-red)] text-[var(--scc-red)]" />
              <span className="font-[700] text-white">{googleProfile.rating}</span>
              <span>
                from {googleProfile.reviewCount} company-wide Google reviews
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
