import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { BarChart, FileText, Home, LogOut } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
            <h1 className="font-bold text-xl">Dataz<span className="text-primary">.</span></h1>
            <p className="text-xs text-muted-foreground mt-1">Competencia 2026</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
                <Home className="w-5 h-5" />
                Inicio
            </Link>
            <Link href="/dashboard/submission" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <FileText className="w-5 h-5" />
                Mi Entrega
            </Link>
            <Link href="/dashboard/resources" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <BarChart className="w-5 h-5" />
                Recursos
            </Link>
        </nav>
        <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {session.user?.email?.[0].toUpperCase()}
                </div>
                <div className="text-sm overflow-hidden">
                    <p className="font-medium truncate">{session.user?.email}</p>
                </div>
            </div>
            <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
