import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const market = searchParams.get("market")
    const source = searchParams.get("source")

    const properties = await prisma.property.findMany({
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { properties } = body

    if (!Array.isArray(properties)) {
      return NextResponse.json({ error: "Invalid properties data" }, { status: 400 })
    }

    // Bulk update approach: for simplicity, we'll just create many
    // In a real scenario, we might want to use upsert or transaction
    const createdProperties = await prisma.$transaction(
      properties.map((p: any) =>
        prisma.property.create({
          data: {
            source: p.source,
            externalId: p.externalId,
            latitude: parseFloat(p.latitude),
            longitude: parseFloat(p.longitude),
            totalArea: parseFloat(p.totalArea),
            availableArea: parseFloat(p.availableArea),
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
