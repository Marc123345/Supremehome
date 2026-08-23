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

/**
 * HELD PENDING VERIFICATION — correction package sections A4 and 05.
 *
 * All four tiles that used to sit here made claims Supreme has not confirmed
 * in writing: a $2M liability limit whose basis (per occurrence vs aggregate)
 * is unknown, blanket bonding, a generic "Approved Applicator" line standing
 * in for manufacturer designations we do not have exactly right, and a free
 * assessment whose standard contents are undefined.
 *
 * The package's instruction for an unresolved claim is to remove it rather
 * than publish a softened version, so the array is empty and the credential
 * bar does not render. Restore entries here — in Supreme's own approved
 * wording — and both the Credentials section and the contact page pick them
 * up again automatically.
 */
export const credentials: readonly { label: string; detail: string }[] = [];

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
    body: "The documented condition supports restoration: current serviceability, moisture, substrate and compatibility all point the same way. We scope the work the roof needs and bring it back.",
  },
  {
    key: "replace",
    title: "Replace the roof",
    body: "The documented condition does not support restoration, or the project requires a new system. We say so, and we price the replacement.",
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
    title: "Coating and protection",
    tag: "Fully serviceable today",
    body: "The roof is fully serviceable today and is an appropriate candidate for the selected protective system. We clean, detail, prepare, coat and protect it.",
  },
  {
    step: "02",
    key: "restoration",
    title: "Restoration repairs plus coating and protection",
    tag: "Serviceability requires work first",
    body: "Full serviceability requires essential restoration work first. We scope the repairs the roof needs, then install the protective system over a roof that is ready for it.",
  },
  {
    step: "03",
    key: "replacement",
    title: "Roof replacement",
    tag: "When restoration is not viable",
    body: "Restoration is not viable based on the documented condition or project requirements, or replacement is otherwise necessary. We price and install the replacement.",
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
    body: "The project-specific repairs required before coating and protection goes over the roof.",
  },
  {
    title: "Detailing",
    body: "Seams, penetrations, curbs, drains and flashings. That's where roofs leak.",
  },
  {
    title: "Surface preparation",
    body: "Cleaning and priming so the system bonds to the roof instead of sitting on it.",
  },
  {
    title: "Coating installation",
    body: "The complete system installed to the approved project specification and required application rate.",
  },
  {
    title: "Quality control",
    body: "Thickness checks and inspection as the work goes down, not after it's covered up.",
  },
  {
    title: "Closeout",
    body: "Photo documentation, any applicable warranty paperwork, and a walkthrough before we leave.",
  },
] as const;

/**
 * Three claims, not six. The correction package removed the other three
 * outright: the accounting line (a marketing site should not classify a
 * client's capital expenditure), the zero-landfill line (repairs, packaging
 * and removed materials still produce waste), and the renewable-warranty
 * line, which promised future recoat eligibility years before the condition
 * assessment that would decide it. The three that remain are conditional
 * because the outcome genuinely depends on the roof.
 */
