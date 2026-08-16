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
  // Only the home page has a full-bleed dark Hero photo behind the nav —
  // everywhere else there's just the cream page background, so the bar
  // should always sit solid there instead of a translucent smear.
  const transparentAtTop = pathname === "/" && !scrolled;

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
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
          transparentAtTop
            ? "bg-primary/25 py-6 backdrop-blur-sm"
            : "glass-dark py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-display text-xl tracking-[0.15em] text-bg"
            data-cursor="magnetic"
          >
            СВОЇ
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {settings.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm tracking-wide text-bg/80 transition-colors hover:text-bg"
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
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-bg transition-colors hover:text-gold"
            >
              <ShoppingBag size={20} />
              {totalCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-medium text-bg">
                  {totalCount}
                </span>
              )}
            </Link>

            <div className="hidden lg:block">
              <MagneticButton href="/#reservation" className="!px-6 !py-3 text-xs">
                {settings.cta.primary}
              </MagneticButton>
            </div>

            <button
              aria-label="Меню"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-bg lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-primary/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl tracking-[0.15em] text-bg">
                СВОЇ
              </span>
              <button
                aria-label="Закрити"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-bg"
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
                    className="font-display text-4xl text-bg"
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
