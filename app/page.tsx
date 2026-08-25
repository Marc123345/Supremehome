import type { Metadata } from "next";
import { SccHero } from "@/components/scc/SccHero";
import { CapabilityIndex } from "@/components/scc/CapabilityIndex";
import { SolutionPair } from "@/components/scc/SolutionPair";
import { ProjectProof } from "@/components/scc/ProjectProof";
import { AssessmentAndProcess } from "@/components/scc/AssessmentAndProcess";
import { CoverageBridge } from "@/components/scc/CoverageBridge";
import { FinalCta } from "@/components/scc/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * HOMEPAGE — rebuilt to the seven-section experience in file 05 §1.
 *
 * ── What this replaced ─────────────────────────────────────────────────────
 *
 * Fourteen major sections, ~15,600px tall, ~1,765 words, 46 headings. The
 * strategic review's finding was not that any one section was bad: it was that
 * everything carried the same weight, so commercial proof — the thing a buyer
 * actually needs — was weaker than a review grid about residential jobs.
 *
 * The seven sections below are the package's own list, in its order:
 *
 *   1. Commercial hero .................... SccHero
 *   2. Complete commercial capability ..... CapabilityIndex
 *   3. Assessment-led solution direction .. SolutionPair
 *   4. Projects and results ............... ProjectProof      ← dark
 *   5. What SCC evaluates / how it works .. AssessmentAndProcess
 *   6. Coverage and residential bridge .... CoverageBridge    ← utility band
 *   7. Final assessment CTA ............... FinalCta          ← the only red
 *
 * ── The nine blocks that were removed ──────────────────────────────────────
 *
 * Every one is named on file 03's REMOVE list. None of their useful facts were
 * lost; each moved to the route that owns it.
 *
 *   Reviews grid + embedded map → one compact rating line in the hero. The
 *     grid ran ~1,300px and gave residential replacement and insurance-claim
 *     reviews more visual weight than SCC's commercial capability.
 *   CoverageMap (full map + 18-city directory) → Service Areas owns it now,
 *     as it does for the header, mobile menu and footer.
 *   FAQ (nine questions) → four buyer questions on Commercial, where the
 *     schema will match the visible answers.
 *   WhoWeServe (audience cards) → generic property-owner/manager cards.
 *   Team ("A small team, on your roof") → named people belong on About.
 *   DeeperLinks ("If you want the specifics") → the capability index does
 *     that navigational job in a fraction of the height.
 *   SlidingText → decorative marquee transition.
 *   WhyChoose / About preview → the second and third restatements of the
 *     assessment-first argument. One explanation on the homepage, one on
 *     Commercial, per the content-hierarchy rule.
 *   Credentials (assertion grid) → folded into ProjectProof, which shows what
 *     can actually be evidenced rather than asserting six claims.
 *
 * ── Surface ratio ──────────────────────────────────────────────────────────
 *
 * Five light sections, one dark (proof), one red (final CTA) — inside the
 * 75-80 / 15-20 / ≤5 split in file 04 §3. The red CTA is the only full red
 * section on the route, which is an explicit acceptance criterion.
 *
 * ⚠ Container: sections use `.shell` (1440) not `.scc-shell` (1240). The two
 * must migrate together across all routes — see the note in Header.tsx.
 */
export default function Home() {
  return (
    <>
      <SccHero
        /* Assessment, not coating application. The person on the roof is the
           subject; Commercial uses a wide overview so the two never share an
           image (file 04 §7).
           ⚠ Development substitute — an approved SCC assessment photograph
           replaces this before production (file 03, request C). */
        image="/photos/rooftop-equipment-service.jpg"
        imageAlt="A technician on a commercial roof inspecting rooftop equipment and surrounding roof surface"
        headlineLight="Restore when viable."
        headlineBold="Replace when necessary."
        body="Supreme Commercial Coatings evaluates existing commercial roofs and delivers the project-specific solution the condition and project requirements support — from repair and restoration to coating systems and complete roof replacement."
      />

      <CapabilityIndex />

      <SolutionPair
        intro="Supreme assesses the roof before recommending anything. What the assessment finds — not a preferred product — decides which direction the project takes."
      />

      <ProjectProof />

      <AssessmentAndProcess />

      <CoverageBridge />

      <FinalCta />
    </>
  );
}
