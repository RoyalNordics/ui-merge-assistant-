"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import BagModel from "./bag-model"

export default function BagConfigurator() {
  const [activePart, setActivePart] = useState("body")
  const [materials, setMaterials] = useState({
    body: "leather",
    handle: "leather",
    hardware: "gold",
  })
  const [colors, setColors] = useState({
    body: "#8B4513",
    handle: "#8B4513",
  })
  const [accessories, setAccessories] = useState({
    premiumZipper: false,
    customEngraving: false,
    logo: false,
    extraPocket: false,
  })
  const [price, setPrice] = useState(299)

  // Update price when options change
  const updatePrice = () => {
    let basePrice = 299

    // Material adjustments
    if (materials.body === "suede") basePrice += 50
    if (materials.body === "canvas") basePrice -= 30
    if (materials.handle !== materials.body) basePrice += 20
    if (materials.hardware === "gold") basePrice += 30

    // Accessories
    if (accessories.premiumZipper) basePrice += 15
    if (accessories.customEngraving) basePrice += 25
    if (accessories.logo) basePrice += 20
    if (accessories.extraPocket) basePrice += 10

    setPrice(basePrice)
  }

  // Update materials
  const handleMaterialChange = (part, value) => {
    setMaterials((prev) => {
      const updated = { ...prev, [part]: value }
      setTimeout(updatePrice, 0)
      return updated
    })
  }

  // Update colors
  const handleColorChange = (part, value) => {
    setColors((prev) => ({ ...prev, [part]: value }))
  }

  // Update accessories
  const handleAccessoryChange = (accessory, checked) => {
    setAccessories((prev) => {
      const updated = { ...prev, [accessory]: checked }
      setTimeout(updatePrice, 0)
      return updated
    })
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-50">
      {/* Left side - Configuration options */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Design Your Bag</h1>
          <p className="text-neutral-500">Step 2: Choose materials, colors, and accessories</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Currently Editing</h2>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>Rotate preview</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200">
            <div className="flex gap-4">
              <Button
                variant={activePart === "body" ? "default" : "outline"}
                onClick={() => setActivePart("body")}
                className="flex-1"
              >
                Bag Body
              </Button>
              <Button
                variant={activePart === "handle" ? "default" : "outline"}
                onClick={() => setActivePart("handle")}
                className="flex-1"
              >
                Handles
              </Button>
              <Button
                variant={activePart === "hardware" ? "default" : "outline"}
                onClick={() => setActivePart("hardware")}
                className="flex-1"
              >
                Hardware
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="materials" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Select Material</h3>
              <RadioGroup
                value={materials[activePart]}
                onValueChange={(value) => handleMaterialChange(activePart, value)}
                className="grid grid-cols-3 gap-4"
              >
                {activePart !== "hardware" ? (
                  <>
                    <div className="relative">
                      <RadioGroupItem value="leather" id="leather" className="sr-only" />
                      <Label
                        htmlFor="leather"
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 border-neutral-200 p-4 hover:border-neutral-300 cursor-pointer",
                          materials[activePart] === "leather" && "border-primary",
                        )}
                      >
                        <div className="w-full h-24 bg-amber-800 rounded-md"></div>
                        <span>Leather</span>
                        {materials[activePart] === "leather" && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="suede" id="suede" className="sr-only" />
                      <Label
                        htmlFor="suede"
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 border-neutral-200 p-4 hover:border-neutral-300 cursor-pointer",
                          materials[activePart] === "suede" && "border-primary",
                        )}
                      >
                        <div className="w-full h-24 bg-amber-700 rounded-md"></div>
                        <span>Suede</span>
                        {materials[activePart] === "suede" && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="canvas" id="canvas" className="sr-only" />
                      <Label
                        htmlFor="canvas"
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 border-neutral-200 p-4 hover:border-neutral-300 cursor-pointer",
                          materials[activePart] === "canvas" && "border-primary",
                        )}
                      >
                        <div className="w-full h-24 bg-stone-300 rounded-md"></div>
                        <span>Canvas</span>
                        {materials[activePart] === "canvas" && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <RadioGroupItem value="silver" id="silver" className="sr-only" />
                      <Label
                        htmlFor="silver"
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 border-neutral-200 p-4 hover:border-neutral-300 cursor-pointer",
                          materials.hardware === "silver" && "border-primary",
                        )}
                      >
                        <div className="w-full h-24 bg-neutral-300 rounded-md"></div>
                        <span>Silver</span>
                        {materials.hardware === "silver" && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="gold" id="gold" className="sr-only" />
                      <Label
                        htmlFor="gold"
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 border-neutral-200 p-4 hover:border-neutral-300 cursor-pointer",
                          materials.hardware === "gold" && "border-primary",
                        )}
                      >
                        <div className="w-full h-24 bg-yellow-500 rounded-md"></div>
                        <span>Gold</span>
                        {materials.hardware === "gold" && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="black" id="black" className="sr-only" />
                      <Label
                        htmlFor="black"
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 border-neutral-200 p-4 hover:border-neutral-300 cursor-pointer",
                          materials.hardware === "black" && "border-primary",
                        )}
                      >
                        <div className="w-full h-24 bg-neutral-800 rounded-md"></div>
                        <span>Black</span>
                        {materials.hardware === "black" && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>
                  </>
                )}
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            {activePart !== "hardware" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Select Color</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Color Preview</Label>
                      <div
                        className="h-6 w-6 rounded-full border border-neutral-200"
                        style={{ backgroundColor: colors[activePart] }}
                      ></div>
                    </div>
                    <input
                      type="color"
                      value={colors[activePart]}
                      onChange={(e) => handleColorChange(activePart, e.target.value)}
                      className="w-full h-10 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Preset Colors</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        "#8B4513",
                        "#000000",
                        "#FFFFFF",
                        "#A52A2A",
                        "#556B2F",
                        "#708090",
                        "#4682B4",
                        "#800020",
                        "#F5F5DC",
                        "#D2B48C",
                      ].map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "h-8 w-8 rounded-full border-2",
                            colors[activePart] === color ? "border-primary" : "border-neutral-200",
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(activePart, color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="accessories" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Select Accessories</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="premium-zipper"
                    checked={accessories.premiumZipper}
                    onCheckedChange={(checked) => handleAccessoryChange("premiumZipper", checked)}
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="premium-zipper" className="font-medium">
                      Premium Zipper
                    </Label>
                    <p className="text-sm text-neutral-500">High-quality metal zipper with smooth operation (+$15)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="custom-engraving"
                    checked={accessories.customEngraving}
                    onCheckedChange={(checked) => handleAccessoryChange("customEngraving", checked)}
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="custom-engraving" className="font-medium">
                      Custom Engraving
                    </Label>
                    <p className="text-sm text-neutral-500">Add your initials or a short text (+$25)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="logo"
                    checked={accessories.logo}
                    onCheckedChange={(checked) => handleAccessoryChange("logo", checked)}
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="logo" className="font-medium">
                      Logo Embossing
                    </Label>
                    <p className="text-sm text-neutral-500">Add a subtle brand logo to your bag (+$20)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="extra-pocket"
                    checked={accessories.extraPocket}
                    onCheckedChange={(checked) => handleAccessoryChange("extraPocket", checked)}
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="extra-pocket" className="font-medium">
                      Extra Interior Pocket
                    </Label>
                    <p className="text-sm text-neutral-500">Additional zippered pocket inside (+$10)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-auto pt-6 border-t border-neutral-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-neutral-500">Total Price</p>
              <p className="text-2xl font-bold">${price}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button className="gap-1">
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - 3D preview */}
      <div className="w-full md:w-1/2 bg-neutral-100 relative">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Environment preset="studio" />

          <BagModel materials={materials} colors={colors} accessories={accessories} activePart={activePart} />

          <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
        </Canvas>
      </div>
    </div>
  )
}

