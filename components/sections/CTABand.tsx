"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Ticker } from "@/components/ui/Ticker";
import { site, tickerPrimary } from "@/lib/site";

export function CTABand() {
  return (
    <section className="relative overflow-hidden noise" style={{ background: "var(--supreme-red)" }}>
      {/* Grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-[0.07]" />

      <div className="shell relative py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-white/70 mb-5">
                No cost · No obligation
              </p>
            </Reveal>
            <h2 className="display-lg text-white mb-5">
              <RevealWords text="Get a straight answer on your roof" />
            </h2>
            <Reveal delay={0.15}>
              <p className="text-[1.05rem] leading-[1.75] text-white/82 max-w-xl">
                We will inspect it, document it, and tell you whether it needs a
                repair, a restoration or a replacement — in writing, before
                anyone talks price.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.2} className="lg:col-span-5">
            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={site.phoneHref}
                className="btn bg-white text-[var(--supreme-red)] hover:bg-[var(--ink)] hover:text-white w-full lg:w-auto"
              >
                <Phone size={17} />
                {site.phone}
              </a>
              <Link
                href="/contact"
                className="btn btn-ghost-light group w-full lg:w-auto"
              >
                Book a free inspection
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <p className="text-[0.8rem] text-white/65 lg:text-right mt-2">
                Free inspection · {site.address.city}, TX
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <Ticker
          items={tickerPrimary}
          direction="left"
          textColor="rgba(255,255,255,0.6)"
          dotColor="rgba(255,255,255,0.45)"
        />
      </div>
    </section>
  );
}
