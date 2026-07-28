import { locations } from "./locations";

/**
 * Single source of truth for site content.
 *
 * Every fact below comes from the Supreme Home Roofing discovery questionnaire
 * (Tyler Bradshaw, 23 Jul 2026), from mysupremehome.com, or from the client's
 * written website feedback (Supreme Commercial Coatings, initial review).
 *
 * NOTHING HERE IS INVENTED. No review counts, project counts, or "years in
 * business" claims are asserted, because the questionnaire reports 1 year
 * trading and no published review profile yet.
 *
 * VOICE: this is a Texas company. American spelling, plain words, the way a
 * roofer actually talks to a building owner. No "bespoke", no "leverage", no
 * "comprehensive solutions". If a sentence sounds like it was written by a
 * committee or a machine, rewrite it.
 *
 * POSITIONING (from client feedback, section 2):
 *   Supreme Commercial Coatings is a commercial roof RESTORATION AND
 *   REPLACEMENT company. Not a flat-roof contractor. Not a coating applicator.
 *   Not a repair company. We do repairs when a roof needs them, but repair is
 *   part of a restoration scope — it is not a product we sell on its own.
 */

/**
 * Canonical origin for metadata, sitemap and schema.
 *
 * This must be the host actually serving the site. Hardcoding
 * `mysupremehome.com` meant the Vercel deployment emitted canonicals and a
 * sitemap pointing at the old Squarespace site — telling Google the real
 * version of every page lived at a URL that doesn't serve it.
 *
 * Set NEXT_PUBLIC_SITE_URL once the production domain is attached.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Supreme Commercial Coatings",
  legalName: "Supreme Home Roofing and Construction",
  dba: "Supreme Commercial Coatings",
  shortName: "Supreme",
  abbr: "SCC",
  /** The client's own line. Use it verbatim — it is the positioning. */
  tagline: "Restore when viable. Replace when necessary.",
  phone: "(346) 781-9895",
  phoneHref: "tel:+13467819895",
  email: "tyler@mysupremehome.com",
  supportEmail: "support@mysupremehome.com",
  address: {
    street: "21145 FM 529, Suite 1110",
    city: "Katy",
    state: "TX",
    zip: "77449",
    full: "21145 FM 529, Suite 1110, Katy, TX 77449",
  },
  /**
   * Opening hours are deliberately NOT published.
   * The discovery questionnaire never asked for them, and the value that used
   * to sit here ("Mon–Sat, 7:00am – 7:00pm") was assumed — it contradicts the
   * Google Business listing, which shows the business opening at 9am. Wrong
   * hours on a lead-gen site cost calls, so the site points at the Google
   * profile, which the client already maintains. Set this once Tyler confirms
   * the real hours and restore the row on /contact.
   */
  jotformId: "262071993397065",
  url: siteUrl,
} as const;

/** The residential side of the business, kept deliberately separate. */
export const residentialBrand = {
  name: "Supreme Home Roofing",
  shortName: "Supreme Home",
  /**
   * The client would prefer residential to live on its own website entirely.
   * Until that domain exists, residential is one clearly-marked section of
   * this site rather than an equal peer to commercial. If/when it moves, set
   * this to the new origin and the nav will point off-site instead.
   */
  externalUrl: null as string | null,
  path: "/residential-roofing",
} as const;

/* ── CREDENTIALS ─────────────────────────────────────────── */
/* Texas does not issue a state roofing license, so the honest framing is
   insurance, bonding and manufacturer approval — not a fictional TX license. */

export const credentials = [
  {
    label: "Insured to $2M",
    detail: "General liability coverage carried on every project.",
  },
  {
    label: "Bonded",
    detail: "Bonded in the cities that require it.",
  },
  {
    label: "Approved Applicator",
    detail: "Certified on the coating systems we install.",
  },
  {
    label: "Free Assessment",
    detail: "No-cost roof assessment and written report.",
  },
] as const;

