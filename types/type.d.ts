// types/product.ts

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  discount_percent: number;
  final_price: number; // قیمت محاسبه‌شده پس از تخفیف
  image: string;
  category_id: number;
  description?: string;
  categories: Pick<Category, "name"> | null; // فقط فیلد name
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