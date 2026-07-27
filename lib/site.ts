import { locations } from "./locations";

/**
 * Single source of truth for site content.
 * Every fact below comes from the Supreme Home Roofing discovery questionnaire
 * (Tyler Bradshaw, 23 Jul 2026) or from mysupremehome.com.
 *
 * NOTE: Nothing here is invented. No review counts, project counts, or
 * "years in business" claims are asserted, because the questionnaire reports
 * 1 year trading and no published review profile yet.
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
  name: "Supreme Home Roofing & Construction",
  dba: "Supreme Commercial Coatings",
  shortName: "Supreme",
  tagline: "Restore First. Replace Only When You Must.",
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
  hours: "Mon–Sat, 7:00am – 7:00pm",
  jotformId: "262071993397065",
  url: siteUrl,
} as const;

/* ── CREDENTIALS ─────────────────────────────────────────── */
/* Texas does not issue a state roofing licence, so the honest framing is
   insurance, bonding and manufacturer approval — not a fictional TX licence. */

export const credentials = [
  {
    label: "Insured to $2M",
    detail: "General liability coverage carried on every project.",
  },
  {
    label: "Bonded",
    detail: "Bonded in the municipalities that require it.",
  },
  {
    label: "OK Licensed",
    detail: "Oklahoma CIB residential roofing licence #80007778.",
  },
  {
    label: "Free Inspections",
    detail: "No-cost roof inspection and written estimate.",
  },
] as const;

export const manufacturers = [
  { name: "APOC", note: "Roof coatings & restoration systems" },
  { name: "Henry's", note: "Commercial roofing & waterproofing" },
  { name: "CertainTeed", note: "Shingle & steep-slope systems" },
  { name: "Attic Breeze", note: "Solar attic ventilation" },
] as const;

/* CertainTeed credential badges — official artwork supplied by the client.
   These are specific CertainTeed contractor tiers, so the wording stays
   exactly as CertainTeed names them. */
export const credentialBadges = [
  {
    src: "/brand/certainteed-shinglemaster.png",
    alt: "CertainTeed ShingleMaster roofing contractor credential",
    name: "ShingleMaster",
    issuer: "CertainTeed",
    note: "Credentialed installer of CertainTeed steep-slope systems.",
  },
  {
    src: "/brand/certainteed-master-craftsman.png",
    alt: "CertainTeed Master Craftsman roofing contractor credential",
    name: "Master Craftsman",
    issuer: "CertainTeed",
    note: "CertainTeed's higher craftsmanship tier for shingle installation.",
  },
] as const;

export const warranties = [
  {
    title: "Free Inspection & Estimate",
    body: "We inspect, document and price the work at no cost — including a candid answer on whether you actually need a new roof.",
  },
  {
    title: "5-Year Leak Protection",
    body: "Residential workmanship warranty covering leak protection on our installations.",
  },
  {
    title: "Manufacturer Limited Lifetime",
    body: "Available through our certified manufacturer systems on qualifying installations.",
  },
  {
    title: "Zero-Down Financing",
    body: "Residential financing starting at zero down with competitive APRs.",
  },
] as const;

/* ── THE POSITIONING ─────────────────────────────────────── */

export const restorationLadder = [
  {
    step: "01",
    title: "Repair",
    tag: "Lowest cost",
    body: "If the roof is sound and the problem is localised, we repair it. Flashing, seams, penetrations, ponding areas — fixed and documented.",
  },
  {
    step: "02",
    title: "Restore",
    tag: "Our specialty",
    body: "A fluid-applied coating system renews a serviceable roof for a fraction of replacement cost, adds warranty years, and reflects Houston heat off the building.",
  },
  {
    step: "03",
    title: "Replace",
    tag: "Last resort",
    body: "When the deck or insulation is gone, restoration is throwing money away. Then — and only then — we replace, and we say so in writing.",
  },
] as const;

export const restorationBenefits = [
  "Typically a fraction of full replacement cost",
  "No tear-off, so your building stays open and operating",
  "Renewable warranty — recoat instead of re-roof",
  "Reflective surface cuts cooling load in Houston summers",
  "Often qualifies as a maintenance expense, not a capital one",
  "No landfill tear-off waste",
] as const;

