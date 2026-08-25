import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { INDEXABLE } from "@/lib/indexing";

/**
 * Robots. Closed by default — see lib/indexing.
 *
 * This route used to return `allow: "/"` unconditionally, which meant the
 * development deployment at supremehome.vercel.app was fully crawlable while
 * a seven-phase rebuild ran through it. File 02 of the Strategic Revision
 * Package asks for the opposite, in its own words: "Set the development
 * deployment to environment-specific `noindex, nofollow` immediately."
 *
 * The sitemap reference is also withheld while closed. Publishing a sitemap
 * from a disallowed host advertises every URL on it to anything that fetches
 * the file directly, which defeats the point of the disallow.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
