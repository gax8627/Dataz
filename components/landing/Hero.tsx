"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Database, TrendingUp, Layers } from "lucide-react"
import { useEffect, useRef } from "react"

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
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] bg-orange-400/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
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
           className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium border border-primary/20 bg-primary/5 text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(255,107,53,0.3)]"
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
            <Button size="lg" className="group w-full sm:w-auto h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,107,53,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,107,53,0.7)] transition-all duration-300 bg-gradient-to-r from-primary to-orange-600 border-0">
              Solicitar Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-full backdrop-blur-md border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300">
              Ver Demo en Vivo
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
            
            <div className="relative rounded-t-3xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[400px] md:min-h-[600px] flex items-center justify-center border-b-0 transform-gpu transition-transform duration-500 hover:scale-[1.01]">
                {/* Simulated UI/Dashboard elements would go here - possibly an Image or a Video */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-mono tracking-widest uppercase">
                    <div className="text-center space-y-4">
                         <div className="w-24 h-24 rounded-full border-4 border-white/10 mx-auto flex items-center justify-center animate-pulse">
                             <div className="w-4 h-4 rounded-full bg-primary" />
                         </div>
                         <p>3D Interactive Map Loading...</p>
                    </div>
                </div>
                
                {/* Floating Stats Cards */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute top-12 left-12 glass-card p-6 rounded-2xl hidden md:block"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Absorción Neta</p>
                            <p className="text-2xl font-bold">+12.5%</p>
                        </div>
                    </div>
                </motion.div>

                 <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-12 right-12 glass-card p-6 rounded-2xl hidden md:block"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-500">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Nuevos Proyectos</p>
                            <p className="text-2xl font-bold">24</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>

      </div>
    </section>
  )
}

function GlobeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}

