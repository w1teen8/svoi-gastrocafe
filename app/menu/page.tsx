import type { Metadata } from "next";
import Link from "next/link";
import menu from "@/data/menu.json";
import settings from "@/data/settings.json";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { categoryIcon } from "@/lib/menu-icons";

export const metadata: Metadata = {
  title: "Меню",
  description: `Повне меню ${settings.brand.fullName} — усі категорії страв, кави та напоїв.`,
};

export default function MenuIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-8 sm:pt-40">
      <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Меню" }]} />

      <div className="mt-8 flex flex-col gap-4">
        <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold">Меню</span>
        <h1 className="font-display text-balance text-4xl leading-[1.05] text-primary sm:text-5xl md:text-6xl">
          Оберіть розділ меню
        </h1>
        <p className="max-w-xl font-sans text-base leading-relaxed text-secondary sm:text-lg">
          Дванадцять категорій, зібраних навколо сезонності та балансу смаків.
          Обирайте страви — вони одразу потрапляють у кошик.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {menu.categories.map((c) => {
          const Icon = categoryIcon(c.id);
          return (
            <Link
              key={c.id}
              href={`/menu/${c.id}`}
              data-cursor="magnetic"
              className="group flex flex-col items-center gap-4 rounded-lux border border-border-soft bg-bg-secondary/40 px-4 py-10 text-center transition-colors duration-300 hover:border-gold hover:bg-gold/5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-bg transition-colors duration-300 group-hover:bg-gold-dark">
                <Icon size={24} strokeWidth={1.4} />
              </span>
              <span className="font-sans text-sm text-primary">{c.label}</span>
              <span className="font-sans text-xs text-secondary">
                {c.items.length} {c.items.length === 1 ? "страва" : "страв"}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
