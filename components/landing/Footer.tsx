"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t pt-16 pb-8 bg-background/50 backdrop-blur-lg">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
                <h3 className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-500">
                    Dataz.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {t("footer.tagline")}
                </p>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">{t("footer.product")}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Link href="#features" className="hover:text-primary transition-colors">{t("navbar.features")}</Link></li>
                    <li><Link href="#solutions" className="hover:text-primary transition-colors">{t("navbar.solutions")}</Link></li>
                    <li><Link href="#pricing" className="hover:text-primary transition-colors">{t("navbar.pricing")}</Link></li>
                    <li><Link href="/api" className="hover:text-primary transition-colors">API Docs</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">{t("footer.company.title")}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Link href="/about" className="hover:text-primary transition-colors">{t("footer.company.about")}</Link></li>
                    <li><Link href="/blog" className="hover:text-primary transition-colors">{t("footer.company.blog")}</Link></li>
                    <li><Link href="/careers" className="hover:text-primary transition-colors">{t("footer.company.careers")}</Link></li>
                    <li><Link href="/contact" className="hover:text-primary transition-colors">{t("footer.company.contact")}</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">{t("footer.legal.title")}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Link href="/privacy" className="hover:text-primary transition-colors">{t("footer.legal.privacy")}</Link></li>
                    <li><Link href="/terms" className="hover:text-primary transition-colors">{t("footer.legal.terms")}</Link></li>
                    <li><Link href="/security" className="hover:text-primary transition-colors">{t("footer.legal.security")}</Link></li>
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
            <p>&copy; {currentYear} Dataz Inc. {t("footer.rights")}</p>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {t("footer.status")}
            </div>
        </div>
      </div>
    </footer>
  )
}
