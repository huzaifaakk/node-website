"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 text-text-main bg-card backdrop-blur-md border-b border-node-gray/10 transition-all shadow-sm">
      <Link href="/" className="font-serif text-3xl font-bold tracking-tighter">
        Node.
      </Link>
      <div className="flex items-center gap-8 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-node-gray">
        <Link href="/menu" className="hover:text-node-purple transition-colors">
          Menu
        </Link>
        <ThemeToggle />
        <button 
          onClick={toggleCart}
          className="hover:text-node-purple transition-colors flex items-center gap-1"
        >
          Cart ({itemCount})
        </button>
      </div>
    </nav>
  );
}
