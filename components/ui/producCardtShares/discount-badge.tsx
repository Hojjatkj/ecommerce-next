export function DiscountBadge({ percent }: { percent: number }) {
  return (
    <span className="absolute top-3  right-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-red-500/30">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5 animate-pulse"
      >
        <path d="M12 2c1 3-1 4-1 6 0 1.5 1 2.5 2 2.5.8 0 1.5-.6 1.5-1.5 0-.5-.2-1-.5-1.3C15.5 9 17 11 17 13.5 17 18 14 21 12 21s-5-3-5-7.5C7 9.5 9.5 7 10 4c.3-1 .8-1.5 2-2z" />
      </svg>
      {percent}٪
    </span>
  );
}