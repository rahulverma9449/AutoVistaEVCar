import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";
function HomePage() {
  useEffect(() => {
    document.title = "AutoVista - Find Your Perfect Car";
    window.scrollTo(0, 0);
  }, []);
  return <><HeroSection /><FeaturedCars /><Services /><Testimonials /><CtaSection /></>;
}
export {
  HomePage as default
};
