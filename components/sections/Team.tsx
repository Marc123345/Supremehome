"use client";

import Image from "next/image";
import { HardHat, ClipboardList, Paintbrush, FileSearch } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { HouseEyebrow } from "@/components/ui/HouseMark";
import { team } from "@/lib/site";

const ICONS = [HardHat, ClipboardList, Paintbrush, FileSearch];

/**
 * WHO YOU DEAL WITH.
 *
 * Client feedback section 5 asks for "real SCC leadership and clear project
 * accountability" on the site. That needs names, titles and headshots the
 * client hasn't supplied yet, and inventing staff would be fabrication.
 *
 * So each card renders whatever it has:
 *   - name + photo  → headshot card with the person's name and role
 *   - name only     → name and role, icon in place of the photo
 *   - neither       → the role on its own, exactly as before
 *
 * Fill in `name` and `photo` in `team` (lib/site.ts) and the cards upgrade
 * themselves with no code change. Headshots go in /public/team.
 */
export function Team() {
  const hasRealPeople = team.some((m) => m.name);

  return (
    <section className="section bg-white border-t border-black/[0.07]">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">Who you deal with</HouseEyebrow>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="A small team, on your roof" />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              You won&rsquo;t get passed around a call center. The person who
              assesses your roof is the person who writes the recommendation and
              puts their name on it.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <RevealItem key={member.role} className="h-full">
                <div className="notch-card clip-notch group h-full">
                  <span className="notch-tick" />
                  <div className="clip-notch h-full p-8 flex flex-col">
                    {member.photo ? (
                      <span className="relative w-20 h-20 mb-7 rounded-full overflow-hidden bg-[var(--ink-05)]">
                        <Image
                          src={member.photo}
                          alt={member.name ?? member.role}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span className="grid place-items-center w-14 h-14 mb-7 rounded-full bg-[var(--red-wash)] transition-colors duration-300 group-hover:bg-[var(--supreme-red)]">
                        <Icon
                          size={23}
                          className="text-[var(--supreme-red)] transition-colors duration-300 group-hover:text-white"
                        />
                      </span>
                    )}

                    {member.name ? (
                      <>
                        <h3 className="display-sm mb-1">{member.name}</h3>
                        <p className="eyebrow text-[var(--supreme-red)] mb-3">
                          {member.role}
                        </p>
                      </>
                    ) : (
                      <h3 className="display-sm mb-3">{member.role}</h3>
                    )}

                    <p className="text-[1rem] leading-[1.7] text-black">
                      {member.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Shown only while the team is still listed by role. Disappears on its
            own the moment real names land in lib/site.ts. */}
        {!hasRealPeople && (
          <Reveal delay={0.2}>
            <p className="mt-8 text-[1.02rem] leading-[1.7] text-black/70 max-w-2xl">
              Want to know exactly who&rsquo;s coming out to your building?
              Ask when you call. We&rsquo;ll tell you who&rsquo;s walking the
              roof and who&rsquo;s writing the report.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
