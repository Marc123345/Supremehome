import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Recommendations } from "@/components/sections/Recommendations";
import { DeeperLinks } from "@/components/sections/DeeperLinks";
import { About } from "@/components/sections/About";
import { SlidingText } from "@/components/sections/SlidingText";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { Credentials } from "@/components/sections/Credentials";
import { Team } from "@/components/sections/Team";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Reviews } from "@/components/sections/Reviews";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { ResidentialAside } from "@/components/sections/ResidentialAside";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";

import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * HOMEPAGE.
 *
 * Section order follows the progression the client laid out in feedback
 * section 6, which specifies what the homepage has to accomplish and in what
 * order. Mapping, so the next person doesn't reshuffle it by accident:
 *
 *   1. SCC's commercial roofing position ............ Hero
 *      + trust to keep them reading .................. Reviews
 *   2. The problem SCC helps the client solve ....... Recommendations (intro)
 *   3. How restoration eligibility is determined .... RoofSystems (lower half)
 *   4. Coating / restoration / replacement paths .... Recommendations (pathways)
 *                                                     RestorationScope
 *   5. The commercial roof systems SCC evaluates .... RoofSystems (upper half)
 *   6. SCC's assessment and proposal process ........ Process
 *   7. Qualifications, leadership, project evidence . Credentials, Team,
 *                                                     CaseStudies
 *   8. Invitation to request an assessment .......... CTABand
 *
 * Items 4 and 5 are interleaved on purpose: the pathways only make sense once
 * you know we look at every system, and the eligibility factors only land once
 * the systems are on screen. Splitting RoofSystems across both is what lets
 * the page read in one pass.
 *
 * NOTE ON WORDING: feedback section 6 says the client does not want homepage
 * wording finalized until the structure is agreed. The copy here is written to
 * be usable, not final — it's a draft against the agreed structure, and it's
 * all in lib/site.ts so it can be revised without touching layout.
 *
 * WHAT WAS REMOVED: the ServicesSlider (eight disconnected service cards,
 * including standalone "Roof Repair" and residential shingles) no longer runs
 * on the homepage. Feedback section 2 asks for one connected restoration scope
 * instead of a menu, which is what RestorationScope now does.
 */
export default function Home() {
  return (
    <>
      <Hero />

      {/* Social proof sits directly under the hero — it is the strongest
          reason to keep reading, and the Supreme brand's real review history
          is one of the credibility sources feedback section 5 names. */}
      <Reviews />

      <Recommendations />

      {/* RoofSystems, RestorationScope and Process used to render here in
          full, and again in full on /commercial-roofing. Someone reading both
          pages read all three twice. The commercial page is the detailed
          version now; this page links into it. (Correction package A6.) */}
      <DeeperLinks />

      <SlidingText />
      <WhyChoose />

      <Credentials />
      <Team />

      {/* Renders nothing until real commercial projects are added to
          `caseStudies` in lib/site.ts. See the component for why. */}
      <CaseStudies />

      <About />
      <WhoWeServe />

      {/* Residential gets one clearly-bounded handoff block rather than being
          threaded through the commercial pages — feedback section 1. */}
      <ResidentialAside />

      <CoverageMap />

      <FaqJsonLd />
      <FAQ />
      <CTABand />
    </>
  );
}
