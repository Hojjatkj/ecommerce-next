import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-[var(--color-border-main)] m-4 p-4 md:text-lg dir-rtl">
      <div>
        <Link href="/" className="font-bold text-[var(--color-text-main)] hover:text-[var(--color-brand-primary)] transition-colors">
          فروشگاه من
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm md:text-base font-medium text-[var(--color-muted-text)]">
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

      <div className="w-10"></div>
    </nav>
  );
};

export default Navbar;