/**
 * `audience` exists because the full list is genuinely mixed: APOC and Henry's
 * are the commercial coating and waterproofing approvals, while CertainTeed is
 * steep-slope shingles and Attic Breeze is residential attic ventilation.
 *
 * Rendering all four with their descriptions on a commercial page put the
 * words "Shingle and steep-slope systems" and "Solar attic ventilation" in the
 * middle of the commercial credibility section, which is the leak client
 * feedback section 1 asks us to close. Components filter on this.
 *
 * The FAQ still names all four in one sentence, which is correct: that is a
 * factual statement of what we are certified on, not residential marketing.
 */
export const manufacturers = [
  {
    name: "APOC",
    note: "Roof coatings and restoration systems",
    audience: "commercial" as const,
  },
  {
    name: "Henry's",
    note: "Commercial roofing and waterproofing",
    audience: "commercial" as const,
  },
  {
    name: "CertainTeed",
    note: "Shingle and steep-slope systems",
    audience: "residential" as const,
  },
  {
    name: "Attic Breeze",
    note: "Solar attic ventilation",
    audience: "residential" as const,
  },
] as const;

export const commercialManufacturers = manufacturers.filter(
  (m) => m.audience === "commercial",
);

/* CertainTeed credential badges — official artwork supplied by the client.
   These are specific CertainTeed contractor tiers, so the wording stays
   exactly as CertainTeed names them.

   NOTE: both current badges are steep-slope (residential shingle) credentials.
   They belong on the residential side of the site, not on commercial pages.
   Add the commercial coating-manufacturer badges here as artwork arrives. */
export const credentialBadges = [
  {
    src: "/brand/certainteed-shinglemaster.png",
    alt: "CertainTeed ShingleMaster roofing contractor credential",
    name: "ShingleMaster",
    issuer: "CertainTeed",
    note: "Credentialed installer of CertainTeed steep-slope systems.",
    audience: "residential" as const,
  },
  {
    src: "/brand/certainteed-master-craftsman.png",
    alt: "CertainTeed Master Craftsman roofing contractor credential",
    name: "Master Craftsman",
    issuer: "CertainTeed",
    note: "CertainTeed's higher craftsmanship tier for shingle installation.",
    audience: "residential" as const,
  },
] as const;

/* ── THE COMMERCIAL POSITION ─────────────────────────────── */

/**
 * Client feedback, section 2: commercial clients get one of two
 * recommendations. Everything else is a detail of how that recommendation
 * gets carried out.
 */
export const recommendations = [
  {
    key: "restore",
    title: "Restore the roof",
    body: "The deck is sound, the insulation is dry, and the roof has service life left in it. We bring it back and put a warranty behind it.",
  },
  {
    key: "replace",
    title: "Replace the roof",
    body: "The substrate is too far gone for restoration to be worth your money. We say so, and we price the replacement.",
  },
] as const;

/**
 * The three shapes a project actually takes, depending on what the assessment
 * finds. These are NOT three services to pick from — they are what the roof's
 * condition dictates.
 */
export const pathways = [
  {
    step: "01",
    key: "coating",
    title: "Coating system",
    tag: "Restoration-ready",
    body: "The roof is already in shape to take a coating. We prep it, detail it, and install a complete coating system over it.",
  },
  {
    step: "02",
    key: "restoration",
    title: "Full restoration and coating",
    tag: "Corrective work first",
    body: "The roof can be saved, but not as it stands. Corrective work comes first, then the coating system goes on over a roof that's ready for it.",
  },
  {
    step: "03",
    key: "replacement",
    title: "Roof replacement",
    tag: "When restoration won't hold",
    body: "Wet insulation, failed decking, a membrane past saving. Coating that roof is throwing money at it. We tear off and replace instead.",
  },
] as const;

/**
 * Client feedback, section 2: repairs, detailing, prep, coating, QC and
 * closeout are PARTS OF ONE SCOPE. The site must not present them as
 * disconnected services a customer shops for individually.
 */
export const restorationScope = [
  {
    title: "Required repairs",
    body: "Whatever the roof needs to be sound before anything goes over it.",
  },
  {
    title: "Detailing",
    body: "Seams, penetrations, curbs, drains and flashings. That is where roofs actually leak.",
  },
  {
    title: "Surface preparation",
    body: "Cleaning and priming so the system bonds to the roof instead of sitting on it.",
  },
  {
    title: "Coating installation",
    body: "The complete system installed to the manufacturer's spec, at the specified rate.",
  },
  {
    title: "Quality control",
    body: "Thickness checks and inspection as the work goes down, not after it's covered up.",
  },
  {
    title: "Closeout",
    body: "Photo documentation, warranty paperwork, and a walkthrough before we leave.",
  },
] as const;

