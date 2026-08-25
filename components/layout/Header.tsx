"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { nav, site, residentialBrand, residentialNavItem } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/* NOTE ON `text-[var(--x)]` — do not reintroduce this.

   Tailwind cannot tell whether `text-[…]` means font-size or colour, and with
   a bare `var()` it resolves to COLOUR. So `text-[var(--t-control)]` emitted
   `color: var(--t-control)`, which is a length, which is invalid as a colour —
   and an invalid colour drops the element back to inherited black, beating the
   red active-state rule that was also applied.

   Sizes therefore use the explicit `[font-size:var(--x)]` form. Colours can
   keep `text-[var(--x)]`, which does the right thing on its own. */

/**
 * Header — rebuilt to file 04 §6 of the Strategic Revision Package.
 *
 * ── What this replaces ──────────────────────────────────────────────────────
 *
 * A 96px desktop bar with an angled black clip-path block behind the logo, a
 * centred nav, an 18-city Service Areas mega-dropdown, a two-line phone block,
 * and no primary action at all.
 *
 * Each of those is named in the package:
 *
 *  · Height. 96px → 78px. The spec is 76-80px desktop, 64-72px mobile, and the
 *    header eats into the hero budget on every route.
 *  · The angled block. "Make the SCC lockup legible" — the block existed to
 *    give a reverse lockup a dark ground, which meant the logo could never sit
 *    on the white bar the rest of the spec asks for. Full-colour lockup on
 *    white now, at 178px, inside the 175-195px band.
 *  · The mega-dropdown. "Put the full city directory only on Service Areas."
 *    Eighteen cities in a hover panel is the directory, in the header, on every
 *    route. Service Areas is a plain link now.
 *  · The phone. "Visible as a compact text/icon action, not a large labeled
 *    content block."
 *  · THE MISSING CTA. The spec requires `Request a Commercial Roof Assessment`
 *    as the header's primary action and the bar did not have one. That is the
 *    single biggest functional gap this rebuild closes.
 *
 * ── Two devices from §2 that earn their place ───────────────────────────────
 *
 * A thin SCC-red leading edge across the top of the bar — the package's
 * "recurring navigation cue" — and the active route marked with red text plus
 * a short underline rather than a filled red block (§6, active route).
 *
 * ── Residential ────────────────────────────────────────────────────────────
 *
 * Kept out of the primary nav and set behind a divider in muted type, which is
 * what "visibly secondary" means in the acceptance criteria. It is a sibling
 * business, not a section of this one.
 */

