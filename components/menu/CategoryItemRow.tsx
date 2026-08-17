"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import QtyStepper from "@/components/ui/QtyStepper";
import { useCart } from "@/lib/cart-context";
import { dishImage } from "@/lib/dish-images";
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
  const photo = dishImage(item.id);

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
      className="flex flex-col overflow-hidden rounded-card bg-cream-card shadow-card"
    >
      <div className="relative aspect-[4/3] w-full">
        {photo ? (
          <Image src={photo} alt={item.name} fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover" />
        ) : (
          <PlaceholderArt tone={tone} pattern="radial" className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg text-ink">{item.name}</h3>
        <p className="line-clamp-2 font-sans text-[13.5px] leading-relaxed text-ink-muted">
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-sans text-[17px] font-semibold text-ink">{item.price}</span>
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-cream transition-colors hover:bg-terracotta-deep"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
