import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Award,
  Shield,
  ArrowRight,
  Car,
  CheckCircle,
  Star,
  Calendar
} from "lucide-react";
function AboutPage() {
  useEffect(() => {
    document.title = "About Us - AutoVista";
    window.scrollTo(0, 0);
  }, []);
  return <div className="mt-20 py-8"><Container>{
    /* Hero Section */
  }<div className="text-center max-w-3xl mx-auto mb-16"><h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            About AutoVista
          </h1><p className="text-xl text-slate-600 dark:text-slate-400">
            We're on a mission to transform the car buying and selling experience with 
            transparency, trust, and technology.
          </p></div>{
    /* Our Story */
  }<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"><div><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 mb-4"><Building2 className="h-6 w-6" /></div><h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Story
            </h2><p className="text-slate-600 dark:text-slate-400 mb-4">
              Founded in 2022, AutoVista began with a simple idea: make buying and selling cars 
              easier, more transparent, and more enjoyable. We noticed that the traditional car 
              marketplace was complex, confusing, and often stressful for both buyers and sellers.
            </p><p className="text-slate-600 dark:text-slate-400 mb-4">
              Our team of automotive enthusiasts and technology experts came together to create 
              a platform that simplifies the process while providing comprehensive information and 
              tools to help you make informed decisions.
            </p><p className="text-slate-600 dark:text-slate-400">
              Today, AutoVista serves thousands of customers across the country, connecting 
              buyers with their dream cars and helping sellers find the right buyers quickly and easily.
            </p></div><div className="relative"><img
    src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Car showroom"
    className="rounded-lg shadow-lg object-cover h-[400px] w-full"
  /><div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-blue-700 dark:text-blue-400" /><span className="font-semibold">Est. 2022</span></div></div></div></div>{
    /* Our Mission & Values */
  }<div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 md:p-12 mb-20"><div className="text-center max-w-3xl mx-auto mb-12"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 mb-4"><Award className="h-6 w-6" /></div><h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Mission & Values
            </h2><p className="text-slate-600 dark:text-slate-400">
              We're guided by a set of core principles that influence everything we do.
            </p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We provide verified listings, detailed histories, and all the information you need to make confident decisions."
    },
    {
      icon: CheckCircle,
      title: "Quality & Excellence",
      description: "We maintain high standards in our service and the vehicles on our platform, ensuring you get the best experience."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to providing personalized support throughout your journey."
    }
  ].map((value, index) => <div
    key={index}
    className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
  ><div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 mb-4"><value.icon className="h-5 w-5" /></div><h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{value.title}</h3><p className="text-slate-600 dark:text-slate-400">{value.description}</p></div>)}</div></div>{
    /* Why Choose Us */
  }<div className="mb-20"><div className="text-center max-w-3xl mx-auto mb-12"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 mb-4"><Star className="h-6 w-6" /></div><h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Choose AutoVista
            </h2><p className="text-slate-600 dark:text-slate-400">
              What sets us apart from traditional car marketplaces
            </p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{[
    {
      title: "Comprehensive Vehicle Information",
      description: "Each listing provides detailed specifications, high-quality photos, and transparent history."
    },
    {
      title: "Verified Sellers",
      description: "We verify all dealers and private sellers to ensure a safe and trustworthy marketplace."
    },
    {
      title: "Powerful Search Tools",
      description: "Our advanced filters help you find exactly what you're looking for quickly and easily."
    },
    {
      title: "Expert Support",
      description: "Our team of automotive experts is always available to answer questions and provide guidance."
    }
  ].map((feature, index) => <div
    key={index}
    className="flex gap-4"
  ><div className="mt-1"><CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" /></div><div><h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{feature.title}</h3><p className="text-slate-600 dark:text-slate-400">{feature.description}</p></div></div>)}</div></div>{
    /* Team */
  }<div className="mb-20"><div className="text-center max-w-3xl mx-auto mb-12"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 mb-4"><Users className="h-6 w-6" /></div><h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Meet Our Team
            </h2><p className="text-slate-600 dark:text-slate-400">
              The passionate people behind AutoVista
            </p></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{[
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Sarah Chen",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Emily Taylor",
      role: "Customer Success Manager",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ].map((member, index) => <div key={index} className="text-center"><div className="relative mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden"><img
    src={member.image}
    alt={member.name}
    className="w-full h-full object-cover"
  /></div><h3 className="text-lg font-semibold text-slate-900 dark:text-white">{member.name}</h3><p className="text-slate-600 dark:text-slate-400">{member.role}</p></div>)}</div></div>{
    /* CTA */
  }<div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center"><Car className="h-16 w-16 mx-auto mb-6 text-blue-300 opacity-80" /><h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Car?
          </h2><p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
            Browse our extensive inventory or contact our team for personalized assistance.
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
  ><Link to="/contact">
                Contact Us
              </Link></Button></div></div></Container></div>;
}
export {
  AboutPage as default
};
