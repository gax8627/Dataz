import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PropertyAdminContent, Property } from "@/components/admin/PropertyAdminContent"

export default async function PropertyAdminPage() {
  const session = await getServerSession(authOptions)
  
  // Basic Admin Gate
  if (!session?.user?.email?.endsWith("@datoz.com")) {
    // redirect("/dashboard")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties = await (prisma as any).property.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 50
  })

  return (
    <PropertyAdminContent properties={properties as Property[]} />
  )
}
