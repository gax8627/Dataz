import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  metadataBase: new URL("https://datoz.com"), // Fallback if not provided in env, though ideally strictly env
  title: {
    default: "Dataz | Plataforma de Inteligencia Inmobiliaria",
    template: "%s | Dataz"
  },
  description: "La plataforma más completa de análisis y monitoreo para activos industriales, oficinas y retail en México. Toma decisiones con datos verificados.",
  keywords: ["real estate", "inteligencia inmobiliaria", "mexico", "industrial", "oficinas", "retail", "dataz", "mercado inmobiliario"],
  authors: [{ name: "Datoz" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://datoz.com",
    title: "Dataz | Inteligencia Inmobiliaria Accionable",
    description: "Monitorea más de 25 mercados en México con la base de datos más confiable del sector.",
    siteName: "Dataz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataz | Inteligencia Inmobiliaria",
    description: "Datos precisos. Decisiones estratégicas.",
    creator: "@datoz_mx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        montserrat.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
