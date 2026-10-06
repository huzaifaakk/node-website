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
    .select("*")
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
        <RevealWrapper className="w-full flex flex-col md:flex-row items-center gap-16 pointer-events-auto bg-espresso/80 backdrop-blur-xl p-12 border border-cream/10 rounded-xl shadow-2xl">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-serif text-5xl md:text-6xl text-latte tracking-tight">
              The Bean Story
            </h2>
            <div className="w-16 h-1 bg-terracotta mb-4"></div>
            <p className="font-sans text-lg text-cream/90 leading-relaxed">
              At Node, every cup begins with carefully selected beans. We partner directly with farmers in Ethiopia, Colombia, and Brazil to source the highest quality, ethically grown coffee.
            </p>
            <p className="font-sans text-lg text-cream/80 leading-relaxed">
              Our master roasters treat each batch as an art form, extracting the precise flavor profile that makes our espresso both bold and incredibly smooth.
            </p>
          </div>
          <div className="flex-1 w-full relative h-[400px] rounded-lg overflow-hidden border border-latte/20 shadow-inner">
            {/* Using a warm CSS gradient block as a placeholder for an image to fit the aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-espresso via-[#4A2E1B] to-terracotta opacity-80 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-3xl text-latte/50 tracking-widest italic">Crafted to perfection.</span>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* Our Specials Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 md:px-24 w-full max-w-7xl mx-auto pb-32 pointer-events-none mt-24">
        <RevealWrapper className="w-full pointer-events-auto bg-espresso/90 backdrop-blur-xl p-12 border border-cream/10 rounded-xl shadow-2xl flex flex-col items-center">
          <h2 className="font-serif text-5xl md:text-6xl text-latte tracking-tight mb-4 text-center">
            Our Specials
          </h2>
          <p className="font-sans text-cream/70 text-center max-w-lg mb-16">
            Hand-crafted signatures that define the Node experience.
          </p>
          
          <SpecialsGrid products={featuredProducts || []} />

          <Link href="/menu">
            <button className="px-12 py-5 bg-transparent border border-terracotta text-terracotta font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-terracotta hover:text-cream hover:scale-105 active:scale-95 transition-all duration-300 rounded-sm shadow-[0_0_15px_rgba(181,83,47,0.2)] hover:shadow-[0_0_30px_rgba(181,83,47,0.6)]">
              View Full Menu
            </button>
          </Link>
        </RevealWrapper>
      </section>

      {/* The Art of Coffee Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 md:px-24 w-full pb-32 pointer-events-none">
        <RevealWrapper className="w-full max-w-7xl pointer-events-auto bg-espresso border border-cream/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row-reverse">
          <div className="flex-1 p-16 flex flex-col justify-center gap-8">
            <h2 className="font-serif text-5xl text-latte tracking-tight">
              The Art of Coffee
            </h2>
            <div className="w-16 h-1 bg-terracotta"></div>
            <p className="font-sans text-lg text-cream/80 leading-relaxed">
              Every pull of espresso, every pour of milk, is executed with precision and passion. We believe that coffee is more than just a morning routine—it's a craft that demands respect.
            </p>
            <p className="font-sans text-lg text-cream/80 leading-relaxed">
              Our baristas are trained to understand the nuanced variables of extraction, ensuring that the unique tasting notes of every origin shine through perfectly in your cup.
            </p>
          </div>
          <div className="flex-1 bg-cream/5 min-h-[400px] flex items-center justify-center border-r border-cream/10">
             <span className="font-serif text-3xl text-latte/30 tracking-widest italic">Precision in every pour.</span>
          </div>
        </RevealWrapper>
      </section>

      {/* Atmosphere Section */}
      <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-8 md:px-24 w-full pb-32 pointer-events-none">
        <RevealWrapper className="w-full max-w-5xl pointer-events-auto bg-cream/5 backdrop-blur-md p-16 border-y border-cream/10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-latte tracking-tight">
            "The best coffee experience in Karachi, hands down."
          </h2>
          <p className="font-sans text-xl text-terracotta font-bold tracking-widest uppercase">
            - The Daily Brew
          </p>
        </RevealWrapper>
      </section>
      
    </main>
  );
}
