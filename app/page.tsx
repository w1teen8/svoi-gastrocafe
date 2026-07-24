import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Reservation from "@/components/Reservation";
import Contacts from "@/components/Contacts";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <MenuSection />
      <WhyChooseUs />
      <Events />
      <Gallery />
      <Reviews />
      <FAQ />
      <Reservation />
      <Contacts />
      <FinalCTA />
    </main>
  );
}
