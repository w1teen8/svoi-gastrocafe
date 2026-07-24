"use client";

import { motion } from "framer-motion";
import menu from "@/data/menu.json";
import SectionHeading from "./ui/SectionHeading";
import PlaceholderArt from "./ui/PlaceholderArt";

export default function SignatureDishes() {
  return (
    <section id="signature" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Фірмові страви"
          title={
            <>
              Смаки, заради
              <br />
              яких повертаються
            </>
          }
          description="Шість страв, що визначають нашу кухню — від авторських переосмислень класики до сучасних поєднань смаків."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menu.signature.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
              className="group relative flex flex-col overflow-hidden rounded-lux glass"
            >
              <div className="relative h-56 overflow-hidden">
                <motion.div
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <PlaceholderArt tone={dish.tone} pattern="diagonal" className="h-full w-full" />
                </motion.div>
                <span className="absolute right-4 top-4 rounded-full bg-bg/90 px-3 py-1 font-sans text-xs font-medium text-primary">
                  {dish.price}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h3 className="font-display text-xl text-primary">{dish.name}</h3>
                <p className="font-sans text-sm leading-relaxed text-secondary">
                  {dish.description}
                </p>
              </div>
              <motion.div
                variants={{ hover: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] w-full origin-left bg-gold"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
