import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import {
  site,
  nav,
  services,
  manufacturers,
  credentialBadges,
} from "@/lib/site";
import { locations } from "@/lib/locations";
import { Logo, SupremeHomeRoofingLogo } from "./Logo";

/**
 * Footer in the Vharanani Group pattern: a split panel — brand-colour left,
 * white right — over a solid brand-colour bottom bar. Recoloured burgundy ->
 * Supreme red. The brand panel is ink rather than red so the reverse
 * lockup sits on a compliant background per the SCC colour spec.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* ── SPLIT PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — near-black. SCC's colour spec permits the reverse lockup
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
            {site.name}, trading as {site.dba}. Commercial roof restoration and
            coatings across Greater Houston — plus full residential roofing,
            repair and storm damage restoration.
          </p>

          <h3 className="display-sm text-white mb-5">Services</h3>
          <ul className="space-y-3 mb-10">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={
                    s.audience === "residential"
                      ? "/residential-roofing"
                      : "/commercial-roofing"
                  }
                  className="tap-inline group inline-flex items-center gap-2.5 text-[0.93rem] text-white/85 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 shrink-0 bg-white/50 transition-transform group-hover:scale-150" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

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
            <div className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-white/60" />
              {site.hours}
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

          <h3 className="display-sm mb-4">Manufacturer certified</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-10">
            {manufacturers.map((m) => (
              <li
                key={m.name}
                className="text-[0.86rem] font-semibold"
                style={{ color: "var(--ink-50)" }}
              >
                {m.name}
              </li>
            ))}
          </ul>

          {/* Parent entity + CertainTeed credentials */}
          <h3 className="display-sm mb-4">Part of</h3>
          <div className="flex flex-wrap items-center gap-6 mb-10">
            <SupremeHomeRoofingLogo height={34} />
            {credentialBadges.map((badge) => (
              <Image
                key={badge.name}
                src={badge.src}
                alt={badge.alt}
                width={56}
                height={56}
                title={`${badge.issuer} ${badge.name}`}
              />
            ))}
          </div>

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
              Repair. Restore.
              <br />
              <span style={{ color: "var(--supreme-red)" }}>
                Replace last.
              </span>
            </p>

            <Link
              href="/contact"
              className="tap-inline group inline-flex items-center gap-2.5 mt-7 font-bold text-[0.92rem] text-[var(--supreme-red)]"
            >
              Book a free inspection
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
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="text-[0.78rem] text-white/80 sm:text-right max-w-2xl">
          Insured to $2M · Bonded where required · Oklahoma CIB residential
          roofing licence #80007778. Texas does not issue a state roofing
          contractor licence.
        </p>
      </div>
    </footer>
  );
}
