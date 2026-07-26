import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { RestorationLadder } from "@/components/sections/RestorationLadder";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { Process } from "@/components/sections/Process";
import { Credentials } from "@/components/sections/Credentials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { media } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial Roof Restoration & Coatings in Houston",
  description:
    "Flat and low-slope commercial roofing across Greater Houston. Silicone and acrylic restoration coatings, TPO and modified bitumen systems, repairs and replacement — with a free written assessment first.",
};

export default function CommercialRoofingPage() {
  return (
    <>
      <PageHero
        breadcrumb="Commercial"
        eyebrow="Flat & Low-Slope Specialists"
        title="Commercial roof restoration in Houston"
        intro="Warehouses, retail centres, churches, gas stations and quick-service restaurants. We restore serviceable flat roofs with certified coating systems — and replace only when the deck genuinely calls for it."
        image={media.heroCoating}
        imageAlt="A technician spray-applying a white restoration coating across a commercial flat roof"
      />

      <RestorationLadder />

      <ServicesSlider
        filter="commercial"
        eyebrow="Commercial services"
        title="Every system we install"
        intro="One contractor for the whole roof — restoration, repair, storm work and full replacement, with the documentation your ownership group and insurer expect."
      />

      <WhoWeServe />
      <Process />
      <Credentials />
      <FAQ />
      <CTABand />
    </>
  );
}
