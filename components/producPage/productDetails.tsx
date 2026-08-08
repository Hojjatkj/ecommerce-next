"use client"

import { productToCartItem } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/type"
import Image from "next/image";
import { useState } from "react";

const ProductDetail = ({ product }: { product: Product }) => {

  const sortedImages = [...product.product_images].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const [selectedImage, setSelectedImage] = useState(
    sortedImages[0]?.url || ''
  );

  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
          )}
            </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {sortedImages.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className={`relative w-30 h-30 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img.url
                  ? 'border-blue-600 opacity-100 scale-95'
                  : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image
                  src={img.url}
                  alt={`${product.title}-${img.sort_order}`}
                  fill
                  className="object-cover ii" 
                  unoptimized />
              </button>
            ))}
          </div>
      </div>
      {/* بخش اطلاعات محصول */}
      <div className="flex flex-col justify-start gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

        <p className="text-xl font-semibold text-emerald-600">
          {product.price.toLocaleString()} تومان
        </p>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
    

<button onClick={() => addItem(productToCartItem(product))}>
  افزودن به سبد
</button>
      </div>
    </div>
  )
}
export default ProductDetail