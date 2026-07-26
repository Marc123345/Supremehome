"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { services, serviceAreas } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full bg-white border border-black/12 px-4 py-3.5 text-[0.95rem] transition-colors focus:border-[var(--supreme-red)] focus:outline-none";
const LABEL = "block text-[0.78rem] font-bold uppercase tracking-[0.14em] mb-2";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us instead."
      );
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 lg:p-14 bg-[var(--ink-05)] border-l-[4px] border-[var(--supreme-red)] text-center"
          >
            <span className="inline-grid place-items-center w-16 h-16 rounded-full bg-[var(--supreme-red)] mb-6">
              <Check size={28} strokeWidth={3} className="text-white" />
            </span>
            <h3 className="display-md mb-4">Request received</h3>
            <p className="text-[1rem] leading-[1.75] text-black/62 max-w-md mx-auto">
              We will call you to schedule the inspection, usually the same
              business day. If it is urgent, call us directly and we will get a
              crew out sooner.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            <div className="sm:col-span-1">
              <label className={LABEL} htmlFor="name">
                Name <span className="text-[var(--supreme-red)]">*</span>
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className={FIELD}
                placeholder="Your name"
              />
            </div>

            <div className="sm:col-span-1">
              <label className={LABEL} htmlFor="phone">
                Phone <span className="text-[var(--supreme-red)]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={FIELD}
                placeholder="(___) ___-____"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="email">
                Email <span className="text-[var(--supreme-red)]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={FIELD}
                placeholder="you@company.com"
              />
            </div>

            <div className="sm:col-span-1">
              <label className={LABEL} htmlFor="propertyType">
                Property type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                defaultValue="Commercial"
                className={FIELD}
              >
                <option>Commercial</option>
                <option>Residential</option>
                <option>Multi-site portfolio</option>
                <option>Church / non-profit</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <label className={LABEL} htmlFor="city">
                City
              </label>
              <select
                id="city"
                name="city"
                defaultValue="Houston"
                className={FIELD}
              >
                {serviceAreas.map((area) => (
                  <option key={area}>{area}</option>
                ))}
                <option>Other / not listed</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="service">
                What do you need?
              </label>
              <select
                id="service"
                name="service"
                defaultValue="Roof Restoration & Coatings"
                className={FIELD}
              >
                {services.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
                <option>Not sure — I need an inspection</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="message">
                Tell us about the roof
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={FIELD}
                placeholder="Age of the roof, square footage, whether it's leaking, and anything an adjuster has already told you."
              />
            </div>

            {/* Honeypot — hidden from humans, catches naive bots */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {status === "error" && (
              <div className="sm:col-span-2 flex items-start gap-3 p-4 bg-[var(--red-wash)] border border-[var(--supreme-red)]/30">
                <AlertCircle
                  size={18}
                  className="shrink-0 mt-0.5 text-[var(--supreme-red)]"
                />
                <p className="text-[0.9rem] text-black/72">{error}</p>
              </div>
            )}

            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary group disabled:opacity-65 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Request my free inspection
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
              <p className="text-[0.8rem] text-black/48">
                No cost, no obligation. We never sell your details.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
