import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлібні крихти" className="flex items-center gap-2 font-sans text-sm text-secondary">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-primary" : undefined}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={14} className="text-secondary/60" />}
          </span>
        );
      })}
    </nav>
  );
}
