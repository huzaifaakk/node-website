"use client";

import { useCartStore } from "@/store/cart";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function CartSidebar() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-espresso/80 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#FDFBF7] shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2C1E16]/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#2C1E16]" />
            <h2 className="font-serif text-2xl text-[#2C1E16]">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-[#2C1E16]/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#2C1E16]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#2C1E16]/50 gap-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-sans uppercase tracking-widest text-xs font-bold">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex flex-col gap-3 pb-6 border-b border-[#2C1E16]/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans font-bold text-[#2C1E16] text-lg">{item.product.name}</h3>
                    <p className="font-sans text-sm text-[#2C1E16]/60">Rs. {item.product.base_price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="text-[#2C1E16]/40 hover:text-[#B5532F] transition-colors text-sm uppercase tracking-widest font-bold"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-[#2C1E16]/20 rounded-md overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 bg-[#2C1E16]/5 hover:bg-[#2C1E16]/10 transition-colors text-[#2C1E16]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-1 font-sans font-bold text-[#2C1E16] text-sm">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 bg-[#2C1E16]/5 hover:bg-[#2C1E16]/10 transition-colors text-[#2C1E16]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-sans font-bold text-[#2C1E16]">
                    Rs. {item.product.base_price * item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#2C1E16]/10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans uppercase tracking-widest text-sm font-bold text-[#2C1E16]">Subtotal</span>
              <span className="font-serif text-2xl text-[#2C1E16]">Rs. {getTotal()}</span>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-[#B5532F] text-[#FDFBF7] font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#2C1E16] transition-colors rounded-sm shadow-xl"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Render the Checkout Modal when triggered */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
