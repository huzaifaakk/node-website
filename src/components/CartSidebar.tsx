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
          className="fixed inset-0 bg-node-dark/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-node-gray/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-node-dark" />
            <h2 className="font-serif text-2xl text-node-dark">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-node-light rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-node-dark" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-node-gray gap-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-sans uppercase tracking-widest text-xs font-bold">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex flex-col gap-3 pb-6 border-b border-node-gray/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans font-bold text-node-dark text-lg">{item.product.name}</h3>
                    <p className="font-sans text-sm text-node-gray">Rs. {item.product.base_price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="text-node-gray hover:text-node-purple transition-colors text-sm uppercase tracking-widest font-bold"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-node-gray/20 rounded-md overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 bg-node-light hover:bg-node-gray/10 transition-colors text-node-dark"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-1 font-sans font-bold text-node-dark text-sm">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 bg-node-light hover:bg-node-gray/10 transition-colors text-node-dark"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-sans font-bold text-node-purple">
                    Rs. {item.product.base_price * item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-node-light border-t border-node-gray/10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans uppercase tracking-widest text-sm font-bold text-node-gray">Subtotal</span>
              <span className="font-serif text-2xl text-node-dark">Rs. {getTotal()}</span>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-node-purple text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-node-dark transition-colors rounded-xl shadow-xl shadow-node-purple/20"
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
