"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/supabase-client";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.includes("already registered")
          ? "این ایمیل قبلاً ثبت شده"
          : "مشکلی پیش اومد، دوباره امتحان کن"
      );
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto mt-16 w-full max-w-sm p-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-text-main">
          یه قدم مونده!
        </h1>
        <p className="text-sm text-muted-text">
          یه ایمیل تأیید برات فرستادیم. برای فعال شدن حسابت، رو لینک داخلش
          کلیک کن.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-sm p-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-text-main">
        ثبت‌نام
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
        <input
          type="password"
          placeholder="رمز عبور (حداقل ۶ کاراکتر)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="rounded-xl border border-border-main bg-card-bg px-4 py-2.5 text-sm text-card-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-brand-primary-fg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-text">
        قبلاً ثبت‌نام کردی؟{" "}
        <Link href="/auth/login" className="text-brand-primary hover:underline">
          وارد شو
        </Link>
      </p>
    </div>
  );
}
