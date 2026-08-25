import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import {
  site,
  nav,
  secondaryNav,
  services,
  commercialManufacturers,
  residentialBrand,
  residentialNavItem,
} from "@/lib/site";
import { HouseMark } from "@/components/ui/HouseMark";
import { Logo } from "./Logo";

/**
 * Footer: a split panel — ink left, white right — over a solid brand-red
 * bottom bar. The brand panel is ink rather than red so the reverse lockup
 * sits on a compliant background per the SCC color spec.
 *
 * COMMERCIAL-FIRST (client feedback section 1):
 *   - The services list is commercial only. It used to render whatever the
 *     first six entries of `services` were, which included shingles.
 *   - Residential is a single labeled handoff link, not a peer nav item.
 *   - The CertainTeed steep-slope badges were removed; they are residential
 *     credentials and now live on /residential-roofing.
 *   - The tagline is the client's own line, replacing "Repair. Restore.
 *     Replace last." — which led with repair and positioned SCC as a repair
 *     company (feedback section 2).
 */
/**
 * `variant` — commercial (default) or residential.
 *
 * File 05 §8 requires the residential route to close on Supreme Home Roofing
 * rather than on SCC: its own identity, its own action, one clear route back
 * to SCC, and explicitly **no commercial assessment CTA as the closing
 * action**. Shipping one footer meant /residential-roofing ended by asking a
 * homeowner to request a commercial roof assessment, which is the exact
 * crossover the whole separation exists to prevent.
 *
 * Only the parts that carry brand identity swap. The contact panel, legal
 * line and structure are shared, because they are the same company and
 * duplicating the component would guarantee the two drift.
 */
