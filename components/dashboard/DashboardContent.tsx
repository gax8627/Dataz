"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Upload } from "lucide-react"
import Link from "next/link"
import { MarketChart } from "@/components/dashboard/MarketChart"
import { useLanguage } from "@/lib/i18n/LanguageContext"

interface DashboardContentProps {
  userName?: string | null
}

export function DashboardContent({ userName }: DashboardContentProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("dashboard.welcome", { name: userName || "Member" })}
        </h2>
        <p className="text-muted-foreground">{t("dashboard.tagline")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.awareness.title")}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-primary">{t("dashboard.awareness.status")}</div>
                <p className="text-xs text-muted-foreground">{t("dashboard.awareness.desc")}</p>
            </CardContent>
        </Card>
        
        <Card className="col-span-2 bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle>{t("dashboard.submission.title")}</CardTitle>
                <CardDescription>{t("dashboard.submission.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/dashboard/submission">
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        {t("dashboard.submission.cta")}
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
            <MarketChart />
        </div>
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Insights</CardTitle>
                <CardDescription>AI-generated newsletter snippets.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="border-l-2 border-primary pl-4 py-1">
                        <p className="text-sm font-medium">Nearshoring Boom</p>
                        <p className="text-xs text-muted-foreground">Monterrey leads in absorption for Q1 2026.</p>
                    </div>
                    <div className="border-l-2 border-cyan-500 pl-4 py-1">
                        <p className="text-sm font-medium">Rental Growth</p>
                        <p className="text-xs text-muted-foreground">Class A rents increased by 12% in Tijuana.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
