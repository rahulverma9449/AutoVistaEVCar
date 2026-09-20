import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
function CtaSection() {
  return <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-800 relative overflow-hidden">{
    /* Background pattern */
  }<div
    className="absolute inset-0 z-0 opacity-10"
    style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
    }}
  /><Container className="relative z-10"><div className="max-w-4xl mx-auto text-center text-white"><h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Car?
          </h2><p className="text-xl mb-10 text-blue-100">
            Browse our extensive inventory or list your vehicle for sale. 
            We make the process simple and stress-free.
          </p><div className="flex flex-col sm:flex-row justify-center gap-4"><Button
    asChild
    size="lg"
    className="bg-white text-blue-700 hover:bg-blue-50"
  ><Link to="/cars">
                Browse Inventory
                <ArrowRight className="ml-2 h-5 w-5" /></Link></Button><Button
    asChild
    size="lg"
    variant="outline"
    className="border-white text-white hover:bg-white/20"
  ><Link to="/contact"><Phone className="mr-2 h-5 w-5" />
                Contact Sales
              </Link></Button></div><p className="mt-10 text-blue-200">
            Not finding what you're looking for? 
            <Link to="/contact" className="underline ml-1 hover:text-white transition-colors">
              Let us know and we'll help you find it.
            </Link></p></div></Container></section>;
}
export {
  CtaSection as default
};
