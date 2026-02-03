"use client"

import React, { useEffect } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { Building2, MapPin } from "lucide-react"
import { renderToStaticMarkup } from "react-dom/server"

// Fix for default marker icon issues in Next.js
const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <div className="absolute w-8 h-8 bg-primary rounded-full opacity-20 animate-ping" />
      <div className="relative w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center">
        <MapPin className="h-3 w-3 text-white" />
      </div>
    </div>
  ),
  className: "custom-marker-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

interface Property {
  id: string
  source: string
  latitude: number
  longitude: number
  totalArea: number
  availableArea: number
  address: string
  market: string
}

export default function PropertyMarkers({ properties }: { properties: Property[] }) {
  const map = useMap()

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
    }
  }, [properties, map])

  return (
    <>
      {properties.map((prop) => (
        <Marker 
          key={prop.id} 
          position={[prop.latitude, prop.longitude]} 
          icon={customIcon}
        >
          <Popup className="property-popup">
            <div className="p-1 space-y-2 min-w-[200px]">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{prop.source}</span>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{prop.market}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-muted-foreground" />
                  {prop.availableArea.toLocaleString()} m² Available
                </p>
                <p className="text-xs text-muted-foreground">{prop.address || "No specific address provided"}</p>
              </div>
              <div className="pt-2">
                <p className="text-[10px] text-muted-foreground">Total Area: {prop.totalArea.toLocaleString()} m²</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
