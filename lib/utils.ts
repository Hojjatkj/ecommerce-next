import { Product } from "@/types/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryName(product: Product): string {
  return product.categories?.name ?? "بدون نام";
}