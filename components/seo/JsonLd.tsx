import { faqs, site, services } from "@/lib/site";

/**
 * Structured data helpers.
 *
 * A note on what is deliberately NOT here: aggregateRating.
 *
 * The site shows a real 4.8 from 21 Google reviews, and marking that up would
 * be the obvious way to chase review stars in search results. But Google's
 * structured data policy for LocalBusiness forbids marking up ratings
 * aggregated from another site — that is exactly what these are. Google
 * already surfaces the rating from its own data, so the markup would add
 * nothing and risks a manual action. Left out on purpose.
 */

/** Matches the @id declared in app/layout.tsx so page schema links to it. */
const BUSINESS_ID = `${site.url}/#business`;

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * FAQPage — the answers are original copy, so this is legitimately eligible.
 *
 * `items` must match the questions actually rendered on the page. The
 * residential page shows `residentialFaqs`, not the commercial set, and FAQ
 * markup that doesn't match visible page content is a structured-data policy
 * violation — so the page passes its own list rather than inheriting the
 * commercial default.
 */
export function FaqJsonLd({
  items,
}: {
  items?: readonly { q: string; a: string }[];
} = {}) {
  const list = items ?? faqs;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: list.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/** BreadcrumbList — mirrors the visual breadcrumb already on interior pages. */
export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", path: "" },
          ...trail,
        ].map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        })),
      }}
    />
  );
}

/** Service list — helps Google associate the business with what it sells. */
export function ServicesJsonLd({ areaServed }: { areaServed?: string }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Roofing services${areaServed ? ` in ${areaServed}` : ""}`,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.blurb,
            serviceType: s.title,
            // Reference the business declared in the root layout's @graph
            // rather than describing it again on every page.
            provider: { "@id": BUSINESS_ID },
            ...(areaServed
              ? { areaServed: { "@type": "City", name: `${areaServed}, TX` } }
              : {}),
          },
        })),
      }}
    />
  );
}
