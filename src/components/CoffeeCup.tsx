"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function CoffeeCup(props: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Cup Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 0.9, 2.5, 64]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* 3D Text Decal */}
      <Text
        position={[0, 0, 1.15]}
        rotation={[0, 0, 0]}
        fontSize={0.4}
        color="#2C1E16"
        anchorX="center"
        anchorY="middle"
      >
        Node.
      </Text>
      
      {/* Coffee Liquid */}
      <mesh position={[0, 1.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 32]} />
        <meshStandardMaterial color="#2C1E16" roughness={0.9} />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <torusGeometry args={[0.7, 0.2, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.1} metalness={0.1} />
      </mesh>
    </group>
  );
}
