"use client"

import { motion } from "framer-motion"
import { BarChart3, Building2, Map, Search, FileText, ArrowUpRight, Database } from "lucide-react"

export function Features() {
  const features = [
    {
      title: "Explorador de Mercado",
      description: "Visualiza inventario industrial, oficinas y retail en más de 25 ciudades.",
      icon: <Map className="h-8 w-8 text-primary" />,
      className: "md:col-span-2",
      delay: 0.1,
    },
    {
      title: "Analytics Avanzados",
      description: "Dashboards interactivos con tasas de absorción y precios.",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
      delay: 0.2,
    },
    {
      title: "Reportes Automatizados",
      description: "Genera comparables (CMAs) y fichas técnicas en PDF con un clic.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
      delay: 0.3,
    },
    {
      title: "Directorio de Contactos",
      description: "Base de datos de top propietarios y brokers.",
      icon: <Search className="h-8 w-8 text-primary" />,
      className: "md:col-span-2",
      delay: 0.4,
    },
    {
      title: "Pipeline de Desarrollo",
      description: "Monitorea obras en construcción y tiempos de entrega.",
      icon: <Building2 className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
      delay: 0.5,
    },
    {
      title: "Tendencias de Mercado",
      description: "Indicadores predictivos y análisis de demanda.",
      icon: <ArrowUpRight className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
      delay: 0.6,
    },
    {
       title: "API Integration",
       description: "Conecta Dataz con tu CRM o ERP.",
       icon: <Database className="h-8 w-8 text-primary" />,
       className: "md:col-span-1",
       delay: 0.7,
    }
  ]

  return (
    <section id="features" className="container py-32 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background -z-10" />
      
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-2"
        >
            Potencia tu Análisis
        </motion.div>
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
        >
            Todo lo que necesitas para <span className="text-gradient">cerrar tratos</span>
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-[700px] text-muted-foreground text-lg sm:text-xl/relaxed"
        >
          Nuestra tecnología agiliza tu proceso de investigación y comercialización con herramientas diseñadas para expertos.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: feature.delay }}
            viewport={{ once: true }}
            className={`${feature.className} group`}
            whileHover={{ y: -5 }}
          >
            <div className="h-full glass-card p-8 rounded-3xl relative overflow-hidden group-hover:bg-primary/5 transition-colors border-white/10 flex flex-col">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                    {/* Background Icon Decoration */}
                    {feature.icon}
               </div>

              <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-500/10 w-14 h-14 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
