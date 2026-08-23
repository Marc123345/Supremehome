"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseMark, HouseEyebrow } from "@/components/ui/HouseMark";
import { caseStudies } from "@/lib/site";

/**
 * COMMERCIAL CASE STUDIES.
 *
 * Client feedback section 5: "The website should be structured so additional
 * projects, testimonials, and supporting evidence can be added naturally as
 * the commercial business grows."
 *
 * So this section is driven entirely by `caseStudies` in lib/site.ts, which is
 * currently an empty array:
 *
 *   - Empty  → the component returns null. No placeholder cards, no "coming
 *              soon", no gap in the page. Nothing on the site implies projects
 *              that haven't happened yet.
 *   - Filled → the section appears wherever it's mounted, with no code changes.
 *
 * That's the honest default. A "featured projects" grid holding three stock
 * photos and invented building names is exactly the kind of padding section 5
 * asked us to avoid while the portfolio is still being built.
 *
 * TO ADD A PROJECT: append an object to `caseStudies` in lib/site.ts. Put the
 * photo in /public/photos and reference it as "/photos/<file>". Real job
 * photography only — that is the whole point of the section.
 */

export function CaseStudies() {
  if (caseStudies.length === 0) return null;

  return (
    <section className="relative section bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-8 opacity-[0.035]"
      >
        <HouseMark size={540} />
      </div>

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">Recent commercial work</HouseEyebrow>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="Roofs we've been on" />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              What the roof was,
              what we found, and what we ended up recommending.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <RevealItem key={study.slug} className="h-full">
              <article
                className="h-full flex flex-col border border-black/10 bg-white overflow-hidden"
              >
                {study.image && (
                  <div className="relative aspect-[4/3] bg-[var(--ink-05)]">
                    <Image
                      src={study.image}
                      alt={`${study.system} roof project in ${study.city}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span
                      className="absolute top-4 left-4 text-[0.66rem] font-bold uppercase px-2.5 py-1 text-white"
                      style={{
                        letterSpacing: "0.14em",
                        background:
                          study.recommendation === "Restored"
                            ? "var(--supreme-red)"
                            : "rgba(0,0,0,0.75)",
                      }}
                    >
                      {study.recommendation}
                    </span>
                  </div>
                )}

                <div className="flex-1 flex flex-col p-7">
                  <p className="eyebrow text-[var(--supreme-red)] mb-3">
                    {study.system}
                    {study.squares ? ` · ${study.squares} squares` : ""}
                  </p>
                  <h3 className="font-display text-[1.15rem] mb-1">
                    {study.building}
                  </h3>
                  <p className="text-[0.82rem] text-black/45 mb-4">
                    {study.city}
                  </p>
                  <p className="text-[0.92rem] leading-[1.7] text-black/58">
                    {study.summary}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link href="/contact" className="btn btn-primary group">
              Get your roof assessed
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
