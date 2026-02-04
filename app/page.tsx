import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import dynamic from "next/dynamic";
import { Solutions } from "@/components/landing/Solutions";
const PropertyMap = dynamic(() => import("@/components/landing/PropertyMap").then(mod => mod.PropertyMap), { ssr: false })
import { Pricing } from "@/components/landing/Pricing";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Features />
        <Solutions />
        <PropertyMap />
        <Pricing />
      </main>
    </div>
  );
}
