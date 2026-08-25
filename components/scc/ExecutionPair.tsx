import Image from "next/image";

/**
 * How SCC executes restoration/protection, and how SCC executes replacement.
 * Commercial sections 5 and 6.
 *
 * ── Why these are one component and not two ────────────────────────────────
 *
 * File 05 §2: "Match the two execution sections in image ratio, heading
 * hierarchy, scope structure, density, and proof treatment." The strategic
 * review's sharpest finding about the old Commercial page was that it "gives
 * restoration more depth than replacement", and that replacement "cannot read
 * as the fallback after coating fails".
 *
 * Two hand-written sections drift apart the first time anyone edits one of
 * them. Rendering both from a single array through one markup path makes
 * parity structural rather than a thing to remember: to give restoration more
 * detail than replacement you would have to change the component.
 *
 * The stage counts are deliberately equal too. Where a replacement stage has
 * no restoration counterpart (deck and substrate, removal or recovery) it sits
 * in the same position as the restoration stage it replaces.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D3): the standard execution, quality-control,
 * communication, warranty and closeout practices for each solution family.
 * The stages below are the package's own scope categories from file 05 §2.5
 * and §2.6, described as categories rather than promises. They become specific
 * — and this page becomes materially stronger — when SCC supplies theirs.
 */
const EXECUTION = [
  {
    key: "restore",
    eyebrow: "Restoration and protection",
    title: "How we restore and protect a roof",
    image: "/photos/metal-roof-rusted.jpg",
    alt: "An exposed-fastener metal roof showing surface corrosion and fastener detail before restoration",
    stages: [
      ["Essential restoration repairs", "The corrective work the assessment identified as necessary before any protective system goes down."],
      ["Detailing", "Seams, fasteners, flashings, penetrations, curbs and drains addressed to the requirements of the specified system."],
      ["Surface preparation", "Cleaning and preparation to the manufacturer's stated requirements for adhesion."],
      ["System installation", "The approved coating and protection system, installed to its specification."],
      ["Quality control", "Checks as the work goes down rather than only at the end."],
      ["Warranty and closeout", "Applicable warranty steps completed and the project documentation issued."],
    ],
  },
  {
    key: "replace",
    eyebrow: "Roof replacement",
    title: "How we replace a roof",
    image: "/photos/commercial-roof-bays.jpg",
    alt: "A large low-slope commercial roof during a replacement project, showing bays and drainage",
    stages: [
      ["Planning, access and protection", "Sequencing, roof access, and protection of the building and its operations during the work."],
      ["Removal or recovery decision", "Whether the existing assembly is removed or recovered, decided on the documented condition and the requirements of the new system."],
      ["Deck and substrate", "The deck inspected and addressed before anything is installed over it."],
      ["Insulation, cover board and system", "The new assembly installed to the approved specification."],
      ["Details and drainage", "Penetrations, terminations, edges and drainage completed as part of the system, not after it."],
      ["Quality control, warranty and closeout", "Checks through the work, applicable warranty steps, and the project documentation issued."],
    ],
  },
];

export function ExecutionPair() {
  return (
    <>
      {EXECUTION.map((e, i) => (
        <section
          key={e.key}
          className={`scc-section ${i === 0 ? "bg-[var(--paper)]" : "bg-[var(--canvas)]"}`}
          aria-labelledby={`exec-${e.key}`}
        >
          <div className="shell">
            {/* Alternating image side, identical everything else. The two
                surfaces differ only to separate the sections; neither is
                darker, redder or more prominent than the other. */}
            <div
              className={`grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 ${
                i === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="relative aspect-[16/11] overflow-hidden rounded-[var(--r-frame)] lg:col-span-5">
                <Image
                  src={e.image}
                  alt={e.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </figure>

              <div className="lg:col-span-7">
                <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {e.eyebrow}
                </p>
                <h2
                  id={`exec-${e.key}`}
                  className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2-minor)] text-[var(--scc-ink)]"
                >
                  {e.title}
                </h2>

                <dl className="mt-7">
                  {e.stages.map(([label, body]) => (
                    <div
                      key={label}
                      className="border-t border-[var(--scc-border)] py-4 last:border-b"
                    >
                      <dt className="text-[1.0625rem] font-[700] text-[var(--scc-ink)]">
                        {label}
                      </dt>
                      <dd className="mt-1 max-w-[62ch] text-[var(--t-body)] leading-[1.6] text-[var(--text-muted)]">
                        {body}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-[1.6] text-[var(--text-muted)]">
                  Scope is project-specific. What applies to a given roof is
                  identified in the proposal before you authorize the work.
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
