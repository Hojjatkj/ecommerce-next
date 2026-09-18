import { createClient } from "@/lib/supabase/supabase-server";
import { NextResponse } from "next/server";
import { safeRedirectPath } from "@/lib/safeRedirect";

// وقتی کاربر رو لینک تأیید ایمیل (یا بعد OAuth) کلیک می‌کنه، میاد اینجا
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  return NextResponse.redirect(new URL("/auth/login?error=auth", origin));
}
