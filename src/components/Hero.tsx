"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      // Create a timeline for the hero reveal
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Simple fade up stagger for elements
      tl.fromTo(titleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      )
      .fromTo(textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.9, duration: 1 },
        "-=0.8"
      )
      .fromTo(btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative z-10 flex min-h-screen flex-col items-start justify-center px-8 md:px-24 pt-20 pointer-events-none text-node-dark">
      <div className="flex flex-col items-start text-left max-w-2xl w-full">
        <h1 ref={titleRef} className="font-serif text-7xl md:text-9xl tracking-tighter leading-[0.85] text-node-purple drop-shadow-sm">
          Coffee.<br />
          Curated.
        </h1>
        
        <p ref={textRef} className="mt-8 font-sans text-lg md:text-xl max-w-md leading-relaxed text-node-gray font-medium">
          A premium coffee experience in Karachi. Sourced globally, roasted locally.
        </p>
        
        <div ref={btnRef} className="mt-12 pointer-events-auto">
          <Link href="/menu" className="inline-block px-12 py-5 bg-node-purple text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-node-dark hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full shadow-xl shadow-node-purple/30">
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
}
