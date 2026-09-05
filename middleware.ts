import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/supabase-middleware-helper";


export async function middleware(request: NextRequest) {
  const { supabaseResponse } = await updateSession(request);
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * این middleware روی همه‌ی مسیرها اجرا می‌شه به‌جز:
     * فایل‌های استاتیک (تصاویر، فونت و...) که نیازی به sync سشن ندارن
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
