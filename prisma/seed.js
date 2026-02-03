const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const properties = [
    {
      source: "Prologis",
      latitude: 19.4326,
      longitude: -99.1332,
      totalArea: 15000,
      availableArea: 5000,
      address: "Prologis Park Grande, CDMX",
      market: "Mexico City",
    },
    {
      source: "Vesta",
      latitude: 25.6866,
      longitude: -100.3161,
      totalArea: 12000,
      availableArea: 3000,
      address: "Vesta Park Guadalupe, Monterrey",
      market: "Monterrey",
    },
    {
      source: "Prologis",
      latitude: 19.35,
      longitude: -99.05,
      totalArea: 20000,
      availableArea: 8000,
      address: "Prologis Iztapalapa, CDMX",
      market: "Mexico City",
    },
    {
      source: "Vesta",
      latitude: 20.5888,
      longitude: -100.3899,
      totalArea: 18000,
      availableArea: 10000,
      address: "Vesta Queretaro Industrial",
      market: "Queretaro",
    }
  ]

  console.log("Seeding properties...")
  for (const p of properties) {
    await prisma.property.create({
      data: p
    })
  }
  console.log("Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
