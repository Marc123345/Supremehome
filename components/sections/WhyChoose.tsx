"use client";

import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { whyChoose, capabilities, media } from "@/lib/site";
import { HouseEyebrow } from "@/components/ui/HouseMark";

/**
 * Ported from topfloor `sections/home3/Whycoose.js` (copy + image split) and
 * `sections/home1/Process.js` (the numbered icon-tile grid), merged into one
 * band so the reasons and the capabilities read together.
 */
export function WhyChoose() {
  return (
    <section className="relative section bg-[var(--ink-05)] overflow-hidden">
      <div className="shell">
        {/* ── Split header ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">
                Why choose us
              </HouseEyebrow>
            </Reveal>
            <h2 className="display-lg mb-6">
              <RevealWords text="The difference is the assessment" />
            </h2>
            <Reveal delay={0.15}>
              <p className="lede">
                The value of a commercial roofing partner begins with an
                accurate assessment, and continues through a clearly defined
                scope, proper installation, quality control and closeout.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            {/* Was `residentialTearOff` — a shingle tear-off on a house, which
                is residential imagery on a commercial section (feedback
                section 1). Swapped for commercial roof photography. */}
            <ImageFrame
              src={media.aerialWarehouse}
              alt="Aerial view of a warehouse roof with visible seams, curbs and rooftop units"
              ratio="5/4"
            />
          </Reveal>
        </div>

        {/* ── Reasons ── */}
        <RevealGroup className="grid sm:grid-cols-2 gap-5 mb-16 lg:mb-20">
          {whyChoose.map((reason, i) => (
            <RevealItem key={reason.title} className="h-full">
              <div
                className={`notch-card h-full ${
                  i % 2 === 0 ? "clip-notch" : "clip-notch-alt"
                }`}
              >
                {i % 2 === 0 && <span className="notch-tick" />}
                <div
                  className={`h-full p-8 lg:p-9 ${
                    i % 2 === 0 ? "clip-notch" : "clip-notch-alt"
                  }`}
                >
                  <span
                    className="font-display text-[2.4rem] leading-none text-black/70 block mb-5"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-sm mb-3">{reason.title}</h3>
                  <p className="text-[1rem] leading-[1.7] text-black">
                    {reason.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Capability tiles (topfloor Process grid) ── */}
        <Reveal>
          <p className="eyebrow text-black/70 mb-6">What we handle on the roof</p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.09] border border-black/[0.09]">
          {capabilities.map((cap, i) => (
            <RevealItem key={cap.title}>
              <div className="group relative h-full bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-[var(--ink-90)]">
                <span
                  className="absolute top-5 right-6 font-display text-[1.6rem] leading-none text-black/70 transition-colors duration-300 group-hover:text-white/75"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-sm mb-2 pr-10 transition-colors duration-300 group-hover:text-white">
                  {cap.title}
                </h3>
                <p className="text-[1rem] leading-[1.55] text-black transition-colors duration-300 group-hover:text-white">
                  {cap.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
