import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { BackToTop } from "@/components/ui/BackToTop";
import { site, serviceAreas } from "@/lib/site";

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
};

export const viewport: Viewport = {
  themeColor: "#c20606",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness structured data — helps the map pack and rich results. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: site.name,
  alternateName: site.dba,
  telephone: site.phone,
  email: site.email,
  url: site.url,
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
