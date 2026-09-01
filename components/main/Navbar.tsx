import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-[var(--primary)] m-2 p-3 sm:m-4 sm:p-4 text-xs sm:text-base md:text-lg dir-rtl whitespace-nowrap">
      {/* لوگو / برند */}
      <div className="shrink-0">
        <Link 
          href="/" 
          className="font-bold text-[var(--color-text-main)] hover:text-[var(--color-brand-primary)] transition-colors text-sm sm:text-base md:text-lg"
        >
          فروشگاه من
        </Link>
      </div>

      {/* لینک‌های ناوبری */}
      <div className="flex items-center gap-2.5 sm:gap-6 text-xs sm:text-sm md:text-base font-medium text-[var(--color-muted-text)]">
        <Link href="/" className="hover:text-[var(--color-brand-primary)] transition-colors">
          صفحه اصلی
        </Link>
        <Link href="/products" className="hover:text-[var(--color-brand-primary)] transition-colors">
          محصولات
        </Link>
        <Link href="/checkout" className="hover:text-[var(--color-brand-primary)] transition-colors">
          تسویه حساب
        </Link>
      </div>

      {/* بخش سمت چپ (در موبایل مخفی، در دسکتاپ برای حفظ تقارن) */}
      <div className="hidden sm:block w-10"></div>
    </nav>
  );
};

export default Navbar;