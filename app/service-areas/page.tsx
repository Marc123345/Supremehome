import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { media, serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas — Commercial & Residential Roofing Across Greater Houston",
  description: `Supreme Home Roofing serves ${serviceAreas
    .slice(0, 8)
    .join(", ")} and more across the Greater Houston area from our ${site.address.city}, TX base.`,
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        breadcrumb="Service Areas"
        eyebrow="Eighteen communities"
        title="Roofing across Greater Houston"
        intro={`Crews run out of ${site.address.city} and cover the metro from the Energy Corridor to the Woodlands and down to the Gulf. Commercial work travels further — if your building sits outside the list, call and ask.`}
        image={media.aerialCommercial}
        imageAlt="Aerial view of a commercial district with large flat roofs"
      />

      <CoverageMap />

      {/* ── Coverage detail ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="max-w-2xl mb-12">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red)] mb-5">
                How coverage works
              </p>
            </Reveal>
            <h2 className="display-lg mb-6">
              <RevealWords text="Local crews, documented work" />
            </h2>
          </div>

          <RevealGroup className="grid md:grid-cols-3 gap-5">
            <RevealItem className="h-full">
              <div className="edge-card h-full p-8">
                <h3 className="display-sm mb-3">Same-week inspections</h3>
                <p className="text-[0.93rem] leading-[1.75] text-black/58">
                  Inside the service area we aim to have someone on your roof
                  within the week — sooner when there is active water coming in.
                </p>
              </div>
            </RevealItem>
            <RevealItem className="h-full">
              <div className="edge-card h-full p-8">
                <h3 className="display-sm mb-3">Storm response</h3>
                <p className="text-[0.93rem] leading-[1.75] text-black/58">
                  After a hail or wind event we prioritise make-safe work and
                  emergency tarping across the whole coverage map.
                </p>
              </div>
            </RevealItem>
            <RevealItem className="h-full">
              <div className="edge-card h-full p-8">
                <h3 className="display-sm mb-3">Portfolio accounts</h3>
                <p className="text-[0.93rem] leading-[1.75] text-black/58">
                  Managing sites across several cities? We survey the whole
                  portfolio and give you one prioritised capital plan.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-10 p-8 bg-[var(--ink-05)] border-l-[4px] border-[var(--supreme-red)]">
              <p className="text-[0.98rem] leading-[1.8] text-black/70">
                Based at {site.address.full}. Commercial enquiries outside the
                listed cities are welcome — flat-roof restoration projects
                regularly justify the travel.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
