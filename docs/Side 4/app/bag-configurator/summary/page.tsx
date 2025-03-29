"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Facebook, Instagram, PinIcon as Pinterest, Copy, Download, ArrowLeft, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BagModel } from "@/app/bag-configurator/components/bag-model"

// Mock data - in a real app, this would come from your state management
const bagConfiguration = {
  model: "Classic Tote",
  material: "Premium Italian Leather",
  color: "Midnight Black",
  addons: ["Gold Hardware", "Interior Pocket", "Adjustable Strap"],
  personalText: "Emma S.",
  price: 1299,
}

export default function BagConfiguratorSummary() {
  const [designName, setDesignName] = useState("")

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    // You would add a toast notification here
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-light text-center mb-12">Your Custom Design</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side - Configuration Summary */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-light">Design Summary</h2>
              <Separator />

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-500">Bag Model</span>
                  <span>{bagConfiguration.model}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-500">Material</span>
                  <span>{bagConfiguration.material}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-500">Color</span>
                  <span>{bagConfiguration.color}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-start">
                  <span className="text-gray-500">Add-ons</span>
                  <div className="space-y-1">
                    {bagConfiguration.addons.map((addon, index) => (
                      <div key={index}>{addon}</div>
                    ))}
                  </div>
                </div>
                {bagConfiguration.personalText && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Personalization</span>
                    <span>{bagConfiguration.personalText}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-light">Name Your Design</h2>
              <Input
                placeholder="My Custom Bag"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-light">Share Your Design</h2>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Share on Instagram</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Pinterest className="h-5 w-5" />
                  <span className="sr-only">Share on Pinterest</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" onClick={handleCopyLink}>
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Download className="h-5 w-5" />
                  <span className="sr-only">Download image</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                Continue to Checkout
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side - 3D Model */}
          <div className="bg-gray-50 rounded-lg overflow-hidden relative">
            <div className="absolute top-4 right-4 z-10 bg-white py-2 px-4 rounded-full shadow-md">
              <span className="text-xl font-medium">${bagConfiguration.price}</span>
            </div>
            <div className="h-[600px]">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <BagModel
                  color={bagConfiguration.color === "Midnight Black" ? "#1a1a1a" : "#1a1a1a"}
                  material={bagConfiguration.material}
                />

                <OrbitControls enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                <Environment preset="studio" />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

