import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// این کلاینت برای Server Component ها، Route Handler ها و middleware استفاده می‌شه
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // اگه از داخل یه Server Component صدا زده بشه (نه Server Action/Route Handler)،
            // نمی‌شه cookie ست کرد. اگه middleware سشن رو رفرش می‌کنه، این خطا بی‌ضرره.
          }
        },
      },
    }
  );
}
