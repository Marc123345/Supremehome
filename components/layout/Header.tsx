"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, ChevronDown, MapPin, ArrowUpRight, Phone } from "lucide-react";
import { nav, site, residentialBrand, residentialNavItem } from "@/lib/site";
import { locations } from "@/lib/locations";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const AREAS_HREF = "/service-areas";

/**
 * Header: white bar, an angled brand-color block behind the logo (clip-path
 * polygon), centered nav, and the phone on the right.
 *
 * COMMERCIAL-FIRST (client feedback section 1). Residential used to sit as the
 * second item in the main nav, which made it read as an equal half of the
 * business. It is now pulled out of the main nav entirely and placed in the
 * right-hand cluster behind a divider, labeled with the residential brand
 * name — so it reads as a link to a sibling business rather than a section of
 * this one.
 *
 * The phone number's text collapses at lg and returns at xl. Without that, the
 * centered nav collides with the right cluster on 1024–1279px screens now that
 * the residential link shares that space.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => setAreasOpen(false), [pathname]);

  useEffect(() => {
    if (!areasOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAreasOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [areasOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openAreas = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAreasOpen(true);
  };
  // Grace period so the pointer can travel from trigger to panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setAreasOpen(false), 140);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-[100] bg-white h-[76px] lg:h-[96px]"
      >
        {/* Angled brand block behind the logo */}
        <div
          className="absolute top-0 left-0 h-full pointer-events-none"
          style={{
            width: "clamp(275px, 27vw, 440px)",
            background: "var(--ink)",
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
          }}
        />

        <div className="relative h-full flex items-center px-[var(--gutter)]">
          {/* Logo — reverse lockup on the black block */}
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="tap relative z-10 mr-auto"
          >
            <Logo variant="light" height={40} priority />
          </Link>

          {/* Centered nav */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-6 xl:gap-10">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href === AREAS_HREF && pathname.startsWith(AREAS_HREF));

              if (item.href === AREAS_HREF) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openAreas}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={areasOpen}
                      aria-haspopup="true"
                      onFocus={openAreas}
                      className="flex items-center gap-1.5 text-[0.94rem] font-semibold tracking-[0.01em] transition-colors hover:text-[var(--supreme-red)]"
                      style={{
                        color: active ? "var(--supreme-red)" : "var(--ink-80)",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-300"
                        style={{ transform: areasOpen ? "rotate(180deg)" : "none" }}
                      />
                    </Link>

                    <AnimatePresence>
                      {areasOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={openAreas}
                          onMouseLeave={scheduleClose}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-4"
                        >
                          <div className="w-[660px] bg-white border border-black/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]">
                            <div className="h-[4px] bg-[var(--supreme-red)]" />

                            <div className="p-7">
                              <div className="flex items-baseline justify-between gap-4 mb-5">
                                <p className="eyebrow text-[var(--supreme-red)]">
                                  Greater Houston · {locations.length} areas
                                </p>
                                <Link
                                  href={AREAS_HREF}
                                  onClick={() => setAreasOpen(false)}
                                  className="group inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-black/55 hover:text-[var(--supreme-red)] transition-colors shrink-0"
                                >
                                  View coverage map
                                  <ArrowUpRight
                                    size={13}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  />
                                </Link>
                              </div>

                              <ul className="grid grid-cols-3 gap-x-6 gap-y-0.5">
                                {locations.map((loc) => {
                                  const isActive =
                                    pathname === `/service-areas/${loc.slug}`;
                                  return (
                                    <li key={loc.slug}>
                                      <Link
                                        href={`/service-areas/${loc.slug}`}
                                        onClick={() => setAreasOpen(false)}
                                        className="group flex items-center gap-2 py-2 border-b border-black/[0.06]"
                                        style={{
                                          color: isActive
                                            ? "var(--supreme-red)"
                                            : undefined,
                                        }}
                                      >
                                        <MapPin
                                          size={12}
                                          className="shrink-0 text-black/20 transition-colors group-hover:text-[var(--supreme-red)]"
                                        />
                                        <span className="text-[0.86rem] font-semibold group-hover:text-[var(--supreme-red)] transition-colors">
                                          {loc.name}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-7 py-4 bg-[var(--ink-05)] border-t border-black/[0.07]">
                              <p className="text-[0.8rem] text-black/55">
                                Not listed? We travel for commercial work.
                              </p>
                              <a
                                href={site.phoneHref}
                                className="text-[0.84rem] font-bold text-[var(--supreme-red)] shrink-0"
                              >
                                {site.phone}
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.94rem] font-semibold tracking-[0.01em] transition-colors hover:text-[var(--supreme-red)]"
                  style={{
                    color: active ? "var(--supreme-red)" : "var(--ink-80)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster — residential handoff, then the phone. */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {/* Residential sits behind a divider and in muted type on purpose:
                it is a different side of the business, not a peer of the
                commercial nav. */}
            <Link
              href={residentialBrand.externalUrl ?? residentialNavItem.href}
              {...(residentialBrand.externalUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col leading-tight text-right"
            >
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black/35">
                {residentialNavItem.note}
              </span>
              <span className="text-[0.88rem] font-semibold text-black/55 transition-colors group-hover:text-[var(--supreme-red)]">
                {residentialNavItem.label}
              </span>
            </Link>

            <span className="h-9 w-px bg-black/12" aria-hidden="true" />

            <a
              href={site.phoneHref}
              className="group flex items-center gap-3.5"
              aria-label={`Call ${site.phone}`}
            >
              <span
                className="grid place-items-center w-11 h-11 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-[var(--supreme-red)]"
                style={{ background: "var(--red-wash)" }}
              >
                <Phone
                  size={18}
                  className="text-[var(--supreme-red)] transition-colors duration-300 group-hover:text-white"
                />
              </span>
              {/* Collapses at lg so the centered nav has room. */}
              <span className="hidden xl:block leading-tight">
                <span className="block eyebrow text-black/45">
                  Commercial roof assessment
                </span>
                <span className="block font-display text-[1.4rem] leading-none tracking-wide transition-colors duration-300 group-hover:text-[var(--supreme-red)]">
                  {site.phone}
                </span>
              </span>
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden p-2.5 border border-black/10 hover:bg-[var(--supreme-red)] hover:border-[var(--supreme-red)] hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Hairline */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/12" />
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
