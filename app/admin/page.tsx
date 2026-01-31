import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
// import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Users, FileText, CheckCircle } from "lucide-react"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  // Basic Admin Gate - In production use role check
  if (!session?.user?.email?.endsWith("@datoz.com")) {
      // return redirect("/dashboard") // Commented out for demo purposes to allow testing
  }

  const usersCount = await prisma.user.count()
  const submissionsCount = await prisma.submission.count()
  
  // Fetch users with submissions
  const users = await prisma.user.findMany({
    include: { submissions: true },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{usersCount}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{submissionsCount}</div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Inscritos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user: any) => (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.company}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                {user.submissions.length > 0 ? (
                                    <span className="flex items-center text-green-600 text-xs font-medium">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Entregado
                                    </span>
                                ) : (
                                    <span className="text-muted-foreground text-xs">Pendiente</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
