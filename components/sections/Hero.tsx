"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { TextScramble } from "@/components/ui/TextScramble";
import { Ticker } from "@/components/ui/Ticker";
import { CertStickers } from "@/components/ui/CertStickers";
import { GoogleRating } from "@/components/ui/GoogleRating";
import { useReducedMotion } from "@/components/ui/useReducedMotion";
import { site, media, tickerPrimary, tickerSecondary } from "@/lib/site";

const SCRAMBLE_PHRASES = [
  "FLAT ROOFS",
  "METAL ROOFS",
  "CHURCH ROOFS",
  "RETAIL ROOFS",
] as const;

const TRUST_CHIPS = [
  "Insured to $2M",
  "APOC & Henry's certified",
  "Free inspections",
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
      .getElementById("restoration-ladder")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col min-h-[calc(100svh-76px)] lg:min-h-[calc(100svh-96px)]"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* The still stays the LCP element: it is priority-loaded and paints
            immediately, and the video fades in over it once it can play. */}
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src={media.heroCoating}
            alt="A roofing technician spray-applying a white restoration coating across a commercial flat roof"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "brightness(0.46) contrast(1.08) saturate(0.92)" }}
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
              filter: "brightness(0.46) contrast(1.08) saturate(0.92)",
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
              "linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.58) 72%, rgba(224,1,22,0.42) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(96deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.34) 46%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-[0.045]" />
      </div>

      {/* ── CONTENT (normal flow — no absolute stacking) ── */}
      <div className="relative z-10 flex-1 flex flex-col shell pt-12 pb-[130px] lg:pt-20 lg:pb-[150px]">
        {/* Top: positioning copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 shrink-0 bg-[var(--supreme-red)]" />
            <span className="eyebrow text-[var(--supreme-red-bright)]">
              Greater Houston · Commercial Roof Restoration
            </span>
          </div>
          <p
            className="max-w-md text-[0.95rem] lg:text-[0.98rem] leading-[1.75]"
            style={{ color: "rgba(255,255,255,0.86)" }}
          >
            Most contractors quote you a full replacement, because replacement
            carries the highest price tag. We inspect first, and restore where
            the roof still supports it.
          </p>
        </motion.div>

        {/* Desktop: credential stickers sit in the open upper-right, clear of
            the headline block and the right-hand copy below it. */}
        <div className="hidden lg:block absolute right-[var(--gutter)] top-[clamp(6.5rem,16vh,11rem)] z-20">
          <CertStickers size={132} />
        </div>

        {/* Spacer pushes the headline block to the lower third */}
        <div className="flex-1 min-h-[2.5rem]" />

        {/* Headline + right block */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="display-xl text-white"
            >
              <span className="block font-bold">We Restore</span>
              <span className="block text-stroke italic">
                <TextScramble
                  phrases={SCRAMBLE_PHRASES}
                  holdDuration={4200}
                  scrambleDuration={1900}
                  className="display-xl"
                  resolvedColor="var(--supreme-red-bright)"
                  scramblingColor="rgba(255,255,255,0.22)"
                />
              </span>
            </motion.h1>

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

            {/* Mobile / tablet: stickers sit under the chips, where there is
                room — the upper-right is occupied by the intro copy. */}
            <CertStickers size={78} className="mt-6 lg:hidden" />

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
                Free Inspection
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
              Restore before you replace
            </h2>
            <p
              className="text-[0.9rem] leading-[1.7] mb-6"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              A coating system renews a serviceable flat roof for a fraction of
              replacement cost — with no tear-off, and your building stays open.
            </p>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary group">
                Free Roof Inspection
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
