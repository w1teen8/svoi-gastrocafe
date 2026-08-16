"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import menu from "@/data/menu.json";
import SectionHeading from "./ui/SectionHeading";
import { cn } from "@/lib/utils";

export default function MenuSection() {
  const [active, setActive] = useState(menu.categories[0].id);
  const category = menu.categories.find((c) => c.id === active) ?? menu.categories[0];

  return (
    <section id="menu" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Меню"
          title="Наше меню"
          description="Дванадцять категорій, зібраних навколо сезонності та балансу смаків. Оберіть розділ, щоб переглянути страви."
          align="center"
        />

        <div className="mt-14 flex flex-wrap justify-center gap-2 sm:gap-3">
          {menu.categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              data-cursor="magnetic"
              className={cn(
                "rounded-full px-5 py-2.5 font-sans text-sm tracking-wide transition-all duration-300",
                active === c.id
                  ? "bg-gold-dark text-bg"
                  : "bg-transparent text-secondary hover:bg-primary/5 hover:text-primary"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative mt-16 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2"
            >
              {category.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start justify-between gap-4 border-b border-border-soft pb-4"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-lg text-primary sm:text-xl">
                      {item.name}
                    </h3>
                    <p className="max-w-md font-sans text-sm text-secondary">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-lg text-gold">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/menu"
            data-cursor="magnetic"
            className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.25em] text-gold transition-colors hover:text-gold-dark"
          >
            Переглянути повне меню
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
