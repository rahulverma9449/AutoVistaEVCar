import { useState } from "react";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/cars";
import { cn } from "@/lib/utils";
function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white"><Container><div className="flex flex-col items-center mb-12 text-center"><Quote className="h-12 w-12 mb-4 text-blue-300 opacity-50" /><h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2><p className="max-w-2xl text-blue-200">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with AutoVista.
          </p></div><div className="relative max-w-5xl mx-auto px-4"><div className="relative overflow-hidden min-h-[300px]">{testimonials.map((testimonial, index) => <div
    key={testimonial.id}
    className={cn(
      "absolute w-full transition-all duration-500 ease-in-out",
      {
        "opacity-100 translate-x-0": index === activeIndex,
        "opacity-0 translate-x-full": index > activeIndex,
        "opacity-0 -translate-x-full": index < activeIndex
      }
    )}
  ><div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-lg"><div className="flex items-center mb-6"><img
    src={testimonial.avatar}
    alt={testimonial.name}
    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-blue-300"
  /><div><h3 className="text-xl font-semibold">{testimonial.name}</h3><p className="text-blue-200">{testimonial.role}</p><div className="flex mt-1">{[...Array(5)].map((_, i) => <Star
    key={i}
    className={cn(
      "h-4 w-4",
      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-blue-300"
    )}
  />)}</div></div></div><p className="text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </p></div></div>)}</div><div className="flex justify-center mt-8 gap-3"><Button
    variant="outline"
    size="icon"
    onClick={prevTestimonial}
    className="rounded-full border-blue-300 text-blue-200 hover:bg-blue-700 hover:text-white"
  ><ArrowLeft className="h-5 w-5" /><span className="sr-only">Previous</span></Button><div className="flex items-center gap-2">{testimonials.map((_, index) => <button
    key={index}
    onClick={() => setActiveIndex(index)}
    className={cn(
      "w-2 h-2 rounded-full transition-all",
      index === activeIndex ? "bg-white w-4" : "bg-blue-300/50 hover:bg-blue-300"
    )}
    aria-label={`Go to slide ${index + 1}`}
  />)}</div><Button
    variant="outline"
    size="icon"
    onClick={nextTestimonial}
    className="rounded-full border-blue-300 text-blue-200 hover:bg-blue-700 hover:text-white"
  ><ArrowRight className="h-5 w-5" /><span className="sr-only">Next</span></Button></div></div></Container></section>;
}
export {
  Testimonials as default
};
