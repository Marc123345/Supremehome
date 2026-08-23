import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { media, serviceAreas, site } from "@/lib/site";
import { HouseEyebrow } from "@/components/ui/HouseMark";

export const metadata: Metadata = {
  alternates: { canonical: "/service-areas" },
  title: "Commercial Roofing Service Areas Across Greater Houston",
  description: `${site.name} serves commercial properties in ${serviceAreas
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
        intro={`Crews run out of ${site.address.city} and cover the metro from the Energy Corridor to the Woodlands and down to the Gulf. Commercial work travels further. If your building sits outside the list, call and ask.`}
        image={media.warehouseAerial}
        imageAlt="Aerial view of a distribution facility and its low-slope roof"
      />

      <CoverageMap />

      {/* ── Coverage detail ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="max-w-2xl mb-12">
            <Reveal>
              <HouseEyebrow className="mb-5">
                How coverage works
              </HouseEyebrow>
            </Reveal>
            <h2 className="display-lg mb-6">
              <RevealWords text="Local crews, documented work" />
            </h2>
          </div>

          <RevealGroup className="grid md:grid-cols-3 gap-5">
            <RevealItem className="h-full">
              <div className="edge-card h-full p-8">
                <h3 className="display-sm mb-3">Scheduling an assessment</h3>
                <p className="text-[1rem] leading-[1.75] text-black">
                  Scheduling depends on location, roof access, urgency,
                  weather, project size and current workload. We confirm timing
                  with you when you call.
                </p>
              </div>
            </RevealItem>
            <RevealItem className="h-full">
              <div className="edge-card h-full p-8">
                <h3 className="display-sm mb-3">Storm response</h3>
                <p className="text-[1rem] leading-[1.75] text-black">
                  After a hail or wind event we prioritize make-safe work and
                  emergency tarping across the whole coverage map.
                </p>
              </div>
            </RevealItem>
            <RevealItem className="h-full">
              <div className="edge-card h-full p-8">
                <h3 className="display-sm mb-3">Portfolio accounts</h3>
                <p className="text-[1rem] leading-[1.75] text-black">
                  Managing sites across several cities? We survey the whole
                  portfolio and give you one prioritized capital plan.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-10 p-8 bg-[var(--ink-05)] border-l-[4px] border-[var(--supreme-red)]">
              <p className="text-[1.05rem] leading-[1.8] text-black">
                Based at {site.address.full}. Commercial inquiries outside the
                listed cities are welcome. Restoration projects
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
