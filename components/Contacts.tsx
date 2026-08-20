"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import settings from "@/data/settings.json";
import Breadcrumb from "./ui/Breadcrumb";
import InstagramIcon from "./ui/InstagramIcon";
import FacebookIcon from "./ui/FacebookIcon";
import MapPinIcon from "./ui/MapPinIcon";

export default function Contacts() {
  const { lat, lng } = settings.contacts.coordinates;
  // Google's embed always drops its own default marker at `q=`; our custom
  // teardrop pin is layered on top of it at the same visual center.
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=uk&z=16&output=embed`;

  return (
    <section id="contacts" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-ink sm:text-5xl">
          Контакти
        </h2>
        <div className="mt-4">
          <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Контакти" }]} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-8 rounded-card bg-cream-card p-8 shadow-card sm:p-10">
            <div className="flex items-start gap-4">
              <Phone size={18} className="mt-1 shrink-0 text-terracotta-deep" />
              <a
                href={`tel:${settings.contacts.phone.replace(/[^+\d]/g, "")}`}
                className="font-sans text-base text-ink"
              >
                {settings.contacts.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 shrink-0 text-terracotta-deep" />
              <span className="font-sans text-base text-ink">{settings.contacts.address}</span>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={18} className="mt-1 shrink-0 text-terracotta-deep" />
              <div className="flex flex-col gap-1 font-sans text-base text-ink">
                {settings.hours.map((h) => (
                  <span key={h.days}>
                    {h.days}: {h.time}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={18} className="mt-1 shrink-0 text-terracotta-deep" />
              <a href={`mailto:${settings.contacts.email}`} className="font-sans text-base text-ink">
                {settings.contacts.email}
              </a>
            </div>

            <div className="mt-2 flex items-center gap-4 border-t border-hairline pt-6">
              <a
                href={settings.contacts.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-terracotta-deep hover:text-terracotta-deep"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={settings.contacts.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-terracotta-deep hover:text-terracotta-deep"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-card">
            <iframe
              title="Гастрокафе СВОЇ на карті"
              src={mapSrc}
              className="h-full min-h-[420px] w-full grayscale-[35%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <MapPinIcon size={44} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
