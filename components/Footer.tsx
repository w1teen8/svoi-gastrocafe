import settings from "@/data/settings.json";
import { Phone, Mail, MapPin } from "lucide-react";
import InstagramIcon from "./ui/InstagramIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <span className="font-display text-3xl tracking-[0.1em] text-primary">
              СВОЇ
            </span>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-secondary">
              {settings.brand.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-secondary">
              Навігація
            </span>
            <ul className="flex flex-col gap-3">
              {settings.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-sans text-sm text-primary/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-secondary">
              Контакти
            </span>
            <ul className="flex flex-col gap-3 font-sans text-sm text-primary/80">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold" />
                <a href={`tel:${settings.contacts.phone.replace(/[^+\d]/g, "")}`}>
                  {settings.contacts.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold" />
                <a href={`mailto:${settings.contacts.email}`}>
                  {settings.contacts.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>{settings.contacts.address}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-secondary">
              Ми в соцмережах
            </span>
            <a
              href={settings.contacts.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-sans text-sm text-primary/80 transition-colors hover:text-gold"
            >
              <InstagramIcon size={15} className="text-gold" />
              {settings.contacts.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border-soft pt-8 font-sans text-xs text-secondary sm:flex-row sm:items-center">
          <span>
            © {year} {settings.brand.fullName}. Усі права захищено.
          </span>
          <span>{settings.brand.city}, {settings.brand.country}</span>
        </div>
      </div>
    </footer>
  );
}
