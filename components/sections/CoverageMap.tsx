"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Search, ArrowUpRight, ShieldCheck } from "lucide-react";
import { locations } from "@/lib/locations";
import { clientTypes, site } from "@/lib/site";
import { CoverageLookup } from "@/components/ui/CoverageLookup";
import { useReducedMotion } from "@/components/ui/useReducedMotion";

/**
 * Bento coverage map — adapted from the BentoInteractiveMap layout onto the
 * Supreme design system and Supreme's real coverage.
 *
 * Changes from the source component, deliberately:
 *  · The source's per-location `revenue` / `clients` figures and its
 *    "$58,000,000+ generated" and "92% retention" stat cards are invented
 *    numbers. Supreme has none of that data (1 year trading, no published
 *    review profile), so the stat tiles carry verifiable facts instead —
 *    counties, insurance, certifications, cost of an inspection.
 *  · Tiles are the 18 cities they actually serve. Every one is covered, so
 *    the hover state shows county + local context rather than
 *    "Territory Available", and clicking opens that city's page.
 *  · The ZipInsights modal becomes a coverage lookup that matches on place
 *    names — see the note in CoverageLookup about why not ZIP codes.
 */

const HQ_SLUG = "katy";

const COUNTY_SHORT = (county: string) =>
  county.replace(" Counties", "").replace(" County", "");

