"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { Ticker } from "@/components/ui/Ticker";
import { GoogleRating } from "@/components/ui/GoogleRating";
import { HouseMark } from "@/components/ui/HouseMark";
import { site, media, tickerPrimary, tickerSecondary } from "@/lib/site";

/**
 * HERO — commercial-first.
 *
 * Client feedback section 3 retired the old "We Restore Flat Roofs" headline:
 * it described a flat-roof coating contractor, which is narrower than the
 * company being built. The headline is now the client's own positioning line,
 * which says restoration AND replacement in one breath.
 *
 * The scramble is kept (feedback section 6 asked to evaluate which design
 * elements are worth keeping) but repointed: instead of narrowing the company
 * to one roof type, it now cycles the roof systems SCC evaluates, which is the
 * section 3 ask.
 *
 * The CertainTeed stickers were removed from this hero on purpose. They are
 * steep-slope shingle credentials, and section 1 says residential material
 * should not appear across the commercial pages. They now live on the
 * residential page, where they actually mean something.
 */

const SYSTEM_PHRASES = [
  "EXPOSED-FASTENER METAL",
  "STANDING-SEAM METAL",
  "TPO & SINGLE-PLY",
  "MODIFIED BITUMEN",
  "BUILT-UP ROOFING",
] as const;

/* The insurance limit and the generic "Approved applicator" line were removed
   here (correction package A4). Both are unverified claims, and the applicator
   line stood in for manufacturer designations we do not yet have exactly
   right. What is left is the offer itself and the positioning. */
const TRUST_CHIPS = [
  "Free commercial roof assessment",
  "Assessment before recommendation",
] as const;

export function Hero() {

  const scrollToNext = () => {
    document
      .getElementById("recommendations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col min-h-[calc(100svh-76px)] lg:min-h-[calc(100svh-96px)]">
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* The still is the LCP element: priority-loaded, and no longer
            carrying a slow zoom. */}
        <div className="absolute inset-0">
          <Image
            src={media.heroCoating}
            alt="A roofing technician spray-applying a restoration coating across a commercial roof"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "brightness(0.66) contrast(1.04) saturate(0.98)" }}
          />
        </div>

        {/* A muted looping background clip used to sit here, desktop-only.
            It is the single heaviest continuous animation a page can carry,
            and it fetched 0.84 MB before anyone had read a line. The still
            above is what remains. */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0.42) 72%, rgba(224,1,22,0.34) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(96deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.24) 50%, transparent 82%)",
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-[0.045]" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col shell pt-12 pb-[130px] lg:pt-20 lg:pb-[150px]">
        {/* Top: positioning copy */}
        <div
        >
          <div className="flex items-center gap-3 mb-4">
            <HouseMark
              size={22}
              color="var(--supreme-red-bright)"
              className="shrink-0"
            />
            <span className="eyebrow text-[var(--supreme-red-bright)]">
              Greater Houston · Commercial Roof Assessment, Restoration &amp;
              Replacement
            </span>
          </div>
          <p
            className="max-w-md text-[1.02rem] lg:text-[1.05rem] leading-[1.75]"
            style={{ color: "#ffffff" }}
          >
            Commercial roofs do not all require the same answer. We begin with
            the roof you have, document its current condition, and recommend
            coating and protection, restoration, or replacement based on what
            the assessment supports.
          </p>
        </div>

        {/* Desktop: the house sits large in the open upper-right. This is the
            "you are unmistakably on a Supreme site" moment Tiffany asked for —
            the mark is the first shape you register after the headline. */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-[var(--gutter)] top-[clamp(5.5rem,14vh,10rem)] z-20"
        >
          <HouseMark
            size={190}
            color="var(--supreme-red)"
            className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Spacer pushes the headline block to the lower third */}
        <div className="flex-1 min-h-[2.5rem]" />

        {/* Headline + right block */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            {/* The client's own positioning line, used verbatim.
                NOT `display-xl`: that scale is clamp(3rem, 11vw, 9.5rem),
                tuned for the two short words the old headline used ("We
                Restore" / "FLAT ROOFS"). This headline is four times longer,
                and at 11vw it wrapped to four lines and pushed the CTAs, trust
                chips and rating clean off the fold. The scale below keeps each
                sentence on one line down to tablet. */}
            <h1
              className="font-display uppercase text-white"
              style={{
                fontSize: "clamp(2rem, 5.4vw, 4.5rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.005em",
              }}
            >
              <span className="block font-bold">Restore when viable.</span>
              <span className="block italic text-[var(--supreme-red-bright)]">
                Replace when necessary.
              </span>
            </h1>

            {/* Section 3: say out loud that we assess every major system. */}
            <div
              className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span
                className="text-[1rem] font-semibold uppercase"
                style={{
                  letterSpacing: "0.16em",
                  color: "#ffffff",
                }}
              >
                We assess
              </span>
              {/* This was a scrambling rotator cycling one system at a time,
                  so five sixths of the list was invisible at any moment and a
                  reader had to wait to learn whether their roof type was
                  covered. All five are listed at once now. */}
              <span
                className="text-[1rem] font-bold uppercase tracking-[0.16em]"
                style={{ color: "var(--supreme-red-bright)" }}
              >
                {SYSTEM_PHRASES.join(" · ")}
              </span>
            </div>

            <ul
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {TRUST_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-2 text-[1rem] lg:text-[1rem] font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  <ShieldCheck
                    size={14}
                    className="shrink-0 text-[var(--supreme-red-bright)]"
                  />
                  {chip}
                </li>
              ))}
            </ul>

            {/* Live Google rating — real figures from the knowledge panel. */}
            <div
              className="mt-6"
            >
              <GoogleRating variant="dark" />
            </div>

            {/* Mobile / tablet CTAs */}
            <div
              className="mt-7 flex flex-wrap items-center gap-3 lg:hidden"
            >
              <a href={site.phoneHref} className="btn btn-primary">
                <Phone size={16} />
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost-light">
                Request an Assessment
              </Link>
            </div>
          </div>

          {/* Desktop secondary block */}
          <div
            className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col items-start pb-3"
          >
            <h2 className="display-sm text-white mb-3">
              Find the right path for your roof
            </h2>
            <p
              className="text-[1rem] leading-[1.7] mb-6"
              style={{ color: "#ffffff" }}
            >
              A commercial roof assessment documents current conditions and
              identifies whether restoration and coating are viable or
              replacement is necessary.
            </p>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary group">
                Request a Commercial Roof Assessment
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/commercial-roofing"
                aria-label="Commercial roofing services"
                className="w-[52px] h-[52px] shrink-0 grid place-items-center rounded-full transition-all duration-300 hover:bg-white/20"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                <ArrowRight size={16} className="text-white -rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1.5"
        style={{ bottom: 76 }}
      >
        <span
          className="text-[9px] font-semibold uppercase"
          style={{ letterSpacing: "0.22em", color: "#ffffff" }}
        >
          Scroll
        </span>
        <span className="w-px h-4 bg-white/20" />
        <ChevronDown
          size={14}
          className="animate-bounce text-[var(--supreme-red-bright)]"
        />
      </button>

      {/* ── TICKERS ── */}
      <div
        className="absolute bottom-0 inset-x-0 z-20"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Ticker
          items={tickerPrimary}
          direction="left"
          className="border-b border-white/[0.06]"
        />
        <Ticker items={tickerSecondary} direction="right" display />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[4px] z-30 bg-[var(--supreme-red)]" />
    </section>
  );
}
