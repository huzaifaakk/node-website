"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { useCartStore } from "@/store/cart";
import { createOrder } from "@/app/actions/order";
import { ArrowLeft, CheckCircle } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const orderType = searchParams.get("type");
  const branch = searchParams.get("branch");
  const area = searchParams.get("area");
  
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const clearCart = useCartStore((state) => state.clearCart);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // If accessed directly without cart items or modal context
  if (!orderType || !branch || items.length === 0) {
    if (!isSuccess) {
      return (
        <div className="min-h-screen bg-espresso text-cream flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-4">Your cart is empty.</h1>
            <button onClick={() => router.push("/menu")} className="text-terracotta underline hover:text-cream">Return to Menu</button>
          </div>
        </div>
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const customerName = formData.get("customer_name") as string;
    const phone = formData.get("phone") as string;
    const addressInput = formData.get("address") as string;
    
    const fullAddress = orderType === "Delivery" && area 
      ? `${addressInput}, ${area}, Karachi` 
      : addressInput || "Store Pickup";

    try {
      const orderItemsData = items.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.base_price,
        line_total: item.quantity * item.product.base_price
      }));
      
      // Update the server action to accept customerName, phone, address, and paymentMethod
      await createOrder(orderType as string, branch as string, total, orderItemsData, customerName, phone, fullAddress, paymentMethod);
      
      clearCart();
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-espresso text-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-cream/5 border border-cream/10 rounded-2xl p-12 text-center flex flex-col items-center gap-6">
          <CheckCircle className="w-16 h-16 text-green-400" />
          <h1 className="font-serif text-4xl text-latte">Order Confirmed</h1>
          <p className="text-cream/70 font-sans">
            Thank you for your order! We are preparing your {orderType} at our {branch} branch.
          </p>
          <button 
            onClick={() => router.push("/")}
            className="mt-4 px-8 py-4 bg-terracotta text-cream text-xs font-bold uppercase tracking-widest hover:bg-cream hover:text-espresso transition-colors rounded-sm"
          >
            Return Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-espresso text-cream pt-32 pb-24 px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
      
      {/* Checkout Form */}
      <div className="flex-1 flex flex-col gap-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-cream/50 hover:text-terracotta transition-colors text-sm font-sans w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
        
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-latte mb-2">Checkout</h1>
          <p className="text-cream/60">Complete your {orderType} order for {branch}.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-cream/5 border border-cream/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/70 ml-1">Full Name</label>
            <input required name="customer_name" className="p-4 bg-espresso/50 border border-cream/10 rounded-xl focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all text-cream placeholder-cream/30" placeholder="John Doe" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/70 ml-1">Phone Number</label>
            <input required type="tel" name="phone" className="p-4 bg-espresso/50 border border-cream/10 rounded-xl focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all text-cream placeholder-cream/30" placeholder="0300 1234567" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/70 ml-1">
              {orderType === "Delivery" ? `Delivery Address (${area})` : orderType === "Car hop" ? "Car Details (Color/Make/Plate)" : "Pickup Note (Optional)"}
            </label>
            <textarea required={orderType !== "Pick-Up"} name="address" className="p-4 bg-espresso/50 border border-cream/10 rounded-xl focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all text-cream placeholder-cream/30 h-24 resize-none" placeholder={orderType === "Delivery" ? "Street address, Apartment, exact building..." : ""} />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/70 ml-1">Payment Method</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-xl border flex flex-col items-start gap-1 transition-all ${paymentMethod === "cod" ? "bg-terracotta/20 border-terracotta text-cream" : "bg-espresso/50 border-cream/10 text-cream/60 hover:border-cream/30"}`}
              >
                <span className="font-bold text-sm">Cash on Delivery</span>
                <span className="text-xs opacity-70">Pay when you receive it</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border flex flex-col items-start gap-1 transition-all ${paymentMethod === "card" ? "bg-terracotta/20 border-terracotta text-cream" : "bg-espresso/50 border-cream/10 text-cream/60 hover:border-cream/30"}`}
              >
                <div className="flex justify-between w-full">
                  <span className="font-bold text-sm">Credit / Debit Card</span>
                  {paymentMethod === "card" && <span className="text-[10px] bg-terracotta px-2 py-0.5 rounded-full text-cream">Selected</span>}
                </div>
                <span className="text-xs opacity-70">Pay securely online</span>
              </button>
            </div>
            {paymentMethod === "card" && (
              <p className="text-xs text-terracotta mt-2 ml-1 italic">
                * Note: Card payments are in sandbox mode. You will not be charged.
              </p>
            )}
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full mt-6 py-5 bg-terracotta text-cream font-sans uppercase tracking-[0.25em] text-xs font-bold hover:bg-cream hover:text-espresso transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(181,83,47,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : `Place Order • Rs. ${total}`}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        <h2 className="font-serif text-2xl text-latte border-b border-cream/10 pb-4">Order Summary</h2>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center text-sm font-sans">
              <span className="text-cream/80"><span className="text-terracotta font-bold">{item.quantity}x</span> {item.product.name}</span>
              <span className="font-bold">Rs. {item.quantity * item.product.base_price}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-cream/10 flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span className="text-terracotta">Rs. {total}</span>
        </div>
      </div>
      
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-espresso flex items-center justify-center text-cream">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