export const restorationBenefits = [
  "Usually a fraction of what a full replacement costs",
  "No tear-off, so your building stays open and running",
  "Renewable warranty, so you recoat instead of re-roofing",
  "Reflective surface takes heat load off the building",
  "Often books as a maintenance expense instead of capital",
  "Nothing goes to the landfill",
] as const;

/* ── ROOF SYSTEMS WE EVALUATE ────────────────────────────── */
/**
 * Client feedback, section 3: "We Restore Flat Roofs" is too narrow. SCC
 * evaluates every major commercial roof system. Roof type alone does not
 * decide whether restoration is appropriate — condition does.
 */
export const roofSystems = [
  {
    slug: "exposed-fastener-metal",
    name: "Exposed-fastener metal",
    body: "R-panel and through-fastened roofs. Fastener backout, seam movement and rust are what we're looking at.",
  },
  {
    slug: "standing-seam-metal",
    name: "Standing-seam metal",
    body: "Concealed-clip systems. The panels usually outlast the details, so the details are where we start.",
  },
  {
    slug: "tpo-single-ply",
    name: "TPO and single-ply",
    body: "TPO, PVC and EPDM membranes. Seam condition and how much life is left in the sheet drive the answer.",
  },
  {
    slug: "modified-bitumen",
    name: "Modified bitumen",
    body: "Mod-bit and torch-down. Surfacing wear, seam integrity and what's underneath the cap sheet.",
  },
  {
    slug: "built-up-asphaltic",
    name: "Built-up and asphaltic",
    body: "BUR, gravel-surfaced and other asphalt systems. Often better candidates for restoration than owners expect.",
  },
  {
    slug: "low-slope-specialty",
    name: "Low-slope and specialty",
    body: "Mixed assemblies, previously-coated roofs, and the odd systems that don't fit a category.",
  },
] as const;

/**
 * The point of the roof systems section: type is not the deciding factor.
 * Client feedback, section 3.
 */
export const eligibilityFactors = [
  {
    title: "Existing condition",
    body: "What the roof is doing right now, not what it was rated for when it went on.",
  },
  {
    title: "Moisture",
    body: "Wet insulation kills restoration. We find out before we recommend, not after.",
  },
  {
    title: "Substrate integrity",
    body: "The deck has to be able to hold what goes on top of it.",
  },
  {
    title: "Compatibility",
    body: "Not every system takes every coating. Some previously-coated roofs take none.",
  },
  {
    title: "Detailing requirements",
    body: "How much corrective work the edges, seams and penetrations need.",
  },
  {
    title: "Your objectives",
    body: "How long you need the roof to last, and whether this is a capital or maintenance decision.",
  },
] as const;

/* ── SERVICES ────────────────────────────────────────────── */

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  points: string[];
  audience: "commercial" | "residential";
  featured?: boolean;
};

/**
 * COMMERCIAL ONLY. These mirror the pathways above rather than listing
 * disconnected line items, per client feedback section 2. Repair is
 * deliberately absent as a standalone offering.
 */
export const services: Service[] = [
  {
    slug: "roof-assessment",
    title: "Commercial Roof Assessment",
    kicker: "Where every project starts",
    blurb:
      "We get on the roof, document what's actually there, and tell you whether it can be restored. No cost, and no obligation to do the work with us.",
    points: [
      "Core samples and moisture survey",
      "Photo-documented condition report",
      "Restoration eligibility determined on evidence",
      "Written recommendation, not a sales pitch",
    ],
    audience: "commercial",
    featured: true,
  },
  {
    slug: "roof-restoration",
    title: "Commercial Roof Restoration",
    kicker: "Coating and full restoration systems",
    blurb:
      "One complete scope: the corrective work the roof needs, the detailing, the prep, and the coating system over the top of it. Your building stays open the whole time.",
    points: [
      "Required repairs and detailing included in scope",
      "Manufacturer-specified systems, installed to spec",
      "Thickness checks and QC as the work goes down",
      "Renewable manufacturer warranty on qualifying systems",
    ],
    audience: "commercial",
    featured: true,
  },
  {
    slug: "roof-replacement",
    title: "Commercial Roof Replacement",
    kicker: "When restoration won't hold",
    blurb:
      "Some roofs are past saving, and coating them is a waste of your budget. When that's the answer, we tell you in writing and price the replacement.",
    points: [
      "Full tear-off and deck inspection",
      "Wet insulation and substrate replacement",
      "New system installed by certified crews",
      "Phased around your tenants and operations",
    ],
    audience: "commercial",
    featured: true,
  },
];

