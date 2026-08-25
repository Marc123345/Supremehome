"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { nav, site, residentialBrand, residentialNavItem } from "@/lib/site";
import { Logo } from "./Logo";

/* NOTE ON `text-[var(--x)]` — do not reintroduce this.

   Tailwind cannot tell whether `text-[…]` means font-size or colour, and with
   a bare `var()` it resolves to COLOUR. So `text-[var(--t-control)]` emitted
   `color: var(--t-control)`, which is a length, which is invalid as a colour —
   and an invalid colour drops the element back to inherited black, beating the
   red active-state rule that was also applied.

   Sizes therefore use the explicit `[font-size:var(--x)]` form. Colours can
   keep `text-[var(--x)]`, which does the right thing on its own. */

/**
 * Mobile menu — rebuilt to file 04 §6 (Mobile) of the Strategic Revision
 * Package.
 *
 * ── What was wrong ──────────────────────────────────────────────────────────
 *
 *  1. THE CITY DIRECTORY. An expandable panel listing all eighteen cities,
 *     two columns, inside the menu. The package puts the full directory on
 *     Service Areas and nowhere else — the same rule that removed the header
 *     mega-dropdown and the footer's eighteen links. Service Areas is a plain
 *     destination here now.
 *
 *  2. INVERTED ACTION PRIORITY. The phone was the filled primary button and
 *     `Request a Commercial Roof Assessment` was the ghost secondary beneath
 *     it. The package names the assessment as *the* primary commercial CTA on
 *     every surface, so the two have swapped.
 *
 *  3. SECONDARY NAV. Four deep links into Commercial page anchors
 *     (`#roof-systems`, `#scope`…) sat under the main nav. "Keep commercial
 *     navigation limited to essential destinations" — and those anchors point
 *     into a page being rebuilt to eight sections in Phase 4, so several of
 *     them are about to stop existing. They are gone rather than left to rot.
 *
 * ── Structure the package asks for ──────────────────────────────────────────
 *
 * "Put commercial destinations first inside the menu and Residential in a
 * labeled secondary group." So: four commercial destinations, a labelled rule,
 * then Supreme Home Roofing as a clearly separate business — not a fifth nav
 * item.
 *
 * Every control is at least 44px.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll and close on Escape while the sheet is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <button
        className="absolute inset-0 w-full bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />

      <div className="thin-scroll absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col overflow-y-auto bg-[var(--paper)]">
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-[var(--scc-border)] px-6">
          <Link href="/" onClick={onClose} aria-label={`${site.name} — home`}>
            <Logo height={34} />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-[var(--r-control)] border border-[var(--scc-border)] transition-colors hover:bg-[var(--scc-ink)] hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-4">
          {/* Commercial destinations, first. */}
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[52px] items-center border-b border-[var(--scc-border)] text-[1.0625rem] font-[650] text-[var(--scc-ink)] transition-colors hover:text-[var(--scc-red)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* The labelled secondary group. A rule and a label, so Residential
              reads as a different business rather than the fifth item in the
              same list. */}
          <p className="mt-8 mb-1 [font-size:var(--t-label)] font-[700] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Looking for home roofing?
          </p>
          <Link
            href={residentialBrand.externalUrl ?? residentialNavItem.href}
            onClick={onClose}
            {...(residentialBrand.externalUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex min-h-[52px] items-center justify-between gap-3 border-b border-[var(--scc-border)] text-[1.0625rem] font-[650] text-[var(--scc-ink)] transition-colors hover:text-[var(--scc-red)]"
          >
            {residentialBrand.name}
            <ArrowUpRight
              size={18}
              className="shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--scc-red)]"
            />
          </Link>
        </nav>

        <div className="shrink-0 space-y-3 px-6 pb-8 pt-2">
          {/* Assessment first and filled; phone second. The package makes the
              assessment the primary commercial action everywhere, and this
              menu had the two the other way round. */}
          <Link
            href="/contact"
            onClick={onClose}
            className="flex min-h-[52px] w-full items-center justify-center rounded-[var(--r-control)] bg-[var(--scc-red)] px-4 text-center text-[0.9375rem] font-[700] text-white transition-colors hover:bg-[#b80112]"
          >
            Request a Commercial Roof Assessment
          </Link>
          <a
            href={site.phoneHref}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[var(--r-control)] border border-[var(--scc-border)] px-4 text-[0.9375rem] font-[700] text-[var(--scc-ink)] transition-colors hover:border-[var(--scc-ink)]"
          >
            <Phone size={16} className="text-[var(--scc-red)]" />
            {site.phone}
          </a>

          <div className="space-y-2.5 pt-4 text-[0.95rem] text-[var(--scc-ink)]">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 transition-colors hover:text-[var(--scc-red)]"
            >
              <Mail size={14} className="shrink-0" />
              {site.email}
            </a>
            <p className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-1 shrink-0" />
              {site.address.full}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
