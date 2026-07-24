"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf: number;
    let value = 0;

    function tick() {
      value += (100 - value) * 0.06 + 0.4;
      if (value >= 100) {
        value = 100;
        setProgress(100);
        setTimeout(() => setDone(true), 350);
        return;
      }
      setProgress(Math.min(100, Math.round(value)));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl tracking-[0.2em] text-primary sm:text-4xl"
            >
              СВОЇ
            </motion.div>
            <div className="h-px w-40 overflow-hidden bg-primary/10">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-sans text-xs tracking-[0.3em] text-secondary">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
