"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, MapPin, Clock, Phone } from "lucide-react";
import settings from "@/data/settings.json";
import Breadcrumb from "./ui/Breadcrumb";
import MagneticButton from "./ui/MagneticButton";
import { withBasePath } from "@/lib/asset-path";

const inputClass =
  "w-full border-b border-hairline bg-transparent py-3 font-sans text-base text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-terracotta";

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
    <section id="reservation" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <div className="grid grid-cols-1 overflow-hidden rounded-card shadow-card lg:grid-cols-3">
          <div className="flex flex-col justify-center bg-cream-card px-6 py-10 sm:px-10">
            <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-ink">
              Бронювання
            </h2>
            <div className="mt-4">
              <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Бронювання" }]} />
            </div>

            <div className="mt-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-ink">
                    <Check size={26} />
                  </span>
                  <h3 className="font-display text-2xl text-ink">Дякуємо!</h3>
                  <p className="max-w-xs font-sans text-sm text-ink-muted">
                    Ваш запит на бронювання сформовано. Ми зв&apos;яжемося з вами
                    найближчим часом.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink-muted">
                      Оберіть дату
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
                    <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink-muted">
                      Оберіть час
                    </span>
                    <input
                      required
                      type="time"
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink-muted">
                      Кількість гостей
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
                    placeholder="+380 (__) ___ __ __"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                  <MagneticButton className="mt-2 w-full">
                    {settings.cta.primary}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-0">
            <Image
              src={withBasePath("/images/booking-table.jpg")}
              alt="Сервірований стіл у залі «СВОЇ»"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-6 bg-espresso px-6 py-10 sm:px-10">
            <div className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 shrink-0 text-terracotta" />
              <span className="font-sans text-sm text-cream">{settings.contacts.address}</span>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={18} className="mt-1 shrink-0 text-terracotta" />
              <div className="flex flex-col gap-1 font-sans text-sm text-cream">
                {settings.hours.map((h) => (
                  <span key={h.days}>
                    {h.days}: {h.time}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={18} className="mt-1 shrink-0 text-terracotta" />
              <a
                href={`tel:${settings.contacts.phone.replace(/[^+\d]/g, "")}`}
                className="font-sans text-sm text-cream transition-colors hover:text-terracotta"
              >
                {settings.contacts.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
