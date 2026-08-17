"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import MagneticButton from "@/components/ui/MagneticButton";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { useCart } from "@/lib/cart-context";
import { categoryTone } from "@/lib/menu-icons";
import { dishImage } from "@/lib/dish-images";
import { formatPrice, cn } from "@/lib/utils";
import settings from "@/data/settings.json";

const steps = ["Дані", "Підтвердження", "Готово"];

const inputClass =
  "w-full border-b border-border-soft bg-transparent py-3 font-sans text-base text-primary placeholder:text-secondary/60 outline-none transition-colors focus:border-gold";

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    method: "pickup" as "pickup" | "delivery",
    address: "",
    comment: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goToConfirm(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function submitOrder() {
    const lines = items
      .map((i) => `${i.qty} × ${i.name} — ${formatPrice(i.qty * i.price)}`)
      .join("\n");
    const subject = encodeURIComponent("Нове замовлення — СВОЇ");
    const body = encodeURIComponent(
      `Ім'я: ${form.name}\nТелефон: ${form.phone}\nСпосіб отримання: ${
        form.method === "pickup" ? "Самовивіз" : "Доставка"
      }${form.method === "delivery" ? `\nАдреса: ${form.address}` : ""}\nКоментар: ${
        form.comment
      }\n\nЗамовлення:\n${lines}\n\nРазом: ${formatPrice(totalPrice)}`
    );
    window.location.href = `mailto:${settings.contacts.email}?subject=${subject}&body=${body}`;
    clear();
    setStep(3);
  }

  if (items.length === 0 && step !== 3) {
    return (
      <main className="mx-auto max-w-4xl px-6 pb-28 pt-32 text-center sm:px-8 sm:pt-40">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-bg">
          <ShoppingBag size={24} />
        </span>
        <h1 className="mt-6 font-display text-3xl text-primary">Кошик порожній</h1>
        <p className="mt-3 font-sans text-sm text-secondary">
          Додайте страви з меню, щоб оформити замовлення.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton href="/menu">Перейти до меню</MagneticButton>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 pb-28 pt-32 sm:px-8 sm:pt-40">
      <h1 className="font-display text-4xl leading-[1.05] text-primary sm:text-5xl">
        Оформлення замовлення
      </h1>
      <div className="mt-4">
        <Breadcrumb
          items={[{ label: "Головна", href: "/" }, { label: "Кошик", href: "/cart" }, { label: "Оформлення" }]}
        />
      </div>

      <div className="mt-8 flex items-center gap-3">
        {steps.map((label, i) => {
          const n = i + 1;
          const state = n === step ? "active" : n < step ? "done" : "upcoming";
          return (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full font-sans text-xs",
                    state === "active" && "bg-gold-dark text-bg",
                    state === "done" && "bg-primary text-bg",
                    state === "upcoming" && "bg-bg-secondary text-secondary"
                  )}
                >
                  {state === "done" ? <Check size={14} /> : n}
                </span>
                <span
                  className={cn(
                    "font-sans text-sm",
                    state === "upcoming" ? "text-secondary" : "text-primary"
                  )}
                >
                  {label}
                </span>
              </div>
              {n < steps.length && <span className="h-px w-8 bg-border-soft" />}
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={goToConfirm}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <input
                  required
                  placeholder="Ваше ім'я"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="tel"
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-sans text-xs uppercase tracking-widest text-secondary">
                  Спосіб отримання
                </span>
                <div className="flex gap-3">
                  {(
                    [
                      { id: "pickup", label: "Самовивіз" },
                      { id: "delivery", label: "Доставка" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => update("method", opt.id)}
                      className={cn(
                        "rounded-full border px-5 py-2.5 font-sans text-sm transition-colors duration-300",
                        form.method === opt.id
                          ? "border-gold-dark bg-gold-dark text-bg"
                          : "border-border-soft text-secondary hover:text-primary"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.method === "delivery" && (
                <input
                  required
                  placeholder="Адреса доставки"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className={inputClass}
                />
              )}

              <textarea
                placeholder="Коментар (побажання, алергії тощо)"
                rows={3}
                value={form.comment}
                onChange={(e) => update("comment", e.target.value)}
                className={`${inputClass} resize-none`}
              />

              <MagneticButton className="mt-2 w-fit">Далі</MagneticButton>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3 rounded-lux border border-border-soft p-6">
                <Row label="Ім'я" value={form.name} />
                <Row label="Телефон" value={form.phone} />
                <Row label="Спосіб отримання" value={form.method === "pickup" ? "Самовивіз" : "Доставка"} />
                {form.method === "delivery" && <Row label="Адреса" value={form.address} />}
                {form.comment && <Row label="Коментар" value={form.comment} />}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-sm text-secondary underline-offset-4 hover:underline"
                >
                  Назад
                </button>
                <MagneticButton onClick={submitOrder}>Підтвердити замовлення</MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 rounded-lux border border-border-soft py-16 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive text-bg">
                <Check size={26} />
              </span>
              <h3 className="font-display text-2xl text-primary">Дякуємо за замовлення!</h3>
              <p className="max-w-xs font-sans text-sm text-secondary">
                Ми відкрили лист із деталями замовлення — надішліть його, і ми
                зв&apos;яжемося з вами для підтвердження.
              </p>
              <MagneticButton href="/menu" className="mt-2">
                Продовжити покупки
              </MagneticButton>
            </motion.div>
          )}
        </div>

        {step !== 3 && (
          <div className="glass flex h-fit flex-col gap-4 rounded-lux p-8">
            <span className="font-sans text-xs uppercase tracking-widest text-secondary">
              Ваше замовлення
            </span>
            <div className="flex flex-col gap-3">
              {items.map((item) => {
                const photo = dishImage(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-3 font-sans text-sm">
                    {photo ? (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image src={photo} alt={item.name} fill sizes="40px" className="object-cover" />
                      </div>
                    ) : (
                      <PlaceholderArt
                        tone={categoryTone(item.categoryId)}
                        pattern="radial"
                        className="h-10 w-10 shrink-0 rounded-full"
                      />
                    )}
                    <span className="min-w-0 flex-1 text-primary">
                      {item.qty} × {item.name}
                    </span>
                    <span className="shrink-0 text-secondary">{formatPrice(item.qty * item.price)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-border-soft pt-4 font-sans text-sm text-secondary">
              <span>Разом</span>
              <span className="font-display text-xl text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 font-sans text-sm">
      <span className="text-secondary">{label}</span>
      <span className="text-primary">{value}</span>
    </div>
  );
}
