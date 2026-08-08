'use client';

import Link from "next/link";
import { Carousel } from "@/components/main/carousel";
import { Button } from "@/components/ui/button";
import SpecialProducts from "@/components/ui/list/special-products";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import Loading from "@/components/ui/Loading";

import { Section } from "@/components/layout/section";
import { HeroCard } from "@/components/ui/hero-card";

export default function Home() {
  const { products, loading } = useFilteredProducts({ categoryId: 2 });

  if (loading) return <Loading />;
  if (!products || products.length === 0) return <p>No products found</p>;

  const featured = products[0];
  
const featuredImage = [...featured.product_images]
  .sort((a, b) => a.sort_order - b.sort_order)[0]?.url;

  return (
    <main className="min-h-screen bg-slate-50/50">

      {/* بخش Hero همراه با افکت نور پس‌زمینه (variant="glow") */}
      <Section variant="glow">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            new series 2026
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Welcome to my <span className=" bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Ecommerce</span>
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

          {/* کامپوننت کارت فوق‌العاده شیک */}
          <HeroCard
            title={featured.title}
            price={featured.price}
            image={featuredImage}
          />

        </div>
      </Section>

      <Section className="py-8 md:py-12 max-w-6xl mx-auto">
        <Carousel products={products} />
      </Section>

      <Section>
        <SpecialProducts />
      </Section>

    </main>
  );
}