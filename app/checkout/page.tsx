import Cart from "@/components/cartCheckout/Card";
import CheckoutForm from "@/components/cartCheckout/CheckoutForm";
import OrderSummary from "@/components/cartCheckout/OrderSummary";





export default function CheckoutPage() {
    return (
        <div className="p-3 pb-32 lg:p-4 lg:pb-6">
            <h3 className="pr-10 mb-2 text-lg">حساب رسی</h3>
            <div className="flex flex-col justify-around lg:flex-row lg:items-start gap-3">
                <Cart />
                <div className="flex flex-col items-center justify-center gap-4 left-9 bottom-3">

                    <OrderSummary />
                    <CheckoutForm />
                </div>
            </div>
        </div>
    );
}