"use client";

import Image from "next/image";
import { Quote, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { media } from "@/lib/site";

/**
 * Proof / references.
 *
 * The questionnaire lists exactly one written reference: a letter of
 * recommendation from a Veterans Hospital for a completed roof. It is
 * presented factually here — no quote is invented. Drop the PDF into
 * /public and link it from the button once supplied.
 */
export function Proof() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Reference card */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red)] mb-5">
                On the record
              </p>
            </Reveal>
            <h2 className="display-lg mb-8">
              <RevealWords text="Work that earned a letter" />
            </h2>

            <Reveal delay={0.15}>
              <div className="relative p-8 lg:p-10 bg-[var(--ink-05)] border-l-[4px] border-[var(--supreme-red)]">
                <Quote
                  size={34}
                  className="text-[var(--supreme-red)] opacity-20 mb-5"
                  aria-hidden="true"
                />
                <p className="text-[1.08rem] leading-[1.75] text-black/78">
                  We completed a roof for a Veterans Hospital and were issued a
                  written letter of recommendation for the work. It is available
                  to any prospective client on request — along with references
                  from the commercial projects behind it.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-8 pt-7 border-t border-black/10">
                  <span className="inline-grid place-items-center w-11 h-11 rounded-full bg-[var(--supreme-red)] shrink-0">
                    <FileText size={18} className="text-white" />
                  </span>
                  <div>
                    <p className="font-bold text-[0.95rem]">
                      Veterans Hospital
                    </p>
                    <p className="text-[0.82rem] text-black/50">
                      Letter of recommendation · Completed roofing project
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 mt-7 font-bold text-[0.92rem] text-[var(--supreme-red)]"
              >
                Request our references
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal direction="left" className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={media.aerialWarehouse}
                alt="Aerial view of a commercial building with a large flat roof"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[var(--supreme-red)]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
