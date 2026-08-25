import type { Metadata } from "next";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { FinalCta } from "@/components/scc/FinalCta";
import { serviceAreas, site } from "@/lib/site";

/**
 * SERVICE AREAS — rebuilt to file 05 §5.
 *
 * ── Its one job ────────────────────────────────────────────────────────────
 *
 * "Provide the single authoritative coverage destination." This is now the
 * only route on the site carrying the full map and the city directory — the
 * header mega-dropdown, the mobile menu list, the footer's eighteen links and
 * the per-city maps have all been consolidated here.
 *
 * ── What was rewritten, and why it mattered ────────────────────────────────
 *
 * File 03 marks "Local crews, documented work" as REWRITE: "Use verified
 * coverage and project-logistics facts supplied by SCC."
 *
 * The three cards under that heading were the problem. Read closely they said
 * almost nothing — scheduling "depends on location, roof access, urgency,
 * weather, project size and current workload", after a storm "call us and we
 * will confirm what we can do", multiple buildings "tell us what you have and
 * we will confirm". Three cards to say "call us" three times, under a heading
 * claiming local crews and documented work, neither of which is verified.
 *
 * That is exactly the "repeated sales-card sequence" file 05 §5 asks to
 * remove, and the heading is an unverified operational claim. Both are gone.
 * What replaces them is the coverage facts that are actually true: where SCC
 * is based, what the coverage area is, and how to ask about an unlisted
 * location — which the package requires this page to explain.
 *
 * ── The oversized hero also went ───────────────────────────────────────────
 *
 * "Keep the page concise and factual." A photographic PageHero above a map is
 * two large visual objects before any coverage information; the map is the
 * page's content, so it comes first after a compact introduction.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D8): confirmed cities and counties, the
 * policy for unlisted locations, and any real project-logistics facts. When
 * those arrive this page can say something specific about how coverage
 * actually works rather than only where it reaches.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/service-areas" },
  title: "Commercial Roofing Service Areas Across Greater Houston",
  description: `${site.name} serves commercial properties in ${serviceAreas
    .slice(0, 8)
    .join(", ")} and more across the Greater Houston area from our ${site.address.city}, TX base.`,
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* Compact introduction, not a photographic hero. */}
      <section className="border-b border-[var(--scc-border)] bg-[var(--paper)] pt-12 pb-10 lg:pt-14 lg:pb-12">
        <div className="shell">
          <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Service areas
          </p>
          <h1 className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2)] text-[var(--scc-ink)]">
            Commercial roofing across Greater Houston
          </h1>
          <p className="scc-measure mt-4 [font-size:var(--t-lead)] leading-[1.6] text-[var(--text-muted)]">
            Supreme Commercial Coatings serves commercial properties across the
            Greater Houston communities below, from its {site.address.city}{" "}
            base.
          </p>
        </div>
      </section>

      {/* The map and directory. The only place on the site either appears. */}
      <CoverageMap />

      {/* Coverage facts. No cards, no repeated call-to-action sequence. */}
      <section className="scc-section-compact bg-[var(--paper)]" aria-labelledby="coverage-heading">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2
                id="coverage-heading"
                className="font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
              >
                How coverage works
              </h2>
            </div>

            <dl className="lg:col-span-7">
              <div className="border-t border-[var(--scc-border)] py-5">
                <dt className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                  Where we are based
                </dt>
                <dd className="mt-1.5 max-w-[62ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                  {site.address.full}
                </dd>
              </div>

              <div className="border-t border-[var(--scc-border)] py-5">
                <dt className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                  Properties outside the listed areas
                </dt>
                <dd className="mt-1.5 max-w-[62ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                  Commercial inquiries outside the listed communities are
                  welcome. Call or send the property details and we will confirm
                  whether the project is a fit before anything is scheduled.
                </dd>
              </div>

              <div className="border-t border-[var(--scc-border)] py-5 last:border-b">
                <dt className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                  More than one building
                </dt>
                <dd className="mt-1.5 max-w-[62ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                  Tell us what you have and where. We will confirm what we can
                  assess and in what order.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
