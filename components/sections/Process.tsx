"use client";

import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { HouseMark, HouseEyebrow } from "@/components/ui/HouseMark";
import { processSteps, media } from "@/lib/site";

/**
 * THE ASSESSMENT PROCESS.
 *
 * Client feedback section 4: the website should reflect the same condition-led
 * approach the client will actually experience, and names the journey exactly:
 *
 *   Assessment → Condition Documentation → Restoration Eligibility →
 *   Required Scope → Restoration or Replacement Recommendation → Proposal
 *
 * The previous version was a generic five-step contractor process ("Free Roof
 * Inspection → The Honest Assessment → Options Priced Side by Side → ...")
 * that described a sales flow rather than an engineering one. The steps now
 * match the real process step-for-step; they live in lib/site.ts so the page,
 * the commercial page and any future proposal collateral all read the same
 * sequence.
 *
 * `id="process"` is linked from the main nav.
 */

export function Process() {
  return (
    <section id="process" style={{ scrollMarginTop: "96px" }}
      className="relative section bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 bottom-0 opacity-[0.03]"
      >
        <HouseMark size={600} />
      </div>

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">
                How an SCC project runs
              </HouseEyebrow>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="We document the roof" />
              <br />
              <span className="text-[var(--supreme-red)]">
                <RevealWords text="before we recommend anything." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              Six steps, and the recommendation doesn&rsquo;t get written until
              step five. By then you&rsquo;ve already seen everything we found
              on your roof.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              {/* Was `crewOnRoof`, which is two roofers on a steep-slope
                  residential roof with a brick chimney — wrong building type
                  for the commercial assessment process, and half sky. This is
                  a technician working on rooftop equipment on a commercial
                  low-slope roof, which is what step 01 actually looks like. */}
              <Reveal direction="right">
                <ImageFrame
                  src={media.rooftopService}
                  alt="A technician inspecting rooftop equipment on a commercial low-slope roof"
                  ratio="3/4"
                />
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-6 p-6 bg-[var(--ink-05)] border-l-[3px] border-[var(--supreme-red)]">
                  {/* This promised "the written report and the photos either
                      way" on every assessment. What the no-cost assessment
                      universally includes is a blocking item on the claims
                      checklist, so the promise comes out and the part that is
                      true — we will tell you when a roof needs nothing yet —
                      stays. */}
                  <p className="text-[1.02rem] leading-[1.75] text-black">
                    That includes telling you when a roof needs nothing from us
                    yet.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Steps */}
          <ol className="lg:col-span-7">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07} as="li">
                <div className="group grid grid-cols-[auto_1fr] gap-6 lg:gap-8 py-8 border-b border-black/10 first:pt-0">
                  <span className="font-display text-[2.4rem] leading-none text-black/70 transition-colors duration-300 group-hover:text-[var(--supreme-red)]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="display-sm mb-2.5">{step.title}</h3>
                    <p className="text-[1.02rem] leading-[1.75] text-black">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
