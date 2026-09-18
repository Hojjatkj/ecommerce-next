"use client";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/supabase-client";
import { safeRedirectPath } from "@/lib/safeRedirect";

// ۱. این کامپوننت جداگانه برای بخشی که از useSearchParams استفاده می‌کنه
function AuthRequiredToast() {
  const searchParams = useSearchParams();
  const authRequiredToastShown = useRef(false);

  useEffect(() => {
    if (searchParams.get("reason") !== "auth-required") return;
    if (authRequiredToastShown.current) return;
    authRequiredToastShown.current = true;

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "info",
      title: "برای ادامه ابتدا وارد حساب کاربری شوید",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
    });
  }, [searchParams]);

  return null;
}

// ۲. فرم لاگین (فقط خودِ فیلد `next` را از searchParams می‌خونه)
function LoginForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();

  // مسیر برگشت رو فقط یک‌بار و از همون اول اعتبارسنجی می‌کنیم
  const nextPath = useMemo(
    () => safeRedirectPath(searchParams.get("next")),
    [searchParams]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("ایمیل یا رمز عبور اشتباهه");
      return;
    }

    router.push(nextPath);
    router.refresh();
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-sm p-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-text-main">
        ورود
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border border-border-main bg-card-bg px-4 py-2.5 text-sm text-card-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-border-main bg-card-bg px-4 py-2.5 pl-10 text-sm text-card-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-text-main"
            aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-brand-primary-fg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-text">
        حساب نداری؟{" "}
        <Link href="/auth/signup" className="text-brand-primary hover:underline">
          ثبت‌نام کن
        </Link>
      </p>
    </div>
  );
}

// ۳. کامپوننت اصلی که همه‌چیز رو با Suspense می‌پیچه
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mt-16 text-center">در حال بارگذاری...</div>}>
      <AuthRequiredToast />
      <LoginForm />
    </Suspense>
  );
}