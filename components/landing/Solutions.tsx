"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Solutions() {
  const solutions = [
    {
      title: "Para Desarrolladores",
      description: "Identifica la demanda insatisfecha y optimiza tu pipeline de construcción con datos precisos de absorción.",
      features: ["Análisis de absorción neta", "Precios de renta por submercado", "Tracking de construcción"],
      cta: "Planificar Desarrollo",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Para Brokers",
      description: "Cierra tratos más rápido armando pitches con datos irrefutables de mercado en tiempo real.",
      features: ["Disponibilidad en tiempo real", "Fichas técnicas de marca blanca", "Historial de transacciones"],
      cta: "Empoderar Equipo",
      gradient: "from-primary/20 to-orange-500/20"
    },
    {
      title: "Para Inversionistas",
      description: "Maximiza el retorno y minimiza el riesgo validando tus tesis de inversión con inteligencia predictiva.",
      features: ["Cap rates de mercado", "Tendencias de vacancia", "Benchmarking de activos"],
      cta: "Ver Oportunidades",
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ]

  return (
    <section id="solutions" className="container py-32 px-4 md:px-6 relative overflow-hidden">
        {/* Background blobs for liquid feel */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />

      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-24">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Soluciones a la medida de tu <span className="text-gradient">Rol</span></h2>
            <p className="max-w-[900px] text-muted-foreground sm:text-xl/relaxed mx-auto">
            Diseñado específicamente para los jugadores clave del sector inmobiliario comercial.
            </p>
        </motion.div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="flex flex-col rounded-3xl glass-card p-1 overflow-hidden group"
          >
            <div className={`h-2 w-full bg-gradient-to-r ${solution.gradient} rounded-t-2xl opacity-50`} />
            <div className="p-8 flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-b-2xl">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.gradient} mb-6 flex items-center justify-center`}>
                     {/* Abstract shape icon representation */}
                     <div className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-md" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">{solution.description}</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                    {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium">
                            <div className="p-1 rounded-full bg-primary/10">
                                <Check className="h-3 w-3 text-primary" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 justify-between">
                    {solution.cta}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
