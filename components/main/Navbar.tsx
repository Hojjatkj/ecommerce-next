import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-(--primary) m-4 p-4 md:text-lg dir-rtl">
      <div>
        <Link href="/" className="font-bold text-(--color-text-main) hover:text-(--color-brand-primary) transition-colors">
          فروشگاه من
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm md:text-base font-medium text-(--color-muted-text)">
        <Link href="/" className="hover:text-(--color-brand-primary) transition-colors">
          صفحه اصلی
        </Link>
        <Link href="/products" className="hover:text-(--color-brand-primary) transition-colors">
          محصولات
        </Link>
        <Link href="/checkout" className="hover:text-(--color-brand-primary) transition-colors">
          تسویه حساب
        </Link>
      </div>

      <div className="w-10"></div>
    </nav>
  );
};

export default Navbar;