"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import settings from "@/data/settings.json";
import SectionHeading from "./ui/SectionHeading";
import InstagramIcon from "./ui/InstagramIcon";

export default function Contacts() {
  const { lat, lng } = settings.contacts.coordinates;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=uk&z=16&output=embed`;

  return (
    <section id="contacts" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading eyebrow="Контакти" title="Завітайте до нас" />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex flex-col gap-8 rounded-lux p-8 sm:p-10"
          >
            <div className="flex items-start gap-4">
              <MapPin size={20} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="font-sans text-sm uppercase tracking-widest text-secondary">
                  Адреса
                </p>
                <p className="mt-1 font-display text-xl text-primary">
                  {settings.contacts.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="font-sans text-sm uppercase tracking-widest text-secondary">
                  Телефон
                </p>
                <a
                  href={`tel:${settings.contacts.phone.replace(/[^+\d]/g, "")}`}
                  className="mt-1 block font-display text-xl text-primary"
                >
                  {settings.contacts.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="font-sans text-sm uppercase tracking-widest text-secondary">
                  Email
                </p>
                <a
                  href={`mailto:${settings.contacts.email}`}
                  className="mt-1 block font-display text-xl text-primary"
                >
                  {settings.contacts.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <InstagramIcon size={20} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="font-sans text-sm uppercase tracking-widest text-secondary">
                  Instagram
                </p>
                <a
                  href={settings.contacts.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block font-display text-xl text-primary"
                >
                  {settings.contacts.instagramHandle}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-border-soft pt-8">
              <Clock size={20} className="mt-1 shrink-0 text-gold" />
              <div className="flex flex-col gap-2">
                <p className="font-sans text-sm uppercase tracking-widest text-secondary">
                  Графік роботи
                </p>
                {settings.hours.map((h) => (
                  <div key={h.days} className="flex gap-4 font-sans text-sm text-primary">
                    <span className="text-secondary">{h.days}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[420px] overflow-hidden rounded-lux border border-border-soft grayscale-[15%] transition-[filter] duration-500 hover:grayscale-0"
          >
            <iframe
              title="Гастрокафе СВОЇ на карті"
              src={mapSrc}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
