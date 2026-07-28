import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseEyebrow } from "@/components/ui/HouseMark";
import { SupremeHomeLogo } from "@/components/layout/Logo";
import {
  media,
  site,
  warranties,
  credentialBadges,
  residentialFaqs,
  residentialBrand,
} from "@/lib/site";

import { FaqJsonLd } from "@/components/seo/JsonLd";

/**
 * THE RESIDENTIAL EXPERIENCE.
 *
 * Client feedback section 1: residential should ideally be its own website. If
 * it stays here, it must be clearly separated, and residential material —
 * shingles, homeowner financing, residential storm content — should live
 * inside this experience rather than leaking across the commercial pages.
 *
 * So this page is now self-contained:
 *   - Its own brand lockup (Supreme Home) leads the page.
 *   - The CertainTeed steep-slope badges live here, not on commercial pages.
 *   - Financing and the 5-year residential warranty live here.
 *   - It uses `residentialFaqs`, not the commercial FAQ set.
 *   - It no longer renders the commercial <Process>, which is the six-step
 *     commercial assessment-to-proposal journey and makes no sense for a
 *     homeowner with a hail-damaged roof.
 *
 * A "back to commercial" bar sits at the top so the separation reads as
 * deliberate in both directions.
 *
 * IF RESIDENTIAL MOVES TO ITS OWN DOMAIN: set `residentialBrand.externalUrl`
 * in lib/site.ts, redirect this route there, and nothing on the commercial
 * side needs to change — the nav and the homepage aside already follow it.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/residential-roofing" },
  /**
   * `absolute` bypasses the root title template, which appends "| Supreme
   * Commercial Coatings" to every page. On the one page that is explicitly
   * NOT the commercial brand, that suffix undercuts the separation — a
   * homeowner searching for shingle work would see the commercial name in the
   * search result and the browser tab.
   */
  title: {
    absolute:
      "Residential Roofing, Repair & Storm Damage in Houston | Supreme Home Roofing",
  },
  description:
    "Shingle and metal roofing for Houston-area homes. CertainTeed certified installation, 5-year leak protection warranty, insurance claim help and zero-down financing.",
};

/** Homeowner-scale process — deliberately not the commercial six-step one. */
const HOMEOWNER_STEPS = [
  {
    n: "01",
    title: "Free inspection",
    body: "We come out, get on the roof, and take photos of anything we find. No charge, and no pressure.",
  },
  {
    n: "02",
    title: "Straight answer",
    body: "Repair or replace, and why. If your roof has years left in it, we'll say so.",
  },
  {
    n: "03",
    title: "Claim help if you need it",
    body: "Storm damage? We meet your adjuster on the roof and make sure nothing gets missed.",
  },
  {
    n: "04",
    title: "The work, then the warranty",
    body: "Clean site, daily updates, and your warranty paperwork in hand when we're done.",
  },
] as const;

export default function ResidentialRoofingPage() {
  return (
    <>
      {/* Separation marker — makes it obvious you've stepped out of the
          commercial side of the business, per feedback section 1. */}
      <div className="bg-[var(--ink-05)] border-b border-black/10">
        <div className="shell py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.82rem] text-black/55">
            You&rsquo;re on the <strong className="font-semibold text-black/75">
              {residentialBrand.name}
            </strong>{" "}
            side. Roofing for homes.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-semibold text-black/55 hover:text-[var(--supreme-red)] transition-colors"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to {site.name}
          </Link>
        </div>
      </div>

      <PageHero
        breadcrumb="Residential"
        eyebrow="Homes across Greater Houston"
        title="Residential roofing, done straight"
        intro="Same crews, same standards, scaled to a house. You get a free inspection, a written answer on repair-or-replace, and a 5-year leak protection warranty on our work."
        image={media.residentialTearOff}
        imageAlt="A roofer removing damaged shingles from a Texas brick home"
      />

      {/* ── Homeowner value props ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal direction="right" className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={media.crewOnRoof}
                  alt="Roofing crew working on a residential roof deck"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 h-[4px] bg-[var(--supreme-red)]" />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <HouseEyebrow className="mb-5">What you get</HouseEyebrow>
              </Reveal>
              <h2 className="display-lg mb-6">
                <RevealWords text="Backed in writing, financed if you need it" />
              </h2>
              <Reveal delay={0.15}>
                <p className="lede mb-8">
                  Storm damage, an aging roof, or a leak you can&rsquo;t track
                  down. We inspect for free and tell you straight whether
                  it&rsquo;s a repair or a replacement.
                </p>
              </Reveal>

              {/* Residential lockup + CertainTeed credentials. These are
                  steep-slope shingle credentials, which is why they live here
                  and not on the commercial pages. */}
              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-7 mb-10 pb-8 border-b border-black/10">
                  <SupremeHomeLogo height={42} />
                  <span className="w-px h-10 bg-black/12" />
                  {credentialBadges.map((badge) => (
                    <Image
                      key={badge.name}
                      src={badge.src}
                      alt={badge.alt}
                      width={68}
                      height={68}
                      title={`${badge.issuer} ${badge.name}`}
                    />
                  ))}
                </div>
              </Reveal>

              <RevealGroup className="grid sm:grid-cols-2 gap-5">
                {warranties.map((w) => (
                  <RevealItem key={w.title} className="h-full">
                    <div className="edge-card h-full p-7">
                      <h3 className="display-sm mb-3">{w.title}</h3>
                      <p className="text-[0.9rem] leading-[1.7] text-black/58">
                        {w.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <ServicesSlider
        filter="residential"
        eyebrow="Residential services"
        title="What we do on homes"
        intro="Shingle roofing, repairs, storm restoration and insurance claim help, all from one contractor."
      />

      {/* ── Homeowner process ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <HouseEyebrow className="mb-5">How it goes</HouseEyebrow>
              </Reveal>
              <h2 className="display-lg">
                <RevealWords text="Four steps, no runaround" />
              </h2>
            </div>
            <Reveal direction="left" delay={0.15} className="lg:col-span-5">
              <p className="lede">
                Most homeowners we meet have already had someone out who told
                them they need a whole new roof. Sometimes that&rsquo;s true.
                Often it isn&rsquo;t.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOMEOWNER_STEPS.map((step) => (
              <RevealItem key={step.n} className="h-full">
                <div className="h-full p-7 border-t-2 border-[var(--supreme-red)] bg-[var(--ink-05)]">
                  <span className="font-display text-[2rem] leading-none text-black/15">
                    {step.n}
                  </span>
                  <h3 className="display-sm mt-5 mb-3">{step.title}</h3>
                  <p className="text-[0.9rem] leading-[1.7] text-black/58">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqJsonLd items={residentialFaqs} />
      <FAQ
        items={residentialFaqs}
        intro="The things homeowners ask us most after a storm."
      />
      <CTABand />
    </>
  );
}
