"use client";

import { Building2, Warehouse, Church, Fuel } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { clientTypes } from "@/lib/site";
import { HouseEyebrow } from "@/components/ui/HouseMark";

const ICONS = [Building2, Warehouse, Church, Fuel];

export function WhoWeServe() {
  return (
    <section className="section bg-white border-t border-black/[0.07]">
      <div className="shell">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <Reveal>
            <HouseEyebrow className="mb-5">
              Who we work with
            </HouseEyebrow>
          </Reveal>
          <h2 className="display-lg mb-5">
            <RevealWords text="Built around the people who own the roof" />
          </h2>
          <Reveal delay={0.15}>
            <p className="lede">
              Property managers, building owners and church boards all land in
              the same spot: a roof that&rsquo;s running out of life, and a
              budget nobody wrote with a replacement in mind.
            </p>
          </Reveal>
        </div>

        <Reveal amount={0.1}>
          <CardCarousel ariaLabel="Who we work with" autoAdvanceMs={6500}>
            {clientTypes.map((client, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={client.title} className="notch-card clip-notch h-full">
                  <span className="notch-tick" />
                  <div className="clip-notch h-full p-8 lg:p-9 flex flex-col min-h-[300px]">
                    <span className="inline-grid place-items-center w-14 h-14 mb-7 rounded-full bg-[var(--red-wash)] shrink-0">
                      <Icon size={23} className="text-[var(--supreme-red)]" />
                    </span>
                    <h3 className="display-sm mb-3">{client.title}</h3>
                    <p className="text-[1rem] leading-[1.7] text-black">
                      {client.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardCarousel>
        </Reveal>
      </div>
    </section>
  );
}
