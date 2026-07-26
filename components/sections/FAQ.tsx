"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { faqs } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-[var(--supreme-red)] mb-5">
                  Straight answers
                </p>
              </Reveal>
              <h2 className="display-lg mb-6">
                <RevealWords text="Questions worth asking" />
              </h2>
              <Reveal delay={0.15}>
                <p className="lede">
                  Including the one most roofers would rather you did not ask.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <dl className="border-t border-black/12">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={faq.q} delay={i * 0.04}>
                    <div className="border-b border-black/12">
                      <dt>
                        <button
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="group w-full flex items-start justify-between gap-6 py-6 text-left"
                        >
                          <span
                            className="display-sm transition-colors duration-300"
                            style={{
                              color: isOpen ? "var(--supreme-red)" : "var(--ink)",
                            }}
                          >
                            {faq.q}
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="shrink-0 mt-1 w-8 h-8 grid place-items-center rounded-full border transition-colors duration-300"
                            style={{
                              borderColor: isOpen
                                ? "var(--supreme-red)"
                                : "rgba(0,0,0,0.14)",
                              color: isOpen ? "var(--supreme-red)" : "inherit",
                            }}
                          >
                            <Plus size={16} />
                          </motion.span>
                        </button>
                      </dt>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.dd
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.42,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 pr-12 text-[0.97rem] leading-[1.8] text-black/62">
                              {faq.a}
                            </p>
                          </motion.dd>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
