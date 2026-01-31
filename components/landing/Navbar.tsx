"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const navLinks = [
    { href: "#features", label: "Características" },
    { href: "#solutions", label: "Soluciones" },
    { href: "#pricing", label: "Precios" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "glass-nav py-2" 
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="container px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative group">
            <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-500 pb-1">
              Dataz<span className="text-foreground">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full scale-0 group-hover:scale-100 origin-left" />
                </Link>
            ))}
            
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                
                <Link href="/api/auth/signin">
                    <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary rounded-full px-6">Iniciar Sesión</Button>
                </Link>
                <Link href="#pricing">
                    <Button className="rounded-full shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.6)] transition-all duration-300">Prueba Gratis</Button>
                </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="rounded-full">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 rounded-3xl glass text-foreground flex flex-col space-y-4 shadow-2xl md:hidden z-50"
          >
              {navLinks.map((link) => (
                  <Link 
                      key={link.href} 
                      href={link.href} 
                      className="text-base font-medium py-3 px-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between group"
                      onClick={() => setIsMenuOpen(false)}
                  >
                      {link.label}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
                  <Link href="/api/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl h-12">Iniciar Sesión</Button>
                  </Link>
                  <Link href="#pricing" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full rounded-xl h-12 shadow-lg shadow-primary/20">Comenzar Prueba Gratis</Button>
                  </Link>
              </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  )
}


