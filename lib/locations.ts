/**
 * Per-city content for the location pages.
 *
 * Each entry carries genuinely city-specific detail — county, corridor,
 * building stock — rather than a find-and-replace of one template. Near
 * duplicate "doorway" pages are a ranking liability, not an asset, so the
 * intro, building-stock note and local angle differ for every city.
 */

export type Location = {
  slug: string;
  name: string;
  county: string;
  /** Short positioning line used in the hero */
  intro: string;
  /** What the commercial building stock actually looks like there */
  buildingStock: string;
  /** Why roofs fail locally / what we see most */
  localAngle: string;
  /** Corridors, districts and neighbouring areas we also cover */
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "houston",
    name: "Houston",
    county: "Harris County",
    intro:
      "The core of our service area. Houston has more low-slope commercial roof than anywhere else in Texas, and most of it is a restoration candidate long before it is a replacement candidate.",
    buildingStock:
      "Warehouse and distribution space, office parks, retail strip centres, churches and medical buildings — overwhelmingly flat or low-slope, with TPO, modified bitumen and older built-up systems.",
    localAngle:
      "Houston roofs age on heat and UV more than on storms. A membrane can look finished at fifteen years and still have a dry, sound deck underneath — which is exactly the roof a coating system is designed for.",
    nearby: ["Energy Corridor", "Westchase", "Greenspoint", "Sharpstown", "East End"],
  },
  {
    slug: "cypress",
    name: "Cypress",
    county: "Harris County",
    intro:
      "Cypress has grown fast along the 290 corridor, and a lot of its retail and light-industrial roof stock hit the age where owners start getting replacement quotes.",
    buildingStock:
      "Newer retail centres, self-storage, light industrial and a large volume of suburban residential — a genuine mix of low-slope commercial and steep-slope shingle.",
    localAngle:
      "Much of the commercial roof here is young enough that restoration is clearly the right call. Replacing a fifteen-year-old TPO roof with a dry deck is the most expensive mistake an owner can make.",
    nearby: ["Fairfield", "Bridgeland", "Copperfield", "US-290 corridor"],
  },
  {
    slug: "katy",
    name: "Katy",
    county: "Harris, Fort Bend & Waller Counties",
    intro:
      "Our home base. We are headquartered in Katy, which means the shortest response time in our whole coverage map — for inspections and for storm make-safe work.",
    buildingStock:
      "Energy Corridor office and flex space, I-10 distribution buildings, retail along the Grand Parkway, plus a very large residential base.",
    localAngle:
      "Being local matters most when water is already coming in. We can have someone on a Katy roof faster than anywhere else we serve.",
    nearby: ["Cinco Ranch", "Energy Corridor", "Grand Parkway", "I-10 corridor"],
  },
  {
    slug: "missouri-city",
    name: "Missouri City",
    county: "Fort Bend County",
    intro:
      "Missouri City combines established neighbourhoods with newer retail and institutional buildings — a service area where we do genuinely mixed commercial and residential work.",
    buildingStock:
      "Neighbourhood retail, schools, churches and community buildings alongside a deep residential base of shingle roofs.",
    localAngle:
      "Churches and community buildings here are exactly the client we built the business for: accountable budgets, and a roof that usually has more life in it than the replacement quote suggests.",
    nearby: ["Sienna", "Quail Valley", "Fort Bend Parkway", "Sugar Land border"],
  },
  {
    slug: "spring",
    name: "Spring",
    county: "Harris County",
    intro:
      "Spring sits on the I-45 north corridor with a dense concentration of office, flex and retail buildings — a lot of flat roof within a short drive.",
    buildingStock:
      "Corporate campuses and office parks near the Woodlands boundary, flex-industrial, and extensive retail along I-45 and Louetta.",
    localAngle:
      "Property managers running several buildings along this corridor are our most common Spring enquiry. We survey the whole portfolio and hand back a prioritised plan rather than a stack of separate quotes.",
    nearby: ["Klein", "Louetta", "I-45 North", "The Woodlands border"],
  },
  {
    slug: "tomball",
    name: "Tomball",
    county: "Harris County",
    intro:
      "Tomball has added commercial and light-industrial space quickly while keeping an older core — which means roof stock at both ends of the age range.",
    buildingStock:
      "Light industrial and contractor yards, medical buildings, a historic downtown retail core, and growing suburban residential.",
    localAngle:
      "Older downtown buildings often have layered roof systems where a moisture survey is essential — you cannot coat what you have not tested.",
    nearby: ["Magnolia border", "SH-249 corridor", "Downtown Tomball"],
  },
  {
    slug: "richmond",
    name: "Richmond",
    county: "Fort Bend County",
    intro:
      "As the Fort Bend county seat, Richmond carries a mix of civic, institutional and older commercial buildings alongside rapid residential growth.",
    buildingStock:
      "Civic and county buildings, churches, older masonry commercial in the historic core, and a fast-expanding residential ring.",
    localAngle:
      "Institutional buildings are budgeted years ahead. A restoration that adds warranty life for a fraction of replacement cost is often the only option that fits the cycle.",
    nearby: ["Historic downtown", "Pecan Grove", "US-90A corridor"],
  },
  {
    slug: "rosenberg",
    name: "Rosenberg",
    county: "Fort Bend County",
    intro:
      "Rosenberg sits on the I-69 corridor with a solid base of industrial, warehouse and highway retail — high-value flat roof, and plenty of it.",
    buildingStock:
      "Distribution and warehouse space, highway retail and quick-service restaurants, plus agricultural and light industrial metal buildings.",
    localAngle:
      "Metal buildings dominate parts of this area, and metal restoration coatings are one of the most cost-effective systems we install — rust treatment, seam sealing, then a coated membrane over the top.",
    nearby: ["I-69 / US-59 corridor", "Beasley", "Richmond border"],
  },
  {
    slug: "pearland",
    name: "Pearland",
    county: "Brazoria County",
    intro:
      "Pearland's growth along SH-288 has produced a large stock of newer medical, retail and office buildings — mostly single-ply low-slope roof.",
    buildingStock:
      "Medical office buildings, retail centres, corporate campuses along SH-288, and extensive newer residential.",
    localAngle:
      "Medical and professional buildings cannot close for a tear-off. Coating systems go down while the building stays open, which is usually the deciding factor here.",
    nearby: ["Silverlake", "Shadow Creek Ranch", "SH-288 corridor"],
  },
  {
    slug: "webster",
    name: "Webster",
    county: "Harris County",
    intro:
      "Webster anchors the Clear Lake area, with a concentration of medical, hospitality and aerospace-adjacent commercial buildings.",
    buildingStock:
      "Hospitals and medical office, hotels, retail along the I-45 Gulf Freeway, and aerospace-adjacent office and light industrial.",
    localAngle:
      "Proximity to the coast means wind-driven rain finds any weak seam or flashing detail. Most Webster leaks we trace are detail failures, not membrane failures — which is a repair, not a re-roof.",
    nearby: ["Clear Lake", "NASA Parkway", "League City border", "Gulf Freeway"],
  },
  {
    slug: "humble",
    name: "Humble",
    county: "Harris County",
    intro:
      "Humble sits beside Bush Intercontinental, which brings airport-adjacent logistics, hospitality and retail — buildings with large uninterrupted flat roof areas.",
    buildingStock:
      "Airport-adjacent warehouse and logistics, hotels, big-box and mall retail, plus medical buildings.",
    localAngle:
      "Large single-span roofs are where restoration economics are strongest — the bigger the roof, the wider the gap between coating cost and replacement cost.",
    nearby: ["Bush Intercontinental", "Atascocita", "Kingwood border", "FM 1960"],
  },
  {
    slug: "new-caney",
    name: "New Caney",
    county: "Montgomery County",
    intro:
      "New Caney has expanded quickly around the Grand Parkway, adding retail and light industrial to what was largely rural building stock.",
    buildingStock:
      "Newer retail and restaurant pads, light industrial and contractor buildings, metal agricultural structures, and growing residential.",
    localAngle:
      "Quick-service restaurants and fuel stations are common here — small roofs that most commercial contractors will not bother with. We will, and they get the same documentation as a warehouse.",
    nearby: ["Valley Ranch", "Porter", "Grand Parkway", "US-59 corridor"],
  },
  {
    slug: "conroe",
    name: "Conroe",
    county: "Montgomery County",
    intro:
      "Conroe is the Montgomery county seat and the northern edge of our map — with a substantial industrial park and a large civic and institutional base.",
    buildingStock:
      "Industrial park manufacturing and warehouse, county and civic buildings, lakeside hospitality, and an older downtown commercial core.",
    localAngle:
      "Manufacturing roofs often carry rooftop equipment, penetrations and years of service traffic. Those are the roofs where a seamless coating outperforms a patched membrane.",
    nearby: ["Lake Conroe", "Conroe Park North", "Willis border", "I-45 North"],
  },
  {
    slug: "waller",
    name: "Waller",
    county: "Waller & Harris Counties",
    intro:
      "Waller has become a genuine distribution corridor, with large-footprint warehouse buildings going up along US-290 and the Grand Parkway.",
    buildingStock:
      "Large distribution and warehouse space, agricultural metal buildings, and small-town commercial in the older core.",
    localAngle:
      "Large-footprint distribution roofs are exactly the 100+ square projects we are set up for — and the scale where a coating system saves the most money per square foot.",
    nearby: ["US-290 corridor", "Prairie View", "Hempstead border"],
  },
  {
    slug: "sealy",
    name: "Sealy",
    county: "Austin County",
    intro:
      "Sealy sits on I-10 west of the metro, with manufacturing and distribution buildings that carry large, simple, coatable roof areas.",
    buildingStock:
      "Manufacturing plants, distribution buildings, highway retail and fuel stops, plus agricultural metal structures.",
    localAngle:
      "Industrial roofs out here take a lot of sun and very little maintenance. Most are further from failure than the owner assumes — a survey usually buys years, not a replacement.",
    nearby: ["I-10 corridor", "Brookshire border", "Bellville"],
  },
  {
    slug: "brookshire",
    name: "Brookshire",
    county: "Waller County",
    intro:
      "Brookshire's position on I-10 has made it a distribution hub, and new warehouse space keeps arriving — along with the flat roof that comes with it.",
    buildingStock:
      "Distribution centres and cold storage, truck terminals, highway retail and fuel stations, plus light manufacturing.",
    localAngle:
      "Cold storage and conditioned warehouse roofs benefit twice from a reflective coating: watertight, and a measurably lower cooling load through a Houston summer.",
    nearby: ["I-10 corridor", "Pattison", "Katy border", "Waller border"],
  },
  {
    slug: "manvel",
    name: "Manvel",
    county: "Brazoria County",
    intro:
      "Manvel is in the middle of rapid SH-288 corridor growth, with new commercial pads arriving alongside long-established rural property.",
    buildingStock:
      "New retail and restaurant pads, medical and professional offices, metal agricultural buildings, and fast-growing residential.",
    localAngle:
      "New commercial pads mean new roofs — where the right service is a maintenance plan and early coating, not a replacement quote a decade too early.",
    nearby: ["SH-288 corridor", "Iowa Colony", "Alvin border", "Pearland border"],
  },
  {
    slug: "fresno",
    name: "Fresno",
    county: "Fort Bend County",
    intro:
      "Fresno is a largely residential Fort Bend community with neighbourhood commercial along the main corridors — where our residential and small-commercial work meet.",
    buildingStock:
      "Neighbourhood retail and restaurant pads, churches and community buildings, and a very large base of shingle-roofed housing.",
    localAngle:
      "Most Fresno enquiries are residential storm damage. The inspection is free, and we will tell you plainly when a claim is not worth filing.",
    nearby: ["Arcola", "Sienna border", "FM 521", "Missouri City border"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
