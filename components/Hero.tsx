"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import settings from "@/data/settings.json";
import MagneticButton from "./ui/MagneticButton";
import RevealText from "./ui/RevealText";
import InstagramIcon from "./ui/InstagramIcon";
import FacebookIcon from "./ui/FacebookIcon";

const lines = ["Їжа.", "Люди.", "Моменти.", "Разом."];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[720px] w-full items-end overflow-hidden"
    >
      <Image
        src="/images/hero-pasta.jpg"
        alt="Паста з чорнилом каракатиці та креветками на тарілці"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
      <div className="absolute inset-0" style={{ backgroundImage: "var(--overlay-side)" }} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-5 pb-10 pt-28 sm:gap-6 sm:px-10 sm:pb-14 sm:pt-32">
        <div className="max-w-xl">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-terracotta">
            Гастрокафе «СВОЇ»
          </span>

          <div className="mt-4">
            {lines.map((line, i) => (
              <RevealText
                key={line}
                as="h1"
                delay={0.15 * i}
                className={
                  "font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[88px] " +
                  (line === "Разом." ? "text-terracotta" : "text-cream")
                }
              >
                {line}
              </RevealText>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-md font-sans text-sm leading-relaxed text-cream-muted sm:text-base"
          >
            {settings.brand.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap items-center gap-6"
          >
            <MagneticButton href="/#menu">{settings.cta.secondary}</MagneticButton>
            <Link
              href={settings.contacts.instagram}
              target="_blank"
              rel="noreferrer"
              data-cursor="magnetic"
              className="group flex items-center gap-3 font-sans text-sm text-cream"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 transition-colors group-hover:border-cream/70">
                <Play size={14} className="ml-0.5 fill-cream text-cream" />
              </span>
              Дивитися відео
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 pb-8 sm:px-10 sm:pb-10"
      >
        <div className="flex items-center gap-4">
          <a
            href={settings.contacts.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-cream/70 transition-colors hover:text-cream"
          >
            <FacebookIcon size={16} />
          </a>
          <a
            href={settings.contacts.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-cream/70 transition-colors hover:text-cream"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href="#about"
            aria-label="Гортати далі"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-cream/70 transition-colors hover:border-cream/60 hover:text-cream"
          >
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Слайдер героя: наразі є лише 1 фото з 4 передбачених специфікацією —
            лічильник показаний як у макеті, стрілки неактивні до появи решти фото. */}
        <div className="flex items-center gap-4">
          <span className="font-sans text-xs tracking-[0.1em] text-cream">01</span>
          <span className="relative h-px w-16 bg-cream/25">
            <span className="absolute inset-y-0 left-0 w-1/4 bg-terracotta" />
          </span>
          <span className="font-sans text-xs tracking-[0.1em] text-cream/50">04</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-disabled="true"
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-cream/20 text-cream/30"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              aria-disabled="true"
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-cream/20 text-cream/30"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
