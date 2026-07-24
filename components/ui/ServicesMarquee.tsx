"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import settings from "@/data/settings.json";

export default function ServicesMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const distance = el.scrollWidth / 2;
    const tween = gsap.to(el, {
      x: -distance,
      duration: 32,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const items = [...settings.services, ...settings.services];

  return (
    <div className="reveal-mask relative w-full border-y border-border-soft py-6">
      <div ref={trackRef} className="flex w-max items-center gap-10 will-change-transform">
        {items.map((service, i) => (
          <span
            key={`${service}-${i}`}
            className="flex items-center gap-10 font-display text-2xl text-primary/70 sm:text-3xl"
          >
            {service}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
