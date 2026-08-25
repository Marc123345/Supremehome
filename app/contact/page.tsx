import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { JotformEmbed } from "@/components/sections/JotformEmbed";
import { site } from "@/lib/site";
import { googleProfile } from "@/lib/reviews";

/**
 * CONTACT — rebuilt to file 05 §4.
 *
 * ── The one job ────────────────────────────────────────────────────────────
 *
 * "Make the assessment request immediate and clear." The review measured the
 * old page at ~3,500px with 117 words of page copy, and its finding was blunt:
 * "the oversized hero delays the form."
 *
 * So the photographic PageHero is gone, replaced by a short introduction the
 * spec caps at roughly 220-320px of page height, and the embedded form now
 * starts inside the first desktop viewport. 7/5 form-to-contact split on
 * desktop; form first on mobile.
 *
 * ── The offer language, which is the important change ──────────────────────
 *
 * The page carried three different versions of the offer at once: the hero
 * eyebrow said "No obligation", the embedded Jotform's title said "Request a
 * free roof assessment", and the service copy said "No cost, and no obligation
 * to do the work with us."
 *
 * File 05 §4 requires all of it removed until SCC picks ONE: "Remove
 * conflicting `free`, `no cost`, `$0`, and `no obligation` claims." File 02
 * adds that the visible copy, the Jotform title, the CTA and the schema must
 * then use that one offer together.
 *
 * Nothing here now states a price or an obligation. That is deliberately a
 * weaker page than "free assessment" would be, and it stays that way until
 * SCC answers D7 on the content request.
 *
 * ── The next-step sentence ─────────────────────────────────────────────────
 *
 * Supplied verbatim by the package and non-promissory on purpose: it says SCC
 * will make contact to confirm the next step, not that an assessment is
 * booked, free, or scheduled within any timeframe.
 *
 * ⚠ SCC INPUT REQUIRED (file 03, D6): phone, email, office and hours are
 * carried over unverified and must be checked against SCC's current record.
 * ⚠ The form must capture commercial/residential inquiry type — that is a
 * Jotform builder change, not a code change. See the note at the embed.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact: Request a Commercial Roof Assessment",
  /* No "free" in the description either — metadata carries the same claims
     controls as visible copy (file 02, metadata policy). */
  description: `Contact ${site.name} about a commercial roof assessment in Greater Houston. Call ${site.phone} or submit the property details and we will confirm the appropriate next step.`,
};

const CONTACT_ITEMS = [
  { icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Office", value: site.address.full },
  {
    icon: Clock,
    label: "Hours",
    value: "Current hours on our Google listing",
    href: googleProfile.shareUrl,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* The introduction. Compact by design — this is the height the form
          used to sit below. */}
      <section className="border-b border-[var(--scc-border)] bg-[var(--paper)] pt-12 pb-10 lg:pt-14 lg:pb-12">
        <div className="shell">
          <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Contact
          </p>
          <h1 className="mt-3 font-display uppercase leading-[1.06] [font-size:var(--t-h2)] text-[var(--scc-ink)]">
            Request a commercial roof assessment
          </h1>
          <p className="scc-measure mt-4 [font-size:var(--t-lead)] leading-[1.6] text-[var(--text-muted)]">
            Tell us about the property, roof system, and concern. Supreme
            Commercial Coatings will review the request and contact you to
            confirm the appropriate next step.
          </p>
        </div>
      </section>

      <section className="scc-section-compact bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form first in the DOM, so it is also first on mobile. */}
            <div className="lg:col-span-7">
              {/* ⚠ The Jotform title is a builder setting, not a prop here.
                  It currently reads "Request a free roof assessment" and must
                  change to match whatever offer SCC selects — file 05 §4,
                  "Update the Jotform title to match the final offer."
                  The commercial/residential inquiry field is the same: a
                  builder change on form {site.jotformId}. */}
              <JotformEmbed formId={site.jotformId} title="Request a commercial roof assessment" />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Or reach us directly
                </p>

                {/* One compact direct-contact row. The old page had this list
                    AND a separate dark "Rather talk it through?" panel with a
                    second phone button — file 03 asks for one, not two. */}
                <ul className="mt-4 divide-y divide-[var(--scc-border)] border-y border-[var(--scc-border)]">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-4 py-4">
                      <Icon size={17} className="mt-1 shrink-0 text-[var(--scc-red)]" />
                      <div>
                        <p className="[font-size:var(--t-label)] font-[700] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block break-words text-[1.0625rem] font-[650] text-[var(--scc-ink)] transition-colors hover:text-[var(--scc-red)]"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-[1.0625rem] font-[650] text-[var(--scc-ink)]">
                            {value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-[1.6] text-[var(--text-muted)]">
                  Supreme Commercial Coatings serves commercial properties
                  across Greater Houston. If your property is outside the listed
                  service areas, ask — coverage depends on the project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
