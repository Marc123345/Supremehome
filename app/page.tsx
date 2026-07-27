import { Hero } from "@/components/sections/Hero";
import { RestorationLadder } from "@/components/sections/RestorationLadder";
import { About } from "@/components/sections/About";
import { SlidingText } from "@/components/sections/SlidingText";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { Process } from "@/components/sections/Process";
import { Credentials } from "@/components/sections/Credentials";
import { Team } from "@/components/sections/Team";
import { Reviews } from "@/components/sections/Reviews";
import { SectionSplit } from "@/components/ui/SectionSplit";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Social proof sits directly under the hero — it is the strongest
          reason to keep reading, and 21 real reviews earn that slot. */}
      <Reviews />

      <SectionSplit from="light" to="ink" />
      <RestorationLadder />
      <SectionSplit from="ink" to="white" direction="left" />
      <About />
      <SlidingText />
      <ServicesSlider />
      <WhyChoose />
      <WhoWeServe />
      <Process />
      <SectionSplit from="white" to="ink" />
      <Credentials />
      <Team />
      <CoverageMap />
      <FAQ />
      <SectionSplit from="white" to="red" direction="left" />
      <CTABand />
    </>
  );
}
