import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { FinalCta } from "@/components/scc/FinalCta";
import { BreadcrumbJsonLd, ServicesJsonLd } from "@/components/seo/JsonLd";
import { locations, getLocation } from "@/lib/locations";
import { site } from "@/lib/site";

/**
 * CITY ROUTE — rebuilt to the concise template in file 05 §6.
 *
 * ── What this replaced ─────────────────────────────────────────────────────
 *
 * The review measured the Houston page at ~952 words and ~8,400px and called
 * it what it was: "functions as a duplicate commercial sales page." Eighteen
 * of them existed, each carrying the full decision framework, a services
 * slider, the coverage map, a nine-question FAQ with its own schema, and a
 * "Why restoration wins in [City]" section.
 *
 * Everything on file 03's REMOVE list is gone: the solution framework, the
 * service cards, the full map, the FAQ and its schema, the marquee, and the
 * "Why restoration wins" block — which was also the worst offender on claims,
 * since it asserted local restoration outcomes nobody had verified.
 *
 * The template is now five things: coverage, one capability paragraph, local
 * proof, nearby areas, one CTA.
 *
 * ── The indexing rule, which is the consequential part ─────────────────────
 *
 * File 05 §6: "Set every city page without verified local proof to `noindex`
 * and remove it from the production sitemap. Do not invent local facts to
 * manufacture uniqueness."
 *
 * `location.proof` is the switch. No location has it today, so ALL EIGHTEEN
 * city pages are currently `noindex` and excluded from the sitemap. That is
 * the correct state: a page whose only content is "we cover this city" has no
 * business competing in search, and eighteen near-identical ones are a
 * liability rather than a footprint.
 *
 * Add a verified `proof` entry to a location in lib/locations and that page
 * becomes indexable on its own. Nothing else changes.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D9): the city-to-project mapping. Which
 * cities have a real nearby project, photograph, or verified operational fact.
 * Do not populate `proof` with anything SCC has not confirmed.
 */

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

  const hasProof = Boolean(location.proof);

  return {
    /* File 06 §7 title pattern, with `absolute` so the root template does not
       append the brand a second time. The visible H1 says the same thing. */
    title: {
      absolute: `Commercial Roofing in ${location.name}, TX | ${site.name}`,
    },
    description: `Commercial roof assessment, restoration and replacement in ${location.name}, ${location.county}. ${site.name} documents the roof's current condition before recommending restoration when viable or replacement when necessary.`,
    alternates: { canonical: `/service-areas/${location.slug}` },
    openGraph: {
      title: `Commercial Roofing in ${location.name}, TX | ${site.name}`,
      url: `/service-areas/${location.slug}`,
      type: "website",
    },
    /* No verified local proof, no index. See the note above. */
    ...(hasProof ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) notFound();

  const others = locations.filter((l) => l.slug !== location.slug).slice(0, 6);

  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: "Service areas", path: "/service-areas" },
          { name: location.name, path: `/service-areas/${location.slug}` },
        ]}
      />
      <ServicesJsonLd areaServed={location.name} />

      {/* 1. Compact hero — coverage, verified. */}
      <section className="border-b border-[var(--scc-border)] bg-[var(--paper)] pt-12 pb-10 lg:pt-14 lg:pb-12">
        <div className="shell">
          <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Service area
          </p>
          <h1 className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2)] text-[var(--scc-ink)]">
            Commercial Roofing in {location.name}, Texas
          </h1>
          <p className="scc-measure mt-4 [font-size:var(--t-lead)] leading-[1.6] text-[var(--text-muted)]">
            Supreme Commercial Coatings serves commercial properties in{" "}
            {location.name} and the surrounding {location.county} area. We
            assess existing roof conditions, document what we find, and
            recommend restoration and coating when viable, or replacement when
            necessary.
          </p>
        </div>
      </section>

      {/* 2. One concise capability paragraph. Not a service-card block. */}
      <section className="scc-section-compact bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-[1.375rem] font-[700] text-[var(--scc-ink)]">
                What we do in {location.name}
              </h2>
              <p className="scc-measure mt-4 text-[var(--t-body)] leading-[1.65] text-[var(--text-muted)]">
                Commercial roof assessment and planning, repair and
                restoration, coating and protection systems, complete roof
                replacement, and related commercial construction — delivered
                through one accountable company. Commercial roofs can perform
                differently even within the same area, so the recommended path
                depends on the specific roof&rsquo;s condition, serviceability,
                moisture, substrate integrity, compatibility, detailing needs,
                and the owner&rsquo;s objectives.
              </p>
              <Link
                href="/commercial-roofing"
                className="mt-5 inline-flex min-h-[44px] items-center text-[0.9375rem] font-[700] text-[var(--scc-red)] underline underline-offset-4"
              >
                See how the assessment decides the direction
              </Link>
            </div>

            {/* 3. Local proof — or an honest absence of it. */}
            <div className="lg:col-span-5">
              {location.proof ? (
                <div className="rounded-[var(--r-frame)] border border-[var(--scc-border)] bg-[var(--canvas)] p-6">
                  <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Local work
                  </p>
                  <p className="mt-3 text-[var(--t-body)] leading-[1.6] text-[var(--scc-ink)]">
                    {location.proof}
                  </p>
                </div>
              ) : null}

              {/* 4. Nearby areas and the Service Areas link. */}
              <div className={location.proof ? "mt-6" : ""}>
                <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Nearby
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/service-areas/${o.slug}`}
                        className="inline-flex min-h-[36px] items-center rounded-[var(--r-control)] border border-[var(--scc-border)] px-3 text-[0.875rem] text-[var(--scc-ink)] transition-colors hover:border-[var(--scc-ink)]"
                      >
                        {o.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/service-areas"
                  className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-[700] text-[var(--scc-ink)] underline underline-offset-4"
                >
                  <MapPin size={15} className="text-[var(--scc-red)]" />
                  All service areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. One CTA. */}
      <FinalCta />
    </>
  );
}
