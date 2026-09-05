'use client';

import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from 'react';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'discount';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  priceRange: [number, number] | null;
  priceBounds: { min: number; max: number };
  onPriceChange: (range: [number, number] | null) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  newest: 'جدیدترین',
  'price-asc': 'ارزان‌ترین',
  'price-desc': 'گران‌ترین',
  discount: 'بیشترین تخفیف',
};

const SORT_OPTIONS: SortOption[] = ['newest', 'price-asc', 'price-desc', 'discount'];

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

  // بستن منو با کلیک بیرون از پنل
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const itemClass = (active: boolean) =>
    `block w-full rounded-lg px-3 py-2 text-right text-sm transition-colors ${active
      ? 'bg-brand-primary/10 font-medium text-brand-primary'
      : 'text-text-main hover:bg-muted-bg'
    }`;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-border-main bg-card-bg px-4 py-2.5 text-sm text-card-text shadow-sm transition-colors hover:bg-muted-bg"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
        <span>فیلتر و مرتب‌سازی</span>
        {(selectedCategory !== 'all' || sortBy !== 'newest' || priceRange) && (
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
        )}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 max-w-[85vw] rounded-2xl border border-border-main bg-card-bg p-4 shadow-xl">
          {/* دسته‌بندی */}
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold text-muted-text">دسته‌بندی</h3>
            <div className="max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => onCategoryChange('all')}
                className={itemClass(selectedCategory === 'all')}
              >
                همه دسته‌ها
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={itemClass(selectedCategory === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold text-muted-text p-2">بازه‌ی قیمت</h3>
            <Slider
              min={priceBounds.min}
              max={priceBounds.max}
              step={1000}
              value={priceRange ?? [priceBounds.min, priceBounds.max]}
              onValueChange={(val) => onPriceChange(val as [number, number])}
            />

            <div className="flex justify-between text-xs text-muted-text m-3">
              <span>{(priceRange?.[0] ?? priceBounds.min).toLocaleString("fa-IR")} تومان</span>
              <span>{(priceRange?.[1] ?? priceBounds.max).toLocaleString("fa-IR")} تومان</span>
            </div>
          </div>

          <div className="mb-3 border-t border-border-main" />

          {/* مرتب‌سازی */}
          <div>
            <h3 className="mb-2 text-xs font-semibold text-muted-text">مرتب‌سازی</h3>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => onSortChange(option)}
                className={itemClass(sortBy === option)}
              >
                {SORT_LABELS[option]}
              </button>
            ))}
          </div>


          {(selectedCategory !== 'all' || sortBy !== 'newest') && (
            <>
              <div className="my-3 border-t border-border-main" />
              <button
                onClick={() => {
                  onCategoryChange('all');
                  onSortChange('newest');
                  onPriceChange(null);
                }}
                className="w-full rounded-lg px-3 py-2 text-center text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
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
