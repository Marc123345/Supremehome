import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Recommendations } from "@/components/sections/Recommendations";
import { RoofSystems } from "@/components/sections/RoofSystems";
import { RestorationScope } from "@/components/sections/RestorationScope";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { Process } from "@/components/sections/Process";
import { Credentials } from "@/components/sections/Credentials";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { media } from "@/lib/site";

import { FaqJsonLd, ServicesJsonLd } from "@/components/seo/JsonLd";

/**
 * The commercial page carries the same argument as the homepage, in more
 * depth. It is deliberately free of residential material — no shingles, no
 * homeowner financing, no residential storm content (client feedback
 * section 1). The residential handoff lives on the homepage and in the nav.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/commercial-roofing" },
  title: "Commercial Roof Restoration & Replacement in Houston",
  description:
    "Commercial roof restoration and replacement across Greater Houston. We assess metal, TPO, modified bitumen, built-up and low-slope systems, then recommend restoring or replacing based on documented condition. Starts with a free written assessment.",
};

export default function CommercialRoofingPage() {
  return (
    <>
      <PageHero
        breadcrumb="Commercial"
        eyebrow="Restoration & Replacement"
        title="Commercial roof restoration and replacement"
        intro="Warehouses, retail centers, churches, gas stations and restaurants across Greater Houston. We assess the roof you have, then tell you whether restoring it or replacing it is the better use of your money."
        image={media.heroCoating}
        imageAlt="A technician spray-applying a restoration coating across a commercial roof"
      />

      <Recommendations />
      <RoofSystems />
      <RestorationScope />

      <ServicesSlider
        filter="commercial"
        eyebrow="How we work"
        title="Assess, then restore or replace"
        intro="One engagement in three stages. What we document on the roof decides which of them your building needs."
      />

      <WhoWeServe />
      <Process />
      <Credentials />

      {/* Empty until real commercial projects are added to lib/site.ts. */}
      <CaseStudies />

      <ServicesJsonLd />
      <FaqJsonLd />
      <FAQ />
      <CTABand />
    </>
  );
}
