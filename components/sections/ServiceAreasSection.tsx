"use client";

import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { locations } from "@/lib/locations";

export function ServiceAreasSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section bg-[var(--ink-05)] border-y border-black/[0.07]">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red)] mb-5">
                Greater Houston
              </p>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="Where we work" />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              Crews run out of {site.address.city} across eighteen communities in
              the Greater Houston area — from the Energy Corridor to the
              Woodlands and down to the Gulf.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-black/[0.08] border border-black/[0.08]">
          {locations.map((area) => (
            <RevealItem key={area.slug}>
              <motion.div
                whileHover={{ backgroundColor: "#ffffff" }}
                className="group h-full bg-[var(--ink-05)] transition-colors"
              >
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="h-full px-4 py-6 flex flex-col items-center text-center gap-2"
                >
                  <MapPin
                    size={15}
                    className="text-black/22 transition-colors duration-300 group-hover:text-[var(--supreme-red)]"
                  />
                  <span className="font-display text-[1.15rem] leading-none uppercase">
                    {area.name}
                  </span>
                  <span className="text-[0.66rem] uppercase tracking-[0.14em] text-black/35">
                    {area.county
                      .replace(" County", "")
                      .replace(" Counties", "")}
                  </span>
                </Link>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        {!compact && (
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-10 p-7 bg-white border border-black/[0.08]">
              <p className="text-[0.95rem] text-black/62 max-w-xl">
                Not on the list? We travel for commercial work across the wider
                Houston metro — call and ask.
              </p>
              <Link
                href="/service-areas"
                className="group inline-flex items-center gap-2 font-bold text-[0.9rem] text-[var(--supreme-red)] shrink-0"
              >
                See all service areas
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
