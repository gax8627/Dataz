"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, MapPin, Building2, Calendar } from "lucide-react"
import Link from "next/link"
import { ImportTool } from "@/components/admin/ImportTool"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export interface Property {
  id: string
  source: string
  market: string
  totalArea: number
  availableArea: number
  updatedAt: string | Date
}

interface PropertyAdminContentProps {
  properties: Property[]
}

export function PropertyAdminContent({ properties }: PropertyAdminContentProps) {
  const { t } = useLanguage()

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary flex items-center mb-2">
            <ArrowLeft className="mr-1 h-3 w-3" /> {t("admin.manageMap")}
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">{t("admin.panel")}</h2>
          <p className="text-muted-foreground">{t("admin.importDesc")}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t("admin.recentProperties")}</CardTitle>
                    <CardDescription>Latest assets updated in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("admin.source")}</TableHead>
                                <TableHead>{t("admin.market")}</TableHead>
                                <TableHead>{t("admin.totalArea")}</TableHead>
                                <TableHead>{t("admin.available")}</TableHead>
                                <TableHead>{t("admin.updated")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {properties.map((prop) => (
                                <TableRow key={prop.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {prop.source}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {prop.market}
                                        </div>
                                    </TableCell>
                                    <TableCell>{prop.totalArea.toLocaleString()} m²</TableCell>
                                    <TableCell className="text-primary font-bold">{prop.availableArea.toLocaleString()} m²</TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(prop.updatedAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {properties.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                        No properties found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="border-primary/50 shadow-lg">
                <CardHeader>
                    <CardTitle>{t("admin.importTitle")}</CardTitle>
                    <CardDescription>{t("admin.importDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ImportTool />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
