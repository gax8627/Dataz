import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t pt-16 pb-8 bg-background/50 backdrop-blur-lg">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
                <h3 className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                    Dataz.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    La plataforma líder de inteligencia inmobiliaria en México. Conectando datos, personas y decisiones con tecnología de punta.
                </p>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">Producto</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Link href="#features" className="hover:text-primary transition-colors">Características</Link></li>
                    <li><Link href="#solutions" className="hover:text-primary transition-colors">Soluciones</Link></li>
                    <li><Link href="#pricing" className="hover:text-primary transition-colors">Precios</Link></li>
                    <li><Link href="/api" className="hover:text-primary transition-colors">API Docs</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">Compañía</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Link href="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
                    <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                    <li><Link href="/careers" className="hover:text-primary transition-colors">Carreras</Link></li>
                    <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacidad</Link></li>
                    <li><Link href="/terms" className="hover:text-primary transition-colors">Términos</Link></li>
                    <li><Link href="/security" className="hover:text-primary transition-colors">Seguridad</Link></li>
                </ul>
                
                <div className="flex space-x-4 mt-6">
                    <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Dataz Inc. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                System Operational
            </div>
        </div>
      </div>
    </footer>
  )
}
