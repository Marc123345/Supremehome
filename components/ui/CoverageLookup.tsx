"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowUpRight, Phone, X } from "lucide-react";
import { locations, type Location } from "@/lib/locations";
import { site } from "@/lib/site";

type Result =
  | { kind: "idle" }
  | { kind: "hit"; location: Location; matchedOn: string }
  | { kind: "miss"; query: string };

function normalise(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Coverage lookup — type a city or neighborhood and find out whether we cover
 * it, and which location page to read.
 *
 * Deliberately matches on place names, not ZIP codes: we don't hold a verified
 * ZIP-to-city table for the Houston metro, and guessing would tell people the
 * wrong thing about whether a crew will show up.
 */
export function CoverageLookup({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const suggestions = useMemo(() => {
    const q = normalise(query);
    if (q.length < 2) return [];
    return locations
      .filter(
        (l) =>
          normalise(l.name).includes(q) ||
          l.nearby.some((n) => normalise(n).includes(q))
      )
      .slice(0, 5);
  }, [query]);

  function lookup(raw: string) {
    const q = normalise(raw);
    if (!q) return;

    const byCity = locations.find((l) => normalise(l.name) === q);
    if (byCity) return setResult({ kind: "hit", location: byCity, matchedOn: byCity.name });

    const byCityPartial = locations.find((l) => normalise(l.name).includes(q));
    if (byCityPartial)
      return setResult({ kind: "hit", location: byCityPartial, matchedOn: byCityPartial.name });

    for (const l of locations) {
      const area = l.nearby.find((n) => normalise(n).includes(q));
      if (area) return setResult({ kind: "hit", location: l, matchedOn: area });
    }

    setResult({ kind: "miss", query: raw });
  }

  return (
    <div className="relative bg-[var(--ink-90)] text-white noise">
      <button
        onClick={onClose}
        aria-label="Close coverage lookup"
        className="absolute top-5 right-5 z-10 w-11 h-11 grid place-items-center border border-white/15 hover:bg-[var(--supreme-red)] hover:border-[var(--supreme-red)] transition-colors"
      >
        <X size={18} />
      </button>

      <div className="p-8 lg:p-14">
        <p className="eyebrow text-[var(--supreme-red-bright)] mb-4">
          Coverage check
        </p>
        <h2 className="display-lg mb-4 max-w-[18ch]">Are you in our area?</h2>
        <p className="text-[1.05rem] leading-[1.75] text-white max-w-xl mb-9">
          Type your city or neighborhood. We cover eighteen communities across
          Greater Houston, and we travel further for commercial flat-roof work.
        </p>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            lookup(query);
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl"
        >
          <label htmlFor="coverage-query" className="sr-only">
            Your city or neighborhood
          </label>
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/75 pointer-events-none"
            />
            <input
              id="coverage-query"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setResult({ kind: "idle" });
              }}
              placeholder="e.g. Cypress, Clear Lake, Grand Parkway"
              autoComplete="off"
              className="w-full bg-white/[0.04] border border-white/15 pl-11 pr-4 py-4 text-[1.02rem] text-white placeholder:text-white/75 focus:border-[var(--supreme-red)] focus:outline-none transition-colors"
            />
          </div>
          <button type="submit" className="btn btn-primary shrink-0">
            Check coverage
          </button>
        </form>

        {/* Live suggestions */}
        {result.kind === "idle" && suggestions.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4 max-w-2xl">
            {suggestions.map((s) => (
              <li key={s.slug}>
                <button
                  onClick={() => {
                    setQuery(s.name);
                    lookup(s.name);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-[1rem] text-white hover:border-[var(--supreme-red)] hover:text-white transition-colors"
                >
                  <MapPin size={12} className="text-[var(--supreme-red-bright)]" />
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Result */}
        {result.kind === "hit" && (
          <div className="mt-8 p-7 lg:p-8 bg-white/[0.03] border-l-[4px] border-[var(--supreme-red)] max-w-2xl">
            <p className="eyebrow text-[var(--supreme-red-bright)] mb-3">
              Yes, we cover it
            </p>
            <h3 className="display-md mb-3">
              {result.matchedOn}
              {result.matchedOn !== result.location.name && (
                <span className="text-white/75"> · {result.location.name}</span>
              )}
            </h3>
            <p className="text-[1rem] leading-[1.7] text-white mb-6">
              {result.location.name} is inside the service area, in{" "}
              {result.location.county}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/service-areas/${result.location.slug}`}
                onClick={onClose}
                className="btn btn-primary group"
              >
                {result.location.name} roofing
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                <Phone size={15} />
                {site.phone}
              </a>
            </div>
          </div>
        )}

        {result.kind === "miss" && (
          <div className="mt-8 p-7 lg:p-8 bg-white/[0.03] border-l-[4px] border-white/25 max-w-2xl">
            <p className="eyebrow text-white/75 mb-3">Not on the list</p>
            <h3 className="display-md mb-3">Still worth a call</h3>
            <p className="text-[1rem] leading-[1.7] text-white mb-6">
              We didn&apos;t find “{result.query}” in our eighteen listed
              communities. Commercial projects outside the listed area may
              still be a fit — call and we will confirm.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn btn-primary">
                <Phone size={15} />
                {site.phone}
              </a>
              <Link href="/contact" onClick={onClose} className="btn btn-ghost-light">
                Send us the address
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
