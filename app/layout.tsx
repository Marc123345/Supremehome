import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { BackToTop } from "@/components/ui/BackToTop";
import { site, serviceAreas, services, manufacturers } from "@/lib/site";
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
  title: {
    default:
      "Commercial Roof Restoration & Coatings in Houston | Supreme Home Roofing",
    template: `%s | ${site.name}`,
  },
  description:
    "Houston commercial roof restoration and coating specialists. We restore flat and low-slope roofs instead of replacing them — free inspections, insured to $2M, APOC and Henry's certified.",
  keywords: [
    "commercial roofing Houston",
    "roof restoration Houston",
    "roof coating Houston",
    "flat roof repair Houston",
    "commercial roof coating contractor",
    "low slope roofing Houston",
    "silicone roof coating",
    "roofing contractor Katy TX",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Commercial Roof Restoration & Coatings in Houston",
    description:
      "We restore flat and low-slope commercial roofs instead of replacing them. Free inspection, written assessment, honest recommendation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Roof Restoration & Coatings in Houston",
    description:
      "We restore flat and low-slope commercial roofs instead of replacing them.",
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
 * and the service catalogue are linked by @id rather than repeated on every
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
      legalName: site.name,
      telephone: site.phone,
      email: site.email,
      url: site.url,
      logo: `${site.url}/brand/scc-horizontal.svg`,
      image: `${site.url}/opengraph-image`,
      sameAs: [googleProfile.shareUrl],
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
        "Commercial roof restoration and coating contractor serving Greater Houston, plus residential roofing, repair and storm damage restoration.",
      knowsAbout: [
        "Commercial roof restoration",
        "Silicone roof coatings",
        "Flat roof repair",
        "Metal roof restoration",
        "Storm and hail damage",
      ],
      hasCredential: manufacturers.map((m) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Manufacturer certification",
        name: `${m.name} certified applicator`,
      })),
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
        <Preloader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
