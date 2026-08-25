"use client";

import { usePathname } from "next/navigation";
import { residentialBrand } from "@/lib/site";
import { Footer } from "./Footer";

/**
 * Picks the footer variant from the route.
 *
 * The footer is mounted once in the root layout, so the residential route had
 * no way to close on its own brand — it inherited the commercial footer and
 * therefore ended by asking a homeowner to request a commercial roof
 * assessment. File 05 §8 forbids exactly that.
 *
 * A one-line client wrapper is the smallest fix: `Footer` itself stays a
 * server component and keeps rendering statically, and only this switch reads
 * the pathname. The alternative — moving the footer into each route's own
 * layout — would mean five copies of the same mount and a sixth route
 * silently missing it.
 */
export function FooterSwitch() {
  const pathname = usePathname();
  const residential = pathname?.startsWith(residentialBrand.path) ?? false;
  return <Footer variant={residential ? "residential" : "commercial"} />;
}
