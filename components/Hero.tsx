"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import settings from "@/data/settings.json";
import { withBasePath } from "@/lib/asset-path";
import MagneticButton from "./ui/MagneticButton";
import RevealText from "./ui/RevealText";
import InstagramIcon from "./ui/InstagramIcon";
import FacebookIcon from "./ui/FacebookIcon";

const lines = ["Їжа.", "Люди.", "Моменти.", "Разом."];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[720px] w-full flex-col justify-end overflow-hidden bg-espresso"
    >
      {/* Full-bleed photo across the whole hero — the earlier right-panel
          split left a visible seam where the flat espresso panel met the
          photo's own fade, so back to one continuous image + side gradient. */}
      <Image
        src={withBasePath("/images/hero-porkbelly.jpg")}
        alt="Хрустке свиняче черево з бульйоном та мікрозеленню"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
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
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center gap-4 px-5 pb-8 sm:px-10 sm:pb-10"
      >
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
      </motion.div>
    </section>
  );
}
