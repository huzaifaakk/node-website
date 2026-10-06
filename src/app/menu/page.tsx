import { createClient } from "@/utils/supabase/server";
import RevealWrapper from "@/components/RevealWrapper";
import ProductCard from "@/components/ProductCard";

export default async function MenuPage() {
  const supabase = await createClient();

  // Fetch active categories and their products
  const { data: categories } = await supabase
    .from("categories")
    .select("*, products(*)")
    .eq("is_active", true)
    .order("sort_order");

  const activeCategories = categories?.map((cat) => ({
    ...cat,
    products: cat.products.filter((p) => p.is_available).sort((a, b) => a.sort_order - b.sort_order)
  })) || [];

  return (
    <main className="min-h-screen bg-espresso text-cream pt-32 pb-24 px-6 md:px-12 w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-16">
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-7xl mb-4 text-latte tracking-tight drop-shadow-md">
            Our Menu
          </h1>
          <p className="font-sans text-latte/70 max-w-lg mx-auto">
            Carefully curated beans, precision brewing, and signature creations.
          </p>
        </div>
        
        <div className="flex flex-col gap-16">
          {activeCategories.length > 0 ? (
            activeCategories.map((category) => (
              <RevealWrapper key={category.id} className="flex flex-col gap-8 bg-cream/5 p-8 rounded-2xl border border-cream/10 shadow-xl">
                <h2 className="font-serif text-3xl text-latte border-b border-latte/20 pb-4">
                  {category.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.products.length > 0 ? (
                    category.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p className="text-cream/50 text-sm">No items available currently.</p>
                  )}
                </div>
              </RevealWrapper>
            ))
          ) : (
            <p className="text-cream/50 text-center py-12">Our menu is currently being updated. Please check back later!</p>
          )}
        </div>
      </div>
    </main>
  );
}
