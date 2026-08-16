import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QtyStepperProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "sm" | "md";
  className?: string;
}

export default function QtyStepper({
  qty,
  onIncrement,
  onDecrement,
  size = "md",
  className,
}: QtyStepperProps) {
  const btnSize = size === "sm" ? "h-8 w-8" : "h-11 w-11";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        aria-label="Зменшити кількість"
        onClick={onDecrement}
        className={cn(
          "flex items-center justify-center rounded-full border border-border-soft text-primary transition-colors hover:border-gold hover:text-gold",
          btnSize
        )}
      >
        <Minus size={14} />
      </button>
      <span className="w-5 text-center font-sans text-sm text-primary tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label="Збільшити кількість"
        onClick={onIncrement}
        className={cn(
          "flex items-center justify-center rounded-full border border-border-soft text-primary transition-colors hover:border-gold hover:text-gold",
          btnSize
        )}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
