"use client";

import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { ArcSlider, type ArcCard } from "@/components/ui/ArcSlider";
import { services, residentialServices, type Service } from "@/lib/site";

/**
 * Services as a 3D arc slider.
 *
 * The commercial and residential service lists are now separate arrays rather
 * than one list with an "audience" filter that included a shared "both"
 * bucket. That bucket was how residential storm work, insurance claims and
 * roof repair ended up rendering on commercial pages — exactly what client
 * feedback section 1 asks us to stop doing. There is no longer any way for a
 * residential card to appear in a commercial context.
 *
 * The commercial list is also no longer a menu of eight disconnected services.
 * It is the three stages of the actual engagement (assess → restore or
 * replace), per feedback section 2.
 */
export function ServicesSlider({
  filter = "commercial",
  title = "What we do",
  intro = "Commercial restoration and replacement is the business. We assess the roof first and let what we find decide the rest.",
  eyebrow = "Services",
}: {
  filter?: "commercial" | "residential";
  title?: string;
  intro?: string;
  eyebrow?: string;
}) {
  const list: Service[] =
    filter === "residential" ? residentialServices : services;

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
