"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // The home page hero is dark, so the header starts transparent there
  // and only goes solid once it scrolls past the fold.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overHero;

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-[100] transition-all duration-400"
        style={{
          background: solid ? "rgba(255,255,255,0.94)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          borderBottom: solid
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="shell flex items-center justify-between h-[72px] lg:h-[86px]">
          <Link href="/" aria-label={`${site.name} — home`}>
            <Logo variant={solid ? "dark" : "light"} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[0.9rem] font-semibold transition-colors group"
                  style={{
                    color: active
                      ? "var(--supreme-red)"
                      : solid
                      ? "var(--ink-70)"
                      : "rgba(255,255,255,0.88)",
                  }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1.5 left-0 h-[2px] bg-[var(--supreme-red)] transition-all duration-300"
                    style={{ width: active ? "100%" : 0 }}
                  />
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[var(--supreme-red)] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden md:inline-flex btn btn-primary !py-3 !px-6"
            >
              <Phone size={15} />
              {site.phone}
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 grid place-items-center rounded-full transition-colors"
              style={{
                border: solid
                  ? "1px solid rgba(0,0,0,0.12)"
                  : "1px solid rgba(255,255,255,0.28)",
                color: solid ? "var(--ink)" : "#fff",
                background: solid ? "transparent" : "rgba(255,255,255,0.08)",
              }}
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
