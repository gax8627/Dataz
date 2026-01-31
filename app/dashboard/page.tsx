import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Upload } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hola, {session?.user?.name || "Participante"}</h2>
        <p className="text-muted-foreground">Bienvenido al portal de la competencia.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estado</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-orange-500">En Progreso</div>
                <p className="text-xs text-muted-foreground">Fase de análisis activa</p>
            </CardContent>
        </Card>
        
        <Card className="col-span-2 bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle>Tu Entrega</CardTitle>
                <CardDescription>Tienes hasta el 15 de marzo para subir tu PDF.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/dashboard/submission">
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Comenzar Entrega
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
