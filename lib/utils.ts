import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const TONE_GRADIENTS: Record<string, string> = {
  primary: "from-[#2C2926] via-[#443d37] to-[#786F69]",
  brown: "from-[#775944] via-[#8c6b52] to-[#C7A46A]",
  olive: "from-[#565c46] via-[#8C9274] to-[#c9cdb8]",
  gold: "from-[#a3814f] via-[#C7A46A] to-[#e8d6b3]",
  sand: "from-[#d8cdbd] via-[#EFEAE3] to-[#F8F6F3]",
  warm: "from-[#5c463a] via-[#775944] to-[#b89679]",
};

export function toneGradient(tone?: string) {
  return TONE_GRADIENTS[tone ?? "primary"] ?? TONE_GRADIENTS.primary;
}
