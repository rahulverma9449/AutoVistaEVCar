import { CircleDollarSign, Shield, Clock, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
const services = [
  {
    icon: CircleDollarSign,
    title: "Competitive Pricing",
    description: "We offer transparent pricing with no hidden fees. Our goal is to provide the best value for your money."
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every vehicle in our inventory undergoes a thorough inspection process to ensure quality and reliability."
  },
  {
    icon: Clock,
    title: "Quick & Easy Process",
    description: "Our streamlined buying process saves you time and hassle. From browsing to driving home, we make it simple."
  },
  {
    icon: Award,
    title: "Customer Satisfaction",
    description: "We pride ourselves on exceptional customer service. Your satisfaction is our top priority."
  }
];
function Services() {
  return <section className="py-20"><Container><div className="text-center mb-12"><h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Why Choose AutoVista
          </h2><p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            We're committed to providing an exceptional car buying experience with these premium services
          </p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{services.map((service, index) => <div
    key={index}
    className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-800"
  ><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 mb-4"><service.icon className="h-6 w-6" /></div><h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{service.title}</h3><p className="text-slate-600 dark:text-slate-400">{service.description}</p></div>)}</div></Container></section>;
}
export {
  Services as default
};
