"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import QtyStepper from "@/components/ui/QtyStepper";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCart } from "@/lib/cart-context";
import { categoryTone } from "@/lib/menu-icons";
import { dishImage } from "@/lib/dish-images";
import { withBasePath } from "@/lib/asset-path";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, totalPrice, increment, decrement, remove } = useCart();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-28 pt-32 sm:px-8 sm:pt-40">
      <h1 className="font-display text-4xl leading-[1.05] text-primary sm:text-5xl">
        Кошик
      </h1>
      <div className="mt-4">
        <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Кошик" }]} />
      </div>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 rounded-lux border border-border-soft bg-bg-secondary/40 px-8 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-bg">
            <ShoppingBag size={24} />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl text-primary">Кошик порожній</h2>
            <p className="font-sans text-sm text-secondary">
              Оберіть щось смачне в меню — і воно з&apos;явиться тут.
            </p>
          </div>
          <MagneticButton href="/menu">Перейти до меню</MagneticButton>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 rounded-lux border border-border-soft bg-bg p-4 sm:p-5"
                >
                  {dishImage(item.id) ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                      <Image
                        src={withBasePath(dishImage(item.id)!)}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PlaceholderArt
                      tone={categoryTone(item.categoryId)}
                      pattern="radial"
                      className="h-16 w-16 shrink-0 rounded-2xl"
                    />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h3 className="truncate font-display text-lg text-primary">{item.name}</h3>
                    <span className="font-sans text-xs uppercase tracking-wide text-secondary">
                      {item.categoryLabel}
                    </span>
                    <span className="font-display text-base text-gold">{item.priceLabel}</span>
                  </div>
                  <QtyStepper
                    qty={item.qty}
                    onIncrement={() => increment(item.id)}
                    onDecrement={() => decrement(item.id)}
                    size="sm"
                  />
                  <button
                    type="button"
                    aria-label={`Прибрати «${item.name}» з кошика`}
                    onClick={() => remove(item.id)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-secondary transition-colors hover:text-gold-dark"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              href="/menu"
              className="mt-2 font-sans text-sm text-secondary underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              Продовжити покупки
            </Link>
          </div>

          <div className="glass flex h-fit flex-col gap-6 rounded-lux p-8">
            <div className="flex items-center justify-between font-sans text-sm text-secondary">
              <span>Разом</span>
              <span className="font-display text-2xl text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <MagneticButton href="/checkout" className="w-full">
              Оформити замовлення
            </MagneticButton>
          </div>
        </div>
      )}
    </main>
  );
}
