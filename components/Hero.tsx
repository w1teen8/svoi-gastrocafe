"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import settings from "@/data/settings.json";
import { withBasePath } from "@/lib/asset-path";
import MagneticButton from "./ui/MagneticButton";
import RevealText from "./ui/RevealText";
import InstagramIcon from "./ui/InstagramIcon";
import FacebookIcon from "./ui/FacebookIcon";

const lines = ["Смак.", "Що об'єднує", "нас усіх."];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[720px] w-full flex-col justify-end overflow-hidden bg-espresso"
    >
      {/* Full-bleed banner photo — already composed with the dish in the
          right ~40% and a large dark negative-space field on the left, so
          the gradient here only needs a light touch for text contrast,
          not the heavy masking the previous top-down plate shot needed. */}
      <Image
        src={withBasePath("/images/hero-steak-banner.jpg")}
        alt="Стейк з розмарином на темній тарілці"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 50%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(10,8,7,.55) 0%, rgba(10,8,7,.4) 35%, rgba(10,8,7,.15) 55%, rgba(10,8,7,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col gap-5 px-5 pb-10 pt-28 sm:gap-6 sm:px-10 sm:pb-14 sm:pt-32">
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
                  "font-display font-light uppercase text-5xl leading-[1.05] tracking-wide sm:text-6xl md:text-7xl lg:text-[80px] " +
                  (line === "нас усіх." ? "text-terracotta" : "text-cream")
                }
              >
                {line}
              </RevealText>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 h-px w-16 origin-left bg-terracotta"
          />

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
            <MagneticButton href="/#menu">
              {settings.cta.secondary}
              <ArrowRight size={16} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 mx-auto flex w-full max-w-[1920px] items-center gap-4 px-5 pb-8 sm:px-10 sm:pb-10"
      >
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
          href={settings.contacts.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="text-cream/70 transition-colors hover:text-cream"
        >
          <FacebookIcon size={16} />
        </a>
        <a
          href="#about"
          aria-label="Гортати далі"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-cream/70 transition-colors hover:border-cream/60 hover:text-cream"
        >
          <ArrowUpRight size={14} />
        </a>
      </motion.div>
    </section>
  );
}
