"use client";

import { useCartStore } from "@/store/cart";
import { Plus } from "lucide-react";
import { Database } from "@/types/database.types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  return (
    <div 
      className="flex flex-col gap-4 group cursor-pointer bg-white p-6 rounded-2xl border border-node-gray/10 shadow-sm hover:shadow-md transition-all duration-300"
      onClick={() => addItem(product)}
    >
      {product.image_path && (
        <div className="w-full h-48 sm:h-64 overflow-hidden rounded-xl bg-node-light mb-2">
          <img 
            src={product.image_path} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline border-b border-node-gray/10 pb-4 group-hover:border-node-purple transition-colors duration-300">
        <h3 className="font-sans text-xl font-medium text-node-dark group-hover:text-node-purple transition-colors flex items-center gap-2">
          {product.name}
          <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-node-purple" />
        </h3>
        <span className="font-sans font-bold text-node-purple tracking-wider shrink-0 ml-4">
          Rs. {product.base_price}
        </span>
      </div>
        {product.description && (
          <p className="text-sm text-node-gray leading-relaxed group-hover:text-node-dark transition-colors mt-2">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}
