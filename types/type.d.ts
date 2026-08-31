// types/product.ts

export interface Category {
  id: number;
  name: string;
}

export interface ProductImage {
  id: number;
  url: string;
  sort_order: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  discount_percent: number;
  category_id: number;
  description?: string;
  categories: Pick<Category, "name"> | null;
  product_images: ProductImage[];   // ← جای image: string
}

interface UseProductsOptions {
  onlyDiscounts?: boolean; // اگر true باشد فقط تخفیف‌دارها را می‌آورد
  categoryId?: number;     // برای فیلتر بر اساس یک دسته‌بندی خاص
}


interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductsListProps {
  products: Product[];
}