import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import menu from "@/data/menu.json";
import settings from "@/data/settings.json";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryItemRow from "@/components/menu/CategoryItemRow";
import { categoryTone } from "@/lib/menu-icons";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return menu.categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const found = menu.categories.find((c) => c.id === category);
  if (!found) return {};
  return {
    title: found.label,
    description: `${found.label} — меню ${settings.brand.fullName}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const active = menu.categories.find((c) => c.id === category);
  if (!active) notFound();

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar — DESIGN_SPEC.md §9.5: solid --espresso for the whole section height */}
      <nav className="flex gap-2 overflow-x-auto bg-espresso px-5 pb-4 pt-28 sm:px-8 lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-8 lg:pt-32">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="mb-6 hidden shrink-0 text-terracotta lg:block"
          aria-hidden="true"
        >
          <path d="M18 4c-6 4-9 10-9 16 0 5 4 9 9 9s9-4 9-9c0-6-3-12-9-16z" />
          <path d="M18 12v17M18 18c-3-2-6-2-8 0M18 22c3-2 6-2 8 0" />
        </svg>
        {menu.categories.map((c) => {
          const isActive = c.id === active.id;
          return (
            <Link
              key={c.id}
              href={`/menu/${c.id}`}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-sans text-sm transition-colors duration-300 lg:rounded-lux lg:whitespace-normal",
                isActive
                  ? "bg-terracotta text-ink"
                  : "text-cream-muted hover:text-cream"
              )}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-28 pt-28 sm:px-10 sm:pt-32">
        <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          {active.label}
          {active.id === "breakfast" && (
            <span className="ml-4 align-middle font-sans text-base font-normal text-terracotta-deep">
              8:00 — 13:00
            </span>
          )}
        </h1>
        <div className="mt-4">
          <Breadcrumb
            items={[
              { label: "Головна", href: "/" },
              { label: "Меню", href: "/menu" },
              { label: active.label },
            ]}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {active.items.map((item, i) => (
            <CategoryItemRow
              key={item.id}
              item={item}
              categoryId={active.id}
              categoryLabel={active.label}
              tone={categoryTone(active.id)}
              delay={(i % 8) * 0.04}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
