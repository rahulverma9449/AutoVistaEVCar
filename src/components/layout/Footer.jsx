import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function Footer() {
  return <footer className="bg-slate-900 text-slate-200"><div className="container mx-auto px-4 py-12"><div className="grid grid-cols-1 gap-8 md:grid-cols-4"><div className="space-y-4"><Link to="/" className="flex items-center gap-2 text-2xl font-bold"><Car className="h-7 w-7 text-blue-400" /><span className="text-white">AutoVista</span></Link><p className="text-slate-400 max-w-xs">
              Finding your perfect car has never been easier. Browse our
              selection of premium vehicles.
            </p><div className="flex gap-4"><Button
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
  ><Facebook size={18} /><span className="sr-only">Facebook</span></Button><Button
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
  ><Twitter size={18} /><span className="sr-only">Twitter</span></Button><Button
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
  ><Instagram size={18} /><span className="sr-only">Instagram</span></Button><Button
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
  ><Youtube size={18} /><span className="sr-only">YouTube</span></Button></div></div><div><h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3><ul className="space-y-3">{["Home", "Cars", "About", "Contact", "Sell Your Car"].map((item, index) => <li key={index}><Link
    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
    className="text-slate-400 hover:text-blue-400 transition-colors"
  >{item}</Link></li>)}</ul></div><div><h3 className="text-lg font-semibold mb-4 text-white">Support</h3><ul className="space-y-3">{["FAQ", "Privacy Policy", "Terms of Service", "Financing", "Car Insurance"].map((item, index) => <li key={index}><Link
    to="#"
    className="text-slate-400 hover:text-blue-400 transition-colors"
  >{item}</Link></li>)}</ul></div><div><h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3><p className="text-slate-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p><div className="flex flex-col gap-3"><Input
    type="email"
    placeholder="Your email address"
    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
  /><Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button></div></div></div><div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500"><p>© {(/* @__PURE__ */ new Date()).getFullYear()} AutoVista. All rights reserved.</p></div></div></footer>;
}
export {
  Footer as default
};
