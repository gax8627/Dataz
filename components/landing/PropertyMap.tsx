"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

// Dynamically import the Map component to avoid "window is not defined" error during SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)

// We need a separate inner component to handle the Leaflet logic that requires the 'L' object
const PropertyMarkers = dynamic(
  () => import("./PropertyMarkers"),
  { ssr: false }
)

export function PropertyMap() {
  const { t } = useLanguage()
  const [properties, setProperties] = useState([])
  const [market, setMarket] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const url = market === "all" ? "/api/properties" : `/api/properties?market=${market}`
        const res = await fetch(url)
        const data = await res.json()
        setProperties(data)
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [market])

  return (
    <section id="map-section" className="container py-32 px-4 md:px-6 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
        <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary bg-primary/5 mb-4">
          {t("hero.badge")}
        </Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Inventory <span className="text-gradient">Aggregator</span>
        </h2>
        <p className="max-w-[900px] text-muted-foreground sm:text-xl/relaxed mx-auto">
            Real-time availability tracking across the main industrial markets in Mexico.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4 items-start">
        <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                    <CardDescription>Select a submarket</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Tabs defaultValue="all" className="w-full" onValueChange={setMarket}>
                        <div className="flex flex-col gap-2">
                            <TabsTrigger value="all" className="justify-start px-4">All Markets</TabsTrigger>
                            <TabsTrigger value="Mexico City" className="justify-start px-4">Mexico City</TabsTrigger>
                            <TabsTrigger value="Monterrey" className="justify-start px-4">Monterrey</TabsTrigger>
                            <TabsTrigger value="Tijuana" className="justify-start px-4">Tijuana</TabsTrigger>
                            <TabsTrigger value="Queretaro" className="justify-start px-4">Queretaro</TabsTrigger>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        Market Stats
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total Available</span>
                        <span className="text-2xl font-bold">
                            {properties.reduce((acc: number, curr: { availableArea: number }) => acc + curr.availableArea, 0).toLocaleString()} m²
                        </span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Buildings</span>
                        <span className="text-xl font-bold">{properties.length}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-3 h-[600px] rounded-3xl overflow-hidden glass-card border-border/50 relative">
            {typeof window !== "undefined" && (
                <MapContainer
                    center={[23.6345, -102.5528]} // Center of Mexico
                    zoom={5}
                    style={{ height: "100%", width: "100%", background: "#0b0e14" }}
                    scrollWheelZoom={false}
                    className="z-0"
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <PropertyMarkers properties={properties} />
                </MapContainer>
            )}
            
            {loading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-medium">Loading Map Data...</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  )
}
