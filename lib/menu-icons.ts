import {
  Sunrise,
  Utensils,
  Salad,
  Soup,
  UtensilsCrossed,
  CookingPot,
  Flame,
  Cake,
  Coffee,
  Leaf,
  Martini,
  Wine,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICON: Record<string, LucideIcon> = {
  breakfast: Sunrise,
  starters: Utensils,
  salads: Salad,
  soups: Soup,
  mains: UtensilsCrossed,
  pasta: CookingPot,
  grill: Flame,
  desserts: Cake,
  coffee: Coffee,
  tea: Leaf,
  cocktails: Martini,
  wine: Wine,
};

export const CATEGORY_TONE: Record<string, string> = {
  breakfast: "warm",
  starters: "brown",
  salads: "olive",
  soups: "gold",
  mains: "primary",
  pasta: "sand",
  grill: "brown",
  desserts: "gold",
  coffee: "warm",
  tea: "olive",
  cocktails: "pond",
  wine: "primary",
};

export function categoryIcon(id: string): LucideIcon {
  return CATEGORY_ICON[id] ?? Utensils;
}

export function categoryTone(id: string): string {
  return CATEGORY_TONE[id] ?? "primary";
}