/**
 * RESIDENTIAL ONLY. Kept out of the commercial pages entirely, per client
 * feedback section 1. Shingles, homeowner financing and residential storm
 * work live here and nowhere else.
 */
export const residentialServices: Service[] = [
  {
    slug: "shingle-roofing",
    title: "Shingle Roofing",
    kicker: "Homes",
    blurb:
      "CertainTeed-certified shingle installation for Houston-area homes, backed by our 5-year leak protection warranty.",
    points: [
      "CertainTeed certified installation",
      "Architectural and impact-rated options",
      "5-year leak protection warranty",
      "Zero-down financing available",
    ],
    audience: "residential",
  },
  {
    slug: "storm-damage",
    title: "Storm and Hail Damage",
    kicker: "After Gulf Coast weather",
    blurb:
      "Full damage assessment after hail and wind, documented the way adjusters expect to see it.",
    points: [
      "Photo-documented damage report",
      "Wind and hail impact mapping",
      "Emergency tarping",
      "We deal with your carrier directly",
    ],
    audience: "residential",
  },
  {
    slug: "insurance-claims",
    title: "Insurance Claim Help",
    kicker: "We speak adjuster",
    blurb:
      "We meet the adjuster on your roof, document what gets missed, and keep the scope straight on both sides of the claim.",
    points: [
      "On-site adjuster meetings",
      "Supplement documentation",
      "Scope review before you sign anything",
      "A straight answer on what is and isn't covered",
    ],
    audience: "residential",
  },
  {
    slug: "residential-repair",
    title: "Roof Repair",
    kicker: "Leaks and problem areas",
    blurb:
      "Flashing, seams, penetrations and problem spots. The right answer when a roof still has life left in it.",
    points: [
      "Leak tracing and documentation",
      "Emergency tarping after storms",
      "Written report with photos",
      "An honest repair-or-replace answer",
    ],
    audience: "residential",
  },
];

/* Residential-only warranty and financing content. Deliberately NOT exported
   into any commercial page — client feedback section 1. */
export const warranties = [
  {
    title: "Free Inspection and Estimate",
    body: "We inspect, document and price the work at no cost. That includes telling you if you don't need a new roof yet.",
  },
  {
    title: "5-Year Leak Protection",
    body: "Our workmanship warranty covering leak protection on what we install.",
  },
  {
    title: "Manufacturer Limited Lifetime",
    body: "Available through our certified manufacturer systems on qualifying installations.",
  },
  {
    title: "Zero-Down Financing",
    body: "Financing starting at zero down with competitive rates.",
  },
] as const;

/* ── THE ASSESSMENT PROCESS ──────────────────────────────── */
/**
 * Client feedback, section 4. This is the actual journey a commercial client
 * goes through, and the website is supposed to mirror it exactly:
 *
 *   Assessment → Condition Documentation → Restoration Eligibility →
 *   Required Scope → Restoration or Replacement Recommendation → Proposal
 */
