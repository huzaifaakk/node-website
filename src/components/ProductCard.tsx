"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { Plus, X } from "lucide-react";
import { Database } from "@/types/database.types";

type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"] & {
  product_variants?: ProductVariant[];
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const handleCardClick = () => {
    if (product.product_variants && product.product_variants.length > 0) {
      // Default to no variant selected
      setSelectedVariant(null);
      setIsModalOpen(true);
    } else {
      addItem(product);
    }
  };

  const handleAddToCartWithVariant = () => {
    addItem(product, selectedVariant);
    setIsModalOpen(false);
  };

  return (
    <>
    <div 
      className="flex flex-col gap-4 group cursor-pointer bg-card p-6 rounded-2xl border border-node-gray/10 shadow-sm hover:shadow-md transition-all duration-300 relative"
      onClick={handleCardClick}
    >
      {product.image_path && (
        <div className="w-full h-48 sm:h-64 overflow-hidden rounded-xl bg-page-bg mb-2">
          <img 
            src={product.image_path} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline border-b border-node-gray/10 pb-4 group-hover:border-node-purple transition-colors duration-300">
        <h3 className="font-sans text-xl font-medium text-text-main group-hover:text-node-purple transition-colors flex items-center gap-2">
          {product.name}
          <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-node-purple" />
        </h3>
        <span className="font-sans font-bold text-node-purple tracking-wider shrink-0 ml-4">
          Rs. {product.base_price}
        </span>
      </div>
        {product.description && (
          <p className="text-sm text-node-gray leading-relaxed group-hover:text-text-main transition-colors mt-2">
            {product.description}
          </p>
        )}
      </div>
    </div>

    {/* Variant Selection Modal */}
    {isModalOpen && (
      <div 
        className="fixed inset-0 bg-node-dark/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
      >
        <div 
          className="bg-card rounded-2xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-page-bg rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-text-main" />
          </button>
          
          <h3 className="font-serif text-2xl text-node-purple mb-2">{product.name}</h3>
          <p className="font-sans text-sm text-node-gray mb-6">Customize your order</p>
          
          <div className="flex flex-col gap-3 mb-8">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-node-gray/20 cursor-pointer hover:border-node-purple transition-colors">
              <input 
                type="radio" 
                name={`variant-${product.id}`} 
                checked={selectedVariant === null}
                onChange={() => setSelectedVariant(null)}
                className="accent-node-purple w-4 h-4"
              />
              <span className="font-sans font-medium text-text-main flex-1">Standard</span>
              <span className="font-sans text-node-gray text-sm">Rs. {product.base_price}</span>
            </label>
            
            {product.product_variants?.map((variant) => (
              <label key={variant.id} className="flex items-center gap-3 p-3 rounded-lg border border-node-gray/20 cursor-pointer hover:border-node-purple transition-colors">
                <input 
                  type="radio" 
                  name={`variant-${product.id}`}
                  checked={selectedVariant?.id === variant.id}
                  onChange={() => setSelectedVariant(variant)}
                  className="accent-node-purple w-4 h-4"
                />
                <span className="font-sans font-medium text-text-main flex-1">{variant.name}</span>
                <span className="font-sans text-node-purple font-bold text-sm">+Rs. {variant.price_delta}</span>
              </label>
            ))}
          </div>

          <button 
            onClick={handleAddToCartWithVariant}
            className="w-full py-4 bg-node-purple text-white font-sans uppercase tracking-widest text-xs font-bold hover:bg-node-dark transition-colors rounded-xl shadow-lg shadow-node-purple/20"
          >
            Add to Cart - Rs. {product.base_price + (selectedVariant?.price_delta || 0)}
          </button>
        </div>
      </div>
    )}
    </>
  );
}
