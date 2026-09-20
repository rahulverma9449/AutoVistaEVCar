import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, Mail, AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  })
});
function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });
  const onSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await forgotPassword(values.email);
      setSuccess(true);
      form.reset();
    } catch (error2) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen relative overflow-hidden">{
    /* Animated Background */
  }<div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900"><div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" /><div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-red-900/80 to-pink-900/80" />{
    /* Floating Elements */
  }<div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" /><div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" /><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" /></div>{
    /* Content */
  }<div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"><div className="max-w-md w-full">{
    /* Glass Card */
  }<div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"><div className="text-center mb-8"><Link to="/" className="flex items-center justify-center gap-2 text-2xl font-bold mb-6"><div className="p-2 rounded-full bg-white/20 backdrop-blur-sm"><Car className="h-8 w-8 text-white" /></div><span className="text-white">AutoVista</span></Link><h2 className="text-3xl font-bold text-white mb-2">
                Reset Password
              </h2><p className="text-white/80">
                Enter your email address and we'll send you a link to reset your password
              </p></div>{error && <Alert variant="destructive" className="mb-6 bg-red-500/20 border-red-500/30 text-white"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}{success && <Alert className="mb-6 bg-green-500/20 border-green-500/30 text-white"><CheckCircle className="h-4 w-4" /><AlertDescription>
                  Password reset link has been sent to your email address.
                </AlertDescription></Alert>}<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"><FormField
    control={form.control}
    name="email"
    render={({ field }) => <FormItem><FormLabel className="text-white">Email</FormLabel><FormControl><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" /><Input
      {...field}
      type="email"
      placeholder="Enter your email"
      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20"
    /></div></FormControl><FormMessage className="text-red-300" /></FormItem>}
  /><div className="space-y-4"><Button
    type="submit"
    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 shadow-lg"
    disabled={isLoading}
  >{isLoading ? <span className="flex items-center"><svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                        Sending reset link...
                      </span> : "Send reset link"}</Button><div className="text-center"><Link
    to="/auth/signin"
    className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
  ><ArrowLeft className="h-4 w-4 mr-2" />
                      Back to sign in
                    </Link></div></div></form></Form></div></div></div></div>;
}
export {
  ForgotPasswordPage as default
};