export function Footer({ variant = "commercial" }: { variant?: "commercial" | "residential" } = {}) {
  const year = new Date().getFullYear();
  const residential = variant === "residential";

  return (
    <footer className="relative">
      {/* ── SPLIT PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — near-black. SCC's color spec permits the reverse lockup
            on black or sufficiently dark backgrounds only, so this panel is
            ink rather than SCC red; the bottom bar carries the red. */}
        <div
          className="relative px-[var(--gutter)] py-14 lg:py-20 noise"
          style={{ background: "var(--ink-90)" }}
        >
          <div className="mb-8">
            <Logo variant="light" height={44} />
          </div>

          <p className="text-[1.02rem] leading-[1.75] text-white max-w-md mb-10">
            Commercial roof restoration and replacement across Greater Houston.
            We assess the roof you have, then recommend restoring it or
            replacing it based on what we find up there.
          </p>

          <h3 className="display-sm text-white mb-5">Commercial roofing</h3>
          <ul className="space-y-3 mb-10">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/commercial-roofing${s.anchor ?? ""}`}
                  className="tap-inline group inline-flex items-center gap-2.5 text-[1rem] text-white hover:text-white transition-colors"
                >
                  <HouseMark
                    size={12}
                    color="rgba(255,255,255,0.5)"
                    className="shrink-0 transition-transform group-hover:scale-125"
                  />
                  {s.title}
                </Link>
              </li>
            ))}
            {secondaryNav.slice(0, 2).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap-inline group inline-flex items-center gap-2.5 text-[1rem] text-white hover:text-white transition-colors"
                >
                  <HouseMark
                    size={12}
                    color="rgba(255,255,255,0.5)"
                    className="shrink-0 transition-transform group-hover:scale-125"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Residential handoff — fenced off, not listed as a service. */}
          <Link
            href={residentialBrand.externalUrl ?? residentialNavItem.href}
            {...(residentialBrand.externalUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex items-center justify-between gap-4 mb-10 p-4 border border-white/15 hover:border-white/35 transition-colors"
          >
            <span>
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/75 mb-1">
                {residentialNavItem.note}
              </span>
              <span className="block text-[1rem] font-semibold text-white">
                Roofing for homes
              </span>
            </span>
            <ArrowRight
              size={16}
              className="shrink-0 text-white/75 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Contact */}
          <div className="space-y-4 text-[1rem] text-white">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-1 text-white" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-white" />
              <a
                href={site.phoneHref}
                className="tap-inline hover:text-white transition-colors"
              >
                {site.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-white" />
              <a
                href={`mailto:${site.email}`}
                className="tap-inline hover:text-white transition-colors break-all"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        {/* Right — white */}
        <div className="relative flex flex-col px-[var(--gutter)] py-14 lg:py-20 bg-white">
          <h3 className="display-sm mb-5">Quick links</h3>
          <ul className="space-y-3 mb-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap-inline text-[1rem] transition-colors hover:text-[var(--supreme-red)]"
                  style={{ color: "var(--ink-70)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ONE Service Areas link, not the eighteen-city directory.

              File 05 §8: "One Service Areas link instead of the full 18-city
              directory." The directory is not lost — Service Areas becomes its
              single authoritative destination, the same consolidation that
              took the city mega-dropdown out of the header.

              There is a second reason beyond tidiness. Eighteen city links in
              the footer of every route gave each of those pages a sitewide
              internal link, which works directly against the package's rule
              that any city page without verified local proof goes `noindex`. */}
          <h3 className="display-sm mb-5">Service areas</h3>
          <p className="mb-4 max-w-md text-[1rem]" style={{ color: "var(--ink-70)" }}>
            Commercial roofing across Greater Houston and the surrounding counties.
          </p>
          <Link
            href="/service-areas"
            className="tap-inline mb-10 inline-flex items-center gap-2 text-[1.02rem] font-semibold transition-colors hover:text-[var(--supreme-red)]"
            style={{ color: "var(--ink-70)" }}
          >
            See all service areas
          </Link>

          {/* Two changes here, both from the correction package (J2, A5).
              The heading claimed certification, which is a credential we
              cannot state until Supreme confirms each manufacturer's exact
              designation. And the list rendered all four manufacturers, so
              CertainTeed (shingles) and Attic Breeze (attic ventilation) —
              both residential — appeared in the commercial footer. */}
          <h3 className="display-sm mb-4">Coating systems we install</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {commercialManufacturers.map((m) => (
              <li
                key={m.name}
                className="text-[1.02rem] font-semibold"
                style={{ color: "var(--ink-70)" }}
              >
                {m.name}
              </li>
            ))}
          </ul>

          {/* The CertainTeed steep-slope badges used to render here. They are
              residential shingle credentials, so they moved to
              /residential-roofing — feedback section 1. */}

          {/* Tagline */}
          <div
            className="mt-auto pt-10"
            style={{ borderTop: "1px solid var(--ink-20)" }}
          >
            <p
              className="font-display uppercase tracking-wide"
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1.08,
                color: "var(--ink)",
              }}
            >
              {residential ? (
                <>
                  Clear answers.
                  <br />
                  <span style={{ color: "var(--supreme-red)" }}>
                    Professional roofing.
                  </span>
                </>
              ) : (
                <>
                  Restore when viable.
                  <br />
                  <span style={{ color: "var(--supreme-red)" }}>
                    Replace when necessary.
                  </span>
                </>
              )}
            </p>

            {/* The closing action. On the residential route this is the
                Supreme Home action and the commercial link is demoted to a
                secondary line beneath it — never the other way round. */}
            <Link
              href="/contact"
              className="tap-inline group inline-flex items-center gap-2.5 mt-7 font-bold text-[1rem] text-[var(--supreme-red)]"
            >
              {residential
                ? "Contact Supreme Home Roofing"
                : "Request a commercial roof assessment"}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {residential && (
              <p className="mt-4 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
                Looking for commercial roofing?{" "}
                <Link href="/" className="tap-inline font-semibold underline underline-offset-2">
                  Supreme Commercial Coatings
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="px-[var(--gutter)] py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        style={{
          background: "var(--supreme-red)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <p className="text-[1rem] text-white">
          © {year} {site.legalName}, doing business as {site.dba}. All rights
          reserved.
        </p>
        {/* The liability figure, the bonding line and the Oklahoma
            residential license were removed here (correction package J2 and
            05). The first two are unverified; the third is a residential
            credential that was being published site-wide on a commercial
            site. Restore them in Supreme's confirmed wording. */}
        <p className="text-[1rem] text-white sm:text-right max-w-2xl">
          Texas does not issue a statewide roofing contractor license.
          Insurance and manufacturer credential documentation is available on
          request.
        </p>
      </div>
    </footer>
  );
}
