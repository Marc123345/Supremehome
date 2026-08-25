import { roofSystems } from "@/lib/site";

/**
 * Capabilities and roof systems. Commercial section 2.
 *
 * File 05 §2: "Replace the current very tall roof-system/card mosaic with one
 * structured index or annotated system image." The old block was a gallery of
 * large cards that ran a significant part of the page's height for what is,
 * in substance, a list.
 *
 * ── The distinction this section has to make ───────────────────────────────
 *
 * File 03 is explicit: "Distinguish systems SCC evaluates from systems SCC
 * installs, restores, or warrants." That is the single most dangerous
 * ambiguity on this page. Source of truth §3 spells out the limitation —
 * standing-seam restoration, TPO restoration, modified bitumen restoration and
 * built-up restoration "may be under development or may require
 * project-specific confirmation" and must not be presented as established
 * offerings.
 *
 * So the index is framed as what SCC ASSESSES, with one plain sentence
 * separating that from what SCC currently installs. Being able to assess a
 * roof type is not a claim to install a system on it, and this section says so
 * rather than leaving the reader to assume.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D1): the exact boundary. When SCC confirms
 * which systems it restores and warrants, that list becomes explicit here.
 */
export function RoofSystemsIndex() {
  return (
    <section id="roof-systems" className="scc-section bg-[var(--canvas)]" aria-labelledby="systems-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Capabilities and roof systems
            </p>
            <h2
              id="systems-heading"
              className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
            >
              The systems we assess
            </h2>
            <p className="scc-measure mt-5 text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
              Supreme assesses the commercial roof systems below and documents
              what each one is doing today.
            </p>

            {/* The boundary, stated plainly rather than implied. */}
            <div className="mt-6 border-l-2 border-[var(--scc-red)] pl-5">
              <p className="max-w-[56ch] text-[var(--t-body)] leading-[1.6] text-[var(--scc-ink)]">
                Assessing a roof type is not the same as installing a system on
                it. Coating and protection work is currently confirmed for
                appropriate exposed-fastener metal roofs, and replacement for
                appropriate low-slope projects. Anything beyond that is
                confirmed per project before it is proposed.
              </p>
            </div>
          </div>

          <dl className="lg:col-span-7">
            {roofSystems.map((s) => (
              <div
                key={s.slug}
                className="border-t border-[var(--scc-border)] py-5 last:border-b"
              >
                <dt className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                  {s.name}
                </dt>
                <dd className="mt-1.5 max-w-[62ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                  {s.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
