"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Database, TrendingUp, Layers } from "lucide-react"
import { useRef, useState } from "react"

interface Asset {
  name: string
  price: string
  vacancy: string
  available: string
  x: number
  y: number
}

export function Hero() {
  const ref = useRef(null)
  
  // Mouse Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX / innerWidth - 0.5)
    mouseY.set(clientY / innerHeight - 0.5)
  }

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Market Simulator State
  const [hoveredAsset, setHoveredAsset] = useState<Asset | null>(null)

  const markets: Record<string, Asset[]> = {
    industrial: [
      { name: "Monterrey", price: "$6.45", vacancy: "2.1%", available: "450k m²", x: 40, y: 30 },
      { name: "Tijuana", price: "$7.20", vacancy: "1.5%", available: "120k m²", x: 20, y: 20 },
      { name: "Ciudad Juárez", price: "$6.10", vacancy: "3.4%", available: "850k m²", x: 30, y: 15 },
      { name: "Bajío", price: "$5.80", vacancy: "4.2%", available: "1.2M m²", x: 45, y: 45 },
      { name: "CDMX", price: "$7.80", vacancy: "2.8%", available: "320k m²", x: 50, y: 60 },
    ],
    oficinas: [
      { name: "Reforma", price: "$28.50", vacancy: "18.5%", available: "95k m²", x: 52, y: 62 },
      { name: "Santa Fe", price: "$22.00", vacancy: "22.2%", available: "150k m²", x: 48, y: 58 },
      { name: "Polanco", price: "$32.00", vacancy: "12.1%", available: "42k m²", x: 50, y: 55 },
    ]
  }

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* Deep Background Layers */}
      <div className="absolute inset-0 z-0 bg-background" />
      
      {/* Dynamic Liquid Blobs */}
      <motion.div 
        style={{ y: yBackground, x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]), opacity: 0.6 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
      </motion.div>

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Floating Badge */}
        <motion.div
           style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]) }}
           initial={{ opacity: 0, y: -20, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.7, ease: "easeOut" }}
           className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium border border-primary/20 bg-primary/5 text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]"
        >
          <Database className="mr-2 h-4 w-4" />
          La plataforma #1 en México
        </motion.div>

        {/* Main Title with 3D feel */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative max-w-6xl mx-auto perspective-1000"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 drop-shadow-sm">
              Inteligencia
            </span>
            <span className="block text-gradient pb-2 drop-shadow-lg">
              Inmobiliaria
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Datos precisos, análisis predictivos y visualización 3D para dominar el mercado de activos <span className="text-foreground font-semibold">industriales, oficinas y retail</span>.
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 w-full justify-center mb-24 relative z-20"
        >
          <Link href="#demo">
            <Button size="lg" className="group w-full sm:w-auto h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.7)] transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 border-0">
              Solicitar Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-full backdrop-blur-md border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300">
              Explorar Mapa 3D
            </Button>
          </Link>
        </motion.div>

        {/* 3D Glass Stats Dashboard - "The Hero Product Shot" */}
        <motion.div
           initial={{ opacity: 0, y: 100, rotateX: 30 }}
           animate={{ opacity: 1, y: 0, rotateX: 0 }}
           transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 50 }}
           className="w-full max-w-6xl relative z-10 perspective-1000 group mx-auto"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent blur-[100px] -z-10 opacity-50" />
            
            <div className="relative rounded-t-3xl border border-border/50 bg-white/20 dark:bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[400px] md:min-h-[600px] flex items-center justify-center border-b-0 transform-gpu transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Advanced Simulated 3D Interface */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-4xl mx-auto">
                        {/* Simulated Grid Map */}
                        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:20px_20px] text-foreground" />
                        
                        {/* Interactive Market Selector Overlay */}
                        <div className="absolute top-4 left-4 z-30 flex gap-2">
                            <div className="glass-card px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border-primary/20 text-primary flex items-center gap-2 bg-white/60 dark:bg-black/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                LIVE: INDUSTRIAL - MÉXICO
                            </div>
                        </div>

                        {/* Floating Data Nodes (Interactive) */}
                        {markets.industrial.map((asset, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0.6, 1, 0.6], 
                                    scale: hoveredAsset?.name === asset.name ? 1.5 : [1, 1.2, 1],
                                }}
                                transition={{ 
                                    duration: 3 + i, 
                                    repeat: Infinity,
                                    delay: i * 0.2 
                                }}
                                onMouseEnter={() => setHoveredAsset(asset)}
                                onMouseLeave={() => setHoveredAsset(null)}
                                className="absolute w-6 h-6 rounded-full bg-primary/40 flex items-center justify-center cursor-crosshair z-20 group"
                                style={{
                                    left: `${asset.x}%`,
                                    top: `${asset.y}%`,
                                }}
                            >
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(99,102,241,1)]" />
                                
                                {/* Market Tooltip */}
                                {hoveredAsset?.name === asset.name && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="absolute bottom-full mb-4 glass-card p-4 rounded-xl min-w-[180px] text-left z-50 pointer-events-none bg-background/95 border-primary/20"
                                    >
                                        <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">{asset.name}</p>
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="text-muted-foreground font-medium">Asking Rent:</span>
                                                <span className="font-mono text-foreground">{asset.price} USD</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="text-muted-foreground font-medium">Disponibilidad:</span>
                                                <span className="font-mono text-foreground">{asset.available}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="text-muted-foreground font-medium">Vacancia:</span>
                                                <span className="font-mono text-primary">{asset.vacancy}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}

                        {/* Connection Lines (Simulated - Linking hotspots) */}
                        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
                            <motion.path 
                                d="M 400 300 Q 500 200 450 450 T 300 150"
                                fill="none"
                                stroke="url(#line-grad)"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 6, repeat: Infinity }}
                            />
                            <defs>
                                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--primary)" />
                                    <stop offset="100%" stopColor="#22d3ee" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center text-primary font-mono text-sm tracking-widest uppercase bg-transparent p-8 pointer-events-none">
                             <div className="text-center space-y-6">
                                  <div className="relative">
                                      {/* Radar Sync Animation (Instead of Loader) */}
                                      <div className="w-48 h-48 rounded-full border border-primary/10 mx-auto flex items-center justify-center relative">
                                          <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                                          <div className="absolute inset-4 rounded-full border border-primary/20 animate-ping animation-delay-2000 opacity-10" />
                                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_rgba(99,102,241,1)]" />
                                          </div>
                                      </div>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-bold text-lg text-foreground tracking-tight normal-case">Mercado en Tiempo Real</p>
                                    <p className="text-[10px] text-primary/80 font-semibold">ACTIVO: 2,491 activos monitoreados</p>
                                  </div>
                             </div>
                        </div>
                    </div>
                </div>
                
                {/* Floating Stats Cards */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute top-12 right-12 glass-card p-6 rounded-2xl hidden lg:block z-20 min-w-[200px]"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest">Market Stats</p>
                    </div>
                    <div className="space-y-3">
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 2, delay: 1.5 }} className="h-full bg-primary" />
                         </div>
                         <div className="flex justify-between items-end">
                              <p className="text-[10px] text-muted-foreground">Absorción Promedio</p>
                              <p className="text-sm font-bold">+12.5%</p>
                         </div>
                    </div>
                </motion.div>

                 <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-12 left-12 glass-card p-6 rounded-2xl hidden lg:block z-20"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Nuevos Proyectos</p>
                            <p className="text-xl font-bold">24</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>

      </div>
    </section>
  )
}



