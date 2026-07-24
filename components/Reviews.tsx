"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import reviews from "@/data/reviews.json";
import SectionHeading from "./ui/SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(delta: number) {
    setDirection(delta);
    setIndex((prev) => (prev + delta + reviews.length) % reviews.length);
  }

  const review = reviews[index];

  return (
    <section id="reviews" className="py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading eyebrow="Відгуки" title="Що кажуть наші гості" align="center" />

        <div className="relative mt-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={review.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass flex flex-col items-center gap-6 rounded-lux px-8 py-14 text-center sm:px-16"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="max-w-xl font-display text-2xl leading-snug text-primary sm:text-3xl">
                “{review.text}”
              </p>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-sans text-sm text-bg">
                  {initials(review.name)}
                </span>
                <div className="flex flex-col items-start text-left">
                  <span className="font-sans text-sm font-medium text-primary">
                    {review.name}
                  </span>
                  <span className="font-sans text-xs text-secondary">{review.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Попередній відгук"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-soft text-primary transition-colors hover:bg-primary hover:text-bg"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  aria-label={`Відгук ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-gold" : "w-1.5 bg-primary/20"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Наступний відгук"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-soft text-primary transition-colors hover:bg-primary hover:text-bg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
