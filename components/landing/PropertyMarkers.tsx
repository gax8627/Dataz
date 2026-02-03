"use client"

import React, { useEffect, useState } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import { Building2, MapPin } from "lucide-react"
import { renderToStaticMarkup } from "react-dom/server"

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Leaflet, setLeaflet] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customIcon, setCustomIcon] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const L = await import("leaflet")
      setLeaflet(L.default || L)

      const icon = (L.default || L).divIcon({
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
      setCustomIcon(icon)
    })()
  }, [])

  useEffect(() => {
    if (Leaflet && properties.length > 0) {
      const bounds = Leaflet.latLngBounds(properties.map((p: Property) => [p.latitude, p.longitude]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
    }
  }, [properties, map, Leaflet])

  if (!customIcon || !Leaflet) return null;

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
