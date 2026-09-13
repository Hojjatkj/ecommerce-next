import SpecialProducts from "@/components/ui/list/special-products";
import HeroSection from "@/components/main/HeroSection";
import { Section } from "@/components/layout/section";

export const revalidate = 60; // تنظیم زمان کش سروری

export default async function Home() {

  return (
    <main className="min-h-screen ">
      {/* ایمپورت سکشن جدا شده */}
      <HeroSection />
      <Section>
        <SpecialProducts />
      </Section>
    </main>
  );
}