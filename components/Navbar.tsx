"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import settings from "@/data/settings.json";
import MagneticButton from "./ui/MagneticButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 transition-all duration-500 sm:px-8",
            scrolled ? "glass mx-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:mx-8" : "py-2"
          )}
        >
          <a
            href="#home"
            className="font-display text-xl tracking-[0.15em] text-primary"
            data-cursor="magnetic"
          >
            СВОЇ
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {settings.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-sm tracking-wide text-primary/80 transition-colors hover:text-primary"
                data-cursor="magnetic"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="#reservation" className="!px-6 !py-3 text-xs">
              {settings.cta.primary}
            </MagneticButton>
          </div>

          <button
            aria-label="Меню"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl tracking-[0.15em] text-primary">
                СВОЇ
              </span>
              <button
                aria-label="Закрити"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-primary"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {settings.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="font-display text-4xl text-primary"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <MagneticButton href="#reservation" onClick={() => setOpen(false)} className="w-full">
                {settings.cta.primary}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
