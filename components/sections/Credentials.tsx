"use client";

import { ShieldCheck, Award, FileCheck, Wallet } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "@/components/ui/Reveal";
import { credentials, manufacturers, warranties } from "@/lib/site";

const WARRANTY_ICONS = [FileCheck, ShieldCheck, Award, Wallet];

export function Credentials() {
  return (
    <section className="relative section bg-[var(--ink-90)] text-white noise overflow-hidden">
      <div
        className="absolute -bottom-52 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(194,6,6,0.18) 0%, transparent 68%)",
        }}
      />

      <div className="shell relative">
        {/* ── Credential bar ── */}
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-16 lg:mb-24">
          {credentials.map((c) => (
            <RevealItem key={c.label}>
              <div className="h-full p-6 lg:p-8 bg-[var(--ink-90)]">
                <ShieldCheck
                  size={20}
                  className="text-[var(--supreme-red-bright)] mb-4"
                />
                <p className="display-sm mb-2">{c.label}</p>
                <p className="text-[0.85rem] leading-[1.6] text-white/50">
                  {c.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Warranties ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-[var(--supreme-red-bright)] mb-5">
                What backs the work
              </p>
            </Reveal>
            <h2 className="display-lg mb-6">
              <RevealWords text="Warranties, not promises" />
            </h2>
            <Reveal delay={0.15}>
              <p className="text-[1rem] leading-[1.8] text-white/60">
                Certified applicator status is what lets us issue manufacturer
                warranties on restoration systems — and it is the difference
                between a coating that carries a warranty and one that is just
                paint.
              </p>
            </Reveal>

            {/* Manufacturer credentials */}
            <Reveal delay={0.25}>
              <div className="mt-9 pt-8 border-t border-white/12">
                <p className="eyebrow text-white/40 mb-5">
                  Manufacturer certified
                </p>
                <ul className="space-y-3.5">
                  {manufacturers.map((m) => (
                    <li
                      key={m.name}
                      className="flex items-baseline justify-between gap-4 pb-3.5 border-b border-white/[0.08]"
                    >
                      <span className="display-sm">{m.name}</span>
                      <span className="text-[0.8rem] text-white/45 text-right">
                        {m.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="lg:col-span-7 grid sm:grid-cols-2 gap-5 self-start">
            {warranties.map((w, i) => {
              const Icon = WARRANTY_ICONS[i % WARRANTY_ICONS.length];
              return (
                <RevealItem key={w.title} className="h-full">
                  <div
                    className="h-full p-7 lg:p-8 border border-white/12 transition-colors duration-300 hover:border-[var(--supreme-red)]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <Icon
                      size={22}
                      className="text-[var(--supreme-red-bright)] mb-5"
                    />
                    <h3 className="display-sm mb-3">{w.title}</h3>
                    <p className="text-[0.9rem] leading-[1.7] text-white/58">
                      {w.body}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
