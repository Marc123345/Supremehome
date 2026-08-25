import Image from "next/image";

/**
 * What SCC evaluates, and how the work moves forward — homepage section 5.
 *
 * File 05 §1.5 asks for one split section: assessment criteria on one side,
 * process and client deliverables on the other. File 04 wants it rendered as
 * "one annotated image plus a 4-5 stage process spine" rather than another
 * card grid.
 *
 * ── What is deliberately vague, and why ────────────────────────────────────
 *
 * The criteria list is safe: these are the things any competent assessment
 * looks at, and the package supplies the list itself.
 *
 * The process stages are NOT safe to detail. File 02's claims controls forbid
 * publishing universal reports, photography, testing, moisture surveys, core
 * samples, infrared scanning or exact remaining service life unless SCC
 * confirms each is part of the standard assessment for every applicable
 * project — and SCC has not. So the stages describe the shape of the work and
 * stop short of promising a deliverable.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D2): the standard assessment steps and
 * deliverables. When they arrive, the `deliverables` list below becomes
 * specific and this section gets materially stronger. Do not guess it.
 */
const CRITERIA = [
  "Existing roof system and current serviceability",
  "Visible moisture and substrate indicators, with project-specific diagnostics as conditions warrant",
  "Seams, fasteners, flashings, penetrations, curbs, drains and details",
  "Drainage and ponding conditions",
  "Prior repairs, prior coatings and compatibility",
  "Manufacturer requirements for any system under consideration",
  "Expected performance, owner objectives and project requirements",
];

const STAGES = [
  {
    title: "Assessment",
    body: "We get on the roof and document its current condition.",
  },
  {
    title: "Recommendation",
    body: "Restoration and coating when viable, replacement when necessary — with the reasoning behind it.",
  },
  {
    title: "Project-specific scope and proposal",
    body: "The work the roof requires, written down, with applicable warranty terms identified before you authorize anything.",
  },
  {
    title: "Execution and quality control",
    body: "Installed to the approved specification, with checks as the work goes down.",
  },
  {
    title: "Closeout",
    body: "Final inspection and the project documentation that applies to the system installed.",
  },
];

export function AssessmentAndProcess() {
  return (
    <section className="scc-section bg-[var(--paper)]" aria-labelledby="assessment-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Criteria, with the annotated image the spec asks for. */}
          <div className="lg:col-span-6">
            <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              What we evaluate
            </p>
            <h2
              id="assessment-heading"
              className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
            >
              What the assessment looks at
            </h2>

            <div className="relative mt-7 aspect-[16/10] overflow-hidden rounded-[var(--r-frame)]">
              <Image
                src="/photos/weathered-lowslope-roof.jpg"
                alt="A weathered low-slope commercial roof showing seams, penetrations and ponding areas"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <ul className="mt-7 space-y-3">
              {CRITERIA.map((c) => (
                <li
                  key={c}
                  className="grid grid-cols-[auto_1fr] gap-x-3 text-[var(--t-body)] leading-[1.6] text-[var(--scc-ink)]"
                >
                  <span aria-hidden className="mt-2.5 h-px w-3 bg-[var(--scc-red)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The process spine. */}
          <div className="lg:col-span-6">
            <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              How the work moves forward
            </p>
            <h2 className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]">
              From assessment to closeout
            </h2>

            <ol className="mt-8">
              {STAGES.map((s, i) => (
                <li key={s.title} className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-8 last:pb-0">
                  {/* The spine. A rule between the markers rather than a
                      border on each item, so the last stage has no trailing
                      line hanging off it. */}
                  {i < STAGES.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[15px] top-8 bottom-0 w-px bg-[var(--scc-border)]"
                    />
                  )}
                  <span
                    aria-hidden
                    className="relative z-10 grid size-8 place-items-center rounded-full bg-[var(--scc-red)] font-display text-[0.9375rem] leading-none text-white"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 max-w-[56ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
