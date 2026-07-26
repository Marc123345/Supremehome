import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { site, nav, services, manufacturers } from "@/lib/site";
import { locations } from "@/lib/locations";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--ink-90)] text-white noise overflow-hidden">
      {/* Top accent */}
      <div className="h-[4px] bg-[var(--supreme-red)]" />

      <div className="shell py-16 lg:py-20">
        {/* ── CTA strip ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <p className="eyebrow text-[var(--supreme-red)] mb-4">
              Free Roof Inspection
            </p>
            <h2 className="display-lg max-w-[16ch]">
              Find out what your roof
              <span className="text-[var(--supreme-red)]"> actually </span>
              needs
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={site.phoneHref} className="btn btn-primary">
              <Phone size={16} />
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost-light">
              Request an Inspection
            </Link>
          </div>
        </div>

        {/* ── Columns ── */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 py-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 text-[0.92rem] leading-relaxed text-white/55 max-w-sm">
              {site.name}, DBA {site.dba}. Commercial roof restoration and
              coatings across Greater Houston — plus full residential roofing.
            </p>

            <ul className="mt-7 space-y-3.5 text-[0.9rem]">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-white/80 hover:text-[var(--supreme-red)] transition-colors"
                >
                  <Phone size={15} className="shrink-0 text-[var(--supreme-red)]" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-white/80 hover:text-[var(--supreme-red)] transition-colors"
                >
                  <Mail size={15} className="shrink-0 text-[var(--supreme-red)]" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={15} className="shrink-0 mt-1 text-[var(--supreme-red)]" />
                {site.address.full}
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Clock size={15} className="shrink-0 mt-1 text-[var(--supreme-red)]" />
                {site.hours}
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="display-sm mb-5">Services</h3>
            <ul className="space-y-2.5 text-[0.9rem]">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={
                      s.audience === "residential"
                        ? "/residential-roofing"
                        : "/commercial-roofing"
                    }
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <h3 className="display-sm mb-5">Company</h3>
            <ul className="space-y-2.5 text-[0.9rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="display-sm mt-8 mb-4">Certified</h3>
            <ul className="space-y-2 text-[0.82rem] text-white/50">
              {manufacturers.map((m) => (
                <li key={m.name}>{m.name}</li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div className="lg:col-span-3">
            <h3 className="display-sm mb-5">Service Areas</h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-[0.84rem] text-white/55">
              {locations.map((area) => (
                <li
                  key={area.slug}
                  className="after:content-['·'] after:ml-3 last:after:content-['']"
                >
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-1.5 mt-5 text-[0.86rem] font-semibold text-[var(--supreme-red)] hover:gap-2.5 transition-all"
            >
              All areas we cover
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* ── Legal ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[0.78rem] text-white/40">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="md:text-right max-w-xl">
            Insured to $2M · Bonded where required · Oklahoma CIB residential
            roofing licence #80007778. Texas does not issue a state roofing
            contractor licence.
          </p>
        </div>
      </div>
    </footer>
  );
}
