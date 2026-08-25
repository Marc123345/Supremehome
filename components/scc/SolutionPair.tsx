import Image from "next/image";

/**
 * The two coequal solution directions. Shared by the homepage and Commercial.
 *
 * ── The one rule this component exists to enforce ──────────────────────────
 *
 * File 04 §3: "Do not assign red to restoration and black to replacement. Both
 * solution directions must receive identical visual authority." File 05 §1.3:
 * "Render the two solution directions as identical panels on a neutral
 * surface; never use color to imply a preferred outcome."
 *
 * The old page had two coating paths and one replacement path — a 2:1 split
 * that told the visitor which answer the company preferred before anyone had
 * been on the roof. That is the single most important content correction in
 * the package, and the way to keep it fixed is structural: both panels render
 * from the same array through the same markup, so making one louder than the
 * other requires editing the component rather than the data.
 *
 * Same grid, same image ratio, same heading level, same body length, same
 * surface. No accent colour on either.
 *
 * ⚠ SCC INPUT REQUIRED (file 03): the standard repair/maintenance service
 * definition. The supporting line below is deliberately the package's neutral
 * wording until SCC supplies theirs.
 */
const DIRECTIONS = [
  {
    key: "restore",
    title: "Restore and Protect the Existing Roof",
    body: "A viable existing system can receive the repair, restoration, preparation and protection scope established by the assessment.",
    detail:
      "Where the roof is serviceable — or can be made serviceable through essential restoration repairs — restoring and protecting it keeps the existing assembly in service and avoids much of the tear-off associated with replacement.",
    image: "/photos/system-exposed-fastener-metal.jpg",
    alt: "Exposed-fastener metal roof panels and fasteners on a commercial building",
  },
  {
    key: "replace",
    title: "Install a New Roof System",
    body: "Condition, expected performance, owner objectives or project requirements can make replacement the correct project direction.",
    detail:
      "Where restoration is not viable, or where the building's requirements call for a new assembly, replacement is the recommendation — planned, executed and closed out through the same company that assessed the roof.",
    image: "/photos/commercial-roof-bays.jpg",
    alt: "Low-slope commercial roof bays on a large building",
  },
];

export function SolutionPair({
  eyebrow = "Assessment-led solution direction",
  heading = "The assessment decides the direction",
  intro,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="scc-section bg-[var(--canvas)]" aria-labelledby="solutions-heading">
      <div className="shell">
        <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
        <h2
          id="solutions-heading"
          className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2)] text-[var(--scc-ink)]"
        >
          {heading}
        </h2>
        {intro && (
          <p className="scc-measure mt-5 [font-size:var(--t-lead)] leading-[1.6] text-[var(--text-muted)]">
            {intro}
          </p>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {DIRECTIONS.map((d) => (
            <article
              key={d.key}
              className="flex flex-col overflow-hidden rounded-[var(--r-frame)] border border-[var(--scc-border)] bg-[var(--paper)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={d.image}
                  alt={d.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-9">
                <h3 className="text-[1.375rem] font-[700] leading-[1.25] text-[var(--scc-ink)] lg:text-[1.5rem]">
                  {d.title}
                </h3>
                <p className="mt-4 text-[var(--t-body)] leading-[1.6] text-[var(--scc-ink)]">
                  {d.body}
                </p>
                <p className="mt-4 text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                  {d.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="scc-measure mt-8 text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
          Some assessments call for targeted repair or maintenance rather than a
          system-level restoration or replacement project.
        </p>
      </div>
    </section>
  );
}
