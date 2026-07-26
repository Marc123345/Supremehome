"use client";

import { ImageFrame } from "@/components/ui/ImageFrame";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { CounterUp } from "@/components/ui/CounterUp";
import { CircleText } from "@/components/ui/CircleText";
import { aboutPoints, stats, media } from "@/lib/site";

/**
 * Ported from topfloor `sections/home1/About.js` — two-column about block with
 * a checklist, a floating stat badge over the image, and a CTA. The original's
 * video-popup is replaced with the rotating CircleText badge (home3/Circletext).
 */
export function About() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left ── */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red)] mb-5">About us</p>
            </Reveal>

            <h2 className="display-lg mb-6">
              <RevealWords text="A roofer who tells you not to re-roof" />
            </h2>

            <Reveal delay={0.15}>
              <p className="lede mb-9">
                Supreme Commercial Coatings exists because building owners kept
                getting the same answer from every contractor they called: tear
                it off and start again. We built the business around the
                assessment that comes first.
              </p>
            </Reveal>

            <RevealGroup className="space-y-1 mb-10">
              {aboutPoints.map((point) => (
                <RevealItem key={point}>
                  <div className="flex items-start gap-3.5 py-3.5 border-b border-black/[0.08]">
                    <span className="mt-0.5 shrink-0 grid place-items-center w-[22px] h-[22px] rounded-full bg-[var(--supreme-red)]">
                      <Check size={12} strokeWidth={3.5} className="text-white" />
                    </span>
                    <p className="text-[0.96rem] leading-[1.6] text-black/72">
                      {point}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <Link href="/about" className="btn btn-primary group">
                More about us
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* ── Right ── */}
          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            <div className="relative">
              <ImageFrame
                src={media.aerialCommercial}
                alt="Aerial view of a commercial building with an expansive flat roof"
                ratio="4/5"
              />

              {/* Rotating badge, overlapping the image corner */}
              <div className="absolute -top-7 -left-7 hidden sm:block text-[var(--ink)]">
                <div className="rounded-full bg-white p-2">
                  <CircleText size={148} />
                </div>
              </div>

              {/* Stat badge */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-[var(--ink-90)] text-white p-6 lg:p-7 max-w-[230px] noise">
                <p className="display-md text-[var(--supreme-red-bright)] leading-none mb-2">
                  <CounterUp end={100} suffix="+" />
                </p>
                <p className="text-[0.84rem] leading-[1.5] text-white/62">
                  Square commercial projects — and the gas station on the corner
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Stats strip ── */}
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.09] border border-black/[0.09] mt-24 lg:mt-28">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="h-full bg-white p-7 lg:p-8">
                <p className="display-md text-[var(--supreme-red)] leading-none mb-3">
                  <CounterUp
                    end={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-[0.86rem] leading-[1.55] text-black/55">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
