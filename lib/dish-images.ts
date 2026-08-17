/**
 * Real, locally-stored photos for the menu items they actually depict.
 * Deliberately NOT exhaustive — only items with a photo that genuinely
 * matches the dish get one; everything else keeps the PlaceholderArt
 * gradient fallback rather than showing a mismatched photo.
 */
export const DISH_IMAGE: Record<string, string> = {
  "breakfast-0": "/images/dish-avocado-toast.jpg", // Авокадо-тост з яйцем пашот
  "breakfast-1": "/images/dish-syrnyky.jpg", // Сирники «СВОЇ»
  "breakfast-3": "/images/dish-oatmeal.jpg", // Вівсяна каша на кокосовому молоці
  "desserts-1": "/images/dessert-cheesecake.jpg", // Чізкейк Баскський
};

export function dishImage(id: string): string | undefined {
  return DISH_IMAGE[id];
}