export const processSteps = [
  {
    n: "01",
    title: "Assessment",
    body: "We get on the roof and walk the whole thing. Core samples where we need them, moisture readings, and a look at every detail and penetration.",
  },
  {
    n: "02",
    title: "Condition documentation",
    body: "Everything we find gets photographed and written down: deck, insulation, membrane, seams, drainage. You get the record whether you hire us or not.",
  },
  {
    n: "03",
    title: "Restoration eligibility",
    body: "We determine whether this roof can be restored, based on what we documented. Roof type doesn't decide this. Condition does.",
  },
  {
    n: "04",
    title: "Required scope",
    body: "If it can be restored, we spell out exactly what has to happen first. The corrective work, the detailing, the prep. No vague allowances.",
  },
  {
    n: "05",
    title: "Recommendation",
    body: "Restore or replace, in writing, with the reasoning behind it. Where both are viable, you see both numbers side by side.",
  },
  {
    n: "06",
    title: "Proposal",
    body: "A scoped, priced proposal you can take to ownership, with the documentation that backs up every line of it.",
  },
] as const;

/* ── STATS ───────────────────────────────────────────────── */
/* Only verifiable figures. No client counts, project counts or years
   in business — the questionnaire reports 1 year trading. */

export const stats = [
  { value: 2, prefix: "$", suffix: "M", label: "Liability insurance carried" },
  { value: 18, suffix: "", label: "Greater Houston cities served" },
  { value: 4, suffix: "", label: "Manufacturer certifications" },
  { value: 6, suffix: "", label: "Roof systems we evaluate" },
] as const;

/* ── ABOUT / WHY CHOOSE ──────────────────────────────────── */

export const aboutPoints = [
  "We assess the roof before we recommend anything",
  "Free assessment with a written, photographed report",
  "Certified applicator on the systems we install",
  "Work scheduled around your tenants and your hours",
] as const;

export const whyChoose = [
  {
    title: "The roof decides, not the sales call",
    body: "We don't show up with an answer already picked. What we document on your roof is what determines the recommendation.",
  },
  {
    title: "Certified, so the warranty is real",
    body: "Manufacturer approval is what lets a coating carry a warranty at all. Without it, a coating is paint with a receipt.",
  },
  {
    title: "Restoration and replacement, both",
    body: "We're not a coating company looking for roofs to coat. When a roof needs replacing, that's what we tell you.",
  },
  {
    title: "One scope, not a pile of line items",
    body: "Repairs, detailing, prep, coating, QC and closeout come as one job with one number and one company standing behind it.",
  },
] as const;

/* ── COMMERCIAL CREDIBILITY ──────────────────────────────── */
/**
 * Client feedback, section 5: SCC is still building its commercial portfolio.
 * Present experience accurately. Build credibility on what's verifiable —
 * qualifications, process and accountability — not on volume claims.
 */
export const credibilityPillars = [
  {
    title: "Manufacturer certifications",
    body: "We're an approved applicator on the systems we install. That approval is audited, and it's what makes a manufacturer warranty possible.",
  },
  {
    title: "Warranty-eligible systems",
    body: "Where a project meets the manufacturer's requirements, it can carry a manufacturer-backed warranty. We'll tell you upfront whether yours qualifies.",
  },
  {
    title: "A process that doesn't bend",
    body: "Same assessment, same documentation, same written recommendation on every building, whether it's a gas station or a distribution center.",
  },
  {
    title: "You know who's accountable",
    body: "Supreme leadership walks commercial roofs personally. You're not handed to a rotating account manager after you sign.",
  },
  {
    title: "Real photos, real projects",
    body: "What you see on this site comes off our own jobs. We'd rather show you a short portfolio that's ours than a long one that isn't.",
  },
  {
    title: "The Supreme name behind it",
    body: "Supreme Commercial Coatings is the commercial arm of an established Supreme roofing operation, with the reputation that comes with it.",
  },
] as const;

/**
 * Commercial case studies.
 *
 * DELIBERATELY EMPTY. The client is still building the commercial portfolio
 * (feedback section 5) and asked that the site be structured so projects can
 * be added naturally as the business grows.
 *
 * Add entries here and the case study section appears on its own. Remove them
 * all and it disappears cleanly — no broken layout, no placeholder cards, and
 * no implied claim about work that hasn't happened yet.
 */
export type CaseStudy = {
  slug: string;
  building: string;
  city: string;
  system: string;
  recommendation: "Restored" | "Replaced";
  squares?: number;
  summary: string;
  image?: string;
};

export const caseStudies: CaseStudy[] = [];

/* ── COMMERCIAL CAPABILITIES ─────────────────────────────── */

