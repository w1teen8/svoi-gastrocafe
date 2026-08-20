"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import settings from "@/data/settings.json";
import MagneticButton from "./ui/MagneticButton";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();
  const pathname = usePathname();
  // DESIGN_SPEC.md §9.1: transparent over the Hero photo, solid --espresso
  // once scrolled past 80px. Away from the home page there's no Hero behind
  // it, so it stays solid from the start.
  const transparentAtTop = pathname === "/" && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
          transparentAtTop
            ? "h-24 bg-transparent"
            : "h-[72px] bg-espresso shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-5 sm:px-10">
          <Link href="/" className="flex flex-col leading-none" data-cursor="magnetic">
            <span className="font-display text-xl tracking-[0.3em] text-cream">
              СВОЇ
            </span>
            <span className="mt-1 font-sans text-[9px] tracking-[0.3em] text-cream-muted">
              ГАСТРОКАФЕ
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {settings.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-xs uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-cream"
                data-cursor="magnetic"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              aria-label="Кошик"
              data-cursor="magnetic"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:text-terracotta"
            >
              <ShoppingBag size={20} />
              {totalCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 font-sans text-[10px] font-medium text-ink">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              aria-label="Меню"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:text-terracotta"
            >
              <Menu size={22} />
            </button>

            <div className="hidden sm:block">
              <MagneticButton
                href="/#reservation"
                variant="outline"
                className="!h-11 !border-terracotta/50 !px-6 !py-0 !text-xs !text-terracotta hover:!border-terracotta"
              >
                {settings.cta.primary}
              </MagneticButton>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-espresso/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl tracking-[0.3em] text-cream">
                СВОЇ
              </span>
              <button
                aria-label="Закрити"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-cream"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {settings.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-cream"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <MagneticButton href="/#reservation" onClick={() => setOpen(false)} className="w-full">
                {settings.cta.primary}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
