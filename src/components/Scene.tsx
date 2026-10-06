"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import CoffeeCup from "./CoffeeCup";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCup() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Continuous procedural animation (floating + gentle rotation)
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating effect using sine wave based on elapsed time
      groupRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      // Very slow continuous spin
      groupRef.current.rotation.y += 0.003;
    }
  });

  useEffect(() => {
    if (!groupRef.current) return;
    
    // Using gsap.context for cleanup as per the brief
    const ctx = gsap.context(() => {
      // The dramatic scroll-based animation
      gsap.timeline({
        scrollTrigger: {
          trigger: "#home-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      })
      .to(groupRef.current!.position, { x: 4, y: 0.5, z: -2 }, 0) // Move right and back
      .to(groupRef.current!.scale, { x: 0.9, y: 0.9, z: 0.9 }, 0) // Scale down
      .to(groupRef.current!.rotation, { 
        x: 0.6, // Tilt forward
        y: Math.PI * 2.2, // Spin around
        z: -Math.PI * 0.2 // Tilt sideways (spilling effect!)
      }, 0); 
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef} name="coffee-cup-group" position={[2.5, -0.5, 0]}>
      <CoffeeCup scale={1.5} rotation={[0.2, -0.5, 0]} />
    </group>
  );
}

export default function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!isMounted) return null;

  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <div className="text-terracotta text-opacity-50 text-sm font-sans uppercase tracking-widest border border-terracotta/20 px-8 py-4 rounded-full">
          Coffee Cup Static Fallback
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-bias={-0.0001} />
        <Environment preset="city" />
        
        <AnimatedCup />
        
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#2C1E16" />
      </Canvas>
    </div>
  );
}