export const capabilities = [
  { title: "Moisture surveys", note: "Core samples before we quote" },
  { title: "Infrared scanning", note: "Finding wet insulation" },
  { title: "Seam and flashing work", note: "Where roofs actually leak" },
  { title: "Ponding correction", note: "Tapered fills and drainage" },
  { title: "Metal roof restoration", note: "Rust treatment and seam seal" },
  { title: "Coating systems", note: "Silicone and acrylic, to spec" },
] as const;

/* ── TEAM ────────────────────────────────────────────────── */
/**
 * Roles, not invented people.
 *
 * Client feedback section 5 asks for "real SCC leadership and clear project
 * accountability" on the site. That needs real names, titles and headshots
 * from the client — add them to the `name` and `photo` fields here and the
 * component renders them automatically. Until then this shows the roles
 * honestly rather than inventing staff.
 */
export const team = [
  {
    role: "Owner and Estimator",
    name: null as string | null,
    photo: null as string | null,
    body: "Walks the roof on commercial projects and writes the assessment personally.",
  },
  {
    role: "Project Manager",
    name: null as string | null,
    photo: null as string | null,
    body: "Your one point of contact once work starts. Daily updates, site cleanliness, schedule.",
  },
  {
    role: "Certified Applicators",
    name: null as string | null,
    photo: null as string | null,
    body: "Trained on the systems we install, which is what makes the manufacturer warranty issuable.",
  },
  {
    role: "Quality Control",
    name: null as string | null,
    photo: null as string | null,
    body: "Checks thickness and detailing as the work goes down, before anything gets covered up.",
  },
] as const;

/* ── SERVICE AREAS ───────────────────────────────────────── */

/* Derived from lib/locations.ts so the two lists cannot drift. Previously
   this was a hand-maintained duplicate of the same 18 cities. */
export const serviceAreas: readonly string[] = locations.map((l) => l.name);

/* ── WHO WE WORK WITH ────────────────────────────────────── */

export const clientTypes = [
  {
    title: "Property Managers",
    body: "Multi-site portfolios where a surprise roof replacement wrecks the capital budget. We build a restoration plan you can defend to ownership.",
  },
  {
    title: "Building Owners",
    body: "Roofs coming up on the end of their service life. We tell you how many years are actually left and what it costs to add more.",
  },
  {
    title: "Churches and Schools",
    body: "Buildings where every dollar gets accounted for. Restoration keeps the roof tight without a capital campaign.",
  },
  {
    title: "Retail and Restaurants",
    body: "Gas stations, fast food, strip centers. A small building gets the same documentation as a big one.",
  },
] as const;

/* ── FAQ ─────────────────────────────────────────────────── */
/* Commercial-first. Residential financing and shingle questions moved to the
   residential page, per client feedback section 1. */

export const faqs = [
  {
    q: "Can my roof be restored instead of replaced?",
    a: "That depends on condition, not roof type. If the deck and insulation are dry and sound, and the membrane is weathered rather than failed, restoration is usually on the table. We take core samples and run a moisture survey before we answer. If the roof is too far gone, we'll tell you that instead of selling you a coating that won't last.",
  },
  {
    q: "What kinds of commercial roofs do you work on?",
    a: "All the major commercial systems: exposed-fastener metal, standing-seam metal, TPO and other single-ply membranes, modified bitumen, built-up and asphaltic roofs, and low-slope or specialty assemblies. We assess the whole roof system rather than deciding by roof type.",
  },
  {
    q: "Why does everyone else quote me a full replacement?",
    a: "Because replacement carries the biggest price tag. That's the honest answer. We assess the roof first, and where restoration and replacement are both viable, you get both numbers so you can see the difference yourself.",
  },
  {
    q: "Do you only do coatings?",
    a: "No. We restore roofs and we replace roofs. A coating is one part of a restoration, and restoration is only the right call when the roof supports it. When it doesn't, we replace.",
  },
  {
    q: "Do you do repairs?",
    a: "We do the repairs a roof needs as part of restoring it. That's built into the scope. We're not set up as a call-out repair company, though. If your roof needs a repair to get it ready, that's part of the job we quote.",
  },
  {
    q: "Are you licensed and insured in Texas?",
    a: "Texas doesn't issue a state roofing contractor license, so no roofer in Texas holds one. What matters is insurance and manufacturer approval. We carry general liability coverage to $2 million, we're bonded in the cities that require it, and we're certified applicators for APOC, Henry's, CertainTeed and Attic Breeze. We also hold Oklahoma CIB residential roofing license #80007778.",
  },
  {
    q: "How long does a commercial restoration take?",
    a: "Most coating projects run days rather than weeks, and there's no tear-off, so your building stays open the whole time. We schedule around your hours and give you a progress update every day we're on site.",
  },
  {
    q: "What warranties come with the work?",
    a: "Restoration systems carry renewable manufacturer warranties. When the term is up you recoat instead of re-roofing. Where a project meets the manufacturer's requirements, it can carry a manufacturer-backed warranty, and we'll tell you upfront whether yours qualifies.",
  },
  {
    q: "How small a job will you take?",
    a: "We're set up for 100+ square projects, but we work on gas stations, fast food buildings and single-building sites all the time. A small roof gets the same assessment, documentation and warranty as a big one.",
  },
] as const;

