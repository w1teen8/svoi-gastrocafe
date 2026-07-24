"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import settings from "@/data/settings.json";
import SectionHeading from "./ui/SectionHeading";
import MagneticButton from "./ui/MagneticButton";

const inputClass =
  "w-full border-b border-border-soft bg-transparent py-3 font-sans text-base text-primary placeholder:text-secondary/60 outline-none transition-colors focus:border-gold";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    comment: "",
  });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Бронювання столика — СВОЇ");
    const body = encodeURIComponent(
      `Ім'я: ${form.name}\nТелефон: ${form.phone}\nГостей: ${form.guests}\nДата: ${form.date}\nЧас: ${form.time}\nКоментар: ${form.comment}`
    );
    window.location.href = `mailto:${settings.contacts.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="reservation" className="py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Бронювання"
            title={
              <>
                Забронюйте
                <br />
                свій столик
              </>
            }
            description="Заповніть форму — і ми зв'яжемося з вами протягом 15 хвилин для підтвердження бронювання."
          />

          <div className="glass rounded-lux p-8 sm:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 py-16 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive text-bg">
                  <Check size={26} />
                </span>
                <h3 className="font-display text-2xl text-primary">Дякуємо!</h3>
                <p className="max-w-xs font-sans text-sm text-secondary">
                  Ваш запит на бронювання сформовано. Ми зв&apos;яжемося з вами найближчим часом.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-secondary">
                      Гостей
                    </span>
                    <select
                      value={form.guests}
                      onChange={(e) => update("guests", e.target.value)}
                      className={inputClass}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-secondary">
                      Дата
                    </span>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-secondary">
                      Час
                    </span>
                    <input
                      required
                      type="time"
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                </div>
                <textarea
                  placeholder="Коментар (побажання, алергії тощо)"
                  rows={3}
                  value={form.comment}
                  onChange={(e) => update("comment", e.target.value)}
                  className={`${inputClass} resize-none`}
                />
                <MagneticButton className="mt-2 w-full sm:w-fit">
                  {settings.cta.primary}
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