export const restorationBenefits = [
  "Can cost less than replacement for an appropriate candidate",
  "May reduce tear-off and disruption to building operations",
  "Reflective systems may lower roof-surface temperatures; building-level energy results depend on the assembly and operating conditions",
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
    body: "Concealed-clip systems. We assess panel condition, clips, seams, terminations and penetrations before recommending a path.",
  },
  {
    slug: "tpo-single-ply",
    name: "TPO and single-ply",
    body: "TPO, PVC and EPDM membranes. Membrane and seam condition, flashings, moisture, substrate, drainage and system compatibility all bear on the answer.",
  },
  {
    slug: "modified-bitumen",
    name: "Modified bitumen",
    body: "Mod-bit and torch-down. Surfacing wear, seam integrity, and what the assessment finds beneath the cap sheet.",
  },
  {
    slug: "built-up-asphaltic",
    name: "Built-up and asphaltic",
    body: "BUR, gravel-surfaced and other asphalt systems. Condition, moisture and compatibility decide whether restoration is appropriate.",
  },
  {
    slug: "low-slope-specialty",
    name: "Low-slope and specialty",
    body: "Mixed assemblies, previously coated roofs, and specialty systems.",
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
    body: "Moisture in the assembly bears directly on whether restoration is appropriate. We establish it before we recommend, not after.",
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
  /** Anchor on /commercial-roofing this service actually explains. The footer
      and the services slider used to point all three at the bare page, which
      promised detail the link did not reach (correction package D3, J2). */
  anchor?: string;
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
    anchor: "#process",
    title: "Commercial Roof Assessment",
    kicker: "Where every project starts",
    blurb:
      "We get on the roof, document what's actually there, and tell you whether it can be restored. No cost, and no obligation to do the work with us.",
    points: [
      "Core samples and moisture survey when conditions warrant",
      "Photo-documented condition report",
      "Restoration eligibility determined on evidence",
      "A documented recommendation, not a sales pitch",
    ],
    audience: "commercial",
    featured: true,
  },
  {
    slug: "roof-restoration",
    anchor: "#scope",
    title: "Commercial Roof Restoration",
    kicker: "Coating and full restoration systems",
    blurb:
      "One complete scope: the corrective work the roof needs, the detailing, the prep, and the coating system over the top of it. The work is coordinated to reduce disruption to building operations.",
    points: [
      "Required repairs and detailing included in scope",
      "Installed to the approved project specification",
      "Thickness checks and QC as the work goes down",
      "Warranty terms identified in the proposal before authorization",
    ],
    audience: "commercial",
    featured: true,
  },
  {
    slug: "roof-replacement",
    anchor: "#recommendations",
    title: "Commercial Roof Replacement",
    kicker: "When restoration won't hold",
    blurb:
      "Some roofs are past saving, and coating them is a waste of your budget. When that's the answer, we tell you in writing and price the replacement.",
    points: [
      "Tear-off and deck inspection to the project scope",
      "Wet insulation and substrate replacement where found",
      "New system installed to the approved specification",
      "Coordinated around your tenants and operations",
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
      "What your policy does and doesn't cover",
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
      "Repair or replace, answered in writing",
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
    body: "We get on the roof and walk the whole thing. Core samples and moisture readings when conditions warrant, and a look at every detail and penetration.",
  },
  {
    n: "02",
    title: "Condition documentation",
    body: "What we find gets photographed and written down: deck, insulation, membrane, seams, drainage.",
  },
  {
    n: "03",
    title: "Restoration eligibility",
    body: "We determine whether this roof can be restored, based on what we documented. Roof type doesn't decide this. Condition does.",
  },
  {
    n: "04",
    title: "Required scope",
    body: "If it can be restored, we spell out what has to happen first: the essential restoration repairs, the detailing, the prep.",
  },
  {
    n: "05",
    title: "Recommendation",
    body: "Restore or replace, documented, with the reasoning behind it.",
  },
  {
    n: "06",
    title: "Proposal",
    body: "A project-specific scope, pricing and supporting documentation you can take to ownership.",
  },
] as const;

/* ── STATS ───────────────────────────────────────────────── */
/* Only verifiable figures. No client counts, project counts or years
   in business — the questionnaire reports 1 year trading. */

/**
 * The insurance figure and the manufacturer-certification count both came out
 * here (correction package C15). The first is an unverified limit; the second
 * counted four certifications on a commercial page when two of them —
 * CertainTeed and Attic Breeze — are residential credentials.
 *
 * What is left is checkable against this repository: the city list and the
 * roof-system list are both derived from data below.
 */
export const stats = [
  { value: 18, suffix: "", label: "Greater Houston cities served" },
  { value: 6, suffix: "", label: "Roof systems we evaluate" },
] as const;

/* ── ABOUT / WHY CHOOSE ──────────────────────────────────── */

export const aboutPoints = [
  "We assess the roof before we recommend anything",
  "No-cost commercial roof assessment",
  "Systems installed to the manufacturer's requirements",
  "Work coordinated around your tenants and operations",
] as const;

export const whyChoose = [
  {
    title: "The recommendation follows the documented condition",
    body: "We don't show up with an answer already picked. What we document on your roof is what determines the recommendation.",
  },
  {
    title: "Qualified systems, verified requirements",
    body: "Manufacturer approval, project specifications and inspection requirements are what make a warranty available at all. We work to those requirements and tell you what they mean for your roof.",
  },
  {
    title: "Restoration and replacement, both",
    body: "We're not a coating company looking for roofs to coat. When a roof needs replacing, that's what we tell you.",
  },
  {
    title: "One coordinated project-specific scope",
    body: "Repairs, detailing, prep, coating, QC and closeout are identified together as one project scope rather than a pile of separate line items.",
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
    title: "Manufacturer requirements",
    body: "Coating and protection systems are installed to the manufacturer's requirements for the specified system. Those requirements are what make a manufacturer-backed warranty possible on a qualifying project.",
  },
  {
    title: "Warranty terms in the proposal",
    body: "Warranty options depend on the system, specification, installation requirements, manufacturer approval and inspections. Applicable terms are identified in the project proposal before you authorize anything.",
  },
  {
    title: "A process that doesn't bend",
    body: "The same assessment and the same documentation, on a single-building project or a distribution center.",
  },
  {
    title: "You know who's accountable",
    body: "Your commercial contact stays involved from the assessment through the recommendation. You're not handed to a rotating account manager after you sign.",
  },
  {
    title: "No borrowed portfolios",
    body: "Our commercial project list is short and growing. We'd rather show you that than pad it out with work that isn't ours.",
  },
  {
    title: "The Supreme name behind it",
    body: "Supreme Commercial Coatings is the commercial roofing business within Supreme, working out of Katy across Greater Houston.",
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
  { title: "Moisture surveys", note: "When conditions warrant" },
  { title: "Infrared scanning", note: "When included in the assessment scope" },
  { title: "Seam and flashing work", note: "Detailing as the scope requires" },
  { title: "Ponding correction", note: "Tapered fills and drainage, as scoped" },
  { title: "Metal roof restoration", note: "Rust treatment and seam seal" },
  { title: "Coating systems", note: "Installed to the approved specification" },
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
    body: "Your commercial contact from the assessment through the recommendation.",
  },
  {
    role: "Project Manager",
    name: null as string | null,
    photo: null as string | null,
    body: "Runs the job once work starts. Communication and schedule are established for the specific project.",
  },
  {
    role: "Applicators",
    name: null as string | null,
    photo: null as string | null,
    body: "Trained on the systems we install and the requirements those systems carry.",
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
    body: "Multi-site portfolios where roof spend has to be planned rather than absorbed. We document condition in a form that supports portfolio planning and ownership review.",
  },
  {
    title: "Building Owners",
    body: "Roofs coming up on the end of their service life. We document present condition and explain the available paths.",
  },
  {
    title: "Churches and Schools",
    body: "Buildings where every dollar gets accounted for. We help leadership evaluate responsible use of available funds.",
  },
  {
    title: "Retail and Restaurants",
    body: "Gas stations, fast food, strip centers. Smaller single-building projects get a documented assessment too.",
  },
] as const;

