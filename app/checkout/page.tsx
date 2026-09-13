import Cart from "@/components/cart/Card";
import OrderSummary from "@/components/cart/OrderSummary";





export default function CheckoutPage() {
    return (
        <div className="p-5">
            <h3 className="pr-10">حساب رسی</h3>
            <div className="flex flex-row md:fleex-col">
            <Cart />
            <OrderSummary />
            </div>
        </div>
    );
}