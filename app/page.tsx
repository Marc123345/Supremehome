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
import { Proof } from "@/components/sections/Proof";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <RestorationLadder />
      <About />
      <SlidingText />
      <ServicesSlider />
      <WhyChoose />
      <WhoWeServe />
      <Process />
      <Credentials />
      <Team />
      <Proof />
      <CoverageMap />
      <FAQ />
      <CTABand />
    </>
  );
}
