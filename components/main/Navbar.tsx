'use client';

import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/supabase-client';

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

      {/* بخش حساب کاربری */}
      <div className="shrink-0">
        {loading ? (
          <div className="h-4 w-12 animate-pulse rounded bg-muted-bg" />
        ) : user ? (
          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm text-[var(--color-muted-text)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            خروج
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm text-[var(--color-muted-text)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            ورود
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;