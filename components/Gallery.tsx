"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "@/data/gallery.json";
import Breadcrumb from "./ui/Breadcrumb";
import { cn } from "@/lib/utils";

const categories = ["Усі", ...Array.from(new Set(galleryData.map((g) => g.category)))];

export default function Gallery() {
  const [active, setActive] = useState("Усі");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "Усі" ? galleryData : galleryData.filter((g) => g.category === active)),
    [active]
  );

  function openAt(id: string) {
    const idx = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(idx);
  }

  function step(delta: number) {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      const next = (prev + delta + filtered.length) % filtered.length;
      return next;
    });
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="photo" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-ink sm:text-5xl">
          Фото
        </h2>
        <div className="mt-4">
          <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Фото" }]} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-sans text-sm transition-all duration-300",
                active === c
                  ? "border-terracotta bg-terracotta text-cream"
                  : "border-hairline text-ink-muted hover:text-ink"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => openAt(item.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 8) * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-card text-left"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-sans text-xs text-cream">{item.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso/90 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Закрити"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
            >
              <X size={20} />
            </button>
            <button
              aria-label="Попереднє фото"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Наступне фото"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-card"
            >
              <div className="relative h-[60vh] w-full">
                <Image src={current.image} alt={current.caption} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="flex items-center justify-between bg-cream-card px-6 py-4">
                <span className="font-display text-lg text-ink">{current.caption}</span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-ink-muted">
                  {current.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