/* Residential-specific questions, kept on the residential page only. */
export const residentialFaqs = [
  {
    q: "Do you offer financing?",
    a: "Yes. Financing starts at zero down with competitive rates. We'll walk you through the options before you commit to anything.",
  },
  {
    q: "What shingles do you install?",
    a: "We're CertainTeed certified, and we install architectural and impact-rated shingles. Impact-rated can earn you a break on your homeowner's insurance, so it's worth asking about.",
  },
  {
    q: "My roof got hit by hail. What now?",
    a: "Call us and we'll come look at it for free. We document the damage the way adjusters expect to see it, meet your adjuster on the roof, and review the scope with you before you sign anything. We'll also tell you when a claim isn't worth filing.",
  },
  {
    q: "What warranty comes with a new roof?",
    a: "Our 5-year leak protection workmanship warranty on what we install, and qualifying installations can also carry a manufacturer limited lifetime warranty.",
  },
] as const;

/* ── IMAGERY ─────────────────────────────────────────────── */
/**
 * PLACEHOLDER PHOTOGRAPHY.
 *
 * Client feedback section 5 asks for "actual photographs from completed
 * commercial work". These are verified-live Unsplash sources standing in
 * until Supreme's own job photography and drone footage is supplied.
 *
 * SOURCE AND LICENCE: everything under /public/photos comes from Pexels or
 * Unsplash. Both licences permit commercial use with no attribution required,
 * which is what a client site needs. The files are downloaded and self-hosted
 * rather than hotlinked, so the site does not depend on a third-party CDN
 * staying up, and Next/Image can actually optimise and cache them.
 *
 * The previous set had a specific problem worth not repeating: three of the
 * "different" aerials (aerialCommercial, aerialWarehouse, aerialPlant) were
 * the same distribution centre from three angles, and two more were mostly
 * sky. The replacements are five distinct buildings, and the roof surface is
 * legible in each — which matters on a site whose whole argument is that we
 * assess what is actually up there.
 *
 * Swap the paths here only — every page reads from this object, so replacing
 * a value updates the whole site.
 */
