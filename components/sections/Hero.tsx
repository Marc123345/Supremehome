"use client";

import Link from "next/link";
import Image from "next/image";
import {ArrowRight, Phone} from "lucide-react";
import { GoogleRating } from "@/components/ui/GoogleRating";
import { HouseMark } from "@/components/ui/HouseMark";
import { site, media } from "@/lib/site";

export function Hero() {

  return (
    <section className="relative w-full overflow-hidden flex flex-col min-h-[560px] lg:min-h-[calc(88svh-var(--header-h))]">
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* The still is the LCP element: priority-loaded, and no longer
            carrying a slow zoom. */}
        <div className="absolute inset-0">
          <Image
            src={media.heroCoating}
            alt="A roofing technician spray-applying a restoration coating across a commercial roof"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "brightness(0.66) contrast(1.04) saturate(0.98)" }}
          />
        </div>

        {/* A muted looping background clip used to sit here, desktop-only.
            It is the single heaviest continuous animation a page can carry,
            and it fetched 0.84 MB before anyone had read a line. The still
            above is what remains. */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0.42) 72%, rgba(224,1,22,0.34) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(96deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.24) 50%, transparent 82%)",
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-[0.045]" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col shell pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Top: positioning copy */}
        <div
        >
          <div className="flex items-center gap-3 mb-4">
            <HouseMark
              size={22}
              color="var(--supreme-red-bright)"
              className="shrink-0"
            />
            <span className="eyebrow text-[var(--supreme-red-bright)]">
              Commercial roofing · Greater Houston
            </span>
          </div>
        </div>

        {/* Desktop: the house sits large in the open upper-right. This is the
            "you are unmistakably on a Supreme site" moment Tiffany asked for —
            the mark is the first shape you register after the headline. */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-[var(--gutter)] top-[clamp(5.5rem,14vh,10rem)] z-20"
        >
          <HouseMark
            size={190}
            color="var(--supreme-red)"
            className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Spacer pushes the headline block to the lower third */}
        <div className="flex-1 min-h-[2.5rem]" />

        {/* Headline + right block */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            {/* The client's own positioning line, used verbatim.
                NOT `display-xl`: that scale is clamp(3rem, 11vw, 9.5rem),
                tuned for the two short words the old headline used ("We
                Restore" / "FLAT ROOFS"). This headline is four times longer,
                and at 11vw it wrapped to four lines and pushed the CTAs, trust
                chips and rating clean off the fold. The scale below keeps each
                sentence on one line down to tablet. */}
            <h1
              className="font-display uppercase text-white"
              style={{
                fontSize: "clamp(2rem, 5.4vw, 4.5rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.005em",
              }}
            >
              <span className="block font-bold">Restore when viable.</span>
              <span className="block italic text-[var(--supreme-red-bright)]">
                Replace when necessary.
              </span>
            </h1>

            <p
              className="mt-6 max-w-lg text-[1.05rem] lg:text-[1.12rem] leading-[1.7]"
              style={{ color: "#ffffff" }}
            >
              Own or manage a building in Greater Houston? We get on the roof
              at no cost, document what is actually there, and tell you whether
              it needs restoring or replacing — before anyone talks price.
            </p>

            {/* Live Google rating — real figures from the knowledge panel. */}
            <div
              className="mt-6"
            >
              <GoogleRating variant="dark" />
            </div>

            {/* Mobile / tablet CTAs */}
            <div
              className="mt-7 flex flex-wrap items-center gap-3 lg:hidden"
            >
              <a href={site.phoneHref} className="btn btn-primary">
                <Phone size={16} />
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost-light">
                Request an Assessment
              </Link>
            </div>
          </div>

          {/* Desktop secondary block */}
          <div
            className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col items-start pb-3"
          >
            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary group">
                Request a Commercial Roof Assessment
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/commercial-roofing"
                aria-label="Commercial roofing services"
                className="w-[52px] h-[52px] shrink-0 grid place-items-center rounded-full transition-all duration-300 hover:bg-white/20"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                <ArrowRight size={16} className="text-white -rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[4px] z-30 bg-[var(--supreme-red)]" />
    </section>
  );
}
