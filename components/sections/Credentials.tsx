"use client";

import { ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseMark, HouseEyebrow } from "@/components/ui/HouseMark";
import {
  credentials,
  commercialManufacturers,
  credibilityPillars,
} from "@/lib/site";

/**
 * COMMERCIAL CREDIBILITY — rebuilt per client feedback section 5.
 *
 * Two things were wrong with the previous version.
 *
 * 1. It was residential. It led with the four "warranties" — including
 *    zero-down homeowner financing and the 5-year residential workmanship
 *    warranty — and displayed the two CertainTeed steep-slope shingle badges.
 *    None of that belongs on a commercial page (feedback section 1). Those now
 *    live on /residential-roofing.
 *
 * 2. It asserted warranty issuance flatly ("what lets us issue manufacturer
 *    warranties"). Feedback section 5 is careful about this: SCC can offer
 *    "applicable manufacturer-backed warranty options WHEN PROJECT
 *    REQUIREMENTS ARE MET". The copy here is conditional for that reason —
 *    it's a qualification claim, not a guarantee, and overstating it is the
 *    kind of thing a manufacturer rep will call about.
 *
 * The section now builds credibility on what's verifiable today:
 * qualifications, process discipline, and named accountability — because the
 * commercial portfolio is still being built and the client asked to present
 * that accurately rather than pad it.
 */

export function Credentials() {
  return (
    <section className="relative section bg-[var(--ink-90)] text-white noise overflow-hidden">
      <div
        className="absolute -bottom-52 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(224,1,22,0.18) 0%, transparent 68%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6rem] top-[-4rem] opacity-[0.05]"
      >
        <HouseMark size={480} color="#ffffff" />
      </div>

      <div className="shell relative">
        {/* ── Credential bar ── */}
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-16 lg:mb-24">
          {credentials.map((c) => (
            <RevealItem key={c.label}>
              <div className="h-full p-6 lg:p-8 bg-[var(--ink-90)]">
                <ShieldCheck
                  size={20}
                  className="text-[var(--supreme-red-bright)] mb-4"
                />
                <p className="display-sm mb-2">{c.label}</p>
                <p className="text-[0.85rem] leading-[1.6] text-white/50">
                  {c.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Why you can trust a young commercial arm ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <HouseEyebrow tone="light" className="mb-5">
                Why you can trust us on it
              </HouseEyebrow>
            </Reveal>
            <h2 className="display-lg mb-6">
              <RevealWords text="We'd rather earn it than claim it" />
            </h2>
            <Reveal delay={0.15}>
              <p className="text-[1rem] leading-[1.8] text-white/60">
                Our commercial portfolio is still growing, and we&rsquo;re not
                going to pretend otherwise. What we can point at is the
                certification, the process, and the people whose name is on
                the work.
              </p>
            </Reveal>

            {/* Manufacturer credentials */}
            <Reveal delay={0.25}>
              <div className="mt-9 pt-8 border-t border-white/12">
                <p className="eyebrow text-white/40 mb-5">
                  Manufacturer certified
                </p>
                <ul className="space-y-3.5">
                  {commercialManufacturers.map((m) => (
                    <li
                      key={m.name}
                      className="flex items-baseline justify-between gap-4 pb-3.5 border-b border-white/[0.08]"
                    >
                      <span className="display-sm">{m.name}</span>
                      <span className="text-[0.8rem] text-white/45 text-right">
                        {m.note}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.82rem] leading-[1.65] text-white/40">
                  Where a project meets the manufacturer&rsquo;s requirements,
                  it can carry a manufacturer-backed warranty. We tell you
                  whether yours qualifies before you sign, not after.
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="lg:col-span-7 grid sm:grid-cols-2 gap-5 self-start">
            {credibilityPillars.map((pillar) => (
              <RevealItem key={pillar.title} className="h-full">
                <div
                  className="h-full p-7 lg:p-8 border border-white/12 transition-colors duration-300 hover:border-[var(--supreme-red)]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <HouseMark
                    size={22}
                    color="var(--supreme-red-bright)"
                    className="mb-5"
                  />
                  <h3 className="display-sm mb-3">{pillar.title}</h3>
                  <p className="text-[0.9rem] leading-[1.7] text-white/58">
                    {pillar.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
