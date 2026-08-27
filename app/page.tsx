import SpecialProducts from "@/components/ui/list/special-products";

import HeroSection from "@/components/main/HeroSection";

import { supabase } from "@/lib/supabase";
import { PRODUCT_SELECT_QUERY } from "@/lib/queries";
import { Product } from "@/types/type";
import { Section } from "@/components/layout/section";

export const revalidate = 60; // تنظیم زمان کش سروری

export default async function Home() {
  const { data } = await supabase
    .from('products')
    .select(PRODUCT_SELECT_QUERY)
    .eq('category_id', 2)
    .order('id', { ascending: false });

  const products = (data ?? []) as unknown as Product[];

  return (
    <main className="min-h-screen ">
      {/* ایمپورت سکشن جدا شده */}
        <HeroSection products={products} />
      <Section>
        <SpecialProducts />
      </Section>
    </main>
  );
}