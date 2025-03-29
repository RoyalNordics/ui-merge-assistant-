"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// In a real application, you would use your actual bag model
// For this example, we'll use a simple cube as a placeholder
export function BagModel({ color = "#1a1a1a", material = "leather" }) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05,
      )
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05,
      )
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5}>
      <boxGeometry args={[1, 1, 0.5]} />
      <meshStandardMaterial
        color={color}
        roughness={material === "Premium Italian Leather" ? 0.3 : 0.5}
        metalness={0.1}
      />
    </mesh>
  )
}

