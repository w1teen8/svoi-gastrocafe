/**
 * Real, locally-stored photos for menu items. Exact per-dish photos where
 * the shot genuinely depicts that dish; otherwise a themed category photo
 * (same idea, not necessarily that exact plate) so no PlaceholderArt
 * gradients remain across the menu, cart, and checkout.
 */
const EXACT_IMAGE: Record<string, string> = {
  "breakfast-0": "/images/dish-avocado-toast.jpg", // Авокадо-тост з яйцем пашот
  "breakfast-1": "/images/dish-syrnyky.jpg", // Сирники «СВОЇ»
  "breakfast-2": "/images/dish-shakshuka.jpg", // Шакшука
  "breakfast-3": "/images/dish-oatmeal.jpg", // Вівсяна каша на кокосовому молоці
  "desserts-1": "/images/dessert-cheesecake.jpg", // Чізкейк Баскський
};

const CATEGORY_IMAGE: Record<string, string> = {
  breakfast: "/images/dish-oatmeal.jpg",
  starters: "/images/cat-starters.jpg",
  salads: "/images/cat-salads.jpg",
  soups: "/images/cat-soups.jpg",
  mains: "/images/cat-mains.jpg",
  pasta: "/images/dish-carbonara.jpg",
  grill: "/images/cat-grill.jpg",
  desserts: "/images/dessert-plate.jpg",
  coffee: "/images/coffee-latte.jpg",
  tea: "/images/cat-tea.jpg",
  cocktails: "/images/cocktail-dark.jpg",
  wine: "/images/cat-wine.jpg",
};

export function dishImage(id: string): string | undefined {
  if (EXACT_IMAGE[id]) return EXACT_IMAGE[id];
  const category = id.slice(0, id.lastIndexOf("-"));
  return CATEGORY_IMAGE[category];
}