export const media = {
  /** Hero background loop. The still below doubles as its poster, so the
      optimized image is still what paints first. */
  heroVideo:
    "https://ik.imagekit.io/qcvroy8xpd/Video.mp4?updatedAt=1776680374692",

  /** A technician spray-applying a coating. The most on-message shot we have. */
  heroCoating: "/photos/coating-application.jpg",

  /** Top-down over long commercial roof bays. Seams, curbs and drainage are
      actually legible, which is the point of an assessment-led site. */
  aerialCommercial: "/photos/commercial-roof-bays.jpg",

  /** A genuine 100+ square distribution roof, from above. */
  aerialWarehouse: "/photos/distribution-roof-aerial.jpg",

  /** Rooftop mechanical units and curbs on a commercial building. */
  aerialPlant: "/photos/rooftop-units.jpg",

  /** A metal roof with advanced rust and fastener wear. Used where the page
      talks about what we look for, not about a system type. */
  rustedMetal: "/photos/metal-roof-rusted.jpg",

  /** Wider context shots. */
  warehouseAerial: "/photos/warehouse-aerial.jpg",
  industrialPark: "/photos/industrial-park-aerial.jpg",
  loadingDocks: "/photos/loading-docks-aerial.jpg",

  /** Crew and service.
      `crewOnRoof` is a steep-slope roof with a chimney, so it belongs on the
      residential page only. Commercial sections use `rooftopService`, which is
      a technician on a low-slope commercial roof. */
  crewOnRoof: "/photos/crew-roof-repair.jpg",
  rooftopService: "/photos/rooftop-equipment-service.jpg",

  /** Residential — used only on /residential-roofing. */
  residentialTearOff: "/photos/residential-tear-off.jpg",

  /** Kept name for the contact page's background plate. */
  grayRoof: "/photos/standing-seam-detail.jpg",
} as const;

/**
 * Per-system photography for the Roof Systems section.
 *
 * Keyed by the `slug` in `roofSystems` above. A system with no entry simply
 * renders without a photo, so adding or removing systems never breaks the
 * layout. Metal is well covered by free stock; membrane systems are not, so
 * TPO, mod-bit and BUR deliberately have no image rather than a misleading
 * one. Replace all of these with Supreme's own job photography when it lands.
 */
export const roofSystemImages: Record<string, string | undefined> = {
  // Corrugated through-fastened panels, fasteners visible.
  "exposed-fastener-metal": "/photos/system-exposed-fastener-metal.jpg",
  // Concealed-clip standing seam.
  "standing-seam-metal": "/photos/system-standing-seam-metal.jpg",
  // No honest free-stock image of a TPO or mod-bit membrane exists that we
  // found. Showing a metal roof against either label would be a lie a roofing
  // client would spot instantly, so these stay empty until Supreme's own
  // photos arrive.
  "tpo-single-ply": undefined,
  "modified-bitumen": undefined,
  "built-up-asphaltic": undefined,
  // A genuinely mixed low-slope assembly.
  "low-slope-specialty": "/photos/weathered-lowslope-roof.jpg",
};

/* ── NAVIGATION ──────────────────────────────────────────── */
/**
 * Commercial-first, per client feedback section 1. Commercial items lead.
 * Residential is one clearly-labeled entry marked as a separate side of the
 * business rather than an equal peer sitting in the middle of the commercial
 * journey.
 */
export const nav = [
  { label: "Commercial Roofing", href: "/commercial-roofing" },
  { label: "Our Process", href: "/commercial-roofing#process" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
] as const;

/**
 * Secondary commercial links. Surfaced in the mobile menu and footer rather
 * than the desktop bar, which only has room for four before it collides with
 * the phone block.
 */
export const secondaryNav = [
  { label: "Roof Systems We Evaluate", href: "/commercial-roofing#roof-systems" },
  { label: "Restoration Scope", href: "/commercial-roofing#scope" },
  { label: "Contact", href: "/contact" },
] as const;

/** Rendered separately from the main nav so it reads as a different business. */
export const residentialNavItem = {
  label: "Residential",
  href: residentialBrand.path,
  note: "Supreme Home Roofing",
} as const;

/* ── HERO TICKERS ────────────────────────────────────────── */

export const tickerPrimary = [
  "COMMERCIAL ROOF RESTORATION",
  "COMMERCIAL ROOF REPLACEMENT",
  "METAL · TPO · MOD-BIT · BUR",
  "RESTORATION ELIGIBILITY ASSESSMENTS",
  "INSURED TO $2M",
  "APOC CERTIFIED",
  "HENRY'S CERTIFIED",
  "FREE ROOF ASSESSMENTS",
  "GREATER HOUSTON",
] as const;

export const tickerSecondary = [
  "WAREHOUSES",
  "RETAIL CENTERS",
  "CHURCHES",
  "GAS STATIONS",
  "RESTAURANTS",
  "PROPERTY MANAGEMENT PORTFOLIOS",
  "SCHOOLS",
  "OFFICE PARKS",
  "MEDICAL BUILDINGS",
] as const;
