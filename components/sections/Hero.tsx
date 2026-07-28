"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { TextScramble } from "@/components/ui/TextScramble";
import { Ticker } from "@/components/ui/Ticker";
import { GoogleRating } from "@/components/ui/GoogleRating";
import { HouseMark } from "@/components/ui/HouseMark";
import { useReducedMotion } from "@/components/ui/useReducedMotion";
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

const TRUST_CHIPS = [
  "Insured to $2M",
  "Approved applicator",
  "Free roof assessment",
] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  // Mount-gated so the <video> is absent from the server HTML entirely.
  // Rendered server-side it would sit in the markup on phones too, and the
  // browser starts fetching before hydration can unmount it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollToNext = () => {
    document
      .getElementById("recommendations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col min-h-[calc(100svh-76px)] lg:min-h-[calc(100svh-96px)]">
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* The still stays the LCP element: it is priority-loaded and paints
            immediately, and the video fades in over it once it can play. */}
        <div className="absolute inset-0 animate-kenburns">
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

        {/* Video is desktop-only. A looping background clip is the heaviest
            continuous animation on the page, and mobile is explicitly kept
            still — phones get the poster still instead and never download it. */}
        {mounted && !reduced && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.heroCoating}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(0.66) contrast(1.04) saturate(0.98)",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.9s ease",
            }}
          >
            <source src={media.heroVideo} type="video/mp4" />
          </video>
        )}

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <HouseMark
              size={22}
              color="var(--supreme-red-bright)"
              className="shrink-0"
            />
            <span className="eyebrow text-[var(--supreme-red-bright)]">
              Greater Houston · Commercial Roof Restoration &amp; Replacement
            </span>
          </div>
          <p
            className="max-w-md text-[0.95rem] lg:text-[0.98rem] leading-[1.75]"
            style={{ color: "rgba(255,255,255,0.86)" }}
          >
            Most roofing companies show up already knowing what they want to
            sell you. We get on the roof, document what&rsquo;s actually there,
            and let the condition decide.
          </p>
        </motion.div>

        {/* Desktop: the house sits large in the open upper-right. This is the
            "you are unmistakably on a Supreme site" moment Tiffany asked for —
            the mark is the first shape you register after the headline. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          aria-hidden="true"
          className="hidden lg:block absolute right-[var(--gutter)] top-[clamp(5.5rem,14vh,10rem)] z-20"
        >
          <HouseMark
            size={190}
            color="var(--supreme-red)"
            className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

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
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
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
            </motion.h1>

            {/* Section 3: say out loud that we assess every major system. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span
                className="text-[0.8rem] font-semibold uppercase"
                style={{
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                We assess
              </span>
              <TextScramble
                phrases={SYSTEM_PHRASES}
                holdDuration={3400}
                scrambleDuration={1500}
                className="text-[0.8rem] font-bold uppercase tracking-[0.16em]"
                resolvedColor="var(--supreme-red-bright)"
                scramblingColor="rgba(255,255,255,0.22)"
              />
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {TRUST_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-2 text-[0.78rem] lg:text-[0.8rem] font-semibold"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <ShieldCheck
                    size={14}
                    className="shrink-0 text-[var(--supreme-red-bright)]"
                  />
                  {chip}
                </li>
              ))}
            </motion.ul>

            {/* Live Google rating — real figures from the knowledge panel. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6"
            >
              <GoogleRating variant="dark" />
            </motion.div>

            {/* Mobile / tablet CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-7 flex flex-wrap items-center gap-3 lg:hidden"
            >
              <a href={site.phoneHref} className="btn btn-primary">
                <Phone size={16} />
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost-light">
                Request an Assessment
              </Link>
            </motion.div>
          </div>

          {/* Desktop secondary block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col items-start pb-3"
          >
            <h2 className="display-sm text-white mb-3">
              Find out which one your roof is
            </h2>
            <p
              className="text-[0.9rem] leading-[1.7] mb-6"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              A free assessment tells you whether your roof can be restored,
              what it would take, and what that costs next to a replacement.
            </p>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary group">
                Request a Roof Assessment
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
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1.5"
        style={{ bottom: 76 }}
      >
        <span
          className="text-[9px] font-semibold uppercase"
          style={{ letterSpacing: "0.22em", color: "rgba(255,255,255,0.7)" }}
        >
          Scroll
        </span>
        <span className="w-px h-4 bg-white/20" />
        <ChevronDown
          size={14}
          className="animate-bounce text-[var(--supreme-red-bright)]"
        />
      </motion.button>

      {/* ── TICKERS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
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
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-[4px] z-30 bg-[var(--supreme-red)]" />
    </section>
  );
}
