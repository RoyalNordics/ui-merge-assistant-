"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"

// We're using a placeholder duck model since we don't have actual bag models
// In a real application, you would have different 3D models for each bag type
export default function BagModel({ modelId }: { modelId: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Simple animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={meshRef} scale={2} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

