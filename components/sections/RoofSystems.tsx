"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseMark, HouseEyebrow } from "@/components/ui/HouseMark";
import { roofSystems, roofSystemImages, eligibilityFactors, media } from "@/lib/site";

/**
 * ROOF SYSTEMS WE EVALUATE — new section, from client feedback section 3.
 *
 * The old site said "We Restore Flat Roofs", which describes a flat-roof
 * coating contractor and quietly disqualifies SCC from every metal, standing
 * seam and specialty building in Houston. This section states the actual
 * market coverage.
 *
 * The second half matters as much as the first. Feedback section 3: "Roof type
 * alone does not determine whether restoration is appropriate." Listing systems
 * without that caveat would just replace one narrow promise with six, so the
 * eligibility factors are part of the same section rather than a separate one.
 */

export function RoofSystems() {
  return (
    <section
      id="roof-systems"
      style={{ scrollMarginTop: "96px" }}
      className="relative section bg-[var(--ink-05)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -bottom-20 opacity-[0.04]"
      >
        <HouseMark size={520} />
      </div>

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">
                Roof systems we evaluate
              </HouseEyebrow>
            </Reveal>
            {/* Kept to two lines: at display-lg the longer version ran to
                three and pushed the systems grid off the fold. */}
            <h2 className="display-lg">
              <RevealWords text="We assess the roof" />
              <br />
              <span className="text-[var(--supreme-red)]">
                <RevealWords text="system you have." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            <p className="lede">
              Metal, membrane, asphalt, or something previous crews left
              behind. We evaluate the existing assembly, its current
              serviceability, and the conditions that affect the appropriate
              next step. Being able to assess a roof type does not mean every
              roof of that type is eligible for the same system.
            </p>
          </Reveal>
        </div>

        {/* ── The systems ── */}
        {/* Cards carry a photo only where we have an honest one for that
            system. See `roofSystemImages` — membrane systems are deliberately
            image-less rather than illustrated with the wrong roof. The card
            layout is built to look intentional either way. */}
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
          {roofSystems.map((system) => {
            const photo = roofSystemImages[system.slug];
            return (
              <RevealItem key={system.slug}>
                <div
                  className="group h-full bg-white flex flex-col"
                >
                  {photo && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ink-05)]">
                      <Image
                        src={photo}
                        alt={`${system.name} roof system`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-7 lg:p-8">
                    <HouseMark
                      size={26}
                      className="mb-6 opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <h3 className="font-display text-[1.15rem] mb-3">
                      {system.name}
                    </h3>
                    <p className="text-[1rem] leading-[1.7] text-black">
                      {system.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* ── Type doesn't decide. Condition does. ── */}
        <div className="mt-16 lg:mt-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-10 lg:mb-12">
            <div className="lg:col-span-7">
              <h3 className="display-md">
                <RevealWords text="What actually decides it" />
              </h3>
            </div>
            <Reveal direction="left" delay={0.15} className="lg:col-span-5">
              <p className="text-[1.05rem] leading-[1.8] text-black">
                Two identical TPO roofs on two identical buildings can get
                opposite recommendations. These are the things we&rsquo;re
                measuring to tell them apart.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <Reveal direction="right" className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={media.rustedMetal}
                  alt="A metal roof with advanced rust and worn fasteners, the kind of condition an assessment documents"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 h-[4px] bg-[var(--supreme-red)]" />
              </div>
            </Reveal>

            <RevealGroup className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-0">
              {eligibilityFactors.map((factor) => (
                <RevealItem key={factor.title}>
                  <div className="py-6 border-t-2 border-[var(--supreme-red)]/25 mt-px">
                    <h4 className="font-display text-[1.02rem] mb-2">
                      {factor.title}
                    </h4>
                    <p className="text-[1rem] leading-[1.7] text-black">
                      {factor.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
