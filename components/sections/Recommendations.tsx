"use client";

import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseMark, HouseEyebrow } from "@/components/ui/HouseMark";
import { recommendations, pathways } from "@/lib/site";

/**
 * THE TWO RECOMMENDATIONS — replaces the old Repair / Restore / Replace ladder.
 *
 * Client feedback section 2 is explicit: a commercial client gets one of two
 * recommendations, restore or replace. The old ladder made "Repair" a rung of
 * equal weight, which positioned SCC as a repair company. It also framed
 * restoration as "our specialty", which reads as a product being pushed rather
 * than a conclusion being reached.
 *
 * So the structure here is deliberately two-then-three:
 *   - Two recommendations. That is the decision.
 *   - Three project shapes. That is how the decision gets carried out, and
 *     which one applies is dictated by the roof, not chosen off a menu.
 */

export function Recommendations() {
  return (
    <section
      id="recommendations"
      className="relative section bg-[var(--ink-90)] text-white noise overflow-hidden"
    >
      {/* Ambient red glow */}
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(224,1,22,0.22) 0%, transparent 68%)",
        }}
      />

      {/* Brand watermark — keeps the house present on the darkest section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-[-6rem] opacity-[0.045]"
      >
        <HouseMark size={620} color="#ffffff" />
      </div>

      <div className="shell relative">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow tone="light" className="mb-5">
                What we recommend
              </HouseEyebrow>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="Three possible paths." />
              <br />
              <span className="text-[var(--supreme-red-bright)]">
                <RevealWords text="The assessment decides." delay={0.15} />
              </span>
            </h2>
          </div>

          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            <p className="text-[1.02rem] leading-[1.8] text-white/65">
              A roof near the end of its life doesn&rsquo;t automatically need
              replacing. It also doesn&rsquo;t automatically qualify for a
              coating. We assess it first. What that assessment supports is one
              of three paths — two of them restore the roof you have, the third
              replaces it.
            </p>
          </Reveal>
        </div>

        {/* ── The two recommendations ── */}
        <RevealGroup className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-16 lg:mb-24">
          {recommendations.map((rec) => (
            <RevealItem key={rec.key}>
              <div
                className="relative h-full p-8 lg:p-12"
                style={{
                  background:
                    rec.key === "restore"
                      ? "linear-gradient(165deg, rgba(224,1,22,0.16) 0%, rgba(11,11,13,1) 62%)"
                      : "var(--ink-90)",
                }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background:
                      rec.key === "restore"
                        ? "var(--supreme-red)"
                        : "rgba(255,255,255,0.14)",
                  }}
                />

                <HouseMark
                  size={34}
                  color={
                    rec.key === "restore"
                      ? "var(--supreme-red-bright)"
                      : "rgba(255,255,255,0.22)"
                  }
                  className="mb-7"
                />

                <h3 className="display-md mb-4">{rec.title}</h3>
                <p className="text-[0.98rem] leading-[1.8] text-white/62">
                  {rec.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── The three project shapes ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-14">
          <div className="lg:col-span-7">
            <h3 className="display-md">
              <RevealWords text="What each path involves" />
            </h3>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="text-[0.98rem] leading-[1.8] text-white/60">
              These aren&rsquo;t three packages to choose between. Which one
              your building gets depends on what the assessment turns up.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {pathways.map((path) => (
            <RevealItem key={path.key}>
              <div
                className="relative h-full p-8 lg:p-10 bg-[var(--ink-90)]"
              >
                <div className="flex items-baseline justify-between mb-7">
                  <span
                    className="display-md"
                    style={{ color: "rgba(255,255,255,0.16)" }}
                  >
                    {path.step}
                  </span>
                  <span
                    className="text-[0.66rem] font-bold uppercase px-2.5 py-1 border"
                    style={{
                      letterSpacing: "0.16em",
                      color: "rgba(255,255,255,0.45)",
                      borderColor: "rgba(255,255,255,0.16)",
                    }}
                  >
                    {path.tag}
                  </span>
                </div>

                <h4 className="display-sm mb-4">{path.title}</h4>
                <p className="text-[0.95rem] leading-[1.75] text-white/60">
                  {path.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Closing line ── */}
        <Reveal delay={0.2}>
          <div className="mt-12 lg:mt-16 flex flex-wrap items-center gap-x-6 gap-y-4 justify-between p-7 lg:p-9 border border-white/10 bg-white/[0.03]">
            <p className="text-[1.05rem] lg:text-[1.15rem] leading-[1.6] font-display italic max-w-2xl">
              If the deck is wet and the insulation is gone, a coating is money
              thrown at a roof that can&rsquo;t hold it. We&rsquo;ll put that in
              writing rather than sell you one.
            </p>
            <a
              href="/contact"
              className="btn btn-primary group shrink-0"
            >
              Request an assessment
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
