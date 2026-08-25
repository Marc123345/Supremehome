/**
 * The 18 Greater Houston communities SCC lists as its service area.
 *
 * WHAT THIS FILE DELIBERATELY NO LONGER CONTAINS
 *
 * Each entry used to carry a `buildingStock` and a `localAngle` paragraph —
 * eighteen accounts of what the roofs are like in a given city, why they fail
 * there, and what the owners in that city usually decide. None of it was
 * sourced. Houston was said to have "more low-slope commercial roof than
 * anywhere else in Texas"; Webster's leaks were "detail failures, not membrane
 * failures"; Katy had the fastest response on the map. Those are a roof-level
 * diagnosis and an operational promise published as city-wide fact.
 *
 * The website correction package (section H, marked critical) requires them
 * removed rather than reworded: "Do not invent location-specific market facts"
 * and "Do not create city-specific local facts merely to make an SEO page
 * sound unique."
 *
 * What is left is what can actually be checked: the city, its county, the
 * neighborhoods and corridors nearby, and the same honest statement of what
 * SCC does everywhere it works. That is a real tradeoff — eighteen pages now
 * share most of their copy, which is weaker for search than eighteen unique
 * ones. Accuracy was the client's explicit instruction where the two conflict.
 *
 * To make a page genuinely local again, add a verified fact — a completed
 * project, a named building type SCC has actually worked on there — not a
 * generalization about the city.
 */

export type Location = {
  slug: string;
  name: string;
  county: string;
  /** Approved neutral template. Local claims do not belong here. */
  intro: string;
  /** Verified neighborhoods and corridors inside the coverage area. */
  nearby: string[];
  /**
   * Verified local proof, and the switch that controls indexing.
   *
   * File 05 §6: a city page without verified local proof is set to `noindex`
   * and removed from the production sitemap. This field is how a page earns
   * its way back in — an approved nearby project, a photograph, or a verified
   * operational fact.
   *
   * ⚠ NEVER fill this to make a page indexable. Inventing local building
   * stock, typical failure causes, response times or customer behaviour is
   * specifically forbidden by the source of truth §11, and it is the exact
   * thing "Why restoration wins in [City]" was doing before it was removed.
   *
   * SCC supplies the city-to-project mapping (file 03, D9). Until then every
   * one of these is undefined and all eighteen routes are noindex.
   */
  proof?: string;
};

const intro = (name: string) =>
  `Supreme Commercial Coatings serves commercial properties in ${name} and the surrounding area. We assess existing roof conditions, document what we find, and recommend restoration and coating when viable, or replacement when necessary.`;

export const locations: Location[] = [
  {
    slug: "houston",
    name: "Houston",
    county: "Harris County",
    intro: intro("Houston"),
    nearby: ["Energy Corridor", "Westchase", "Greenspoint", "Sharpstown", "East End"],
  },
  {
    slug: "cypress",
    name: "Cypress",
    county: "Harris County",
    intro: intro("Cypress"),
    nearby: ["Fairfield", "Bridgeland", "Copperfield", "US-290 corridor"],
  },
  {
    slug: "katy",
    name: "Katy",
    county: "Harris, Fort Bend & Waller Counties",
    intro: intro("Katy"),
    nearby: ["Cinco Ranch", "Energy Corridor", "Grand Parkway", "I-10 corridor"],
  },
  {
    slug: "missouri-city",
    name: "Missouri City",
    county: "Fort Bend County",
    intro: intro("Missouri City"),
    nearby: ["Sienna", "Quail Valley", "Fort Bend Parkway", "Sugar Land border"],
  },
  {
    slug: "spring",
    name: "Spring",
    county: "Harris County",
    intro: intro("Spring"),
    nearby: ["Klein", "Louetta", "I-45 North", "The Woodlands border"],
  },
  {
    slug: "tomball",
    name: "Tomball",
    county: "Harris County",
    intro: intro("Tomball"),
    nearby: ["Magnolia border", "SH-249 corridor", "Downtown Tomball"],
  },
  {
    slug: "richmond",
    name: "Richmond",
    county: "Fort Bend County",
    intro: intro("Richmond"),
    nearby: ["Historic downtown", "Pecan Grove", "US-90A corridor"],
  },
  {
    slug: "rosenberg",
    name: "Rosenberg",
    county: "Fort Bend County",
    intro: intro("Rosenberg"),
    nearby: ["I-69 / US-59 corridor", "Beasley", "Richmond border"],
  },
  {
    slug: "pearland",
    name: "Pearland",
    county: "Brazoria County",
    intro: intro("Pearland"),
    nearby: ["Silverlake", "Shadow Creek Ranch", "SH-288 corridor"],
  },
  {
    slug: "webster",
    name: "Webster",
    county: "Harris County",
    intro: intro("Webster"),
    nearby: ["Clear Lake", "NASA Parkway", "League City border", "Gulf Freeway"],
  },
  {
    slug: "humble",
    name: "Humble",
    county: "Harris County",
    intro: intro("Humble"),
    nearby: ["Bush Intercontinental", "Atascocita", "Kingwood border", "FM 1960"],
  },
  {
    slug: "new-caney",
    name: "New Caney",
    county: "Montgomery County",
    intro: intro("New Caney"),
    nearby: ["Valley Ranch", "Porter", "Grand Parkway", "US-59 corridor"],
  },
  {
    slug: "conroe",
    name: "Conroe",
    county: "Montgomery County",
    intro: intro("Conroe"),
    nearby: ["Lake Conroe", "Conroe Park North", "Willis border", "I-45 North"],
  },
  {
    slug: "waller",
    name: "Waller",
    county: "Waller & Harris Counties",
    intro: intro("Waller"),
    nearby: ["US-290 corridor", "Prairie View", "Hempstead border"],
  },
  {
    slug: "sealy",
    name: "Sealy",
    county: "Austin County",
    intro: intro("Sealy"),
    nearby: ["I-10 corridor", "Brookshire border", "Bellville"],
  },
  {
    slug: "brookshire",
    name: "Brookshire",
    county: "Waller County",
    intro: intro("Brookshire"),
    nearby: ["I-10 corridor", "Pattison", "Katy border", "Waller border"],
  },
  {
    slug: "manvel",
    name: "Manvel",
    county: "Brazoria County",
    intro: intro("Manvel"),
    nearby: ["SH-288 corridor", "Iowa Colony", "Alvin border", "Pearland border"],
  },
  {
    slug: "fresno",
    name: "Fresno",
    county: "Fort Bend County",
    intro: intro("Fresno"),
    nearby: ["Arcola", "Sienna border", "FM 521", "Missouri City border"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
