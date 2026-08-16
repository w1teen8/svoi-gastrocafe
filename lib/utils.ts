import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const TONE_GRADIENTS: Record<string, string> = {
  primary: "from-[#2B2620] via-[#3d3226] to-[#6b5a45]",
  brown: "from-[#5b3a22] via-[#8a5a34] to-[#c99361]",
  olive: "from-[#2f4a30] via-[#4f7a45] to-[#a8c090]",
  gold: "from-[#8f4a22] via-[#c97c3f] to-[#f0c48a]",
  sand: "from-[#dccdab] via-[#efe6d6] to-[#f8f6ef]",
  warm: "from-[#4a3320] via-[#6b4a30] to-[#b8916a]",
  pond: "from-[#1f3d3a] via-[#2f5c52] to-[#7fa89a]",
};

export function toneGradient(tone?: string) {
  return TONE_GRADIENTS[tone ?? "primary"] ?? TONE_GRADIENTS.primary;
}

/** Parses a display price like "185 ₴" into a plain number (185). */
export function parsePrice(price: string): number {
  const digits = price.replace(/[^\d.,]/g, "").replace(",", ".");
  const value = parseFloat(digits);
  return Number.isFinite(value) ? value : 0;
}

export function formatPrice(value: number): string {
  return `${Math.round(value * 100) / 100} ₴`;
}
