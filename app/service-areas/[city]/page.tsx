import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { RestorationLadder } from "@/components/sections/RestorationLadder";
import { Credentials } from "@/components/sections/Credentials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { SlidingText } from "@/components/sections/SlidingText";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { locations, getLocation } from "@/lib/locations";
import { media, site, restorationBenefits } from "@/lib/site";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) return {};

  return {
    title: `Commercial & Residential Roofing in ${location.name}, TX`,
    description: `Roof restoration, coatings, repair and replacement in ${location.name}, ${location.county}. Free inspection and written assessment from ${site.name} — insured to $2M and manufacturer certified.`,
    alternates: { canonical: `/service-areas/${location.slug}` },
    openGraph: {
      title: `Roofing in ${location.name}, TX | ${site.shortName}`,
      description: location.intro,
      url: `${site.url}/service-areas/${location.slug}`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: `${site.name} — ${location.name}`,
    telephone: site.phone,
    email: site.email,
    url: `${site.url}/service-areas/${location.slug}`,
    areaServed: { "@type": "City", name: `${location.name}, TX` },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    description: location.intro,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <PageHero
        breadcrumb={location.name}
        eyebrow={`${location.county} · Texas`}
        title={`Roofing in ${location.name}`}
        intro={location.intro}
        image={media.aerialCommercial}
        imageAlt={`Commercial buildings with flat roofs of the kind found across ${location.name}, Texas`}
      />

      {/* ── Local detail ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-[var(--supreme-red)] mb-5">
                  On the ground in {location.name}
                </p>
              </Reveal>
              <h2 className="display-lg mb-8">
                <RevealWords text={`What we see on ${location.name} roofs`} />
              </h2>

              <Reveal delay={0.15}>
                <div className="space-y-6 text-[1rem] leading-[1.85] text-black/68">
                  <p>
                    <strong className="text-black">Building stock. </strong>
                    {location.buildingStock}
                  </p>
                  <p>
                    <strong className="text-black">Why roofs fail here. </strong>
                    {location.localAngle}
                  </p>
                  <p className="pl-5 border-l-[3px] border-[var(--supreme-red)] italic text-black/75">
                    Every {location.name} enquiry starts the same way: a free
                    inspection, core samples where the roof warrants them, and a
                    written report telling you whether this is a repair, a
                    restoration or a genuine replacement.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-3 mt-9">
                  <a href={site.phoneHref} className="btn btn-primary">
                    <Phone size={16} />
                    {site.phone}
                  </a>
                  <Link href="/contact" className="btn btn-ghost-dark">
                    Book a free inspection
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-5">
                <Reveal direction="left">
                  <div className="p-7 bg-[var(--ink-05)] border-l-[4px] border-[var(--supreme-red)]">
                    <h3 className="display-sm mb-5">
                      Also covering, near {location.name}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {location.nearby.map((area) => (
                        <li
                          key={area}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black/[0.09] text-[0.82rem]"
                        >
                          <MapPin
                            size={12}
                            className="text-[var(--supreme-red)] shrink-0"
                          />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal direction="left" delay={0.1}>
                  <div className="p-7 bg-[var(--ink-90)] text-white noise relative">
                    <h3 className="display-sm mb-5">
                      Why restoration wins in {location.name}
                    </h3>
                    <ul className="space-y-3">
                      {restorationBenefits.slice(0, 4).map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <span className="mt-1 shrink-0 grid place-items-center w-[17px] h-[17px] rounded-full bg-[var(--supreme-red)]">
                            <Check
                              size={10}
                              strokeWidth={3.5}
                              className="text-white"
                            />
                          </span>
                          <span className="text-[0.88rem] leading-[1.6] text-white/72">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SlidingText />
      <RestorationLadder />

      <ServicesSlider
        eyebrow={`Services in ${location.name}`}
        title={`What we do in ${location.name}`}
        intro={`Commercial restoration and coatings, repairs, storm work and full replacement — plus residential roofing across ${location.county}.`}
      />

      <Credentials />

      {/* ── Other locations — interactive coverage map ── */}
      <CoverageMap
        activeSlug={location.slug}
        eyebrow="Elsewhere in Greater Houston"
        titleLead="Other areas"
        titleAccent="We cover."
        quote={`“${location.name} is one of ${locations.length} communities we cover. Pick any tile to see what we find on roofs there.”`}
        showTargets={false}
      />

      <FAQ />
      <CTABand />
    </>
  );
}
