"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import type { ArcCard } from "@/components/ui/ArcSlider";
import { services, residentialServices, type Service } from "@/lib/site";

/**
 * Services as a static grid.
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
        : `/commercial-roofing${s.anchor ?? ""}`,
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

        {/* This was a 3D arc carousel: cards rotated up to 55 degrees on the
            Y axis, one legible at a time, browsed by dragging. A property
            manager checking whether we handle their roof had to work through
            it card by card to find out. A grid shows all of them at once,
            unrotated. */}
        <div className="grid gap-px bg-white/10 border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col bg-[var(--ink-90)] p-7 lg:p-8"
            >
              <p className="eyebrow text-[var(--supreme-red-bright)] mb-4">
                {card.category}
              </p>
              <h3 className="display-sm mb-4">{card.title}</h3>
              <p className="text-[0.92rem] leading-[1.75] text-white/62 mb-6">
                {card.blurb}
              </p>
              <ul className="space-y-2.5 mb-7">
                {(card.bullets ?? []).map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[0.88rem] leading-[1.6] text-white/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] w-[5px] h-[5px] shrink-0 bg-[var(--supreme-red-bright)]"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={card.href}
                className="mt-auto inline-flex items-center gap-2 text-[0.88rem] font-bold text-[var(--supreme-red-bright)] hover:underline"
              >
                {card.title}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
