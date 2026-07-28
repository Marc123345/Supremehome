import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { JotformEmbed } from "@/components/sections/JotformEmbed";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { media, site, credentials } from "@/lib/site";
import { googleProfile } from "@/lib/reviews";
import { HouseEyebrow } from "@/components/ui/HouseMark";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact: Request a Free Roof Assessment",
  description: `Call ${site.phone} or request a free roof inspection. Supreme Home Roofing serves commercial and residential clients across Greater Houston from ${site.address.city}, TX.`,
};

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
    note: "Fastest way to reach a person",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Send plans, photos or an RFP",
  },
  {
    icon: MapPin,
    label: "Office",
    value: site.address.full,
    note: "Serving Greater Houston",
  },
  {
    // Hours live on the Google profile the client already keeps up to date,
    // rather than a second copy here that can drift out of step.
    icon: Clock,
    label: "Opening hours",
    value: "See current hours on Google",
    href: googleProfile.shareUrl,
    note: "Kept up to date on our Google listing",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Free assessment · No obligation"
        title="Let's look at your roof"
        intro="Tell us what you are dealing with and we will get someone on the roof. You will get a written assessment with photographs. That includes an honest answer on whether you need to do anything at all yet."
        image={media.grayRoof}
        imageAlt="Close view of a weathered roof surface"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ── Form ── */}
            <div className="lg:col-span-7">
              <Reveal>
                <HouseEyebrow className="mb-5">
                  Request an inspection
                </HouseEyebrow>
              </Reveal>
              <h2 className="display-md mb-8">
                <RevealWords text="Tell us about the roof" />
              </h2>
              <Reveal delay={0.15}>
                <JotformEmbed formId={site.jotformId} />
              </Reveal>
            </div>

            {/* ── Details ── */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-5">
                <Reveal direction="left">
                  <ul className="border border-black/[0.09]">
                    {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, note }) => (
                      <li
                        key={label}
                        className="p-6 border-b border-black/[0.09] last:border-b-0"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-[var(--red-wash)]">
                            <Icon size={17} className="text-[var(--supreme-red)]" />
                          </span>
                          <div>
                            <p className="eyebrow text-black/40 mb-1.5">{label}</p>
                            {href ? (
                              <a
                                href={href}
                                className="font-bold text-[1rem] hover:text-[var(--supreme-red)] transition-colors break-words"
                              >
                                {value}
                              </a>
                            ) : (
                              <p className="font-bold text-[1rem]">{value}</p>
                            )}
                            <p className="text-[0.82rem] text-black/48 mt-1">
                              {note}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Scheduling slot — embed the client's booking tool here */}
                <Reveal direction="left" delay={0.1}>
                  <div className="p-7 bg-[var(--ink-90)] text-white noise relative overflow-hidden">
                    <CalendarCheck
                      size={22}
                      className="text-[var(--supreme-red-bright)] mb-4"
                    />
                    <h3 className="display-sm mb-3">Prefer to book online?</h3>
                    <p className="text-[0.9rem] leading-[1.7] text-white/60 mb-5">
                      Online scheduling is coming shortly. Until then, call us and
                      we will put a slot in the diary while you are on the phone.
                    </p>
                    <a href={site.phoneHref} className="btn btn-primary w-full">
                      <Phone size={16} />
                      {site.phone}
                    </a>
                  </div>
                </Reveal>

                <Reveal direction="left" delay={0.15}>
                  <ul className="grid grid-cols-2 gap-px bg-black/[0.09] border border-black/[0.09]">
                    {credentials.map((c) => (
                      <li key={c.label} className="bg-white p-5">
                        <p className="font-display text-[1.2rem] uppercase leading-tight">
                          {c.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
