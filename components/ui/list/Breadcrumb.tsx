import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string; // اگه نباشه، یعنی همین صفحه‌ی فعلیه (لینک نمی‌شه)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-4 px-2 md:px-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-text">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-text-main font-medium" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-muted-text/60">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
