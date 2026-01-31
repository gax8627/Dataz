"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Pricing() {
  const [isAnnual, setIsAnnual] = React.useState(true)

  return (
    <section id="pricing" className="container py-32 px-4 md:px-6 relative">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Planes diseñados para crecer</h2>
        <p className="max-w-[900px] text-muted-foreground sm:text-xl/relaxed">
          Elige el plan que mejor se adapte a tus necesidades de información.
        </p>
        
        <div className="flex items-center space-x-4 mt-8 bg-muted/50 p-1.5 rounded-full border border-border/50">
            <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
                Mensual
            </button>
            <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
                Anual
                <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full border border-green-500/20">-20%</span>
            </button>
        </div>
      </div>
      
      <div className="grid max-w-6xl mx-auto gap-8 md:grid-cols-3 items-start">
        {/* Starter Plan */}
        <Card className="flex flex-col glass-card border-border/50 bg-white/40 dark:bg-black/40">
            <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>Para consultores independientes</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${isAnnual ? 159 : 199}</span>
                    <span className="text-muted-foreground">/mes</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> Acceso a 1 Mercado</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> Búsqueda básica</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> 5 Reportes PDF / mes</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full rounded-xl" variant="outline">Comenzar Gratis</Button>
            </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col glass-card border-primary/50 shadow-2xl relative scale-105 z-10 bg-white/60 dark:bg-black/60">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <div className="bg-gradient-to-r from-primary to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">POPULAR</div>
            </div>
            <CardHeader className="pt-10">
                <CardTitle className="text-xl text-primary">Professional</CardTitle>
                <CardDescription>Para equipos comerciales</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-bold">${isAnnual ? 399 : 499}</span>
                    <span className="text-muted-foreground">/mes</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-4 text-sm font-medium">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Acceso Nacional (Todos los mercados)</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Filtros avanzados y Analytics</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Reportes ilimitados</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Exportación a Excel</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full h-12 rounded-xl text-lg shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">Prueba de 14 Días</Button>
            </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col glass-card border-border/50 bg-white/40 dark:bg-black/40">
            <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <CardDescription>Para grandes corporativos</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">Custom</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> Multi-usuario y control de accesos</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> API de integración</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> Soporte dedicado 24/7</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500 flex-shrink-0" /> Data warehouse personalizada</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full rounded-xl" variant="outline">Contactar Ventas</Button>
            </CardFooter>
        </Card>
      </div>
    </section>
  )
}
