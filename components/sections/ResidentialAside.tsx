"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { HouseMark } from "@/components/ui/HouseMark";
import { residentialBrand } from "@/lib/site";

/**
 * THE RESIDENTIAL HANDOFF.
 *
 * Client feedback section 1: residential should ideally live on its own
 * website. Until that exists, it has to be "clearly separated and presented as
 * an additional capability rather than an equal or dominant focus", and
 * residential material (shingles, homeowner financing, residential storm work)
 * must stay out of the commercial pages.
 *
 * This block is how that gets enforced structurally. It is the ONLY place
 * residential appears in the commercial journey: one bounded, visually
 * distinct panel that hands the visitor off and gets out of the way. It
 * deliberately does not sell — no shingle imagery, no financing offer, no
 * storm-damage pitch. Those all live behind the link.
 *
 * WHEN RESIDENTIAL MOVES TO ITS OWN DOMAIN: set `externalUrl` in
 * `residentialBrand` (lib/site.ts). This component and the nav both switch to
 * the off-site link automatically, and the on-site residential route can then
 * be retired without touching any commercial page.
 */

export function ResidentialAside() {
  const href = residentialBrand.externalUrl ?? residentialBrand.path;
  const isExternal = Boolean(residentialBrand.externalUrl);

  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="shell">
        <Reveal>
          <aside
            className="relative overflow-hidden border border-black/10 bg-[var(--ink-05)]"
            aria-labelledby="residential-aside-heading"
          >
            {/* Muted, deliberately not brand-red — this panel should read as a
                sibling business, not as another commercial call to action. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 opacity-[0.05]"
            >
              <HouseMark size={300} color="var(--ink)" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center gap-7 md:gap-10 p-8 lg:p-10">
              <span className="grid place-items-center w-14 h-14 shrink-0 rounded-full bg-white border border-black/10">
                <Home size={22} className="text-black/45" />
              </span>

              <div className="flex-1">
                <p className="eyebrow text-black/40 mb-2.5">
                  A different side of the business
                </p>
                <h2
                  id="residential-aside-heading"
                  className="display-sm mb-3"
                >
                  Looking for a roof on your house?
                </h2>
                <p className="text-[0.95rem] leading-[1.75] text-black/58 max-w-2xl">
                  Residential roofing is provided separately through{" "}
                  {residentialBrand.name}. Shingle roofs, storm and hail
                  claims, and homeowner financing all live over there.
                </p>
              </div>

              <Link
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn btn-ghost group shrink-0 self-start md:self-auto"
              >
                Visit {residentialBrand.shortName}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
