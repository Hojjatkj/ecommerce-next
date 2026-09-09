'use client';

import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/supabase-client';
import { House, ShoppingBag, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between rounded-xl m-2 p-3 sm:m-4 sm:p-4 text-xs sm:text-base md:text-lg dir-rtl whitespace-nowrap border-b border-border-main bg-card-bg/60">
      {/* لوگو / برند */}
      <div className="shrink-0">
        <Link
          href="/"
          className="font-bold text-text-main hover:text-brand-primary transition-colors text-sm sm:text-base md:text-lg"
        >
          فروشگاه من
        </Link>
      </div>

      {/* لینک‌های ناوبری */}
      <div className="flex flex-col  sm:flex-row items-start justify-center gap-3 sm:gap-6 text-sm md:text-base font-medium text-muted-text">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-brand-primary transition-colors"
        >
          <House size={15} />
          صفحه اصلی
        </Link>

        <Link
          href="/products"
          className="flex items-center gap-1 hover:text-brand-primary transition-colors"
        >
          <ShoppingBag size={15} />
          محصولات
        </Link>

        <Link
          href="/checkout"
          className="flex items-center gap-1 hover:text-brand-primary transition-colors"
        >
          <ShoppingCart size={15} />
          تسویه حساب
        </Link>
      </div>
      {/* بخش حساب کاربری */}
      <div className="shrink-0">
        {loading ? (
          <div className="h-4 w-12 animate-pulse rounded bg-muted-bg" />
        ) : user ? (
          <button
            onClick={handleLogout}
            className="text-sm lg:text-md text-(--muted) w-15 p-2 rounded-2xl text-center bg-(--primary) hover:bg-(--primary-hover) hover:shadow-md transition-colors"
          >
            خروج
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm text-muted-text hover:text-brand-primary transition-colors"
          >
            ورود
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;