/* ── FAQ ─────────────────────────────────────────────────── */
/* Commercial-first. Residential financing and shingle questions moved to the
   residential page, per client feedback section 1. */

export const faqs = [
  {
    q: "Can my roof be restored instead of replaced?",
    a: "Possibly. Viability depends on the roof's current serviceability, moisture conditions, substrate integrity, system compatibility, detailing needs, prior work, and your objectives for the building. We document those conditions before recommending restoration and coating or replacement. If the roof is too far gone, we tell you that instead of selling you a coating that won't last.",
  },
  {
    q: "What kinds of commercial roofs do you work on?",
    a: "We assess exposed-fastener metal, standing-seam metal, TPO and other single-ply membranes, modified bitumen, built-up roofing, and mixed low-slope assemblies. Current installation and restoration capabilities vary by roof system and project requirements. The recommended path depends on the condition of the specific roof, not its category alone.",
  },
  {
    q: "Why does everyone else quote me a full replacement?",
    a: "Replacement is a common recommendation for an aging roof because it provides a complete new system. It is not always the only appropriate option. When the existing roof is a viable restoration candidate, we explain that path and the work it requires.",
  },
  {
    q: "Do you only do coatings?",
    a: "No. We provide commercial roof assessment, coating and protection systems, essential restoration repairs when required, and roof replacement. A coating system is recommended only when the existing roof is a viable candidate.",
  },
  {
    q: "Do you do repairs?",
    a: "Repairs required to prepare an approved restoration project are included in the project-specific scope. Availability for standalone commercial repair work depends on the property, location and required scope — call us to confirm project fit.",
  },
  {
    q: "Are you licensed and insured in Texas?",
    a: "Texas doesn't issue a statewide roofing contractor license, so no roofer in Texas holds one. What matters is insurance and manufacturer approval. We carry general liability insurance and hold current manufacturer credentials for the systems we install, and documentation is available on request.",
  },
  {
    q: "How long does a commercial restoration take?",
    a: "Project duration depends on roof size, existing condition, the restoration work required, weather, access and the selected system. We provide a project-specific schedule before work begins and coordinate the work to reduce disruption to building operations.",
  },
  {
    q: "What warranties come with the work?",
    a: "Warranty options depend on the selected system, project specifications, installation requirements, manufacturer approval, inspections and submission procedures. Applicable warranty terms are identified in the project proposal before authorization.",
  },
  {
    q: "How small a job will you take?",
    a: "We assess both large commercial roofs and smaller single-building projects. Project fit depends on location, roof size, scope, access and scheduling — call us to confirm whether a specific property is a fit.",
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

/* "INSURED TO $2M", "APOC CERTIFIED" and "HENRY'S CERTIFIED" were removed
   here (correction package A4 and 05). The insurance limit is unconfirmed and
   both manufacturer designations need to come back in the manufacturer's own
   exact wording — "Henry's" is a trading name we have not verified. */
export const tickerPrimary = [
  "COMMERCIAL ROOF RESTORATION",
  "COMMERCIAL ROOF REPLACEMENT",
  "METAL · TPO · MOD-BIT · BUR",
  "COMMERCIAL ROOF ASSESSMENTS",
  "RESTORE WHEN VIABLE",
  "REPLACE WHEN NECESSARY",
  "GREATER HOUSTON",
] as const;

/* Residential surfaces used to run tickerPrimary, which advertises commercial
   restoration systems to homeowners (correction package I2). Everything below
   already appears in the residential services and FAQs on that page. */
export const tickerResidential = [
  "RESIDENTIAL ROOF REPLACEMENT",
  "STORM AND HAIL DAMAGE",
  "ROOF REPAIR",
  "INSURANCE CLAIM HELP",
  "FREE ROOF INSPECTION",
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
