"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const data = [
  { month: "Jan", absorption: 45000, vacancy: 4.5 },
  { month: "Feb", absorption: 52000, vacancy: 4.3 },
  { month: "Mar", absorption: 48000, vacancy: 4.4 },
  { month: "Apr", absorption: 61000, vacancy: 4.1 },
  { month: "May", absorption: 55000, vacancy: 4.2 },
  { month: "Jun", absorption: 67000, vacancy: 3.9 },
]

export function MarketChart() {
  const { t } = useLanguage()

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{t("dashboard.charts.absorption")}</CardTitle>
        <CardDescription>{t("dashboard.charts.absDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
            <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
            />
            <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px"
                }}
            />
            <Legend />
            <Bar dataKey="absorption" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name={t("dashboard.charts.absLabel")} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
