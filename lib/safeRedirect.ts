/**
 * فقط مسیرهای داخلی رو قبول می‌کنه (fail-closed).
 * جلوی open redirect رو می‌گیره:
 *   //evil.com        → protocol-relative redirect به دامنه‌ی دیگه
 *   /\evil.com       → مرورگر \ رو مثل / می‌بینه
 *   https://evil.com → URL مطلق بیرونی
 *   %2F%2F...        → همون // ولی URL-encode شده
 *
 * این تابع هم در Server (auth/callback) و هم در Client (login) استفاده می‌شه،
 * پس هیچ وابستگی به next/headers یا browser API نداره.
 */
export function safeRedirectPath(rawNext: string | null | undefined, fallback = "/"): string {
  if (!rawNext) return fallback;

  let decoded: string;
  try {
    decoded = decodeURIComponent(rawNext).trim();
  } catch {
    // درصدهای نامعتبر توی URL
    return fallback;
  }

  // باید حتماً با یک اسلش تک شروع بشه؛ // یا /\ یا بک‌اسلش خالی رد می‌شن
  if (!decoded.startsWith("/")) return fallback;
  if (decoded.startsWith("//") || decoded.startsWith("/\\")) return fallback;

  // کاراکترهای کنترلی/گمراه‌کننده و URL مطلق
  if (/[\u0000-\u001f\u007f\\]/.test(decoded)) return fallback;
  if (decoded.includes(":")) return fallback;

  // مسیر traversal و مسیرهای یونیکد ناامن
  if (decoded.includes("..")) return fallback;

  return decoded;
}
