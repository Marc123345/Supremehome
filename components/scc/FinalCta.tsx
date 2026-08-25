import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The final assessment CTA.
 *
 * ── This is the ONLY full-red section on a commercial page ─────────────────
 *
 * File 04 §3 caps red background at ~5% of the page and states: "Use one
 * dominant red section only: the final commercial CTA." §16 repeats it as an
 * acceptance criterion. The old site alternated full-width red, black and
 * white bands from section to section, which is what made red stop meaning
 * "act here".
 *
 * So if a second red section ever appears on a commercial route, this one has
 * lost its job — check that before adding one.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D7): whether the assessment is free, no cost,
 * $0, no obligation, or none of those. The copy below is deliberately neutral
 * on the offer, and the visible copy, Jotform title, CTA and schema must all
 * change together when SCC decides.
 */
export function FinalCta({
  heading = "Request a commercial roof assessment",
  body = "Tell us about the property, roof system and concern. We will review the roof's current condition, document what we find, and explain whether restoration and coating are viable or replacement is necessary.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-[var(--scc-red)] py-[var(--section-y)] text-white">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display uppercase leading-[1.06] [font-size:var(--t-h2)]">
              {heading}
            </h2>
            <p className="scc-measure mt-5 [font-size:var(--t-lead)] leading-[1.6] text-white/90">
              {body}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[var(--r-control)] bg-white px-6 text-[0.9375rem] font-[700] text-[var(--scc-red)] transition-colors hover:bg-white/90 lg:w-auto"
            >
              Request a Commercial Roof Assessment
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[var(--r-control)] border border-white/45 px-6 text-[0.9375rem] font-[700] text-white transition-colors hover:border-white lg:w-auto"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
