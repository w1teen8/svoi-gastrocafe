"use client";

import { motion } from "framer-motion";
import events from "@/data/events.json";
import SectionHeading from "./ui/SectionHeading";
import PlaceholderArt from "./ui/PlaceholderArt";
import MagneticButton from "./ui/MagneticButton";

export default function Events() {
  return (
    <section id="events" className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="Події"
          title={
            <>
              Місце для ваших
              <br />
              особливих моментів
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-lux border border-border-soft p-6"
            >
              <PlaceholderArt
                tone={event.tone}
                pattern="grid"
                className="absolute inset-0 opacity-[0.14] transition-opacity duration-500 group-hover:opacity-25"
              />
              <div className="relative flex flex-col gap-3">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <h3 className="font-display text-2xl text-primary sm:text-3xl">
                  {event.title}
                </h3>
                <p className="max-w-sm font-sans text-sm leading-relaxed text-secondary">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <MagneticButton href="#reservation" className="!h-16 !px-12 !text-sm">
            Обговорити подію
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
