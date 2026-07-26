import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { media, warranties } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Roofing, Repair & Storm Damage in Houston",
  description:
    "Shingle and metal roofing for Houston-area homes. CertainTeed certified installation, 5-year leak protection warranty, insurance claim assistance and zero-down financing.",
};

export default function ResidentialRoofingPage() {
  return (
    <>
      <PageHero
        breadcrumb="Residential"
        eyebrow="Homes across Greater Houston"
        title="Residential roofing, done straight"
        intro="The same inspect-first approach we bring to commercial buildings. You get a written assessment, a repair-or-replace recommendation you can trust, and a 5-year leak protection warranty on our work."
        image={media.residentialTearOff}
        imageAlt="A roofer removing damaged shingles from a Texas brick home"
      />

      {/* ── Homeowner value props ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal direction="right" className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={media.crewOnRoof}
                  alt="Roofing crew working on a residential roof deck"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 h-[4px] bg-[var(--supreme-red)]" />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-[var(--supreme-red)] mb-5">
                  What you get
                </p>
              </Reveal>
              <h2 className="display-lg mb-6">
                <RevealWords text="Backed in writing, financed if you need it" />
              </h2>
              <Reveal delay={0.15}>
                <p className="lede mb-10">
                  Storm damage, an ageing roof or a leak you cannot trace — we
                  inspect at no cost and tell you honestly whether it is a repair
                  or a replacement.
                </p>
              </Reveal>

              <RevealGroup className="grid sm:grid-cols-2 gap-5">
                {warranties.map((w) => (
                  <RevealItem key={w.title} className="h-full">
                    <div className="edge-card h-full p-7">
                      <h3 className="display-sm mb-3">{w.title}</h3>
                      <p className="text-[0.9rem] leading-[1.7] text-black/58">
                        {w.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <ServicesSlider
        filter="residential"
        eyebrow="Residential services"
        title="What we do on homes"
        intro="Shingle and metal roofing, repairs, storm restoration and insurance claim support — all under one contractor."
      />

      <Process />
      <FAQ />
      <CTABand />
    </>
  );
}
