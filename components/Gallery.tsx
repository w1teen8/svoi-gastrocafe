"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import galleryData from "@/data/gallery.json";
import Breadcrumb from "./ui/Breadcrumb";
import { withBasePath } from "@/lib/asset-path";

export default function Gallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="photo"
      ref={wrapperRef}
      className="relative bg-cream"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="mx-auto mb-10 w-full max-w-[1920px] px-5 sm:px-10">
          <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-ink sm:text-5xl">
            Фото
          </h2>
          <div className="mt-4">
            <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Фото" }]} />
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-8 pl-[6vw]">
          {galleryData.map((item, i) => (
            <div
              key={item.id}
              className="relative h-[52vh] w-[min(60vw,760px)] shrink-0 overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(43,29,20,0.18)]"
            >
              <Image
                src={withBasePath(item.image)}
                alt={item.caption}
                fill
                sizes="60vw"
                className="object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-8"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(28,17,11,.85) 0%, rgba(28,17,11,0) 70%)",
                }}
              >
                <span className="font-sans text-sm font-bold tracking-[0.05em] text-terracotta">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-2xl text-cream">{item.caption}</h3>
                <p className="mt-1 max-w-xs font-sans text-sm text-cream/75">{item.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
