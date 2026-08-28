"use client";

import { Card } from "../ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from "@/types/type";
import Image from "next/image";

interface CarouselProps {
  products: Product[];
}

export const Carousel = ({ products }: CarouselProps) => {
  if (!products || products.length === 0) return null;

  return (
    <Card className="overflow-hidden h-full mx-auto shadow-2xl rounded-3xl border-0 bg-[var(--color-card-bg)]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ type: "progressbar" }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full relative"
      >
        {products.map((product, index) => {
          const mainImage = [...product.product_images]
            .sort((a, b) => a.sort_order - b.sort_order)[0]?.url;

          return (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col md:flex-row-reverse w-full p-4 md:p-6 h-auto md:h-112 items-center gap-6" dir="rtl">
                
                {/* بخش تصویر */}
                <div className="relative w-full md:w-1/2 h-64 md:h-full rounded-2xl overflow-hidden group shrink-0 bg-slate-100 dark:bg-slate-800">
                  {mainImage && (
                    <Image
                      src={mainImage}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-2xl"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  )}
                </div>

                {/* بخش محتوا */}
                <div className="w-full md:w-1/2 flex flex-col justify-between h-full py-2">
                  <div className="space-y-4">
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]">
                      پیشنهاد ویژه
                    </span>
                    <h2 className="text-xl md:text-3xl font-extrabold text-[var(--color-text-main)] line-clamp-2 leading-tight">
                      {product.title}
                    </h2>
                    <p className="text-[var(--color-muted-text)] text-sm md:text-base leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* قیمت */}
                  <div className="pt-4 mt-6 border-t border-[var(--color-border-main)] flex items-center justify-between">
                    <span className="text-[var(--color-muted-text)] text-xs md:text-sm font-medium">قیمت محصول:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-black text-[var(--color-brand-primary)]">
                        {product.price?.toLocaleString("fa-IR")}
                        <span className="text-sm font-bold ml-1"> تومان</span>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Card>
  );
};