import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { HeroCard } from "@/components/ui/hero-card";
import { Product } from "@/types/type";
import { supabase } from "@/lib/supabase";
import { PRODUCT_SELECT_QUERY } from "@/lib/queries";
import CarouselClient from "./CarouselClient";


// این کامپوننت خودش Server Component ه و خودش مسئول فچ دیتای خودشه —
// page.tsx دیگه نیازی نیست بدونه کاروسل به چه محصولاتی نیاز داره
export default async function HeroSection() {
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT_QUERY)
.eq("category_id", 1)   // موبایل‌ها
.order("discount_percent", { ascending: false, nullsFirst: false })   // بیشترین تخفیف اول

  const products = (data ?? []) as unknown as Product[];
  const featured = products[0];
  const featuredImage = featured?.product_images
    ? [...featured.product_images].sort((a, b) => a.sort_order - b.sort_order)[0]?.url
    : undefined;

  return (
    <>
      <Section variant="glow">
        <div className="grid md:grid-cols-2 gap-12 items-center dir-rtl">
          <div className="space-y-6 text-right">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold text-brand-primary border border-brand-primary/20">
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              سری جدید ۲۰۲۶
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-tight">
              به فروشگاه اینترنتی من <span className="bg-linear-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">خوش آمدید</span>
            </h1>

            <p className="text-lg text-muted-text max-w-lg leading-relaxed">
              جدیدترین محصولات را با بهترین قیمت‌ها کشف کنید. محصولات باکیفیت با طراحی مدرن.
            </p>

            <Button
              render={<Link href="/products" />}
              variant="default"
              className="rounded-full px-8 py-6 text-base bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-fg shadow-lg shadow-brand-primary/20 transition-all hover:scale-105"
            >
              مشاهده همه محصولات
            </Button>
          </div>

          {featured && (
            <HeroCard
              title={featured.title}
              price={featured.price}
              image={featuredImage}
            />
          )}
        </div>

      </Section>
      <Section className="w-3/4 mx-auto shadow-xl bg-bg-main/50 backdrop-blur-md">
        <CarouselClient products={products} />
      </Section>
    </>
  );
}