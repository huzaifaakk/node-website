"use client";

import { useState } from "react";
import { Database } from "@/types/database.types";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import { addProduct, updateProduct, deleteProduct } from "@/app/actions/product";
import { createClient } from "@/utils/supabase/client";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const fileInput = form.elements.namedItem("image_file") as HTMLInputElement;
      const file = fileInput?.files?.[0];

      if (file) {
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        formData.set("image_path", publicUrl);
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to save product.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-6">
        <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-node-purple">Menu Manager</h2>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-node-purple text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-node-dark transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialProducts?.map((product) => (
          <div key={product.id} className="bg-white border border-node-gray/20 rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="font-sans font-bold text-lg text-node-dark">{product.name}</h3>
              <span className="font-sans text-node-purple font-bold">Rs. {product.base_price}</span>
            </div>
            <p className="text-sm text-node-gray line-clamp-2">{product.description}</p>
            
            <div className="mt-auto pt-4 border-t border-node-gray/10 flex justify-between items-center">
              <span className={`text-xs font-bold uppercase tracking-widest ${product.is_available ? 'text-green-400' : 'text-red-400'}`}>
                {product.is_available ? 'Available' : 'Sold Out'}
              </span>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleOpenEdit(product)}
                  className="text-node-gray hover:text-node-purple transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="text-node-gray hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-node-dark/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white border border-node-gray/10 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-node-gray hover:text-node-dark">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-3xl text-node-purple mb-6">
              {editingProduct ? "Edit Product" : "New Product"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-node-gray">Name</label>
                <input required name="name" defaultValue={editingProduct?.name || ""} className="p-3 bg-node-light border border-node-gray/10 rounded-lg text-node-dark focus:outline-none focus:border-node-purple" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-node-gray">Description</label>
                <textarea required name="description" defaultValue={editingProduct?.description || ""} className="p-3 bg-node-light border border-node-gray/10 rounded-lg text-node-dark h-24 focus:outline-none focus:border-node-purple" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-node-gray">Image (Upload or URL)</label>
                <div className="flex flex-col gap-2">
                  <input type="file" name="image_file" accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-node-purple file:text-white hover:file:bg-node-dark cursor-pointer text-node-gray" />
                  <span className="text-xs text-node-gray/80 italic">Or paste a URL:</span>
                  <input name="image_path" defaultValue={editingProduct?.image_path || ""} placeholder="https://..." className="p-3 bg-node-light border border-node-gray/10 rounded-lg text-node-dark focus:outline-none focus:border-node-purple" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-node-gray">Base Price (Rs.)</label>
                <input required type="number" name="base_price" defaultValue={editingProduct?.base_price || ""} className="p-3 bg-node-light border border-node-gray/10 rounded-lg text-node-dark focus:outline-none focus:border-node-purple" />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" name="is_available" defaultChecked={editingProduct ? editingProduct.is_available : true} className="w-4 h-4 accent-node-purple" />
                <label className="text-sm text-node-dark font-bold">Available for Order</label>
              </div>

              <button disabled={isSubmitting} className="mt-6 w-full py-4 bg-node-purple text-white uppercase tracking-widest text-xs font-bold rounded-lg hover:bg-node-dark transition-colors disabled:opacity-50">
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
