import { Carousel } from "@/components/main/carousel";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import ProductsPage from "./products/page";
import SpecialProducts from "@/components/ui/special-products";

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(5);

  if (error) return <p>{error.message}</p>;

  if (!products || products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div
          className="
          grid 
          md:grid-cols-2 
          gap-12 
          items-center
          "
        >
          {/* Text */}
          <div className="space-y-6 text-center md:text-left">

            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              New Collection
            </span>

            <h1 className="
              text-4xl 
              md:text-6xl 
              font-bold 
              tracking-tight 
              text-gray-900
            ">
              Welcome to my Ecommerce
            </h1>
            <p className="
              text-lg 
              text-gray-600 
              max-w-lg
              mx-auto
              md:mx-0
            ">
              Discover the latest products at the best prices.
              Quality products with modern designs.
            </p>
            <Button
              render={<Link href="/products" />}
              variant="default"
              className="
                rounded-full
                px-8
                py-6
                text-base
              "
            >
              Browse All Products
            </Button>
          </div>
          {/* Product Image */}
          <div className="
            relative
            group
            overflow-hidden
            rounded-3xl
            shadow-2xl
            bg-white
          ">
            <Image
              unoptimized
              alt={products[0].title}
              width={600}
              height={600}
              src={products[0].image}
              className="
                h-[450px]
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />
            <div className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
            " />
            <div
              className="
              absolute
              bottom-6
              right-6
              text-white
              "
            >
              <h3 className="
                text-2xl
                font-bold
                drop-shadow-lg
              ">
                {products[0].title}
              </h3>

              <p className="
                mt-2
                text-xl
                font-semibold
              ">
                ${products[0].price}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Carousel */}
      <section className="
        container 
        mx-auto 
        px-6 
        pb-20
      ">
        <Carousel products={products} />
      </section>
      <SpecialProducts/>

    </main>
  );
}