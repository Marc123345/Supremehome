"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, ArrowUpRight, Mail, MapPin, ChevronDown } from "lucide-react";
import { nav, site } from "@/lib/site";
import { locations } from "@/lib/locations";
import { Logo } from "./Logo";

const AREAS_HREF = "/service-areas";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [areasOpen, setAreasOpen] = useState(false);

  // Lock body scroll and close on Escape while the sheet is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Scrim */}
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm w-full"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={-1}
          />

          {/* Sheet */}
          <motion.div
            className="absolute inset-y-0 right-0 w-full max-w-[420px] bg-white flex flex-col thin-scroll overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-[76px] border-b border-black/10 shrink-0">
              <Link href="/" onClick={onClose}>
                <Logo height={34} />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-11 h-11 grid place-items-center rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
              >
                <X size={19} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.06,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item.href === AREAS_HREF ? (
                    <div className="border-b border-black/[0.07]">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex-1 py-4"
                        >
                          <span className="display-sm">{item.label}</span>
                        </Link>
                        <button
                          onClick={() => setAreasOpen((o) => !o)}
                          aria-expanded={areasOpen}
                          aria-label={
                            areasOpen
                              ? "Hide service areas"
                              : "Show all service areas"
                          }
                          className="w-11 h-11 grid place-items-center border border-black/10 shrink-0"
                        >
                          <ChevronDown
                            size={17}
                            className="transition-transform duration-300"
                            style={{
                              transform: areasOpen ? "rotate(180deg)" : "none",
                            }}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {areasOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden grid grid-cols-2 gap-x-4"
                          >
                            {locations.map((loc) => (
                              <li key={loc.slug}>
                                <Link
                                  href={`/service-areas/${loc.slug}`}
                                  onClick={onClose}
                                  className="group flex items-center gap-2 py-2.5 border-b border-black/[0.05]"
                                >
                                  <MapPin
                                    size={12}
                                    className="shrink-0 text-black/20 group-hover:text-[var(--supreme-red)] transition-colors"
                                  />
                                  <span className="text-[0.85rem] font-semibold group-hover:text-[var(--supreme-red)] transition-colors">
                                    {loc.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      <div className="pb-4" />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-4 border-b border-black/[0.07]"
                    >
                      <span className="display-sm">{item.label}</span>
                      <ArrowUpRight
                        size={19}
                        className="text-black/25 transition-all group-hover:text-[var(--supreme-red)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-8 pt-2 space-y-3 shrink-0">
              <a href={site.phoneHref} className="btn btn-primary w-full">
                <Phone size={16} />
                {site.phone}
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="btn btn-ghost-dark w-full"
              >
                Book a Free Inspection
              </Link>

              <div className="pt-4 space-y-2.5 text-[0.82rem] text-black/55">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 hover:text-[var(--supreme-red)] transition-colors"
                >
                  <Mail size={14} className="shrink-0" />
                  {site.email}
                </a>
                <p className="flex items-start gap-2.5">
                  <MapPin size={14} className="shrink-0 mt-1" />
                  {site.address.full}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
