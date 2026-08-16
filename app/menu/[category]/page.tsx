import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import menu from "@/data/menu.json";
import settings from "@/data/settings.json";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryItemRow from "@/components/menu/CategoryItemRow";
import { categoryIcon, categoryTone } from "@/lib/menu-icons";
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
    <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-8 sm:pt-40">
      <Breadcrumb
        items={[
          { label: "Головна", href: "/" },
          { label: "Меню", href: "/menu" },
          { label: active.label },
        ]}
      />

      <h1 className="mt-6 font-display text-4xl leading-[1.05] text-primary sm:text-5xl">
        {active.label}
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:h-fit lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {menu.categories.map((c) => {
            const Icon = categoryIcon(c.id);
            const isActive = c.id === active.id;
            return (
              <Link
                key={c.id}
                href={`/menu/${c.id}`}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 font-sans text-sm transition-colors duration-300 lg:rounded-lux",
                  isActive
                    ? "bg-gold-dark text-bg"
                    : "text-secondary hover:bg-bg-secondary hover:text-primary"
                )}
              >
                <Icon size={16} strokeWidth={1.6} />
                {c.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4">
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
