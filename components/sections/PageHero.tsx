import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Interior-page hero: image band, breadcrumb, display headline. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--ink-90)]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.4) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 55%, rgba(224,1,22,0.32) 100%)",
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
      </div>

      <div className="shell relative pt-16 pb-16 lg:pt-24 lg:pb-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-7 text-[0.78rem] text-white/55"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="opacity-50" />
          <span className="text-[var(--supreme-red-bright)]">{breadcrumb}</span>
        </nav>

        <div className="flex items-center gap-3 mb-5">
          <span className="h-[2px] w-10 bg-[var(--supreme-red)]" />
          <span className="eyebrow text-[var(--supreme-red-bright)]">
            {eyebrow}
          </span>
        </div>

        <h1 className="display-lg text-white max-w-[20ch]">{title}</h1>

        {intro && (
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.8] text-white/72">
            {intro}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[4px] bg-[var(--supreme-red)]" />
    </section>
  );
}
