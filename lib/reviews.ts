/**
 * Google reviews for Supreme Home Roofing and Construction.
 *
 * Quoted verbatim from the client's Google Business profile — trimmed only at
 * sentence boundaries where Google truncated the original with "…More". No
 * wording has been rewritten or invented.
 *
 * DELIBERATE EXCLUSIONS
 *  · Water-filtration / softener reviews (Amber Gonzales, Doug Woodall,
 *    Gilbert Arcos, Mario Nunez, Rye Williamson). All genuine and positive,
 *    but this site sells commercial roof restoration and never mentions water
 *    treatment — quoting them here would confuse the offer. Easy to add back
 *    if a water-treatment service page is ever built.
 *  · Star-only ratings with no written text (nothing to quote).
 *  · One review the owner publicly replied to saying the person is not a
 *    customer.
 *
 * No aggregate rating ("4.9 from N reviews") is asserted anywhere, because the
 * true count and average were not supplied and inventing them would be a
 * fabricated trust signal. The section links to the live profile instead.
 */

export type Review = {
  name: string;
  /** What the job was, taken from the review or the owner's reply. */
  service: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "Stefanie Thomson",
    service: "New roof",
    quote:
      "These guys did a great job. Process was quick. Off and on in a day. New roof looks great. Our realtor recommended them and so I went off of that. I liked that our salesman Chris seemed knowledgeable and always responded to my texts. Would use again.",
  },
  {
    name: "Shawn Thomson",
    service: "Storm damage",
    quote:
      "We had a quick and painless job completed within the quoted time frame. New shingles were installed and cleanup of all the old materials were hauled off. We're so happy with our new roof! Get your storm damaged roof replaced before you get water damage!",
  },
  {
    name: "Tiffany McKinley",
    service: "Insurance claim",
    quote:
      "Supreme Home was honest and very knowledgeable when it came to my insurance claim. Def recommend to anyone needing roofing services.",
  },
  {
    name: "Alison Dieringer",
    service: "Roof repair",
    quote:
      "Supreme Home Roofing is wonderful! My mother's roof needed some work, but I was unsure who to hire, as I do not live nearby. Supreme was recommended by one of her neighbors, and they were top notch!",
  },
  {
    name: "Dawn Putnam",
    service: "New roof",
    quote:
      "Excellent experience from start to finish! Amazing service! The team was friendly, knowledgeable, and worked hard to make sure everything was done right. Highly recommend this company!",
  },
  {
    name: "Chris Martinez",
    service: "Roof replacement",
    quote:
      "The owner Tyler helped me get a water system and a roof and was right beside me through the whole process.",
  },
  {
    name: "Cathie Fieser",
    service: "Recommendation",
    quote:
      "I've heard absolutely great things about this company. Contract with them with confidence!",
  },
  {
    name: "Skye Elizabeth",
    service: "Crew",
    quote: "Crew is amazing! Cameron Morris is a very efficient employee.",
  },
  {
    name: "Andra Moon",
    service: "Customer service",
    quote: "Beautiful customer service and work.",
  },
  {
    name: "Brandon Robinson",
    service: "Service",
    quote: "Great service! Very professional and smooth.",
  },
  {
    name: "Michael Brown",
    service: "Service",
    quote: "Professional, very good company!",
  },
  {
    name: "T T",
    service: "Service",
    quote: "Quality service highly recommend.",
  },
];

/** Google Business profile — used for the map embed and the "read them all" link. */
export const googleProfile = {
  shareUrl: "https://share.google/efub2uSqCpHHpaawG",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sSupreme+Home+Roofing+and+Construction,+21145+FM+529+Suite+1110,+Katy,+TX+77449",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Supreme+Home+Roofing+and+Construction,+21145+FM+529+Suite+1110,+Katy,+TX+77449",
} as const;
