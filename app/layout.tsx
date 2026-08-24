import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatToggle } from "@/components/ui/ChatToggle";
import { HashScroll } from "@/components/ui/HashScroll";
import { site, serviceAreas, services } from "@/lib/site";
import { googleProfile } from "@/lib/reviews";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /**
   * Metadata follows the repositioning in client feedback sections 2 and 3.
   *
   * The previous title, description and keyword set sold a narrower company
   * than the one being built: "coating specialists", "flat and low-slope",
   * "flat roof repair Houston". That copy tells a property manager with a
   * standing-seam metal warehouse that we are not for them, and it frames SCC
   * as a coating applicator rather than a restoration and replacement
   * contractor. Both are now stated in the terms the client asked for.
   */
  title: {
    default:
      "Supreme Commercial Coatings | Commercial Roof Assessment, Restoration and Replacement",
    template: `%s | ${site.name}`,
  },
  description:
    "Supreme Commercial Coatings assesses commercial roofs across Greater Houston and recommends coating and protection, restoration, or replacement based on documented conditions and project requirements.",
  keywords: [
    "commercial roofing Houston",
    "commercial roof restoration Houston",
    "commercial roof replacement Houston",
    "metal roof restoration Houston",
    "TPO roofing Houston",
    "modified bitumen roofing Houston",
    "roof coating Houston",
    "commercial roof assessment",
    "roofing contractor Katy TX",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Commercial Roof Assessment, Restoration and Replacement",
    description:
      "We assess the roof you have, document what we find, and recommend coating and protection, restoration, or replacement based on what the assessment supports.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Roof Restoration & Replacement in Houston",
    description:
      "Restore when viable. Replace when necessary. Commercial roofing across Greater Houston.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#e00116",
  width: "device-width",
  initialScale: 1,
};

/**
 * Site-wide structured data, emitted as a @graph so the business, the website
 * and the service catalog are linked by @id rather than repeated on every
 * page. Page-level types (FAQPage, BreadcrumbList, Service) reference this
 * business by @id from components/seo/JsonLd.tsx.
 *
 * Two omissions are deliberate:
 *
 *  · No `openingHours`. The client has not confirmed them, and the value
 *    previously on the site contradicted their Google listing. Publishing
 *    wrong hours in schema is worse than publishing none.
 *  · No `aggregateRating`. The 4.8/21 shown on the page comes from Google
 *    reviews, and Google's structured-data policy forbids marking up ratings
 *    aggregated from another site. Google already surfaces that rating from
 *    its own data, so the markup would add nothing and risks a manual action.
 */
const BUSINESS_ID = `${site.url}/#business`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RoofingContractor",
      "@id": BUSINESS_ID,
      name: site.name,
      alternateName: site.dba,
      /* `legalName` was emitting "Supreme Commercial Coatings" while the
         footer published "Supreme Home Roofing and Construction, doing
         business as Supreme Commercial Coatings" — two different legal
         identities on one site. Correction package J5 holds the field until
         Supreme supplies the exact registered entity and DBA wording. */
      telephone: site.phone,
      email: site.email,
      url: site.url,
      logo: `${site.url}/brand/scc-horizontal.svg`,
      image: `${site.url}/opengraph-image`,
      sameAs: [googleProfile.shareUrl],
      slogan: site.tagline,
      currenciesAccepted: "USD",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      areaServed: serviceAreas.map((area) => ({
        "@type": "City",
        name: `${area}, TX`,
      })),
      description:
        "Commercial roof restoration and replacement contractor serving Greater Houston. Assesses metal, single-ply, modified bitumen, built-up and low-slope roof systems and recommends restoration or replacement based on documented condition. Residential roofing is offered separately as Supreme Home Roofing.",
      knowsAbout: [
        "Commercial roof restoration",
        "Commercial roof replacement",
        "Roof condition assessment",
        "Standing-seam and exposed-fastener metal roofing",
        "TPO and single-ply membrane roofing",
        "Modified bitumen and built-up roofing",
        "Roof coating systems",
      ],
      /* `hasCredential` mapped all four manufacturers — including CertainTeed
         (shingles) and Attic Breeze (attic ventilation) — into commercial
         schema as "certified applicator". The visible pages already filter
         those out; the schema was still publishing them to search engines.
         Correction package J5: no credential is emitted until Supreme
         supplies the exact designations. Restore this from
         `commercialManufacturers` once they are confirmed. */
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.blurb,
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": BUSINESS_ID },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebas.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Reveal animations render their `initial` state inline (opacity:0).
            Without JS that would hide the page from readers and crawlers that
            don't execute scripts, so force everything visible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* The back-to-top circle used to sit here. It was moved to the
            bottom-left to get out of the agent's way, and a floating circle
            on the left that scrolls the page is not a control anyone reads
            as that — the browser and the phone both already do it. */}

        {/* Supreme assessment agent (Jotform). It fills and submits the same
            form the contact page embeds, so a conversation that finishes is a
            lead, not a hand-off to another step.

            lazyOnload keeps it off the critical path: it loads after the page
            is interactive rather than competing with the hero image for
            bandwidth. The launcher is not part of first paint, so nothing
            visible waits on it. */}
        <Script
          id="supreme-assessment-agent"
          src="https://cdn.jotfor.ms/agent/embedjs/01a02fe8bce870008b0de7beaa0b1f91da1a/embed.js"
          strategy="lazyOnload"
        />
        <ChatToggle />
        <HashScroll />
      </body>
    </html>
  );
}