export function CoverageMap({
  /** Slug of the page's own city, if any — that tile is marked "You are here". */
  activeSlug,
  eyebrow = "Coverage",
  titleLead = "Where we",
  titleAccent = "Work.",
  quote,
  showTargets = true,
}: {
  activeSlug?: string;
  eyebrow?: string;
  titleLead?: string;
  titleAccent?: string;
  quote?: string;
  showTargets?: boolean;
} = {}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [showLookup, setShowLookup] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Cycle a highlight through the cities so the map reads as live.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setPulse((p) => (p + 1) % locations.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  // Close the modal on Escape.
  useEffect(() => {
    if (!showLookup) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowLookup(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [showLookup]);

  const counties = new Set(
    locations.flatMap((l) => COUNTY_SHORT(l.county).split(" & ").map((c) => c.trim()))
  );

  const hoveredLocation = locations.find((l) => l.slug === hovered);

  return (
    <section className="relative section bg-[var(--ink-90)] text-white noise overflow-hidden border-t border-white/5">
      <div className="shell relative">
        {/* ── Masthead ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 lg:mb-20 border-b border-white/10 pb-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="eyebrow text-[var(--supreme-red-bright)] bg-[var(--supreme-red)]/12 px-2.5 py-1">
                {eyebrow}
              </span>
              <span className="eyebrow text-white/40">
                Greater Houston · {locations.length} communities
              </span>
            </div>
            <h2 className="display-lg">
              {titleLead}
              <br />
              <span className="text-stroke italic text-[var(--supreme-red-bright)]">
                {titleAccent}
              </span>
            </h2>
          </div>
          <p className="text-[0.92rem] text-white/55 max-w-[300px] leading-[1.75] italic border-l border-white/10 pl-6">
            {quote ??
              `“Crews run out of ${site.address.city}. Commercial work travels further. If your building sits outside the map, call and ask.”`}
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* 1 — The map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 bg-[var(--ink-80)] border border-white/10 p-6 lg:p-8 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 mb-8">
              <h3 className="eyebrow text-white/45 flex items-center gap-2">
                <Globe size={13} className="text-[var(--supreme-red-bright)]" />
                Active service area map
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--supreme-red)] animate-pulse-ring" />
                  <span className="relative w-2 h-2 rounded-full bg-[var(--supreme-red)]" />
                </span>
                <span className="eyebrow text-[var(--supreme-red-bright)]">
                  Covered
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
              {locations.map((loc, i) => {
                const isCurrent = loc.slug === activeSlug;
                const isHQ = !isCurrent && loc.slug === HQ_SLUG;
                // Only pulse other cities — the current one is already marked.
                const isPulsing = pulse === i && !isCurrent;
                const light = isCurrent || isHQ;

                const tag = isCurrent ? "You are here" : isHQ ? "HQ" : null;

                return (
                  <Link
                    key={loc.slug}
                    href={`/service-areas/${loc.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    onMouseEnter={() => setHovered(loc.slug)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(loc.slug)}
                    onBlur={() => setHovered(null)}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center gap-1 px-1
                      border text-center transition-all duration-500
                      ${
                        light
                          ? "bg-white border-white text-[var(--ink)]"
                          : "bg-[var(--supreme-red)] border-[var(--supreme-red)]/70 text-white"
                      }
                      ${isCurrent ? "ring-2 ring-[var(--supreme-red-bright)] z-10" : ""}
                      ${isPulsing ? "scale-[1.07] ring-2 ring-white z-10" : ""}
                      hover:scale-[1.07] hover:z-10
                    `}
                    style={{
                      boxShadow: light
                        ? "0 0 18px rgba(255,255,255,0.2)"
                        : "0 0 18px rgba(224,1,22,0.32)",
                    }}
                  >
                    <span className="font-display text-[0.82rem] leading-none uppercase">
                      {loc.name}
                    </span>
                    {tag && (
                      <span
                        className={`text-[7px] font-bold uppercase tracking-[0.16em] leading-tight ${
                          isCurrent
                            ? "text-[var(--supreme-red)]"
                            : "opacity-55"
                        }`}
                      >
                        {tag}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Hover panel */}
            <AnimatePresence>
              {hoveredLocation && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.22 }}
                  className="hidden lg:block absolute top-6 right-6 max-w-[270px] bg-white text-black p-5 shadow-2xl pointer-events-none z-20"
                >
                  <p className="eyebrow text-black/40 mb-1.5">
                    {COUNTY_SHORT(hoveredLocation.county)}
                  </p>
                  <p className="display-sm leading-none mb-2.5">
                    {hoveredLocation.name}
                  </p>
                  <p className="text-[0.78rem] leading-[1.55] text-black/62">
                    {hoveredLocation.nearby.slice(0, 3).join(" · ")}
                  </p>
                  <span className="block mt-3 pt-3 border-t border-black/10 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--supreme-red)]">
                    Open location page →
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 2 — Coverage check CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 bg-[var(--supreme-red)] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden group"
          >
            <Search
              className="absolute -right-5 -top-5 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="display-md leading-none mb-4">
                Check your
                <br />
                coverage.
              </h3>
              <p className="text-[0.92rem] leading-[1.7] text-white/85">
                Type your city or neighborhood and we&apos;ll tell you right
                away whether we cover it, and what we see on roofs there.
              </p>
            </div>
            <button
              onClick={() => setShowLookup(true)}
              className="relative mt-8 w-full h-16 px-6 bg-[var(--ink-90)] text-white font-bold uppercase tracking-[0.14em] text-[0.72rem] flex items-center justify-between hover:bg-black transition-colors"
            >
              Check my area
              <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* 3 — Verified stats */}
          <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-1">
            <div className="bg-[var(--ink-80)] border border-white/5 p-7 lg:p-8 flex flex-col justify-center">
              <span className="display-md text-white leading-none">
                {locations.length}
              </span>
              <span className="eyebrow text-white/40 mt-2.5">
                Communities covered
              </span>
            </div>
            <div className="bg-[var(--ink-80)] border border-white/5 p-7 lg:p-8 flex flex-col justify-center">
              <span className="display-md text-[var(--supreme-red-bright)] leading-none">
                {counties.size}
              </span>
              <span className="eyebrow text-white/40 mt-2.5">
                Texas counties
              </span>
            </div>
            <div className="bg-white p-7 lg:p-8 flex flex-col justify-center sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="display-md text-[var(--ink)] leading-none block">
                    $0
                  </span>
                  <span className="eyebrow text-black/40 block mt-2.5">
                    Cost of an inspection &amp; written assessment
                  </span>
                </div>
                <ShieldCheck
                  className="text-[var(--supreme-red)] w-10 h-10 opacity-20 shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* 4 — Who it's for */}
          {showTargets && (
          <div className="md:col-span-12 mt-10 lg:mt-14 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <div>
              <h3 className="eyebrow text-[var(--supreme-red-bright)] mb-5">
                Who we go out to
              </h3>
              <p className="text-[0.93rem] leading-[1.75] text-white/50">
                Commercial buildings across Greater Houston with roofs coming
                up on the end of their service life. Any system, any size.
              </p>
            </div>
            <ul className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-5">
              {[
                ...clientTypes.map((c) => c.title),
                "Warehouses & Distribution",
                "Schools & Institutions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 group">
                  <span className="mt-[7px] w-1 h-1 shrink-0 bg-[var(--supreme-red)] transition-transform group-hover:scale-150" />
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/65 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>

      {/* ── Lookup modal ── */}
      <AnimatePresence>
        {showLookup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Coverage lookup"
          >
            <button
              className="absolute inset-0 bg-black/92 backdrop-blur-md w-full"
              onClick={() => setShowLookup(false)}
              aria-label="Close"
              tabIndex={-1}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto thin-scroll border border-white/10"
            >
              <CoverageLookup onClose={() => setShowLookup(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
