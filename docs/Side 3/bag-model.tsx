"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function BagModel({ materials, colors, accessories, activePart }) {
  // This is a placeholder for the actual 3D model
  // In a real application, you would load a GLTF model
  const meshRef = useRef()
  const handleRef = useRef()
  const hardwareRef = useRef()

  // Rotate the bag slightly
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  // Get material based on selection
  const getMaterial = (part) => {
    const materialType = materials[part]
    const color = part !== "hardware" ? colors[part] : null

    switch (materialType) {
      case "leather":
        return new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.5,
          metalness: 0.1,
        })
      case "suede":
        return new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.8,
          metalness: 0.0,
        })
      case "canvas":
        return new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.7,
          metalness: 0.0,
        })
      case "silver":
        return new THREE.MeshStandardMaterial({
          color: "#C0C0C0",
          roughness: 0.2,
          metalness: 0.8,
        })
      case "gold":
        return new THREE.MeshStandardMaterial({
          color: "#FFD700",
          roughness: 0.2,
          metalness: 0.8,
        })
      case "black":
        return new THREE.MeshStandardMaterial({
          color: "#202020",
          roughness: 0.4,
          metalness: 0.6,
        })
      default:
        return new THREE.MeshStandardMaterial({ color: "#8B4513" })
    }
  }

  // Highlight active part
  const getEmissive = (part) => {
    return part === activePart ? new THREE.Color(0x222222) : new THREE.Color(0x000000)
  }

  return (
    <group position={[0, -0.5, 0]} scale={1.5}>
      {/* Bag body */}
      <mesh ref={meshRef} position={[0, 0, 0]} material={getMaterial("body")}>
        <boxGeometry args={[1.5, 1, 0.5]} />
        <meshStandardMaterial {...getMaterial("body")} emissive={getEmissive("body")} />
      </mesh>

      {/* Handles */}
      <group ref={handleRef}>
        <mesh position={[-0.4, 0.7, 0]} material={getMaterial("handle")}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
          <meshStandardMaterial {...getMaterial("handle")} emissive={getEmissive("handle")} />
        </mesh>
        <mesh position={[0.4, 0.7, 0]} material={getMaterial("handle")}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
          <meshStandardMaterial {...getMaterial("handle")} emissive={getEmissive("handle")} />
        </mesh>
      </group>

      {/* Hardware (zippers, clasps, etc.) */}
      <group ref={hardwareRef}>
        <mesh position={[0, 0.3, 0.26]} material={getMaterial("hardware")}>
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial {...getMaterial("hardware")} emissive={getEmissive("hardware")} />
        </mesh>

        {/* Render premium zipper if selected */}
        {accessories.premiumZipper && (
          <mesh position={[0, 0.5, 0.26]} material={getMaterial("hardware")}>
            <boxGeometry args={[0.8, 0.03, 0.02]} />
            <meshStandardMaterial {...getMaterial("hardware")} />
          </mesh>
        )}

        {/* Render logo if selected */}
        {accessories.logo && (
          <mesh position={[0, 0, 0.26]} material={getMaterial("hardware")}>
            <circleGeometry args={[0.1, 32]} />
            <meshStandardMaterial {...getMaterial("hardware")} />
          </mesh>
        )}
      </group>
    </group>
  )
}

