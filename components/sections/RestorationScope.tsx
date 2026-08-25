"use client";

import { ImageFrame } from "@/components/ui/ImageFrame";
import { TrendingDown } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseMark, HouseEyebrow, HouseBullet } from "@/components/ui/HouseMark";
import { restorationScope, restorationBenefits, media } from "@/lib/site";

/**
 * ONE SCOPE, NOT A MENU.
 *
 * Client feedback section 2, verbatim: "Required repairs, detailing,
 * preparation, coating installation, quality control, and closeout should be
 * presented as parts of one complete restoration scope — not as disconnected
 * services."
 *
 * The old site listed repair, coatings, metal work and replacement as eight
 * separate cards in a services slider, which invited a building owner to shop
 * line items and made SCC look like a repair vendor. This section presents the
 * same work as one connected sequence with a single number behind it.
 *
 * The numbered rail is deliberately continuous — the connecting line is the
 * whole point of the layout.
 */

export function RestorationScope() {
  return (
    /* `id="scope"` is linked from the footer's Restoration Scope entry, which
       pointed at a target that did not exist (correction package D4). */
    <section id="scope"
      className="relative section bg-white overflow-hidden">
      {/* Watermark keeps the brand present on the light sections too. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 opacity-[0.035]"
      >
        <HouseMark size={560} />
      </div>

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-14 lg:mb-18">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">
                What a restoration actually includes
              </HouseEyebrow>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="One coordinated scope." />
              <br />
              <span className="text-[var(--supreme-red)]">
                <RevealWords text="One accountable partner." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            <p className="lede">
              A restoration isn&rsquo;t a coating with some repairs bolted onto
              the invoice. Everything below is identified and priced as one
              project scope.
            </p>
          </Reveal>
        </div>

        {/* ── The connected scope ── */}
        <RevealGroup className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
          {restorationScope.map((item, i) => (
            <RevealItem key={item.title}>
              <div className="relative flex gap-5 py-7 border-b border-black/10">
                {/* Step index + connector */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-[var(--supreme-red)] text-white text-[0.75rem] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-[1.08rem] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[1rem] leading-[1.7] text-black">
                    {item.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-10 pl-5 border-l-[3px] border-[var(--supreme-red)] text-[1rem] leading-[1.8] text-black max-w-3xl">
            We do repairs when a roof needs them. What we don&rsquo;t do is sell
            a repair as the whole answer when the roof needs more than that, or
            sell you a coating over problems we didn&rsquo;t fix first.
          </p>
        </Reveal>

        {/* ── Why restoration is worth doing ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-16 lg:mt-24">
          <Reveal direction="right" className="lg:col-span-5">
            <ImageFrame
              src={media.aerialCommercial}
              alt="Aerial view of a large commercial distribution center with an expansive low-slope roof"
              ratio="4/3"
              overlay={
                <>
                  <p className="eyebrow text-[var(--supreme-red-bright)] mb-2">
                    Built for scale
                  </p>
                  <p className="display-sm">
                    Large commercial roofs and smaller single-building projects
                  </p>
                </>
              }
            />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <TrendingDown size={22} className="text-[var(--supreme-red)]" />
                <h3 className="display-md">When restoration is the answer</h3>
              </div>
            </Reveal>

            <RevealGroup className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
              {restorationBenefits.map((benefit) => (
                <RevealItem key={benefit}>
                  <div className="flex items-start gap-3 py-3.5 border-b border-black/10">
                    <span className="mt-1">
                      <HouseBullet size={15} />
                    </span>
                    <span className="text-[1rem] leading-[1.6] text-black">
                      {benefit}
                    </span>
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
