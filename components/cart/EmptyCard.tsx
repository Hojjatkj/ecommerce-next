import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 >سبد خرید شما خالی است</h2>
 <Image width={95} height={95} src="/empty-box.png" alt="سبد خرید خالی"  className=""/>
      <p>
        هنوز محصولی به سبد خرید اضافه نکرده‌اید.
      </p>

      <Link href="/products" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary-fg bg-brand-primary rounded-lg hover:bg-brand-primary-hover transition-colors">
        مشاهده محصولات
      < ShoppingBag className="w-6 h-6" />
      </Link>
    </div>
  );
}