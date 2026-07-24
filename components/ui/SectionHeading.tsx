import { cn } from "@/lib/utils";
import RevealText from "./RevealText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-sans text-xs uppercase tracking-[0.35em]",
            light ? "text-bg/60" : "text-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <RevealText
        as="h2"
        className={cn(
          "font-display text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl",
          light ? "text-bg" : "text-primary"
        )}
      >
        {title}
      </RevealText>
      {description && (
        <p
          className={cn(
            "max-w-xl font-sans text-base leading-relaxed sm:text-lg",
            light ? "text-bg/70" : "text-secondary"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
