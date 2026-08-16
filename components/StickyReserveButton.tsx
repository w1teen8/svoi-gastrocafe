"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import settings from "@/data/settings.json";

export default function StickyReserveButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 lg:hidden"
        >
          <Link
            href="/#reservation"
            className="flex items-center justify-center gap-2 rounded-full bg-gold-dark px-6 py-4 font-sans text-sm font-medium text-bg shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            <CalendarCheck size={18} />
            {settings.cta.primary}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