/* ── SERVICES ────────────────────────────────────────────── */

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  points: string[];
  audience: "commercial" | "residential" | "both";
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "commercial-restoration",
    title: "Roof Restoration & Coatings",
    kicker: "Flat & low-slope",
    blurb:
      "Fluid-applied coating systems that renew a serviceable flat roof instead of tearing it off. Our core service and the reason most building owners call us.",
    points: [
      "Silicone & acrylic coating systems",
      "APOC and Henry's certified applications",
      "Renewable manufacturer warranties",
      "Applied while your building stays open",
    ],
    audience: "commercial",
    featured: true,
  },
  {
    slug: "flat-commercial-roofing",
    title: "Flat & Commercial Roofing",
    kicker: "Full systems",
    blurb:
      "TPO, modified bitumen, built-up and single-ply systems for warehouses, retail centres, churches, gas stations and quick-service restaurants.",
    points: [
      "Projects from a single gas station to 100+ squares",
      "Tear-off and re-cover options priced side by side",
      "Detailed moisture survey before we quote",
      "Phased schedules that work around tenants",
    ],
    audience: "commercial",
    featured: true,
  },
  {
    slug: "roof-repair",
    title: "Roof Repair",
    kicker: "Leaks & problem areas",
    blurb:
      "Targeted repairs to flashing, seams, penetrations and ponding areas — the honest first answer when a roof still has life in it.",
    points: [
      "Leak tracing and documentation",
      "Emergency tarping after storms",
      "Written report with photos",
      "Repair-vs-restore recommendation included",
    ],
    audience: "both",
    featured: true,
  },
  {
    slug: "storm-damage",
    title: "Storm & Hail Restoration",
    kicker: "Gulf Coast weather",
    blurb:
      "Full damage assessment after Houston hail and wind events, documented to the standard adjusters expect.",
    points: [
      "Photo-documented damage report",
      "Wind and hail impact mapping",
      "Emergency make-safe work",
      "Direct coordination with your carrier",
    ],
    audience: "both",
  },
  {
    slug: "insurance-claims",
    title: "Insurance Claim Assistance",
    kicker: "We speak adjuster",
    blurb:
      "We meet the adjuster on the roof, document what they miss, and keep the scope honest on both sides of the claim.",
    points: [
      "On-site adjuster meetings",
      "Supplement documentation",
      "Scope review before you sign",
      "Clear explanation of what is and isn't covered",
    ],
    audience: "both",
  },
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    kicker: "When it's genuinely time",
    blurb:
      "Complete tear-off and replacement when the deck or insulation is too far gone to restore — and we will tell you when that's the case.",
    points: [
      "Full tear-off and deck inspection",
      "Insulation and substrate repair",
      "Manufacturer-certified installation",
      "Limited lifetime warranty available",
    ],
    audience: "both",
  },
  {
    slug: "metal-roofing",
    title: "Metal Roofing",
    kicker: "Standing seam & R-panel",
    blurb:
      "Metal systems for commercial buildings, barns and residential properties — plus coating systems that extend the life of the metal you already have.",
    points: [
      "Standing seam and exposed-fastener systems",
      "Metal roof restoration coatings",
      "Rust treatment and seam sealing",
      "Fastener and panel replacement",
    ],
    audience: "both",
  },
  {
    slug: "shingle-roofing",
    title: "Shingle Roofing",
    kicker: "Residential",
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
];

/* ── PROCESS ─────────────────────────────────────────────── */

export const processSteps = [
  {
    n: "01",
    title: "Free Roof Inspection",
    body: "We get on the roof, take core samples where needed, and photograph every problem area. No cost, no obligation.",
  },
  {
    n: "02",
    title: "The Honest Assessment",
    body: "You get a written report telling you whether the roof needs repair, restoration or replacement — with the reasoning, not just the price.",
  },
  {
    n: "03",
    title: "Options Priced Side by Side",
    body: "Where more than one path is viable, you see both numbers. Restoration and replacement, compared on cost and remaining service life.",
  },
  {
    n: "04",
    title: "Installation Around Your Operations",
    body: "Work is scheduled so your tenants, congregation or customers stay in the building. Daily updates, clean site.",
  },
  {
    n: "05",
    title: "Warranty & Documentation",
    body: "You receive the manufacturer warranty, our workmanship warranty, and a complete photo record of the finished work.",
  },
] as const;

