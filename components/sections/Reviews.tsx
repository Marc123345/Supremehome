"use client";

import { Quote, Star, User, MapPin, ArrowUpRight, Navigation } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/components/ui/useReducedMotion";
import { commercialSafeReviews, googleProfile, type Review } from "@/lib/reviews";
import { site } from "@/lib/site";
import { HouseEyebrow } from "@/components/ui/HouseMark";

/**
 * Google reviews + map, in the vertical auto-scrolling pattern from
 * marc-portfolio-nextjs `ContactTestimonials.tsx`, restyled onto the Supreme
 * design system.
 *
 * On mobile / reduced motion the marquee is replaced by a short static list —
 * the track duplicates every card, which is a lot of DOM and continuous
 * compositing to hand a phone.
 */

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className="fill-[#FFB400] text-[#FFB400]"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative bg-white border border-black/[0.09] p-6 lg:p-7">
      <div className="flex items-start justify-between gap-4 mb-4">
        <Stars />
        <Quote
          size={20}
          className="shrink-0 text-[var(--supreme-red)] opacity-25 -scale-x-100"
          aria-hidden="true"
        />
      </div>

      <blockquote className="text-[0.92rem] leading-[1.7] text-black/72 mb-5">
        {review.quote}
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-4 border-t border-black/[0.08]">
        <span className="grid place-items-center w-9 h-9 rounded-full bg-[var(--red-wash)] shrink-0">
          <User size={15} className="text-[var(--supreme-red)]" />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.88rem] font-bold truncate">
            {review.name}
          </span>
          <span className="block text-[0.72rem] uppercase tracking-[0.14em] text-black/40">
            {review.service}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const reduced = useReducedMotion();
  // commercialSafeReviews, not `reviews`: two of the thirteen explicitly
  // describe residential shingle work, and one closes with "get your storm
  // damaged roof replaced". Client feedback section 1 keeps that off the
  // commercial pages. See lib/reviews.ts.
  const visible = reduced
    ? commercialSafeReviews.slice(0, 4)
    : commercialSafeReviews;

  return (
    <section className="section bg-[var(--ink-05)] border-y border-black/[0.07]">
      <div className="shell">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">
                Reviews on Google
              </HouseEyebrow>
            </Reveal>
            {/* Split so the closing phrase carries the accent on its own
                line, matching the two-tone headline treatment used across the
                site (and the portfolio original this section is based on).
                The <br> is what forces the break — a plain space would let
                the two halves reflow onto one line at wide viewports. */}
            <h2 className="display-lg">
              <RevealWords text="Take their word" />
              <br />
              <span className="italic text-[var(--supreme-red)]">
                <RevealWords text="for it." delay={0.14} />
              </span>
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              Every quote here sits on our Google profile, word for word. Our
              commercial portfolio is younger than the company is, and
              we&rsquo;d rather show you the track record we have than dress
              it up as something else.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ── Reviews ── */}
          <div className="lg:col-span-7">
            {reduced ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {visible.map((r) => (
                  <ReviewCard key={r.name} review={r} />
                ))}
              </div>
            ) : (
              <div className="reviews-mask relative h-[620px] overflow-hidden">
                <div className="reviews-track grid gap-5 sm:grid-cols-2">
                  {[...visible, ...visible].map((r, i) => (
                    <ReviewCard key={`${r.name}-${i}`} review={r} />
                  ))}
                </div>
              </div>
            )}

            <a
              href={googleProfile.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-inline group inline-flex items-center gap-2 mt-7 font-bold text-[0.92rem] text-[var(--supreme-red)]"
            >
              Read every review on Google
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* ── Map ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal direction="left">
                <div className="relative border border-black/[0.09] bg-white overflow-hidden">
                  <iframe
                    src={googleProfile.mapEmbedUrl}
                    title={`Map showing ${site.name} in ${site.address.city}, Texas`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[300px] lg:h-[360px] block border-0"
                  />
                  <span className="absolute top-0 inset-x-0 h-[4px] bg-[var(--supreme-red)] pointer-events-none" />
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="p-6 lg:p-7 bg-[var(--ink-90)] text-white noise">
                  <p className="eyebrow text-[var(--supreme-red-bright)] mb-4">
                    Find us
                  </p>
                  <div className="flex items-start gap-3 mb-6">
                    <MapPin
                      size={16}
                      className="shrink-0 mt-1 text-[var(--supreme-red-bright)]"
                    />
                    <p className="text-[0.93rem] leading-[1.6] text-white/85">
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.state}{" "}
                      {site.address.zip}
                    </p>
                  </div>
                  <a
                    href={googleProfile.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    <Navigation size={15} />
                    Get directions
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
