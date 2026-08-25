import { FaqJsonLd } from "@/components/seo/JsonLd";

/**
 * The four commercial buyer questions. Commercial section 8.
 *
 * File 05 §2 specifies these four by name and adds: "Use the same visible
 * answers in `FAQPage` schema. Remove the remaining generic or defensive
 * questions."
 *
 * ── Why the questions and the schema share one array ───────────────────────
 *
 * The old page rendered a nine-question FAQ and emitted FAQ schema separately.
 * That is how a site ends up with schema describing answers the page no longer
 * shows — which file 02's metadata policy calls out directly ("Do not leave
 * inaccurate claims in schema after removing them from visible copy" and "Do
 * not emit FAQ schema for absent questions").
 *
 * Here `QUESTIONS` is the single source. The accordion and the JSON-LD both
 * read it, so they cannot disagree.
 *
 * ── The answers are conditional on purpose ─────────────────────────────────
 *
 * Every one of these questions invites an absolute answer, and the package
 * forbids all four absolutes: no exact remaining service life, no universal
 * warranty, no guaranteed savings, no "every roof". The answers describe what
 * determines the outcome rather than promising one.
 *
 * Native <details>, so the content is present with JavaScript off and
 * browser-find reaches it — file 04 §14's requirement that essential content
 * survive animation being disabled.
 */
const QUESTIONS = [
  {
    q: "When can a commercial roof be restored rather than replaced?",
    a: "When the assessment shows the existing system is serviceable, or can be brought to full serviceability through essential restoration repairs, and the roof meets the requirements of the system being considered. Relevant factors include current serviceability, moisture and substrate condition, compatibility with prior coatings or repairs, the condition of details and drainage, and the manufacturer's requirements. Roof type alone does not decide it, and neither does the age of the roof.",
  },
  {
    q: "When is roof replacement the appropriate recommendation?",
    /* File 06 §3 supplies this answer verbatim and requires the same text in
       the visible accordion and the FAQPage schema. Both read this array, so
       they cannot drift. */
    a: "Roof replacement is appropriate when the documented condition, expected performance, owner objectives, or project requirements make a new roof system the right project direction. Supreme Commercial Coatings evaluates those factors and recommends the solution the assessment supports.",
  },
  {
    q: "What happens during a commercial roof assessment?",
    a: "We get on the roof, review and document its current condition, and identify the work the roof requires. We then explain whether restoration and coating are viable or replacement is necessary, and set out the project-specific scope. Diagnostics beyond visual assessment — moisture surveys, core samples and similar — are used when conditions warrant rather than on every project.",
  },
  {
    q: "What determines system and warranty eligibility?",
    a: "The selected system, the project specification, installation requirements, manufacturer approval, inspections and submission procedures. Applicable warranty terms are identified in the project proposal before you authorize the work. Not every roof qualifies for every system, and warranty availability depends on the roof meeting the manufacturer's requirements.",
  },
];

export function BuyerQuestions() {
  return (
    <section className="scc-section bg-[var(--paper)]" aria-labelledby="questions-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Before you decide
            </p>
            <h2
              id="questions-heading"
              className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
            >
              Four questions buyers ask
            </h2>
          </div>

          {/* One simple accordion — file 05 §2 forbids a decorative card per
              question, which is what the old nine-question block used. */}
          <div className="lg:col-span-8">
            {QUESTIONS.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="group border-t border-[var(--scc-border)] last:border-b"
              >
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-[700] text-[var(--scc-ink)] transition-colors group-hover:text-[var(--scc-red)] lg:text-[1.125rem]">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-[var(--r-control)] border border-[var(--scc-border)] text-[var(--scc-ink)] transition-colors group-open:border-[var(--scc-red)] group-open:bg-[var(--scc-red)] group-open:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-open:rotate-45">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-6 text-[var(--t-body)] leading-[1.65] text-[var(--text-muted)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Same four answers, verbatim, in the schema. */}
      <FaqJsonLd items={QUESTIONS} />
    </section>
  );
}
