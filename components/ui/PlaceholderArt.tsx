import { cn, toneGradient } from "@/lib/utils";

interface PlaceholderArtProps {
  tone?: string;
  className?: string;
  label?: string;
  pattern?: "diagonal" | "radial" | "grid" | "none";
}

export default function PlaceholderArt({
  tone = "primary",
  className,
  label,
  pattern = "radial",
}: PlaceholderArtProps) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden bg-gradient-to-br",
        toneGradient(tone),
        className
      )}
    >
      {pattern === "radial" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.25), transparent 55%)",
          }}
        />
      )}
      {pattern === "diagonal" && (
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 14px)",
          }}
        />
      )}
      {pattern === "grid" && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}
      {label && (
        <span className="absolute bottom-4 left-5 font-display text-xs tracking-[0.25em] text-white/70 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
