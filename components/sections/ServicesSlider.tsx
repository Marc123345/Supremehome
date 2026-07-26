"use client";

import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { ArcSlider, type ArcCard } from "@/components/ui/ArcSlider";
import { services } from "@/lib/site";

/**
 * Services as a 3D arc slider — the same interaction as the services slider on
 * marc-portfolio-nextjs, restyled to the Supreme design system.
 */
export function ServicesSlider({
  filter,
  title = "What we do",
  intro = "Commercial restoration is the core of the business. Everything else is here because a building owner needs one number, from one contractor, for the whole roof.",
  eyebrow = "Services",
}: {
  filter?: "commercial" | "residential";
  title?: string;
  intro?: string;
  eyebrow?: string;
}) {
  const list = filter
    ? services.filter((s) => s.audience === filter || s.audience === "both")
    : services;

  const cards: ArcCard[] = list.map((s) => ({
    id: s.slug,
    title: s.title,
    category: s.kicker,
    blurb: s.blurb,
    bullets: s.points,
    href:
      s.audience === "residential"
        ? "/residential-roofing"
        : "/commercial-roofing",
  }));

  return (
    <section className="relative section bg-[var(--ink-90)] text-white noise overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[520px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(224,1,22,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-14 lg:mb-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red-bright)] mb-5">
                {eyebrow}
              </p>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text={title} />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-6">
            <p className="text-[1.02rem] leading-[1.8] text-white/62">{intro}</p>
          </Reveal>
        </div>

        <Reveal amount={0.1}>
          <ArcSlider cards={cards} initialIndex={0} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-[0.8rem] text-white/35">
            Drag, use the arrows, or press ← / → to browse
          </p>
        </Reveal>
      </div>
    </section>
  );
}
