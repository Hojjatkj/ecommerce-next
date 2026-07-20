"use client";

import { Card } from "../ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
}

interface CarouselProps {
    products: Product[];
}

export const Carousel = ({ products }: CarouselProps) => {
    if (!products || products.length === 0) return null;

    return (
        // اصلاح کلاس غلط mx-w-auto به max-w-md برای عرض مناسب کارت
        <Card className="overflow-hidden bg-white max-w-md mx-auto shadow-lg rounded-xl">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                    type: "progressbar"
                }}

                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="w-full relative"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={product.id} className="flex flex-col h-[450px]">
                        {/* بخش بالایی: تصویر و متن‌های روی آن */}
                        <div className="relative h-80 w-full bg-gray-900 overflow-hidden group">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="object-cover w-full h-full brightness-75 transition-transform duration-700 group-hover:scale-105"
                                loading={index === 0 ? "eager" : "lazy"}
                            />

                            {/* لایه گرادینت تاریک برای خوانایی بهتر متن‌های سفید وسط عکس */}
                            <div className="absolute inset-0  from-black/60 via-black/20 to-transparent" />

                            {/* محتوای متنی کاملاً وسط‌چین شده روی عکس */}
                            <div className="absolute inset-0 flex flex-col items-start justify-center p-8 text-center text-white space-y-2">
                                <h2 className="text-2xl font-black drop-shadow-md line-clamp-1">
                                    {product.title}
                                </h2>
                                <p className="text-gray-200 text-sm max-w-xs drop-shadow-sm line-clamp-2 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* بخش پایینی: قیمت که همیشه پایین کارت ثابت می‌ماند */}
                        <div className="flex-1 flex items-center justify-between p-3 bg-white border-t border-gray-100">
                            <span className="text-gray-500 font-medium text-sm">قیمت محصول:</span>
                            <div className="flex items-center  gap-1" dir="ltr">
                                <span className="text-3xl font-extrabold text-green-600">
                                    <span className="text-2xl font-bold text-green-700 mt-1">$</span>
                                    {product.price?.toLocaleString('eng', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2
                                    })}
                                </span>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Card>
    );
};