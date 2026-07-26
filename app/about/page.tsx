import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Credentials } from "@/components/sections/Credentials";
import { Proof } from "@/components/sections/Proof";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Supreme Home Roofing & Construction",
  description:
    "Supreme Home Roofing and Construction, DBA Supreme Commercial Coatings — a Katy, TX roofing contractor built around restoring commercial roofs rather than replacing them.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Who we are"
        title="The restore-first roofing contractor"
        intro={`${site.name}, trading as ${site.dba}. Based in ${site.address.city} and built around one conviction: a roof nearing the end of its life does not automatically need replacing.`}
        image={media.aerialPlant}
        imageAlt="Aerial view of a large industrial building with a flat roof"
      />

      {/* ── Story ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-[var(--supreme-red)] mb-5">
                  Why we exist
                </p>
              </Reveal>
              <h2 className="display-lg mb-8">
                <RevealWords text="Replacement is not the only answer" />
              </h2>

              <Reveal delay={0.15}>
                <div className="space-y-6 text-[1.02rem] leading-[1.85] text-black/68">
                  <p>
                    Walk a building owner through three quotes for an ageing flat
                    roof and you will usually see the same thing three times:
                    full tear-off and replacement. Not because the roof always
                    needs it, but because replacement carries the highest price
                    tag.
                  </p>
                  <p>
                    We built this company the other way round. Every project
                    starts with an inspection and a written assessment. If the
                    deck and insulation are dry and the membrane is weathered
                    rather than failed, a certified coating system will renew
                    that roof for a fraction of replacement cost — no tear-off,
                    and the building stays open.
                  </p>
                  <p>
                    When the substrate is genuinely gone, we say so plainly and
                    quote the replacement. What we will not do is sell a coating
                    over a roof that cannot carry one, or a replacement over a
                    roof that did not need one.
                  </p>
                  <p className="pl-5 border-l-[3px] border-[var(--supreme-red)] italic text-black/78">
                    Our goal is to be the commercial roofing restoration company
                    Houston property managers and building owners call first.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.2} className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-5">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={media.heroCoating}
                    alt="Applying a reflective restoration coating to a commercial flat roof"
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
                      ["Trading as", site.dba],
                      ["Based in", `${site.address.city}, Texas`],
                      ["Focus", "Commercial roof restoration & coatings"],
                      ["Also", "Residential roofing & storm restoration"],
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
      <Proof />
      <CTABand />
    </>
  );
}
