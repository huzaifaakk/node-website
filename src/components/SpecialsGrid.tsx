"use client";

import { useCartStore } from "@/store/cart";
import { Database } from "@/types/database.types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function SpecialsGrid({ products }: { products: Product[] }) {
  const { addItem } = useCartStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-16">
      {products?.map((product) => (
        <div 
          key={product.id} 
          onClick={() => addItem(product)}
          className="flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="w-full h-48 bg-white rounded-xl mb-6 border border-node-gray/10 shadow-sm group-hover:border-node-purple group-hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden relative">
            <span className="font-serif text-6xl text-node-purple/10 group-hover:text-node-purple/20 transition-colors group-hover:scale-110 duration-500">
              N.
            </span>
            <div className="absolute inset-0 bg-node-purple/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-sans font-bold text-white tracking-widest uppercase text-sm">
                Add to Cart
              </span>
            </div>
          </div>
          <h3 className="font-sans text-2xl font-medium text-node-dark group-hover:text-node-purple transition-colors mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-node-gray leading-relaxed max-w-xs">
            {product.description}
          </p>
          <span className="font-sans font-bold text-node-purple tracking-wider mt-4">
            Rs. {product.base_price}
          </span>
        </div>
      ))}
    </div>
  );
}
