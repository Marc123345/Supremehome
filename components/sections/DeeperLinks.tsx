import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { HouseEyebrow } from "@/components/ui/HouseMark";

/**
 * The home page's handoff to the detail.
 *
 * Three sections — the roof systems grid, the restoration scope, and the
 * six-step process — used to render in full here and in full again on
 * /commercial-roofing. A visitor who read both pages read all three twice,
 * which is most of why the home page was as long as it was.
 *
 * The correction package (A6) asks for one primary version of each block with
 * the duplicate shortened. The commercial page is the primary version; this is
 * the shortened one. Each link goes to the anchor that actually answers it,
 * not to the top of the page.
 */
const LINKS = [
  {
    href: "/commercial-roofing#roof-systems",
    title: "Roof systems we assess",
    body: "Exposed-fastener and standing-seam metal, TPO and single-ply, modified bitumen, built-up, and mixed low-slope assemblies — and what decides the path on each.",
  },
  {
    href: "/commercial-roofing#scope",
    title: "What a restoration includes",
    body: "The repairs, detailing, preparation, coating installation, quality control and closeout that make up one coordinated project scope.",
  },
  {
    href: "/commercial-roofing#process",
    title: "How the assessment runs",
    body: "Six steps from the first roof walk to a project-specific proposal, and what you get at each one.",
  },
] as const;

export function DeeperLinks() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <HouseEyebrow className="mb-5">The detail</HouseEyebrow>
            </Reveal>
            <h2 className="display-lg">
              <RevealWords text="If you want the specifics" />
            </h2>
          </div>
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <p className="lede">
              The commercial roofing page carries the full version of each of
              these. Go straight to the part you need.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px bg-black/10 border border-black/10 sm:grid-cols-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col bg-white p-7 lg:p-8 transition-colors hover:bg-[var(--ink-05)]"
            >
              <h3 className="display-sm mb-3">{link.title}</h3>
              <p className="text-[0.9rem] leading-[1.7] text-black/58 mb-6">
                {link.body}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-[0.86rem] font-bold text-[var(--supreme-red)]">
                Read it
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
