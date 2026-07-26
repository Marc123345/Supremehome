"use client";

import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { process, media } from "@/lib/site";

export function Process() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red)] mb-5">
                How it works
              </p>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="From first look to final warranty" />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              Five steps, no surprises. You will know what your roof needs, what
              each option costs, and what it buys you in service life before
              anyone quotes a number.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal direction="right">
                <ImageFrame
                  src={media.crewOnRoof}
                  alt="Two roofing technicians working on a roof deck during an installation"
                  ratio="3/4"
                />
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-6 p-6 bg-[var(--ink-05)] border-l-[3px] border-[var(--supreme-red)]">
                  <p className="text-[0.95rem] leading-[1.75] text-black/70">
                    Every inspection ends with a written report and photographs —
                    including the roofs we tell you not to touch yet.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Steps */}
          <ol className="lg:col-span-7">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07} as="li">
                <div className="group grid grid-cols-[auto_1fr] gap-6 lg:gap-8 py-8 border-b border-black/10 first:pt-0">
                  <span className="font-display text-[2.4rem] leading-none text-black/15 transition-colors duration-300 group-hover:text-[var(--supreme-red)]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="display-sm mb-2.5">{step.title}</h3>
                    <p className="text-[0.95rem] leading-[1.75] text-black/58">
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
