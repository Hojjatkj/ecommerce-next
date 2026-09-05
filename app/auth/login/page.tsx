"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);

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

    router.push("/");
    router.refresh(); // برای این‌که Navbar و بقیه‌ی Server Component ها وضعیت جدید کاربر رو ببینن
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
              // آیکون چشم بسته (وقتی رمز نمایش داده می‌شه)
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // آیکون چشم باز (وقتی رمز پنهانه)
              <svg  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
