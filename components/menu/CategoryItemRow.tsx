"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import QtyStepper from "@/components/ui/QtyStepper";
import { useCart } from "@/lib/cart-context";
import { parsePrice } from "@/lib/utils";

interface CategoryItemRowProps {
  item: { id: string; name: string; description: string; price: string };
  categoryId: string;
  categoryLabel: string;
  tone: string;
  delay?: number;
}

export default function CategoryItemRow({
  item,
  categoryId,
  categoryLabel,
  tone,
  delay = 0,
}: CategoryItemRowProps) {
  const { items, add, increment, decrement } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  function handleAdd() {
    add({
      id: item.id,
      name: item.name,
      price: parsePrice(item.price),
      priceLabel: item.price,
      categoryId,
      categoryLabel,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-4 rounded-lux border border-border-soft bg-bg p-4 sm:p-5"
    >
      <PlaceholderArt
        tone={tone}
        pattern="radial"
        className="h-16 w-16 shrink-0 rounded-2xl sm:h-20 sm:w-20"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="truncate font-display text-lg text-primary sm:text-xl">{item.name}</h3>
        <p className="line-clamp-2 font-sans text-sm text-secondary">{item.description}</p>
        <span className="mt-1 font-display text-base text-gold">{item.price}</span>
      </div>
      <div className="shrink-0">
        {inCart ? (
          <QtyStepper
            qty={inCart.qty}
            onIncrement={() => increment(item.id)}
            onDecrement={() => decrement(item.id)}
            size="sm"
          />
        ) : (
          <button
            type="button"
            aria-label={`Додати «${item.name}» у кошик`}
            onClick={handleAdd}
            data-cursor="magnetic"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-dark text-bg transition-colors hover:bg-gold"
          >
            <Plus size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
