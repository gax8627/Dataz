import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Solutions } from "@/components/landing/Solutions";
import { Pricing } from "@/components/landing/Pricing";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Solutions />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
