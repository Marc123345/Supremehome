import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { Recommendations } from "@/components/sections/Recommendations";
import { Credentials } from "@/components/sections/Credentials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { SlidingText } from "@/components/sections/SlidingText";
import { CoverageMap } from "@/components/sections/CoverageMap";
import {
  FaqJsonLd,
  BreadcrumbJsonLd,
  ServicesJsonLd,
} from "@/components/seo/JsonLd";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { locations, getLocation } from "@/lib/locations";
import { media, site, restorationBenefits } from "@/lib/site";
import { HouseEyebrow } from "@/components/ui/HouseMark";

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
    title: `Commercial Roofing in ${location.name}, TX`,
    description: `Commercial roof assessment, restoration and replacement in ${location.name}, ${location.county}. ${site.name} documents the roof's current condition before recommending restoration when viable or replacement when necessary.`,
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

      <BreadcrumbJsonLd
        trail={[
          { name: "Service Areas", path: "/service-areas" },
          { name: location.name, path: `/service-areas/${location.slug}` },
        ]}
      />
      <ServicesJsonLd areaServed={location.name} />

      <PageHero
        breadcrumb={location.name}
        eyebrow={`${location.county} · Texas`}
        title={`Roofing in ${location.name}`}
        intro={location.intro}
        image={media.loadingDocks}
        imageAlt={`Loading docks and low-slope roofing of the kind found across ${location.name}, Texas`}
      />

      {/* ── Local detail ── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <HouseEyebrow className="mb-5">
                  Serving {location.name}
                </HouseEyebrow>
              </Reveal>
              <h2 className="display-lg mb-8">
                <RevealWords text={`Commercial roofing in ${location.name}`} />
              </h2>

              {/* This block used to run "Building stock." and "Why roofs fail
                  here." — two invented paragraphs per city. See the note at the
                  top of lib/locations.ts. What replaces them is the approved
                  neutral language, which is true of every roof we assess. */}
              <Reveal delay={0.15}>
                <div className="space-y-6 text-[1rem] leading-[1.85] text-black/68">
                  <p>
                    Commercial roofs can perform differently even within the
                    same area. The recommended path depends on the specific
                    roof&rsquo;s condition, serviceability, moisture, substrate
                    integrity, compatibility, detailing needs, and the
                    owner&rsquo;s objectives.
                  </p>
                  <p className="pl-5 border-l-[3px] border-[var(--supreme-red)] italic text-black/75">
                    Every {location.name} inquiry starts the same way: a
                    no-cost assessment of the roof you have, documented, with a
                    recommendation of coating and protection, restoration, or
                    replacement based on what that assessment supports.
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
                    Request a commercial roof assessment
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
      <Recommendations />

      <ServicesSlider
        eyebrow={`Services in ${location.name}`}
        title={`What we do in ${location.name}`}
        intro={`Commercial roof assessment, coating and protection, essential restoration repairs and roof replacement across ${location.county}.`}
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

      <FaqJsonLd />
      <FAQ />
      <CTABand />
    </>
  );
}
