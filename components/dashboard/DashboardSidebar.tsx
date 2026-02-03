"use client"

import Link from "next/link"
import { BarChart, FileText, Home, LogOut } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

interface SidebarProps {
  userEmail?: string | null
}

export function DashboardSidebar({ userEmail }: SidebarProps) {
  const { t } = useLanguage()

  return (
    <aside className="w-64 bg-card border-r hidden md:flex flex-col">
      <div className="p-6 border-b">
        <h1 className="font-bold text-xl">Dataz<span className="text-primary">.</span></h1>
        <p className="text-xs text-muted-foreground mt-1">{t("dashboard.sidebar.portal")}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
          <BarChart className="w-5 h-5" />
          {t("dashboard.sidebar.overview")}
        </Link>
        <Link href="/dashboard/submission" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <FileText className="w-5 h-5" />
          {t("dashboard.sidebar.dataSubmit")}
        </Link>
        <Link href="/dashboard/resources" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <Home className="w-5 h-5" />
          {t("dashboard.sidebar.resources")}
        </Link>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
            {userEmail?.[0].toUpperCase() || "U"}
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-medium truncate">{userEmail}</p>
          </div>
        </div>
        <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          {t("dashboard.sidebar.signOut")}
        </Link>
      </div>
    </aside>
  )
}
