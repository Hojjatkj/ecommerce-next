'use client';

import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from 'react';

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'discount';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;

  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;

  priceRange: [number, number] | null;
  priceBounds: {
    min: number;
    max: number;
  };
  onPriceChange: (range: [number, number] | null) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  newest: 'جدیدترین',
  'price-asc': 'ارزان‌ترین',
  'price-desc': 'گران‌ترین',
  discount: 'بیشترین تخفیف',
};

const SORT_OPTIONS: SortOption[] = [
  'newest',
  'price-asc',
  'price-desc',
  'discount',
];

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  priceBounds,
  onPriceChange,
}: ProductFiltersProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const itemClass = (active: boolean) =>
    `
      block
      w-full
      rounded-lg
      px-3
      py-2.5
      text-right
      text-sm
      transition-colors
      whitespace-nowrap
      overflow-hidden
      text-ellipsis
      ${
        active
          ? 'bg-brand-primary/10 font-medium text-brand-primary'
          : 'text-text-main hover:bg-muted-bg'
      }
    `;

  const hasFilters =
    selectedCategory !== 'all' ||
    sortBy !== 'newest' ||
    priceRange !== null;

  return (
    <div
      ref={panelRef}
      className="relative w-full sm:w-auto"
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex
          w-full
          sm:w-auto
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-border-main
          bg-card-bg
          px-3
          py-2.5
          text-sm
          text-card-text
          shadow-sm
          transition-colors
          hover:bg-muted-bg
          sm:px-4
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="shrink-0"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>

        <span className="whitespace-nowrap">
          فیلتر و مرتب‌سازی
        </span>

        {hasFilters && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="
            absolute
            left-0
            top-full
            z-50
            mt-2

            w-[calc(100vw-2rem)]
            max-w-sm

            sm:w-80
            md:w-96

            max-h-[calc(100vh-7rem)]

            overflow-y-auto
            overscroll-contain

            rounded-2xl
            border
            border-border-main
            bg-card-bg
            p-4
            shadow-xl

            scrollbar-thin
          "
        >
          {/* =========================
              دسته‌بندی
          ========================== */}
          <section className="mb-5">
            <h3 className="mb-2 text-xs font-semibold text-muted-text">
              دسته‌بندی
            </h3>

            <div
              className="
                max-h-44
                overflow-y-auto
                overscroll-contain
                pr-1
                space-y-1
              "
            >
              <button
                type="button"
                onClick={() => onCategoryChange('all')}
                className={itemClass(
                  selectedCategory === 'all'
                )}
              >
                همه دسته‌ها
              </button>

              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={itemClass(
                    selectedCategory === cat
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* =========================
              بازه قیمت
          ========================== */}
          <section className="mb-5">
            <h3 className="mb-4 text-xs font-semibold text-muted-text">
              بازه‌ی قیمت
            </h3>

            <div className="px-2">
              <Slider
                min={priceBounds.min}
                max={priceBounds.max}
                step={1000}
                value={
                  priceRange ?? [
                    priceBounds.min,
                    priceBounds.max,
                  ]
                }
                onValueChange={(val) =>
                  onPriceChange(
                    val as [number, number]
                  )
                }
              />
            </div>

            {/* Price labels */}
            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-3
                text-xs
                text-muted-text
              "
            >
              <div
                className="
                  min-w-0
                  rounded-lg
                  bg-muted-bg
                  px-2
                  py-2
                  text-center
                "
              >
                <span className="block truncate">
                  {(priceRange?.[0] ?? priceBounds.min)
                    .toLocaleString("fa-IR")}
                </span>

                <span className="mt-0.5 block text-[10px]">
                  تومان
                </span>
              </div>

              <div
                className="
                  min-w-0
                  rounded-lg
                  bg-muted-bg
                  px-2
                  py-2
                  text-center
                "
              >
                <span className="block truncate">
                  {(priceRange?.[1] ?? priceBounds.max)
                    .toLocaleString("fa-IR")}
                </span>

                <span className="mt-0.5 block text-[10px]">
                  تومان
                </span>
              </div>
            </div>
          </section>

          <div className="mb-4 border-t border-border-main" />

          {/* =========================
              مرتب‌سازی
          ========================== */}
          <section>
            <h3 className="mb-2 text-xs font-semibold text-muted-text">
              مرتب‌سازی
            </h3>

            <div className="space-y-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => onSortChange(option)}
                  className={itemClass(
                    sortBy === option
                  )}
                >
                  {SORT_LABELS[option]}
                </button>
              ))}
            </div>
          </section>

          {/* =========================
              حذف فیلترها
          ========================== */}
          {hasFilters && (
            <>
              <div className="my-4 border-t border-border-main" />

              <button
                type="button"
                onClick={() => {
                  onCategoryChange('all');
                  onSortChange('newest');
                  onPriceChange(null);
                }}
                className="
                  w-full
                  rounded-lg
                  px-3
                  py-2.5
                  text-center
                  text-sm
                  text-red-500
                  transition-colors
                  hover:bg-red-50
                  dark:hover:bg-red-500/10
                "
              >
                حذف فیلترها
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}