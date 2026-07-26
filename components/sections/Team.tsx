"use client";

import { HardHat, ClipboardList, Paintbrush, FileSearch } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { team } from "@/lib/site";

const ICONS = [HardHat, ClipboardList, Paintbrush, FileSearch];

/**
 * Ported from topfloor `sections/home1/Team.js` (a Swiper carousel of staff
 * cards). Rebuilt as a static grid of ROLES rather than people — the client
 * has not supplied names or headshots, and inventing them would be fabrication.
 * Drop real names, photos and bios into `team` in lib/site.ts to fill this in.
 */
export function Team() {
  return (
    <section className="section bg-white border-t border-black/[0.07]">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red)] mb-5">
                Who you deal with
              </p>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="A small team, on your roof" />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              You will not be handed between call centres. The person who
              inspects the roof is the person who writes the assessment.
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
                    <span className="grid place-items-center w-14 h-14 mb-7 rounded-full bg-[var(--red-wash)] transition-colors duration-300 group-hover:bg-[var(--supreme-red)]">
                      <Icon
                        size={23}
                        className="text-[var(--supreme-red)] transition-colors duration-300 group-hover:text-white"
                      />
                    </span>
                    <h3 className="display-sm mb-3">{member.role}</h3>
                    <p className="text-[0.9rem] leading-[1.7] text-black/58">
                      {member.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
