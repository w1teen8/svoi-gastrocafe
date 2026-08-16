"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "@/data/gallery.json";
import SectionHeading from "./ui/SectionHeading";
import PlaceholderArt from "./ui/PlaceholderArt";
import { cn } from "@/lib/utils";

const categories = ["Усі", ...Array.from(new Set(galleryData.map((g) => g.category)))];

const sizeClass: Record<string, string> = {
  sm: "h-36",
  md: "h-48",
  lg: "h-60",
};

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
    <section id="gallery" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Галерея"
          title="Атмосфера «СВОЇ»"
          align="center"
        />

        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-5 py-2 font-sans text-sm transition-all duration-300",
                active === c
                  ? "bg-gold-dark text-bg"
                  : "bg-transparent text-secondary hover:text-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => openAt(item.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-lux text-left"
            >
              <div className={cn("relative w-full overflow-hidden", sizeClass[item.size] ?? "h-72")}>
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <PlaceholderArt tone={item.tone} pattern="radial" className="h-full w-full" />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-sans text-sm text-bg">{item.caption}</span>
                </div>
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
            className="fixed inset-0 z-[90] flex items-center justify-center bg-primary/90 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Закрити"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-bg/10 text-bg hover:bg-bg/20"
            >
              <X size={20} />
            </button>
            <button
              aria-label="Попереднє фото"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/10 text-bg hover:bg-bg/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Наступне фото"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/10 text-bg hover:bg-bg/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-lux"
            >
              <PlaceholderArt tone={current.tone} pattern="radial" className="h-[60vh] w-full" />
              <div className="glass flex items-center justify-between px-6 py-4">
                <span className="font-display text-lg text-primary">{current.caption}</span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-secondary">
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
