import Cart from "@/components/cart/Card";
import OrderSummary from "@/components/cart/OrderSummary";





export default function CheckoutPage() {
    return (
        <div className="pr-6">
           <h3>حساب رسی</h3>
         <Cart/>
     <OrderSummary/>
        </div>
    );
}