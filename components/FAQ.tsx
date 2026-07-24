"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import faq from "@/data/faq.json";
import SectionHeading from "./ui/SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="faq" className="py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Питання, які нам ставлять" align="center" />

        <div className="mt-16 flex flex-col">
          {faq.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="border-b border-border-soft">
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl text-primary sm:text-2xl">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-primary"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 font-sans text-base leading-relaxed text-secondary">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
