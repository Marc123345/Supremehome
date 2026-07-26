"use client";

import { ImageFrame } from "@/components/ui/ImageFrame";
import { motion } from "motion/react";
import { Check, TrendingDown } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { restorationLadder, restorationBenefits, media } from "@/lib/site";

export function RestorationLadder() {
  return (
    <section
      id="restoration-ladder"
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

      <div className="shell relative">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red-bright)] mb-5">
                The Supreme Approach
              </p>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="Three answers." />
              <br />
              <span className="text-[var(--supreme-red-bright)]">
                <RevealWords text="Most roofers only sell one." delay={0.15} />
              </span>
            </h2>
          </div>

          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            <p className="text-[1.02rem] leading-[1.8] text-white/65">
              A roof nearing the end of its life does not automatically need
              replacing. We work up the ladder, not down it — and we put the
              numbers side by side so you can see the difference for yourself.
            </p>
          </Reveal>
        </div>

        {/* ── The ladder ── */}
        <RevealGroup className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {restorationLadder.map((rung) => {
            const isSpecialty = rung.tag === "Our specialty";
            return (
              <RevealItem key={rung.step}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full p-8 lg:p-10"
                  style={{
                    background: isSpecialty
                      ? "linear-gradient(165deg, rgba(224,1,22,0.16) 0%, rgba(11,11,13,1) 60%)"
                      : "var(--ink-90)",
                  }}
                >
                  {isSpecialty && (
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--supreme-red)]" />
                  )}

                  <div className="flex items-baseline justify-between mb-7">
                    <span
                      className="display-md"
                      style={{
                        color: isSpecialty
                          ? "var(--supreme-red-bright)"
                          : "rgba(255,255,255,0.16)",
                      }}
                    >
                      {rung.step}
                    </span>
                    <span
                      className="text-[0.66rem] font-bold uppercase px-2.5 py-1 border"
                      style={{
                        letterSpacing: "0.16em",
                        color: isSpecialty
                          ? "var(--supreme-red-bright)"
                          : "rgba(255,255,255,0.45)",
                        borderColor: isSpecialty
                          ? "rgba(255,34,51,0.5)"
                          : "rgba(255,255,255,0.16)",
                      }}
                    >
                      {rung.tag}
                    </span>
                  </div>

                  <h3 className="display-md mb-4">{rung.title}</h3>
                  <p className="text-[0.95rem] leading-[1.75] text-white/60">
                    {rung.body}
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* ── Why restoration wins ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-16 lg:mt-24">
          <Reveal direction="right" className="lg:col-span-5">
            <ImageFrame
              src={media.aerialCommercial}
              alt="Aerial view of a large commercial distribution centre with an expansive flat roof"
              ratio="4/3"
              overlay={
                <>
                  <p className="eyebrow text-[var(--supreme-red-bright)] mb-2">
                    Built for scale
                  </p>
                  <p className="display-sm">
                    100+ square projects — and the gas station on the corner
                  </p>
                </>
              }
            />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <TrendingDown
                  size={22}
                  className="text-[var(--supreme-red-bright)]"
                />
                <h3 className="display-md">Why restoration wins</h3>
              </div>
            </Reveal>

            <RevealGroup className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
              {restorationBenefits.map((benefit) => (
                <RevealItem key={benefit}>
                  <div className="flex items-start gap-3 py-3.5 border-b border-white/10">
                    <span className="mt-1 shrink-0 w-[18px] h-[18px] grid place-items-center rounded-full bg-[var(--supreme-red)]">
                      <Check size={11} strokeWidth={3.5} className="text-white" />
                    </span>
                    <span className="text-[0.93rem] leading-[1.6] text-white/78">
                      {benefit}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <p className="mt-8 pl-5 border-l-[3px] border-[var(--supreme-red)] text-[0.98rem] leading-[1.8] text-white/70 italic">
                If the deck or insulation is gone, a coating is throwing money
                away — and we will tell you that in writing rather than sell you
                one.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
