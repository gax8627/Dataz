import React from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function Pricing() {
  const { t } = useLanguage()
  const [isAnnual, setIsAnnual] = React.useState(true)

  return (
    <section id="pricing" className="container py-32 px-4 md:px-6 relative">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("pricing.title")}</h2>
        <p className="max-w-[900px] text-muted-foreground sm:text-xl/relaxed">
          {t("pricing.description")}
        </p>
        
        <div className="flex items-center space-x-4 mt-8 bg-muted/50 p-1.5 rounded-full border border-border/50">
            <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
                {t("pricing.monthly")}
            </button>
            <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
                {t("pricing.annual")}
                <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full border border-green-500/20">{t("pricing.savePercent")}</span>
            </button>
        </div>
      </div>
      
      <div className="grid max-w-6xl mx-auto gap-8 md:grid-cols-3 items-start">
        {/* Starter Plan */}
        <Card className="flex flex-col glass-card border-border/50 bg-white/40 dark:bg-black/40">
            <CardHeader>
                <CardTitle className="text-xl">{t("pricing.starter.title")}</CardTitle>
                <CardDescription>{t("pricing.starter.description")}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${isAnnual ? 159 : 199}</span>
                    <span className="text-muted-foreground">{t("pricing.perMonth")}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.starter.features.0")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.starter.features.1")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.starter.features.2")}</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full rounded-xl" variant="outline">{t("navbar.freeTrial")}</Button>
            </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col glass-card border-primary/50 shadow-2xl relative scale-105 z-10 bg-white/60 dark:bg-black/60">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">{t("pricing.professional.popular")}</div>
            </div>
            <CardHeader className="pt-10">
                <CardTitle className="text-xl text-primary">{t("pricing.professional.title")}</CardTitle>
                <CardDescription>{t("pricing.professional.description")}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-bold">${isAnnual ? 399 : 499}</span>
                    <span className="text-muted-foreground">{t("pricing.perMonth")}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-4 text-sm font-medium">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> {t("pricing.professional.features.0")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> {t("pricing.professional.features.1")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> {t("pricing.professional.features.2")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> {t("pricing.professional.features.3")}</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full h-12 rounded-xl text-lg shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">{t("pricing.professional.cta")}</Button>
            </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col glass-card border-border/50 bg-white/40 dark:bg-black/40">
            <CardHeader>
                <CardTitle className="text-xl">{t("pricing.enterprise.title")}</CardTitle>
                <CardDescription>{t("pricing.enterprise.description")}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{t("pricing.enterprise.custom")}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.enterprise.features.0")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.enterprise.features.1")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.enterprise.features.2")}</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> {t("pricing.enterprise.features.3")}</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full rounded-xl" variant="outline">{t("pricing.enterprise.cta")}</Button>
            </CardFooter>
        </Card>
      </div>
    </section>
  )
}
