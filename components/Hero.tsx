"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import settings from "@/data/settings.json";
import PlaceholderArt from "./ui/PlaceholderArt";
import MagneticButton from "./ui/MagneticButton";
import RevealText from "./ui/RevealText";

const lines = ["Food.", "People.", "Moments.", "Together."];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.75]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex h-[100svh] min-h-[720px] w-full items-end overflow-hidden"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
        <PlaceholderArt
          tone="warm"
          pattern="radial"
          className="h-full w-full"
          label="СВОЇ — Боярка"
        />
      </motion.div>
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 pb-12 pt-28 sm:gap-6 sm:px-8 sm:pb-16 sm:pt-32"
      >
        <div>
          {lines.map((line, i) => (
            <RevealText
              key={line}
              as="h1"
              delay={0.15 * i}
              className="font-display text-5xl leading-[0.95] text-bg sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {line}
            </RevealText>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg font-sans text-sm leading-relaxed text-bg/85 sm:text-base md:text-lg"
        >
          {settings.brand.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#menu" className="!bg-bg !px-6 !py-3 !text-primary sm:!px-8 sm:!py-4">
            {settings.cta.secondary}
          </MagneticButton>
          <MagneticButton
            href="#reservation"
            variant="outline"
            className="!border-bg/40 !px-6 !py-3 !text-bg sm:!px-8 sm:!py-4"
          >
            {settings.cta.primary}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-1 grid grid-cols-2 gap-4 border-t border-bg/20 pt-5 sm:grid-cols-4 sm:gap-6 sm:pt-6"
        >
          {settings.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-base text-gold sm:text-lg">
                {stat.suffix ?? stat.value}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-bg/70 sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 sm:right-10 md:flex"
      >
        <span
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-bg/60"
          style={{ writingMode: "vertical-rl" }}
        >
          Гортайте
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-bg/50"
        />
      </motion.div>
    </section>
  );
}
