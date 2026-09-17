import Cart from "@/components/cartCheckout/Card";
import CheckoutForm from "@/components/cartCheckout/CheckoutForm";
import OrderSummary from "@/components/cartCheckout/OrderSummary";





export default function CheckoutPage() {
    return (
        <div className="p-5 pb-40 lg:pb-5">
            <h3 className="pr-10">حساب رسی</h3>
            <div className="flex flex-col justify-around lg:flex-row gap-4">
            <Cart />
               <div className="flex flex-col items-center justify-center gap-4 left-9 bottom-3">
      
            <OrderSummary /> 
                 <CheckoutForm/>
            </div>
            </div>
        </div>
    );
}