import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import menu from "@/data/menu.json";
import { categoryIcon } from "@/lib/menu-icons";

const TEASER_CATEGORIES = [
  "breakfast",
  "salads",
  "starters",
  "soups",
  "pasta",
  "mains",
  "desserts",
  "coffee",
];

export default function MenuSection() {
  const categories = TEASER_CATEGORIES.map((id) =>
    menu.categories.find((c) => c.id === id)
  ).filter((c): c is (typeof menu.categories)[number] => Boolean(c));

  return (
    <section id="menu">
      <div className="relative overflow-hidden">
        <Image
          src="/images/menu-hero.jpg"
          alt="Фірмова страва «СВОЇ»"
          width={1600}
          height={700}
          className="h-[360px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--overlay-side)" }} />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-10">
            <div className="max-w-sm">
              <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-cream sm:text-5xl">
                Меню
              </h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-cream-muted sm:text-base">
                Сезонні продукти, авторські поєднання та любов до деталей у
                кожній страві.
              </p>
            </div>
          </div>
        </div>

        <svg
          className="absolute inset-x-0 bottom-0 block w-full"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ height: 60 }}
        >
          <path
            fill="var(--color-cream)"
            d="M0,54 C180,88 360,20 540,38 C720,56 900,86 1080,58 C1260,30 1350,44 1440,52 L1440,90 L0,90 Z"
          />
        </svg>
      </div>

      <div className="bg-cream pb-16 pt-4">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {categories.map((c) => {
              const Icon = categoryIcon(c.id);
              return (
                <Link
                  key={c.id}
                  href={`/menu/${c.id}`}
                  data-cursor="magnetic"
                  className="group flex flex-col items-center gap-3 text-center"
                >
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-terracotta transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink">
                    {c.label}
                    {c.id === "breakfast" && (
                      <span className="mt-1 block font-sans text-[11px] normal-case tracking-normal text-ink-muted">
                        8:00 — 13:00
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/menu"
              data-cursor="magnetic"
              className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.25em] text-terracotta transition-colors hover:text-terracotta-deep"
            >
              Переглянути повне меню
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
