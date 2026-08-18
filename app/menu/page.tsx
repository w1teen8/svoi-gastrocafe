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
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-balance text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Оберіть розділ меню
        </h1>
        <Breadcrumb items={[{ label: "Головна", href: "/" }, { label: "Меню" }]} />
        <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-ink-muted sm:text-lg">
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
              className="group flex flex-col items-center gap-3 px-4 py-8 text-center"
            >
              <Icon
                size={32}
                strokeWidth={1.5}
                className="text-terracotta-deep transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink">{c.label}</span>
              <span className="font-sans text-xs text-ink-muted">
                {c.items.length} {c.items.length === 1 ? "страва" : "страв"}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
