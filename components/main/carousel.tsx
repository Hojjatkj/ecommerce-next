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
    <Card className="overflow-hidden bg-white max-w-4xl mx-auto shadow-lg rounded-2xl border border-gray-100">
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
      {/* 
        تغییر اصلی: 
        در سایز کوچک: flex-col (عکس بالا، متن و قیمت پایین)
        در سایز md به بالا: flex-row-reverse (عکس سمت چپ/راست و متن کنارش)
      */}
      <div className="flex flex-col md:flex-row-reverse w-full p-3 h-auto md:h-96" dir="rtl">
        
        {/* بخش تصویر: در دسکتاپ فقط نیمی از عرض را می‌گیرد تا زشت و بزرگ نشود */}
        <div className="relative w-full md:w-2/3 h-64 md:h-full rounded-2xl bg-transparent overflow-hidden group shrink-0">
          {mainImage && (
            <Image
              src={mainImage}
              alt={product.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
              loading={index === 0 ? "eager" : "lazy"}
            />
          )}
        </div>

        {/* بخش محتوا (عنوان، توضیحات و قیمت): در دسکتاپ کنار عکس قرار می‌گیرد */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white">
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
              {product.description}
            </p>
          </div>

          {/* بخش قیمت که همیشه در پایین ترین قسمت باکس متن می‌ماند */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-gray-400 text-xs md:text-sm">قیمت:</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-green-600">
                <span className="text-lg font-bold text-green-700 ml-1">$</span>
                {product.price?.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
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