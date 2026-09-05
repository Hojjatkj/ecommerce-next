import { createBrowserClient } from "@supabase/ssr";

// این کلاینت برای کامپوننت‌های کلاینتی ('use client') استفاده می‌شه
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
