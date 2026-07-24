"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  once?: boolean;
}

const COMPONENTS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

export default function RevealText({
  children,
  className,
  as = "div",
  delay = 0,
  once = true,
}: RevealTextProps) {
  const Comp = COMPONENTS[as];

  return (
    <motion.div
      className="reveal-mask"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      <Comp
        className={cn(className)}
        variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
