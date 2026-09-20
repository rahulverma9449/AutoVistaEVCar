import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { contactAPI } from "@/lib/api";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  phone: z.string().optional(),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  })
});
function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    document.title = "Contact Us - AutoVista";
    window.scrollTo(0, 0);
  }, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });
  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      await contactAPI.sendMessage(values);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        variant: "default"
      });
      form.reset();
    } catch (error) {
      toast({ title: "Unable to send message", description: error.response?.data?.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }
  return <div className="mt-20 py-8"><Container>{
    /* Hero Section */
  }<div className="text-center max-w-3xl mx-auto mb-16"><h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Contact Us
          </h1><p className="text-xl text-slate-600 dark:text-slate-400">
            Have questions or need assistance? We're here to help!
          </p></div><div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">{
    /* Contact Information */
  }<div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-xl"><h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Get in Touch
            </h2><div className="space-y-6"><div className="flex items-start gap-4"><div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm"><Phone className="h-6 w-6 text-blue-700 dark:text-blue-400" /></div><div><h3 className="text-lg font-semibold mb-1 text-slate-900 dark:text-white">
                    Phone
                  </h3><p className="text-slate-600 dark:text-slate-400">
                    (555) 123-4567
                  </p><p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                    Monday to Friday, 9am to 6pm
                  </p></div></div><div className="flex items-start gap-4"><div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm"><Mail className="h-6 w-6 text-blue-700 dark:text-blue-400" /></div><div><h3 className="text-lg font-semibold mb-1 text-slate-900 dark:text-white">
                    Email
                  </h3><p className="text-slate-600 dark:text-slate-400">
                    info@autovista.com
                  </p><p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                    We'll respond as soon as possible
                  </p></div></div><div className="flex items-start gap-4"><div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm"><MapPin className="h-6 w-6 text-blue-700 dark:text-blue-400" /></div><div><h3 className="text-lg font-semibold mb-1 text-slate-900 dark:text-white">
                    Headquarters
                  </h3><p className="text-slate-600 dark:text-slate-400">
                    123 Auto Plaza Drive<br />
                    San Francisco, CA 94107
                  </p></div></div></div><div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700"><h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
                Business Hours
              </h3><div className="space-y-2"><div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Monday - Friday</span><span className="font-medium">9:00 AM - 6:00 PM</span></div><div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Saturday</span><span className="font-medium">10:00 AM - 4:00 PM</span></div><div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Sunday</span><span className="font-medium">Closed</span></div></div></div></div>{
    /* Contact Form */
  }<div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"><h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Send Us a Message
            </h2><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField
    control={form.control}
    name="name"
    render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>}
  /><FormField
    control={form.control}
    name="email"
    render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Your email" {...field} /></FormControl><FormMessage /></FormItem>}
  /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField
    control={form.control}
    name="phone"
    render={({ field }) => <FormItem><FormLabel>Phone (Optional)</FormLabel><FormControl><Input placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>}
  /><FormField
    control={form.control}
    name="subject"
    render={({ field }) => <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Message subject" {...field} /></FormControl><FormMessage /></FormItem>}
  /></div><FormField
    control={form.control}
    name="message"
    render={({ field }) => <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea
      placeholder="How can we help you?"
      className="min-h-[150px]"
      {...field}
    /></FormControl><FormMessage /></FormItem>}
  /><Button
    type="submit"
    className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
    disabled={isSubmitting}
  >{isSubmitting ? <span className="flex items-center"><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      Sending...
                    </span> : "Send Message"}</Button></form></Form></div></div>{
    /* FAQ Section */
  }<div className="max-w-3xl mx-auto"><h2 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2><div className="space-y-6">{[
    {
      question: "How do I list my car for sale?",
      answer: "To list your car, create an account and click on the 'Sell Your Car' button. You'll be guided through a step-by-step process to provide details, upload photos, and set your price."
    },
    {
      question: "Is there a fee to list a vehicle?",
      answer: "Basic listings are free. We also offer premium listing options with enhanced visibility and features for a small fee."
    },
    {
      question: "How are the cars verified?",
      answer: "We verify seller information and encourage detailed documentation. For certified pre-owned vehicles, we ensure they've passed the manufacturer's inspection process."
    },
    {
      question: "Can I get financing through AutoVista?",
      answer: "Yes, we partner with trusted lenders to offer competitive financing options. You can apply directly through our platform."
    }
  ].map((faq, index) => <div
    key={index}
    className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl"
  ><h3 className="text-lg font-semibold mb-3 flex items-start gap-3 text-slate-900 dark:text-white"><CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />{faq.question}</h3><p className="text-slate-600 dark:text-slate-400 pl-8">{faq.answer}</p></div>)}</div></div></Container></div>;
}
export {
  ContactPage as default
};
