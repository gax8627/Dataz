import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const market = searchParams.get("market")
    const source = searchParams.get("source")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const properties = await (prisma as any).property.findMany({
      where: {
        ...(market && { market }),
        ...(source && { source }),
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

interface PropertyInput {
  source: string
  externalId?: string
  latitude: string | number
  longitude: string | number
  totalArea: string | number
  availableArea: string | number
  address?: string
  market: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { properties } = body

    if (!Array.isArray(properties)) {
      return NextResponse.json({ error: "Invalid properties data" }, { status: 400 })
    }

    const createdProperties = await prisma.$transaction(
      properties.map((p: PropertyInput) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prisma as any).property.create({
          data: {
            source: p.source,
            externalId: p.externalId,
            latitude: typeof p.latitude === 'string' ? parseFloat(p.latitude) : p.latitude,
            longitude: typeof p.longitude === 'string' ? parseFloat(p.longitude) : p.longitude,
            totalArea: typeof p.totalArea === 'string' ? parseFloat(p.totalArea) : p.totalArea,
            availableArea: typeof p.availableArea === 'string' ? parseFloat(p.availableArea) : p.availableArea,
            address: p.address,
            market: p.market,
          },
        })
      )
    )

    return NextResponse.json({ success: true, count: createdProperties.length })
  } catch (error) {
    console.error("Error creating properties:", error)
    return NextResponse.json({ error: "Failed to create properties" }, { status: 500 })
  }
}
