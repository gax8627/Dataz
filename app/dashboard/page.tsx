import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DashboardContent } from "@/components/dashboard/DashboardContent"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <DashboardContent userName={session?.user?.name} />
  )
}
