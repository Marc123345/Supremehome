import Link from "next/link";

/**
 * Complete commercial capability — homepage section 2.
 *
 * File 05 §1.2: "Use one compact band or split layout, not five large cards."
 * The old homepage answered this with a wall of service cards, which is the
 * pattern file 04 §16 restricts to the solution comparison and project proof
 * only. So this is a numbered index: a structured list, one line each.
 *
 * The five entries are the package's own list, in its order. The point of the
 * section is that SCC does all five under one company — presenting them as
 * five equal cards makes them read as five separate offers, which is the
 * "coating contractor that occasionally replaces roofs" perception the package
 * is trying to correct.
 *
 * ⚠ SCC INPUT REQUIRED (file 03): the exact service and roof-system boundaries
 * before production. The descriptions here stay at capability level and do not
 * name systems SCC has not confirmed it installs, restores or warrants.
 */
const CAPABILITIES = [
  {
    title: "Commercial Roof Assessment and Planning",
    body: "We get on the roof, document its current condition, and define the project the building actually needs.",
  },
  {
    title: "Commercial Roof Repair and Restoration",
    body: "Essential restoration repairs, detailing and preparation where the assessment shows the system can be brought back to full serviceability.",
  },
  {
    title: "Coating and Protection Systems",
    body: "Elastomeric, silicone and aluminum families installed to the manufacturer's requirements for the specified system.",
  },
  {
    title: "Commercial Roof Replacement",
    body: "Complete replacement when condition, expected performance or project requirements make it the right direction.",
  },
  {
    title: "Related Commercial Construction",
    body: "Associated scope coordinated through the same accountable company, confirmed per project.",
  },
];

export function CapabilityIndex() {
  return (
    <section className="scc-section bg-[var(--paper)]" aria-labelledby="capability-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Complete commercial capability
            </p>
            <h2
              id="capability-heading"
              className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2)] text-[var(--scc-ink)]"
            >
              One company, the whole roof
            </h2>
            <p className="scc-measure mt-5 text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
              Supreme Commercial Coatings is not a coating contractor that
              occasionally replaces roofs, and not a replacement contractor that
              offers coatings as an alternative. The assessment determines the
              direction; the same company delivers it.
            </p>
            <Link
              href="/commercial-roofing"
              className="mt-7 inline-flex min-h-[44px] items-center text-[0.9375rem] font-[700] text-[var(--scc-red)] underline underline-offset-4"
            >
              See commercial capabilities in detail
            </Link>
          </div>

          {/* A numbered index, not a card grid. */}
          <ol className="lg:col-span-7">
            {CAPABILITIES.map((c, i) => (
              <li
                key={c.title}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-[var(--scc-border)] py-6 last:border-b"
              >
                <span
                  aria-hidden
                  className="font-display text-[1.5rem] leading-none text-[var(--scc-red)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.125rem] font-[700] text-[var(--scc-ink)] lg:text-[1.1875rem]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 max-w-[58ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
