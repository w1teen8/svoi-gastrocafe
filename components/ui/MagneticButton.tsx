"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className,
  variant = "solid",
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.35, y: y * 0.35 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    variant === "solid"
      ? "bg-primary text-bg hover:bg-brown"
      : "bg-transparent text-primary border border-primary/20 hover:border-primary/40";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
      className="inline-block"
      data-cursor="magnetic"
    >
      <motion.span
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-sans text-sm tracking-wide transition-colors duration-300",
          base,
          className
        )}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button {...props} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
