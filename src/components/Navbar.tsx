"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 text-cream bg-espresso/80 backdrop-blur-md border-b border-cream/10 transition-all">
      <Link href="/" className="font-serif text-3xl font-bold tracking-tighter">
        Node.
      </Link>
      <div className="flex items-center gap-8 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
        <Link href="/menu" className="hover:text-terracotta transition-colors">
          Menu
        </Link>
        <button 
          onClick={toggleCart}
          className="hover:text-terracotta transition-colors flex items-center gap-1"
        >
          Cart ({itemCount})
        </button>
      </div>
    </nav>
  );
}
