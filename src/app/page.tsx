import Scene from "@/components/Scene";
import Hero from "@/components/Hero";
import RevealWrapper from "@/components/RevealWrapper";
import SpecialsGrid from "@/components/SpecialsGrid";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch 3 featured products for the homepage
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .eq("is_available", true)
    .limit(3);
  return (
    <main id="home-scroll-container" className="relative w-full">
      
      {/* Fixed 3D Canvas Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Scene />
      </div>

      <Hero />

      {/* The Bean Story Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 md:px-24 w-full max-w-7xl mx-auto pb-32 pointer-events-none mt-40">
        <RevealWrapper className="w-full flex flex-col md:flex-row items-center gap-16 pointer-events-auto bg-card backdrop-blur-xl p-12 border border-node-gray/20 rounded-xl shadow-2xl">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-serif text-5xl md:text-6xl text-node-purple tracking-tight">
              The Bean Story
            </h2>
            <div className="w-16 h-1 bg-node-purple mb-4"></div>
            <p className="font-sans text-lg text-node-gray leading-relaxed">
              At Node, every cup begins with carefully selected beans. We partner directly with farmers in Ethiopia, Colombia, and Brazil to source the highest quality, ethically grown coffee.
            </p>
            <p className="font-sans text-lg text-node-gray leading-relaxed">
              Our master roasters treat each batch as an art form, extracting the precise flavor profile that makes our espresso both bold and incredibly smooth.
            </p>
          </div>
          <div className="flex-1 w-full relative h-[400px] rounded-lg overflow-hidden border border-node-purple/20 shadow-inner">
            {/* Using a warm CSS gradient block as a placeholder for an image to fit the aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-node-purple via-[#A385B5] to-node-light opacity-80 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-3xl text-white/70 tracking-widest italic">Crafted to perfection.</span>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* Signature Dishes Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-8 md:px-24 w-full max-w-7xl mx-auto pb-32 pointer-events-none mt-24">
        <RevealWrapper className="w-full pointer-events-auto bg-card backdrop-blur-xl p-12 border border-node-gray/20 rounded-xl shadow-2xl flex flex-col items-center">
          <h2 className="font-serif text-5xl md:text-6xl text-node-purple tracking-tight mb-4 text-center">
            Signature Specialities
          </h2>
          <p className="font-sans text-node-gray text-center max-w-lg mb-16">
            Explore our curated culinary masterpieces, crafted with authentic ingredients.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* Tarragon Steak */}
            <div className="flex flex-col gap-6 group">
              <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-node-gray/10 relative">
                <img 
                  src="/tarragon-steak.jpg" 
                  alt="Tarragon Steak" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-3xl text-text-main">Chicken Tarragon</h3>
                  <span className="font-sans text-xl text-node-purple font-bold">Rs. 1500</span>
                </div>
                <p className="font-sans text-node-gray leading-relaxed">
                  Grilled chicken served with our signature creamy tarragon sauce, accompanied by perfectly sautéed seasonal vegetables and flavored rice.
                </p>
              </div>
            </div>

            {/* Turkish Eggs */}
            <div className="flex flex-col gap-6 group">
              <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-node-gray/10 relative">
                <img 
                  src="/turkish-eggs.jpg" 
                  alt="Turkish Eggs" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-3xl text-text-main">Turkish Eggs</h3>
                  <span className="font-sans text-xl text-node-purple font-bold">Rs. 500</span>
                </div>
                <p className="font-sans text-node-gray leading-relaxed">
                  A classic Mediterranean delight featuring poached eggs over a bed of rich, spiced tomato sauce, served with crispy toasted bread.
                </p>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* Our Specials Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 md:px-24 w-full max-w-7xl mx-auto pb-32 pointer-events-none mt-24">
        <RevealWrapper className="w-full pointer-events-auto bg-card backdrop-blur-xl p-12 border border-node-gray/20 rounded-xl shadow-2xl flex flex-col items-center">
          <h2 className="font-serif text-5xl md:text-6xl text-node-purple tracking-tight mb-4 text-center">
            Our Specials
          </h2>
          <p className="font-sans text-node-gray text-center max-w-lg mb-16">
            Hand-crafted signatures that define the Node experience.
          </p>
          
          <SpecialsGrid products={featuredProducts || []} />

          <Link href="/menu">
            <button className="px-12 py-5 bg-transparent border border-node-purple text-node-purple font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-node-purple hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(134,94,156,0.2)] hover:shadow-[0_0_30px_rgba(134,94,156,0.4)] mt-8">
              View Full Menu
            </button>
          </Link>
        </RevealWrapper>
      </section>

      {/* The Art of Coffee Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 md:px-24 w-full pb-32 pointer-events-none">
        <RevealWrapper className="w-full max-w-7xl pointer-events-auto bg-card border border-node-gray/20 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row-reverse">
          <div className="flex-1 p-16 flex flex-col justify-center gap-8">
            <h2 className="font-serif text-5xl text-node-purple tracking-tight">
              The Art of Coffee
            </h2>
            <div className="w-16 h-1 bg-node-purple"></div>
            <p className="font-sans text-lg text-node-gray leading-relaxed">
              Every pull of espresso, every pour of milk, is executed with precision and passion. We believe that coffee is more than just a morning routine—it's a craft that demands respect.
            </p>
            <p className="font-sans text-lg text-node-gray leading-relaxed">
              Our baristas are trained to understand the nuanced variables of extraction, ensuring that the unique tasting notes of every origin shine through perfectly in your cup.
            </p>
          </div>
          <div className="flex-1 bg-page-bg min-h-[400px] flex items-center justify-center border-r border-node-gray/10">
             <span className="font-serif text-3xl text-node-purple/30 tracking-widest italic">Precision in every pour.</span>
          </div>
        </RevealWrapper>
      </section>

      {/* Atmosphere Section */}
      <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-8 md:px-24 w-full pb-32 pointer-events-none">
        <RevealWrapper className="w-full max-w-5xl pointer-events-auto bg-page-bg/80 backdrop-blur-md p-16 border-y border-node-gray/10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-node-purple tracking-tight">
            "The best coffee experience in Karachi, hands down."
          </h2>
          <p className="font-sans text-xl text-node-purple font-bold tracking-widest uppercase">
            - The Daily Brew
          </p>
        </RevealWrapper>
      </section>
      
    </main>
  );
}
