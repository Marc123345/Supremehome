import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Credentials } from "@/components/sections/Credentials";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { media, site } from "@/lib/site";
import { HouseEyebrow } from "@/components/ui/HouseMark";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  // The root layout appends "| Supreme Commercial Coatings" to every title,
  // so repeating the brand here produced "About Supreme Commercial Coatings |
  // Supreme Commercial Coatings" in the tab and in search results.
  title: "About",
  description:
    "Supreme Commercial Coatings is a Katy, TX commercial roofing contractor that assesses the roof first, then restores it or replaces it based on what the assessment finds.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Who we are"
        title="We assess before we recommend"
        intro={`${site.dba} is the commercial roofing business within Supreme. Based in ${site.address.city}, we help owners and property leaders understand existing roof conditions before selecting coating and protection, restoration, or replacement.`}
        image={media.aerialPlant}
        imageAlt="Aerial view of a large industrial building and its roof system"
      />

      {/* ── Story ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <HouseEyebrow className="mb-5">
                  Why we exist
                </HouseEyebrow>
              </Reveal>
              <h2 className="display-lg mb-8">
                <RevealWords text="Replacement isn't the only answer" />
              </h2>

              <Reveal delay={0.15}>
                <div className="space-y-6 text-[1.02rem] leading-[1.85] text-black/68">
                  <p>
                    Aging does not automatically make a roof a viable
                    restoration candidate, and it does not automatically
                    require replacement. Replacement is a common
                    recommendation because it provides a complete new system,
                    and sometimes that is the right call.
                  </p>
                  <p>
                    We start further back. Every project begins with an
                    assessment and a documented account of what we found. Where
                    the condition supports restoration, it can cost less than
                    replacement and may reduce tear-off and disruption to
                    building operations.
                  </p>
                  <p>
                    When the substrate is gone, we say so and price the
                    replacement. What we won&rsquo;t do is put a coating over a
                    roof that can&rsquo;t carry one, or sell a replacement to
                    somebody who didn&rsquo;t need it.
                  </p>
                  <p>
                    That applies to every kind of commercial roof, not just flat
                    ones. Metal, TPO, mod-bit, built-up. We assess the system
                    that&rsquo;s on your building and go from there.
                  </p>
                  <p className="pl-5 border-l-[3px] border-[var(--supreme-red)] italic text-black/78">
                    Restore when viable. Replace when necessary. That&rsquo;s
                    the whole business.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.2} className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-5">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={media.heroCoating}
                    alt="Applying a reflective restoration coating to a commercial roof"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 h-[4px] bg-[var(--supreme-red)]" />
                </div>

                <div className="p-7 bg-[var(--ink-05)]">
                  <h3 className="display-sm mb-4">At a glance</h3>
                  <dl className="space-y-3.5 text-[0.9rem]">
                    {[
                      ["Legal entity", site.legalName],
                      ["Doing business as", site.dba],
                      ["Based in", `${site.address.city}, Texas`],
                      ["Focus", "Commercial roof restoration & replacement"],
                      ["Systems", "Metal, single-ply, mod-bit, BUR, low-slope"],
                      ["Insurance", "General liability to $2M"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between gap-4 pb-3 border-b border-black/[0.09]"
                      >
                        <dt className="text-black/48 shrink-0">{label}</dt>
                        <dd className="font-semibold text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Credentials />
      <CTABand />
    </>
  );
}
