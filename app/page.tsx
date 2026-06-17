import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import QuickInfoCards from "@/components/sections/QuickInfoCards";
import Legacy from "@/components/sections/Legacy";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LuxuryLiving from "@/components/sections/LuxuryLiving";
import Location from "@/components/sections/Location";
import Construction from "@/components/sections/Construction";
import Investment from "@/components/sections/Investment";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="flex flex-1 flex-col">
        <Hero />
        <QuickInfoCards />
        <Legacy />
        <FeaturedProjects />
        <LuxuryLiving />
        <Location />
        <Construction />
        <Investment />
      </main>
      <Footer />
    </>
  );
}
