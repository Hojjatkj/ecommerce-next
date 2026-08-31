'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | 'gap')[] {
  const pages: (number | 'gap')[] = [];
  const range = 1; // چند صفحه قبل/بعد صفحه‌ی فعلی نشون داده بشه

  for (let i = 1; i <= total; i++) {
    const isEdge = i === 1 || i === total;
    const isNearCurrent = Math.abs(i - current) <= range;

    if (isEdge || isNearCurrent) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'gap') {
      pages.push('gap');
    }
  }
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  const btnBase =
    'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition-colors';

  return (
    <nav className="mt-8 flex items-center justify-center gap-1" dir="ltr">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-border-main text-text-main hover:bg-muted-bg disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="صفحه قبل"
      >
        ‹
      </button>

      {pages.map((p, idx) =>
        p === 'gap' ? (
          <span key={`gap-${idx}`} className="px-1 text-muted-text">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`${btnBase} ${
              p === currentPage
                ? 'bg-brand-primary text-brand-primary-fg font-medium'
                : 'text-text-main hover:bg-muted-bg'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-border-main text-text-main hover:bg-muted-bg disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="صفحه بعد"
      >
        ›
      </button>
    </nav>
  );
}
