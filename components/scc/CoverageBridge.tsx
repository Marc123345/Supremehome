import Link from "next/link";
import { site, residentialBrand } from "@/lib/site";

/**
 * Coverage and residential bridge — homepage section 6.
 *
 * File 05 §1.6: "one short Greater Houston coverage statement and Service
 * Areas link. Do not display the map or city directory." Plus one compact
 * Supreme Home Roofing bridge.
 *
 * The homepage previously carried the full interactive map and all eighteen
 * cities. That is now Service Areas' job and only Service Areas' job — the
 * same consolidation applied to the header, the mobile menu and the footer.
 *
 * Both halves sit in one compact utility band because neither is a selling
 * point: coverage is a qualifying fact, and the residential link exists to get
 * the wrong visitor off a commercial page quickly rather than to convert them.
 */
export function CoverageBridge() {
  return (
    <section className="scc-section-compact border-y border-[var(--scc-border)] bg-[var(--canvas)]">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-[1.25rem] font-[700] text-[var(--scc-ink)]">
              Commercial roofing across Greater Houston
            </h2>
            <p className="scc-measure mt-3 text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
              Supreme Commercial Coatings serves commercial properties in{" "}
              {site.address.city} and the surrounding counties. If your property
              is outside the listed areas, ask — coverage depends on the project.
            </p>
            <Link
              href="/service-areas"
              className="mt-4 inline-flex min-h-[44px] items-center text-[0.9375rem] font-[700] text-[var(--scc-red)] underline underline-offset-4"
            >
              See service areas
            </Link>
          </div>

          {/* The residential bridge, visually secondary and clearly a
              different business — not a service SCC is cross-selling. */}
          <div className="lg:col-span-5">
            <div className="rounded-[var(--r-frame)] border border-[var(--scc-border)] bg-[var(--paper)] p-6">
              <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Looking for home roofing?
              </p>
              <p className="mt-2 text-[var(--t-body)] leading-[1.6] text-[var(--scc-ink)]">
                {residentialBrand.name} handles residential roofing for Greater
                Houston homeowners.
              </p>
              <Link
                href={residentialBrand.externalUrl ?? residentialBrand.path}
                {...(residentialBrand.externalUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-3 inline-flex min-h-[44px] items-center text-[0.9375rem] font-[700] text-[var(--scc-ink)] underline underline-offset-4"
              >
                Visit {residentialBrand.shortName}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
