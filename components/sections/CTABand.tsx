"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Ticker } from "@/components/ui/Ticker";
import { site, tickerPrimary } from "@/lib/site";

/**
 * The closing CTA band.
 *
 * Props exist for one reason: /residential-roofing used to end with the
 * commercial call to action and a ticker advertising TPO, mod-bit and BUR
 * restoration to homeowners (correction package I2). Defaults are the
 * commercial copy, so every commercial surface is unchanged; the residential
 * page passes its own.
 */
export function CTABand({
  heading = "Request a commercial roof assessment",
  body = "We\u2019ll review the roof\u2019s current condition, document the findings, and explain whether restoration and coating are viable or replacement is necessary.",
  cta = "Request a commercial roof assessment",
  note = `Commercial roof assessment \u00b7 ${site.address.city}, TX`,
  ticker = tickerPrimary as readonly string[],
}: {
  heading?: string;
  body?: string;
  cta?: string;
  note?: string;
  ticker?: readonly string[];
} = {}) {
  return (
    <section className="relative overflow-hidden noise" style={{ background: "var(--supreme-red)" }}>
      {/* Grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-[0.07]" />

      <div className="shell relative py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-white mb-5">
                No cost · No obligation
              </p>
            </Reveal>
            <h2 className="display-lg text-white mb-5">
              <RevealWords text={heading} />
            </h2>
            <Reveal delay={0.15}>
              <p className="text-[1.05rem] leading-[1.75] text-white max-w-xl">
                {body}
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
                {cta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <p className="text-[1rem] text-white lg:text-right mt-2">
                {note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <Ticker
          items={ticker}
          direction="left"
          textColor="rgba(255,255,255,0.6)"
          dotColor="rgba(255,255,255,0.45)"
        />
      </div>
    </section>
  );
}
