'use client';

import dynamic from "next/dynamic";
import { Product } from "@/types/type";

const Carousel = dynamic(
  () => import("@/components/main/carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
    loading: () => (
      <div className="h-112 w-full animate-pulse bg-muted-bg rounded-3xl flex items-center justify-center text-muted-text font-medium">
        در حال بارگذاری اسلایدر...
      </div>
    ),
  }
);

interface CarouselClientProps {
  products: Product[];
}

// این کامپوننت فقط یه مرز کلاینتیه، دیتا رو از سرور می‌گیره (props)
// و کاری به فچ کردن نداره — فقط مسئول لود دینامیک Swiper (که ssr:false لازم داره) هست
export default function CarouselClient({ products }: CarouselClientProps) {
  return (
    <div className="animate-fade-up w-3/4 m-auto">
      <Carousel products={products} />
    </div>
  );
}