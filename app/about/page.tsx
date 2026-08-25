import type { Metadata } from "next";
import Image from "next/image";
import { ProjectProof } from "@/components/scc/ProjectProof";
import { FinalCta } from "@/components/scc/FinalCta";
import { site, commercialManufacturers } from "@/lib/site";

/**
 * ABOUT — rebuilt to file 05 §3.
 *
 * ── What this replaced ─────────────────────────────────────────────────────
 *
 * ~300 words across ~3,500px, and the review's finding was that it "repeats
 * philosophy instead of establishing the company". It re-argued the
 * assessment-first case a third time (after the homepage and Commercial), and
 * its most prominent block was an "At a glance" grid of legal-entity fields.
 *
 * File 03: "Remove the current legal-entity/DBA grid now. Reintroduce exact
 * legal naming only after SCC supplies the governing relationship." Done —
 * and it does not come back on a guess. The source of truth is explicit that
 * the legal entity "must be confirmed before publication. Do not infer the
 * legal name from the brand name."
 *
 * ── The honest problem with this page ──────────────────────────────────────
 *
 * Four of the seven required sections need facts SCC has not supplied: named
 * people with roles and photographs, exact manufacturer designations,
 * insurance and bonding, and the brand/legal relationship.
 *
 * The package's instruction for exactly this case is to build the component
 * and request the material, not to omit the content need or invent filler. So
 * the people and qualifications sections are built and render what is
 * genuinely known today, with the gaps stated plainly rather than papered
 * over with stock portraits and badge graphics.
 *
 * ⚠ SCC INPUT REQUIRED (file 03): A3 brand/legal relationship, D4 credentials
 * and insurance/bonding, D5 people. Each one materially strengthens a section
 * that currently reads thin — which is the correct pressure.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Supreme Commercial Coatings",
  description:
    "Supreme Commercial Coatings serves Greater Houston commercial property owners with assessment-led roof repair, restoration, coating systems, replacement and related commercial construction.",
};

/** How SCC works. Process categories, not deliverable promises — the standard
 *  deliverables are D2 on the request list and are not published until
 *  confirmed. */
const OPERATING = [
  [
    "Scope",
    "The work is defined from the documented condition of the roof and the requirements of the project, then written into a project-specific scope before anything is authorized.",
  ],
  [
    "Communication",
    "One commercial contact stays with the project from assessment through closeout.",
  ],
  [
    "Quality control",
    "Checks run as the work goes down rather than only at completion, against the approved specification for the system being installed.",
  ],
  [
    "Warranty administration",
    "Applicable warranty terms are identified in the proposal, and the submission and inspection steps that warranty depends on are completed as part of the project.",
  ],
  [
    "Closeout",
    "Final inspection and the project documentation that applies to the system installed.",
  ],
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Who SCC is. A documentary company image, not another roof-only
             campaign hero (file 05 §3, required visual execution). */}
      <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-[var(--surface-dark)] lg:min-h-[460px]">
        <Image
          src="/photos/crew-roof-repair.jpg"
          alt="A Supreme crew working on a commercial roof"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,17,19,0.92) 0%, rgba(15,17,19,0.78) 42%, rgba(15,17,19,0.30) 75%, rgba(15,17,19,0.12) 100%)",
          }}
        />
        <div className="shell relative z-10 py-14 lg:py-16">
          <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.2em] text-white/75">
            About
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display uppercase leading-[1.04] [font-size:var(--t-h2)] text-white">
            One accountable commercial roofing company
          </h1>
        </div>
      </section>

      {/* 2. Who SCC is, and one company for both directions. */}
      <section className="scc-section bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {/* The package's own safe company-position foundation. */}
              <p className="scc-measure [font-size:var(--t-lead)] leading-[1.6] text-[var(--scc-ink)]">
                Supreme Commercial Coatings serves Greater Houston commercial
                property owners with assessment-led roof repair, restoration,
                coating systems, replacement and related commercial
                construction. SCC evaluates the existing roof, defines the
                project-specific scope, and carries the appropriate solution
                through one accountable commercial roofing company.
              </p>
              <p className="scc-measure mt-5 text-[var(--t-body)] leading-[1.65] text-[var(--text-muted)]">
                Restoration and protection and replacement are coequal
                capabilities here. Which one a building gets is decided by the
                roof&rsquo;s documented condition, the performance the building
                needs, the owner&rsquo;s objectives and the project&rsquo;s
                requirements — not by what is easiest to sell.
              </p>
            </div>

            <div className="lg:col-span-5">
              {/* Where the legal/DBA grid used to be. */}
              <div className="rounded-[var(--r-frame)] border border-[var(--scc-border)] bg-[var(--canvas)] p-6">
                <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Based in
                </p>
                <p className="mt-2 text-[1.0625rem] text-[var(--scc-ink)]">
                  {site.address.full}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-[1.6] text-[var(--text-muted)]">
                  Serving commercial properties across Greater Houston and the
                  surrounding counties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How SCC works. */}
      <section className="scc-section bg-[var(--canvas)]" aria-labelledby="operating-heading">
        <div className="shell">
          <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            How we work
          </p>
          <h2
            id="operating-heading"
            className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
          >
            Operating standards
          </h2>

          <dl className="mt-8 grid gap-x-16 gap-y-0 lg:grid-cols-2">
            {OPERATING.map(([label, body]) => (
              <div key={label} className="border-t border-[var(--scc-border)] py-5">
                <dt className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                  {label}
                </dt>
                <dd className="mt-1.5 max-w-[58ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4 + 5. People, and verified qualifications. Both built, both waiting
             on SCC. The absence is stated rather than filled. */}
      <section className="scc-section bg-[var(--paper)]" aria-labelledby="people-heading">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                People and accountability
              </p>
              <h2
                id="people-heading"
                className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
              >
                Who you deal with
              </h2>
              <p className="scc-measure mt-5 text-[var(--t-body)] leading-[1.65] text-[var(--text-muted)]">
                One commercial contact stays with the project from the
                assessment through to closeout. You are not handed to a
                rotating account manager after you sign.
              </p>
              {/* ⚠ Named people, roles, responsibilities and photographs are
                  D5 on the SCC request. No invented biography, no stock
                  portrait, and no placeholder card goes here. */}
            </div>

            <div className="lg:col-span-6">
              <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Qualifications
              </p>
              <h2 className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]">
                What we can evidence
              </h2>

              <ul className="mt-6 divide-y divide-[var(--scc-border)] border-y border-[var(--scc-border)]">
                {commercialManufacturers.map((m) => (
                  <li key={m.name} className="py-4">
                    <p className="text-[1.0625rem] font-[650] text-[var(--scc-ink)]">
                      {m.name}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] text-[var(--text-muted)]">
                      {m.note}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-[1.6] text-[var(--text-muted)]">
                Warranty options depend on the selected system, project
                specification, installation requirements, manufacturer approval
                and inspections. Applicable terms are identified in the project
                proposal before authorization.
              </p>
              {/* ⚠ Exact manufacturer designations, insurance and bonding
                  language, and licences are D4 on the SCC request. Nothing is
                  published here until the exact wording arrives — an
                  approximate credential is worse than none. */}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Commercial project imagery and proof. */}
      <ProjectProof />

      {/* 7. One assessment CTA. */}
      <FinalCta />
    </>
  );
}