/* ── STATS ───────────────────────────────────────────────── */
/* Only verifiable figures. No client counts, project counts or years
   in business — the questionnaire reports 1 year trading. */

export const stats = [
  { value: 2, prefix: "$", suffix: "M", label: "Liability insurance carried" },
  { value: 18, suffix: "", label: "Greater Houston cities served" },
  { value: 4, suffix: "", label: "Manufacturer certifications" },
  { value: 5, suffix: "yr", label: "Leak protection warranty" },
] as const;

/* ── ABOUT / WHY CHOOSE ──────────────────────────────────── */

export const aboutPoints = [
  "Restoration assessed before replacement is quoted",
  "Free inspection with a written, photographed report",
  "Certified applicator for APOC and Henry's systems",
  "Work scheduled around your tenants and trading hours",
] as const;

export const whyChoose = [
  {
    title: "We quote the option you need",
    body: "Where repair, restoration and replacement are all viable, you get all three numbers. Most contractors show you one.",
  },
  {
    title: "Certified, so the warranty is real",
    body: "Manufacturer approval is what allows a coating to carry a warranty. Without it, a coating is just paint with a receipt.",
  },
  {
    title: "Commercial-first, residential-capable",
    body: "Flat and low-slope work is the core of the business, so your warehouse is not being handled by a shingle crew.",
  },
  {
    title: "Documentation adjusters accept",
    body: "Photo-mapped damage reports, moisture surveys and scope reviews — the paperwork that keeps a claim moving.",
  },
] as const;

/* ── PROCESS ICON GRID ───────────────────────────────────── */

export const capabilities = [
  { title: "Moisture surveys", note: "Core samples before we quote" },
  { title: "Silicone coatings", note: "Renewable, seamless membrane" },
  { title: "Seam & flashing repair", note: "The usual source of a leak" },
  { title: "Ponding correction", note: "Tapered fills and drainage" },
  { title: "Metal roof restoration", note: "Rust treatment and seam seal" },
  { title: "Emergency tarping", note: "Same-day storm make-safe" },
] as const;

/* ── TEAM ────────────────────────────────────────────────── */
/* Roles, not invented people. Add real names and headshots here once
   the client supplies them. */

export const team = [
  {
    role: "Owner & Estimator",
    body: "Walks the roof on commercial enquiries and writes the assessment personally.",
  },
  {
    role: "Project Manager",
    body: "Your single point of contact once work starts — daily updates, site cleanliness, schedule.",
  },
  {
    role: "Certified Applicators",
    body: "Trained on APOC and Henry's systems, which is what makes the manufacturer warranty issuable.",
  },
  {
    role: "Insurance Liaison",
    body: "Meets your adjuster on the roof and handles supplements and scope review.",
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
    body: "Multi-site portfolios where an unplanned roof replacement wrecks the capital budget. We build a restoration plan you can defend to ownership.",
  },
  {
    title: "Building Owners",
    body: "Flat or low-slope roofs nearing end of service life. We tell you how many years are actually left and what it costs to add more.",
  },
  {
    title: "Churches & Clergy",
    body: "Congregational buildings where every dollar is accountable. Restoration keeps the roof watertight without a capital campaign.",
  },
  {
    title: "Retail & QSR",
    body: "Gas stations, fast food and small commercial sites. Small projects get the same documentation as large ones.",
  },
] as const;

/* ── FAQ ─────────────────────────────────────────────────── */

