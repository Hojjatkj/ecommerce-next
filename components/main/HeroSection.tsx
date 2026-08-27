'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { HeroCard } from "@/components/ui/hero-card";
import { Product } from "@/types/type";
import dynamic from "next/dynamic";
import Image from "next/image";

const Carousel = dynamic(
  ()=>import("@/components/main/carousel").then((mod)=> mod.Carousel),
  {
    ssr:false,
    loading:()=>(
      <div className="h-64 w-full animate-pulse bg-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400">
        در حال بارگذاری اسلایدر...

      </div>
    )
  }
)

interface HeroSectionProps {
  products: Product[];
}

export default function HeroSection({ products }: HeroSectionProps) {
  const featured = products[0];
  const featuredImage = featured?.product_images
    ? [...featured.product_images].sort((a, b) => a.sort_order - b.sort_order)[0]?.url
    : undefined;

  return (
    <>
      {/* بخش Hero همراه با کارت محصول ویژه */}
      <Section variant="glow">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              new series 2026
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Welcome to my <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Ecommerce</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Discover the latest products at the best prices. Quality products with modern designs.
            </p>

            <Button
              render={<Link href="/products" />}
              variant="default"
              className="rounded-full px-8 py-6 text-base bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all hover:scale-105"
            >
              Browse All Products
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

      {/* بخش کاروسل محصولات */}
      <Section className="bg-[#009966] w-full mx-auto">
        <Carousel products={products} />
      </Section>
    </>
  );
}