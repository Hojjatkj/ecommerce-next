// 'use client';

// import useFilteredProducts from "@/hooks/useFilteredProducts";
// import { Carousel } from "@/components/main/carousel";
// import Loading from "@/components/ui/Loading";
// import { Product } from "@/types/type";

// interface HomeProductsProps {
//   initialProducts: Product[];
// }

// export default function HomeProducts({ initialProducts }: HomeProductsProps) {
//   // هوک تو اینجاست! دیتای سرور رو می‌گیره و کش رو پر می‌کنه
//   const { products, loading, error } = useFilteredProducts({ 
//     categoryId: 2, 
//     initialData: initialProducts 
//   });

//   if (loading) return <Loading />;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!products || products.length === 0) return <p>No products found</p>;

//   return <Carousel products={products} />;
// }