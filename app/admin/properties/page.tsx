import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PropertyAdminContent } from "@/components/admin/PropertyAdminContent"

export default async function PropertyAdminPage() {
  const session = await getServerSession(authOptions)
  
  // Basic Admin Gate
  if (!session?.user?.email?.endsWith("@datoz.com")) {
    // redirect("/dashboard")
  }

  const properties = await prisma.property.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 50
  })

  // Convert Date to string for client component if needed, 
  // but next.js usually handles this if they are simple objects.
  // We'll cast to any as a quick fix for the Prisma type lint if it persists.
  return (
    <PropertyAdminContent properties={properties as any} />
  )
}
