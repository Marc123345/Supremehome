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
import { locations } from "@/lib/locations";
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
export function Footer() {
  const year = new Date().getFullYear();

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

          <p className="text-[0.95rem] leading-[1.75] text-white/90 max-w-md mb-10">
            Commercial roof restoration and replacement across Greater Houston.
            We assess the roof you have, then recommend restoring it or
            replacing it based on what we find up there.
          </p>

          <h3 className="display-sm text-white mb-5">Commercial roofing</h3>
          <ul className="space-y-3 mb-10">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href="/commercial-roofing"
                  className="tap-inline group inline-flex items-center gap-2.5 text-[0.93rem] text-white/85 hover:text-white transition-colors"
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
                  className="tap-inline group inline-flex items-center gap-2.5 text-[0.93rem] text-white/85 hover:text-white transition-colors"
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
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/40 mb-1">
                {residentialNavItem.note}
              </span>
              <span className="block text-[0.93rem] font-semibold text-white/85">
                Roofing for homes
              </span>
            </span>
            <ArrowRight
              size={16}
              className="shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Contact */}
          <div className="space-y-4 text-[0.93rem] text-white/90">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-1 text-white/60" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-white/60" />
              <a
                href={site.phoneHref}
                className="tap-inline hover:text-white transition-colors"
              >
                {site.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-white/60" />
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
                  className="tap-inline text-[0.93rem] transition-colors hover:text-[var(--supreme-red)]"
                  style={{ color: "var(--ink-50)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="display-sm mb-5">Service areas</h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-2 mb-10 max-w-lg">
            {locations.map((loc) => (
              <li
                key={loc.slug}
                className="after:content-['·'] after:ml-3 after:text-black/20 last:after:content-['']"
              >
                <Link
                  href={`/service-areas/${loc.slug}`}
                  className="tap-inline text-[0.86rem] transition-colors hover:text-[var(--supreme-red)]"
                  style={{ color: "var(--ink-50)" }}
                >
                  {loc.name}
                </Link>
              </li>
            ))}
          </ul>

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
                className="text-[0.86rem] font-semibold"
                style={{ color: "var(--ink-50)" }}
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
              Restore when viable.
              <br />
              <span style={{ color: "var(--supreme-red)" }}>
                Replace when necessary.
              </span>
            </p>

            <Link
              href="/contact"
              className="tap-inline group inline-flex items-center gap-2.5 mt-7 font-bold text-[0.92rem] text-[var(--supreme-red)]"
            >
              Request a commercial roof assessment
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
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
        <p className="text-[0.82rem] text-white/85">
          © {year} {site.legalName}, doing business as {site.dba}. All rights
          reserved.
        </p>
        {/* The liability figure, the bonding line and the Oklahoma
            residential license were removed here (correction package J2 and
            05). The first two are unverified; the third is a residential
            credential that was being published site-wide on a commercial
            site. Restore them in Supreme's confirmed wording. */}
        <p className="text-[0.78rem] text-white/80 sm:text-right max-w-2xl">
          Texas does not issue a statewide roofing contractor license.
          Insurance and manufacturer credential documentation is available on
          request.
        </p>
      </div>
    </footer>
  );
}
