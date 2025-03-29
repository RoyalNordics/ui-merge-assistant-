"use client"

import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment } from "@react-three/drei"
import { Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import BagModel from "@/components/bag-model"

// Bag model data
const bagModels = [
  {
    id: 1,
    name: "Tote",
    description: "Rummelig og praktisk til hverdagsbrug",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Clutch",
    description: "Elegant og kompakt til festlige lejligheder",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Crossbody",
    description: "Praktisk og behagelig til hænderne fri",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Backpack",
    description: "Komfortabel og rummelig til aktive dage",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Bucket",
    description: "Trendy og afslappet med unik form",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Hobo",
    description: "Blød og halvmåneformet til casual stil",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Satchel",
    description: "Struktureret med flap og ofte med håndtag",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Baguette",
    description: "Lille og aflang, bæres under armen",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    name: "Weekender",
    description: "Stor og rummelig til korte rejser",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Messenger",
    description: "Med flap og lang rem, god til laptop",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function BagDesigner() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with step indicator */}
      <header className="border-b p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">EGO – Design din egen taske</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                1
              </div>
              <span className="font-medium">Vælg din taskemodel</span>
            </div>
            <div className="h-0.5 w-12 bg-muted mx-2"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                2
              </div>
              <span className="text-muted-foreground">Materialer</span>
            </div>
            <div className="h-0.5 w-12 bg-muted mx-2"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                3
              </div>
              <span className="text-muted-foreground">Detaljer</span>
            </div>
            <div className="h-0.5 w-12 bg-muted mx-2"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                4
              </div>
              <span className="text-muted-foreground">Færdiggør</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Bag models */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Taskemodeller</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-2">
              {bagModels.map((model) => (
                <TooltipProvider key={model.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedModel === model.id ? "ring-2 ring-primary shadow-lg" : ""
                        }`}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <CardHeader className="p-4 pb-2">
                          <CardTitle>{model.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <img
                            src={model.image || "/placeholder.svg"}
                            alt={model.name}
                            className="w-full h-40 object-cover rounded-md mb-2"
                          />
                          <CardDescription>{model.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Klik for at se i 3D</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          {/* Right side - 3D Preview */}
          <div className="bg-muted/30 rounded-lg p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">3D Preview</h2>
            <div className="flex-1 relative min-h-[400px] bg-white rounded-md shadow-inner">
              {selectedModel ? (
                <Canvas>
                  <Suspense fallback={null}>
                    <PresentationControls
                      global
                      rotation={[0, 0, 0]}
                      polar={[-Math.PI / 4, Math.PI / 4]}
                      azimuth={[-Math.PI / 4, Math.PI / 4]}
                    >
                      <BagModel modelId={selectedModel} />
                    </PresentationControls>
                    <Environment preset="city" />
                    <OrbitControls enableZoom={true} />
                  </Suspense>
                </Canvas>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <p>Vælg en taskemodel for at se 3D-preview</p>
                </div>
              )}
            </div>

            {/* Scale reference */}
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center bg-white p-3 rounded-md shadow">
                <Smartphone className="w-6 h-10 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Mobiltelefon som størrelsesreference</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with navigation */}
      <footer className="border-t p-4">
        <div className="container mx-auto flex justify-between">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button disabled={!selectedModel}>Continue</Button>
        </div>
      </footer>
    </div>
  )
}

