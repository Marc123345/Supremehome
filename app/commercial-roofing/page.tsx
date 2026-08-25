import type { Metadata } from "next";
import { SccHero } from "@/components/scc/SccHero";
import { CapabilityIndex } from "@/components/scc/CapabilityIndex";
import { RoofSystemsIndex } from "@/components/scc/RoofSystemsIndex";
import { AssessmentAndProcess } from "@/components/scc/AssessmentAndProcess";
import { SolutionPair } from "@/components/scc/SolutionPair";
import { ExecutionPair } from "@/components/scc/ExecutionPair";
import { ProjectProof } from "@/components/scc/ProjectProof";
import { BuyerQuestions } from "@/components/scc/BuyerQuestions";
import { FinalCta } from "@/components/scc/FinalCta";

import { ServicesJsonLd } from "@/components/seo/JsonLd";

/**
 * COMMERCIAL — rebuilt to the eight-section buyer page in file 05 §2.
 *
 * ── What this replaced ─────────────────────────────────────────────────────
 *
 * Ten major sections, ~13,900px, ~1,756 words, 47 headings. The strategic
 * review's finding: it "repeats the homepage and gives restoration more depth
 * than replacement".
 *
 * Both faults are structural, so both are fixed structurally:
 *
 *  · REPEATING THE HOMEPAGE. This page now shares exactly two components with
 *    the homepage — the capability index and the proof system — and everything
 *    else is content the homepage does not carry: roof systems, the criteria
 *    in detail, two full execution scopes, and the buyer questions. The
 *    homepage keeps ONE concise assessment explanation; this page keeps the
 *    detailed one.
 *  · RESTORATION OVER REPLACEMENT. `ExecutionPair` renders both families from
 *    one array through one markup path, so they cannot diverge in depth,
 *    image ratio, heading level or density. See the note in that file.
 *
 * ── The eight sections ─────────────────────────────────────────────────────
 *
 *   1. Commercial hero ..................... SccHero (different image to home)
 *   2. Capabilities and roof systems ....... CapabilityIndex + RoofSystemsIndex
 *   3. What determines the recommendation .. AssessmentAndProcess
 *   4. Solution direction .................. SolutionPair
 *   5. Executing restoration/protection .... ExecutionPair
 *   6. Executing replacement ............... ExecutionPair
 *   7. Process, deliverables, proof ........ ProjectProof (dark)
 *   8. Four buyer questions + final CTA .... BuyerQuestions + FinalCta
 *
 * ── Removed ────────────────────────────────────────────────────────────────
 *
 * The duplicated company introduction, audience cards (WhoWeServe), the
 * repeated service/path cards (ServicesSlider, Recommendations), the
 * assertion-heavy credentials grid, the defensive portfolio wording, and the
 * nine-question FAQ — which is now four questions whose visible answers and
 * schema come from one array.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/commercial-roofing" },
  title: "Commercial Roof Assessment, Restoration and Replacement",
  /* The old description claimed a "free written assessment" and listed roof
     systems as though each were an installed offering. Both are unresolved
     claims (file 03, D1 and D7), and file 02 requires metadata to carry the
     same factual controls as visible copy. */
  description:
    "Commercial roofing across Greater Houston. Supreme Commercial Coatings assesses the existing roof, documents its condition, and delivers repair and restoration, coating and protection systems, or complete roof replacement — whichever the assessment supports.",
};

export default function CommercialRoofingPage() {
  return (
    <>
      <SccHero
        /* A different image from the homepage — file 04 §7 requires it, and
           the homepage opens on assessment so this opens on a wide roof
           overview.
           ⚠ Development substitute pending SCC photography (file 03, C). */
        image="/photos/distribution-roof-aerial.jpg"
        imageAlt="Aerial view of a large low-slope distribution centre roof with rooftop units and drainage"
        eyebrow="Commercial Roofing · Greater Houston"
        headlineLight="Assess the roof."
        headlineBold="Then do the right work."
        body="Supreme Commercial Coatings assesses existing commercial roofs across Greater Houston and delivers repair, restoration, coating and protection, or complete replacement — decided by the roof's documented condition and the project's requirements."
        showRating={false}
      />

      <CapabilityIndex />

      <RoofSystemsIndex />

      <AssessmentAndProcess />

      <SolutionPair
        eyebrow="Solution direction"
        heading="Two directions, one decision"
        intro="Restoration and protection and replacement are coequal capabilities. The assessment, the building's requirements and the owner's objectives decide between them — not a preferred product."
      />

      <ExecutionPair />

      <ProjectProof />

      <BuyerQuestions />

      <FinalCta />

      <ServicesJsonLd />
    </>
  );
}
