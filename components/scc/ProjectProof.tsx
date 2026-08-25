import Image from "next/image";
import Link from "next/link";
import { caseStudies, commercialManufacturers } from "@/lib/site";

/**
 * Projects and Results — the proof system.
 *
 * File 05 §1.4 makes this the homepage's strongest content moment after the
 * hero, and file 02 makes two verified case studies a hard production launch
 * gate. So the component is built now and the content arrives later; that is
 * the package's own instruction ("Build the system, request the material, and
 * populate it before production").
 *
 * ── The empty state is the important part ──────────────────────────────────
 *
 * `caseStudies` is empty and will be until SCC supplies real projects. The
 * package forbids every shortcut that would fill this space: no stock imagery
 * presented as SCC work, no residential reviews as commercial evidence, no
 * invented results, no disclaimers standing in for proof.
 *
 * What it renders instead is the honest thing — what SCC can currently
 * evidence (credentials, warranty capability, documented process) with a plain
 * statement that project records are being prepared. That is a weaker section
 * than two case studies, and it is supposed to look weaker, because the fix is
 * for SCC to send the projects rather than for the site to write around the
 * gap.
 *
 * ⚠ DO NOT populate `caseStudies` with examples to "see how it looks". A
 * plausible-looking fake project is exactly the failure mode the package's
 * claims controls exist to prevent, and it is one commit away from shipping.
 */
export function ProjectProof() {
  const hasProjects = caseStudies.length > 0;

  return (
    <section
      id="projects"
      className="scc-section bg-[var(--surface-dark)] text-white"
      aria-labelledby="projects-heading"
    >
      <div className="shell">
        <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-white/60">
          Projects and results
        </p>
        <h2
          id="projects-heading"
          className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2)]"
        >
          {hasProjects
            ? "Commercial work, documented"
            : "What we can evidence today"}
        </h2>

        {hasProjects ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {caseStudies.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col overflow-hidden rounded-[var(--r-frame)] border border-white/12 bg-white/[0.03]"
              >
                {p.images?.[0] && (
                  <figure className="relative">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="border-b border-white/10 px-6 py-3 text-[0.875rem] text-white/70">
                      {p.images[0].caption}
                    </figcaption>
                  </figure>
                )}

                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-[var(--scc-red)]">
                    {p.recommendation}
                  </p>
                  <h3 className="mt-2 text-[1.375rem] font-[700]">{p.label}</h3>
                  <p className="mt-1 text-[0.95rem] text-white/60">
                    {p.propertyType} · {p.location}
                  </p>

                  <dl className="mt-6 space-y-4 border-t border-white/10 pt-6 text-[0.95rem]">
                    <Fact label="Existing system">
                      {p.existingSystem}
                      {p.size ? ` · ${p.size}` : ""}
                    </Fact>
                    <Fact label="Documented condition">{p.documentedConditions}</Fact>
                    <Fact label="Completed scope">{p.completedScope}</Fact>
                    <Fact label="Status">{p.completionStatus}</Fact>
                    {p.warranty && <Fact label="Warranty">{p.warranty}</Fact>}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="scc-measure [font-size:var(--t-lead)] leading-[1.6] text-white/85">
                Supreme Commercial Coatings is preparing documented project
                records for publication — the roof as found, the recommendation,
                the completed scope, and the photographs. They will appear here
                as they are approved for release.
              </p>
              <p className="scc-measure mt-5 text-[var(--t-body)] leading-[1.6] text-white/65">
                Until then, what follows is what we can evidence rather than
                assert. If you would like to speak to a reference or see work in
                progress, ask during the assessment.
              </p>
            </div>

            <div className="lg:col-span-5">
              {/* `credentials` is an empty array in lib/site — the exact
                  manufacturer designations are on the SCC request list and no
                  badge is published until they arrive. What can be stated today
                  is the commercial manufacturer relationships, which are
                  already named on the site and filtered to commercial only:
                  CertainTeed and Attic Breeze are residential and must never
                  appear as proof of commercial coating qualification. */}
              <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-white/50">
                Systems we install
              </p>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {commercialManufacturers.map((m) => (
                  <li key={m.name} className="py-3.5">
                    <p className="text-[1rem] font-[650]">{m.name}</p>
                    <p className="mt-0.5 text-[0.9rem] text-white/60">{m.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.875rem] leading-[1.6] text-white/55">
                Warranty options depend on the selected system, project
                specification, installation requirements, manufacturer approval
                and inspections. Applicable terms are identified in the project
                proposal before authorization.
              </p>
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center rounded-[var(--r-control)] bg-[var(--scc-red)] px-6 text-[0.9375rem] font-[700] text-white transition-colors hover:bg-[#b80112]"
          >
            Request a Commercial Roof Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.14em] text-white/45">
        {label}
      </dt>
      <dd className="mt-1 text-white/85">{children}</dd>
    </div>
  );
}