export const faqs = [
  {
    q: "Is my roof a candidate for restoration instead of replacement?",
    a: "It depends on the substrate. If the deck and insulation are dry and structurally sound, and the membrane is weathered rather than failed, restoration is usually viable. We take core samples and run a moisture survey before we answer — and if the roof is too far gone, we will tell you that instead of selling you a coating that won't last.",
  },
  {
    q: "Why does everyone else quote me a full replacement?",
    a: "Because replacement carries the highest price tag. That is the honest answer. We lead with repair and restoration where the roof supports it, and we put the replacement number next to the restoration number so you can see the difference yourself.",
  },
  {
    q: "Are you licensed and insured in Texas?",
    a: "Texas does not issue a state roofing contractor licence, so there is no Texas licence for any roofer to hold. What matters is insurance and manufacturer approval: we carry general liability coverage to $2 million, we are bonded in the municipalities that require it, and we are certified applicators for APOC, Henry's, CertainTeed and Attic Breeze. We also hold Oklahoma CIB residential roofing licence #80007778.",
  },
  {
    q: "How long does a commercial restoration take?",
    a: "Most flat-roof coating projects are measured in days rather than weeks, and there is no tear-off, so your building stays open and operating throughout. We schedule around your hours and give you a daily progress update.",
  },
  {
    q: "Do you handle insurance claims?",
    a: "Yes. We document damage to the standard adjusters expect, meet them on the roof, and review the scope with you before you sign anything. We will also tell you when a claim isn't worth filing.",
  },
  {
    q: "What warranties come with the work?",
    a: "Residential installations carry our 5-year leak protection workmanship warranty. Qualifying installations can also carry a manufacturer limited lifetime warranty. Restoration systems carry renewable manufacturer warranties — you recoat rather than re-roof when the term is up.",
  },
  {
    q: "Do you offer financing?",
    a: "Residential financing is available starting at zero down with competitive APRs. Commercial projects are quoted directly and we can structure the work in phases where that helps your budget cycle.",
  },
  {
    q: "How small a job will you take?",
    a: "We are set up for 100+ square commercial projects, but we regularly work on gas stations, quick-service restaurants and single-building sites. Small projects get the same inspection, documentation and warranty as large ones.",
  },
] as const;

/* ── IMAGERY ─────────────────────────────────────────────── */
/* Verified-live Unsplash sources, standing in until Supreme's own job
   photography and drone footage is supplied. Swap the URLs here only. */

export const media = {
  /** Hero background loop. The still below doubles as its poster, so the
      optimised image is still what paints first. */
  heroVideo:
    "https://ik.imagekit.io/qcvroy8xpd/Video.mp4?updatedAt=1776680374692",
  heroCoating:
    "https://images.unsplash.com/photo-1674485169641-bcb2bf6f1df9?auto=format&fit=crop&w=2000&q=80",
  aerialCommercial:
    "https://images.unsplash.com/photo-1669003153363-6d7ba8e20c7e?auto=format&fit=crop&w=1800&q=80",
  aerialWarehouse:
    "https://images.unsplash.com/photo-1669003152237-7bd1ac4c13f3?auto=format&fit=crop&w=1600&q=80",
  aerialPlant:
    "https://images.unsplash.com/photo-1669003152226-b37b58281b84?auto=format&fit=crop&w=1600&q=80",
  residentialTearOff:
    "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1600&q=80",
  crewOnRoof:
    "https://images.unsplash.com/photo-1634750006909-3258af95e257?auto=format&fit=crop&w=1600&q=80",
  greyRoof:
    "https://images.unsplash.com/photo-1611944793527-62de6e2e537d?auto=format&fit=crop&w=1400&q=80",
} as const;

/* ── NAVIGATION ──────────────────────────────────────────── */

export const nav = [
  { label: "Commercial", href: "/commercial-roofing" },
  { label: "Residential", href: "/residential-roofing" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* ── HERO TICKERS ────────────────────────────────────────── */

export const tickerPrimary = [
  "COMMERCIAL ROOF RESTORATION",
  "FLAT & LOW-SLOPE SPECIALISTS",
  "SILICONE COATING SYSTEMS",
  "INSURED TO $2M",
  "APOC CERTIFIED",
  "HENRY'S CERTIFIED",
  "CERTAINTEED CERTIFIED",
  "FREE ROOF INSPECTIONS",
  "GREATER HOUSTON",
] as const;

export const tickerSecondary = [
  "WAREHOUSES",
  "RETAIL CENTRES",
  "CHURCHES",
  "GAS STATIONS",
  "QUICK-SERVICE RESTAURANTS",
  "PROPERTY MANAGEMENT PORTFOLIOS",
  "SCHOOLS",
  "OFFICE PARKS",
  "MEDICAL BUILDINGS",
] as const;
