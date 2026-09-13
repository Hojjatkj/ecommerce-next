import { Product } from "@/types/type";
import Image from "next/image";

const ProductImage = ({ product }: { product: Product }) => {
  const mainImage = [...product.product_images]
    .sort((a, b) => a.sort_order - b.sort_order)[0]?.url;

  return (
    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
      {mainImage ? (
        <Image
          unoptimized
          fill
          src={mainImage}
          alt={product.title}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          بدون تصویر
        </div>
      )}
    </div>
  );
};

export default ProductImage;