/** 78px desktop / 68px mobile — both inside the spec's bands. */
const H_DESKTOP = "lg:h-[78px]";
const H_MOBILE = "h-[68px]";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* "Add only a subtle shadow after scroll" (§6). Passive listener, and the
     threshold is 8px so a rubber-band nudge does not flicker it. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* An in-page anchor is not a destination.
  
     "Our Process" is `/commercial-roofing#process`, so matching on the path
     alone marked it active at the same time as "Commercial Roofing" — two red
     underlines on one bar, which tells the reader nothing. A hash link jumps
     within a page the nav is already indicating, so it never carries the
     active mark. */
  /* On /residential-roofing the header must carry a residential action, not a
     commercial one — file 05 §7 and §8. A homeowner reading about shingles
     should not be asked to request a commercial roof assessment by the bar at
     the top of the page. Same rule that produced the residential footer
     variant. */
  const residentialRoute = pathname?.startsWith(residentialBrand.path) ?? false;

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[100] bg-[var(--paper)] ${H_MOBILE} ${H_DESKTOP} border-b border-[var(--scc-border)] transition-shadow duration-200`}
        style={scrolled ? { boxShadow: "var(--shadow-header)" } : undefined}
      >
        {/* The red leading edge. 3px, full width, above everything — §2's
            navigation cue. It is the only red on the bar apart from the CTA
            and the active-route mark, which keeps red doing one job. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[var(--scc-red)]" />

        {/* ⚠ `.shell`, NOT `.scc-shell` — and the two must migrate together.

            The package's container is 1240px on 32/48px gutters, and the
            header was built to it first. But every section on the site is
            still on the old `.shell`: 1440px on a `clamp(1.25rem, 4vw, 5rem)`
            gutter. At a 1440px viewport that puts section content at 57.6px
            and header content at 148px — the logo sitting ~90px inboard of
            everything beneath it, on every route.

            A header is the one element that has to agree with the page under
            it, so it uses whatever container the pages use. It moves to
            `.scc-shell` in Phase 3, at the same time as the homepage adopts
            the 1240 grid, and not before. If you change one, change both. */}
        <div className="shell flex h-full items-center gap-6">
          {/* Full-colour lockup on white, per the master package's own rule:
              full colour on white or light neutral, reverse only on dark. */}
          <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
            <Logo variant="dark" height={54} priority />
          </Link>

          {/* `whitespace-nowrap` AND `shrink-0`, on both the nav and each link.
              nowrap alone stopped the two-line wrap that was pushing the bar
              past its 78px, but flex then shrank the items below their content
              width instead and the labels ran into each other. A nav is one of
              the few places where overflowing is better than compressing —
              there is nothing useful to read in a squeezed label. */}
          <nav className="ms-auto hidden shrink-0 items-center gap-6 lg:flex xl:gap-8">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative shrink-0 py-1 [font-size:var(--t-control)] font-[650] whitespace-nowrap transition-colors duration-[var(--m-feedback)] ${
                    active
                      ? "text-[var(--scc-red)]"
                      : "text-[var(--scc-ink)] hover:text-[var(--scc-red)]"
                  }`}
                >
                  {item.label}
                  {/* The short underline, not a block. */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-[2px] w-6 bg-[var(--scc-red)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster: phone (compact), residential (secondary), CTA. */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
            <a
              href={site.phoneHref}
              className="group flex items-center gap-2 [font-size:var(--t-control)] font-[650] text-[var(--scc-ink)] transition-colors duration-[var(--m-feedback)] hover:text-[var(--scc-red)]"
              aria-label={`Call ${site.phone}`}
            >
              <Phone size={16} className="shrink-0 text-[var(--scc-red)]" />
              <span className="hidden xl:inline">{site.phone}</span>
            </a>

            <span className="h-6 w-px bg-[var(--scc-border)]" aria-hidden />

            <Link
              href={residentialBrand.externalUrl ?? residentialNavItem.href}
              {...(residentialBrand.externalUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[0.8125rem] font-[650] text-[var(--text-muted)] transition-colors duration-[var(--m-feedback)] hover:text-[var(--scc-ink)]"
            >
              {residentialNavItem.label}
            </Link>

            {/* The primary action the old bar was missing. 44px tall so it
                clears the touch minimum even though it is desktop-only, and
                `--r-control` is the spec's 6-8px radius. */}
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-[var(--r-control)] bg-[var(--scc-red)] px-4 text-[0.875rem] font-[700] text-white transition-colors duration-[var(--m-feedback)] hover:bg-[#b80112]"
            >
              {residentialRoute ? (
                <span>Contact {residentialBrand.shortName}</span>
              ) : (
                <>
              <span className="hidden 2xl:inline">Request a Commercial Roof Assessment</span>
              {/* The full label needs ~300px. Below 2xl it would push the nav
                  into the logo, so the short form carries the same action and
                  the full sentence lives on the button's accessible name. */}
              <span className="2xl:hidden" aria-hidden>
                Request Assessment
              </span>
              <span className="sr-only 2xl:hidden">Request a Commercial Roof Assessment</span>
                </>
              )}
            </Link>
          </div>

          {/* Mobile: one phone action and the menu, both 44px. */}
          <div className="ms-auto flex items-center gap-1 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="grid size-11 place-items-center text-[var(--scc-ink)]"
            >
              <Phone size={20} className="text-[var(--scc-red)]" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center text-[var(--scc-ink)]"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
