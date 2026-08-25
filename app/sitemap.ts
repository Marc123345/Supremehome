import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locations } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/commercial-roofing", priority: 0.9 },
    { path: "/residential-roofing", priority: 0.8 },
    { path: "/service-areas", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    /* Only city pages with verified local proof.
    
       File 05 §6 requires unproven city routes to be `noindex` AND removed
       from the production sitemap. Doing one without the other is worse than
       doing neither: a sitemap that lists eighteen URLs the pages themselves
       tell crawlers not to index is a contradiction search engines resolve by
       trusting neither signal.
    
       `location.proof` is the same switch the page's metadata reads, so the
       two can never disagree. Today no location has it, so no city URL is
       listed here. */
    ...locations
      .filter((location) => Boolean(location.proof))
      .map((location) => ({
        url: `${site.url}/service-areas/${location.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
