import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
function SportsCar3D() {
  return <div className="relative w-full h-full flex items-center justify-center select-none">{
    /* Ground glow */
  }<div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[500px] h-16 bg-red-500/20 rounded-full blur-2xl" /><div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[420px] h-10 bg-red-400/30 rounded-full blur-xl animate-pulse" /><img src="/assets/mustang-gt.jpg" alt="Real red Ford Mustang GT" className="relative z-10 w-full max-w-[680px] rounded-3xl object-cover shadow-2xl shadow-red-950/60" /><svg
    viewBox="0 0 620 260"
    className="hidden w-full max-w-[600px]"
    style={{ filter: "drop-shadow(0 28px 56px rgba(239,68,68,0.5))" }}
  >{
    /* Shadow */
  }<ellipse cx="310" cy="248" rx="240" ry="16" fill="rgba(120,10,10,0.5)" />{
    /* Low slung body */
  }<path
    d="M 50 195 Q 50 215 80 220 L 530 220 Q 560 215 560 195 L 560 170 L 50 170 Z"
    fill="url(#sBodyGrad)"
  />{
    /* Fastback roof */
  }<path
    d="M 130 170 Q 155 115 220 90 L 310 78 L 390 78 Q 450 90 490 135 L 510 170 Z"
    fill="url(#sRoofGrad)"
  />{
    /* Windshield */
  }<path
    d="M 225 92 Q 255 79 310 76 L 388 76 Q 440 88 468 128 L 478 165 L 230 165 Z"
    fill="url(#sGlassGrad)"
    opacity="0.88"
  />{
    /* Windshield glare */
  }<path
    d="M 240 96 Q 278 82 330 80 L 390 80 Q 395 84 360 112 L 252 112 Z"
    fill="white"
    opacity="0.14"
  />{
    /* Rear quarter */
  }<path
    d="M 130 170 L 138 115 Q 155 95 185 88 L 222 84 L 230 88 L 235 170 Z"
    fill="url(#sGlassGrad)"
    opacity="0.65"
  />{
    /* Wide body flare front */
  }<path
    d="M 50 170 L 50 195 Q 55 208 80 215 L 95 215 L 95 170 Z"
    fill="url(#sFenderGrad)"
  />{
    /* Wide body flare rear */
  }<path
    d="M 560 170 L 560 195 Q 555 208 530 215 L 515 215 L 515 170 Z"
    fill="url(#sFenderGrad)"
  />{
    /* Front splitter */
  }<path
    d="M 48 215 L 95 220 L 95 226 L 48 220 Z"
    fill="url(#sSplitterGrad)"
  /><path
    d="M 572 215 L 525 220 L 525 226 L 572 220 Z"
    fill="url(#sSplitterGrad)"
  />{
    /* Rear diffuser */
  }<path
    d="M 510 215 L 550 212 L 550 222 L 510 220 Z"
    fill="#0f0a0a"
  /><path
    d="M 520 213 L 540 211 L 540 221 L 520 219 Z"
    fill="#1a0a0a"
  />{
    /* Spoiler */
  }<path
    d="M 135 108 L 200 96 L 205 100 L 140 112 Z"
    fill="url(#sSpoilerGrad)"
  /><path
    d="M 155 96 L 200 88 L 202 92 L 157 100 Z"
    fill="url(#sSpoilerGrad)"
  />{
    /* Body line / crease */
  }<path
    d="M 80 185 Q 200 178 310 176 Q 420 174 530 182"
    stroke="rgba(255,100,100,0.5)"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
  />{
    /* Chrome strip */
  }<path
    d="M 80 200 L 530 200"
    stroke="rgba(255,200,200,0.25)"
    strokeWidth="1.5"
    fill="none"
  />{
    /* Brake ducts */
  }<rect x="82" y="176" width="24" height="10" rx="3" fill="rgba(0,0,0,0.5)" /><rect x="514" y="176" width="24" height="10" rx="3" fill="rgba(0,0,0,0.5)" />{
    /* Door lines */
  }<path d="M 145 170 L 145 218" stroke="rgba(255,100,100,0.2)" strokeWidth="1.5" /><path d="M 305 165 L 305 216" stroke="rgba(255,100,100,0.2)" strokeWidth="1.5" /><path d="M 465 170 L 465 218" stroke="rgba(255,100,100,0.2)" strokeWidth="1.5" />{
    /* Door handles */
  }<rect x="205" y="185" width="26" height="5" rx="2.5" fill="rgba(255,200,200,0.4)" /><rect x="370" y="185" width="26" height="5" rx="2.5" fill="rgba(255,200,200,0.4)" />{
    /* Headlight assembly */
  }<path
    d="M 52 175 Q 50 185 53 196 L 82 193 L 84 172 Z"
    fill="url(#sHeadlightGrad)"
    opacity="0.95"
  /><path
    d="M 54 178 Q 53 186 56 193 L 78 190 L 80 176 Z"
    fill="white"
    opacity="0.5"
  /><ellipse cx="67" cy="184" rx="13" ry="9" fill="rgba(255,230,180,0.5)" className="animate-pulse" />{
    /* Taillight assembly */
  }<path
    d="M 568 175 Q 570 185 567 196 L 538 193 L 536 172 Z"
    fill="url(#sTaillightGrad)"
    opacity="0.95"
  /><ellipse cx="553" cy="184" rx="13" ry="9" fill="rgba(255,60,60,0.5)" className="animate-pulse" />{
    /* Front wheel arch */
  }<path
    d="M 85 222 Q 85 196 122 182 Q 155 170 182 182 Q 214 196 214 222 Z"
    fill="url(#sArchGrad)"
  />{
    /* Rear wheel arch */
  }<path
    d="M 400 222 Q 400 196 437 182 Q 470 170 497 182 Q 529 196 529 222 Z"
    fill="url(#sArchGrad)"
  />{
    /* Front wheel */
  }<circle cx="150" cy="222" r="36" fill="url(#sTireGrad)" /><circle cx="150" cy="222" r="26" fill="url(#sRimGrad)" /><circle cx="150" cy="222" r="18" fill="url(#sRimInnerGrad)" />{[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => <line
    key={i}
    x1={150 + 8 * Math.cos(angle * Math.PI / 180)}
    y1={222 + 8 * Math.sin(angle * Math.PI / 180)}
    x2={150 + 23 * Math.cos(angle * Math.PI / 180)}
    y2={222 + 23 * Math.sin(angle * Math.PI / 180)}
    stroke="rgba(255,160,160,0.6)"
    strokeWidth="3"
    strokeLinecap="round"
  />)}<circle cx="150" cy="222" r="4.5" fill="rgba(255,160,160,0.9)" />{
    /* Rear wheel */
  }<circle cx="463" cy="222" r="36" fill="url(#sTireGrad)" /><circle cx="463" cy="222" r="26" fill="url(#sRimGrad)" /><circle cx="463" cy="222" r="18" fill="url(#sRimInnerGrad)" />{[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => <line
    key={i}
    x1={463 + 8 * Math.cos(angle * Math.PI / 180)}
    y1={222 + 8 * Math.sin(angle * Math.PI / 180)}
    x2={463 + 23 * Math.cos(angle * Math.PI / 180)}
    y2={222 + 23 * Math.sin(angle * Math.PI / 180)}
    stroke="rgba(255,160,160,0.6)"
    strokeWidth="3"
    strokeLinecap="round"
  />)}<circle cx="463" cy="222" r="4.5" fill="rgba(255,160,160,0.9)" /><defs><linearGradient id="sBodyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#991b1b" /><stop offset="40%" stopColor="#dc2626" /><stop offset="100%" stopColor="#7f1d1d" /></linearGradient><linearGradient id="sRoofGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7f1d1d" /><stop offset="40%" stopColor="#b91c1c" /><stop offset="100%" stopColor="#991b1b" /></linearGradient><linearGradient id="sGlassGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fca5a5" stopOpacity="0.6" /><stop offset="50%" stopColor="#fecaca" stopOpacity="0.4" /><stop offset="100%" stopColor="#f87171" stopOpacity="0.7" /></linearGradient><linearGradient id="sFenderGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7f1d1d" /><stop offset="100%" stopColor="#b91c1c" /></linearGradient><linearGradient id="sSpoilerGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#450a0a" /><stop offset="100%" stopColor="#7f1d1d" /></linearGradient><linearGradient id="sSplitterGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#450a0a" /><stop offset="100%" stopColor="#0f0505" /></linearGradient><linearGradient id="sHeadlightGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fef3c7" /><stop offset="100%" stopColor="#fde68a" /></linearGradient><linearGradient id="sTaillightGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fca5a5" /><stop offset="100%" stopColor="#ef4444" /></linearGradient><linearGradient id="sArchGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7f1d1d" /><stop offset="100%" stopColor="#0f0505" /></linearGradient><linearGradient id="sTireGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1c0000" /><stop offset="100%" stopColor="#0a0000" /></linearGradient><linearGradient id="sRimGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4c0519" /><stop offset="50%" stopColor="#881337" /><stop offset="100%" stopColor="#3f0613" /></linearGradient><linearGradient id="sRimInnerGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1c0000" /><stop offset="100%" stopColor="#0a0000" /></linearGradient></defs></svg>{
    /* Floating stats */
  }<div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-2xl border border-white/20 bg-slate-950/80 px-6 py-3 text-center backdrop-blur-md"><div className="text-xs font-medium uppercase tracking-[0.25em] text-red-300">Ford Mustang GT</div><div className="mt-1 text-xl font-bold text-white">Join the drive.</div></div></div>;
}
const benefits = [
  "Access 25,000+ premium listings",
  "Save and compare favourites",
  "Get real-time price alerts",
  "Connect directly with verified sellers"
];
function SignUpPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" }
  });
  const { signUp } = useAuth();
  const onSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp(values.name, values.email, values.password);
      toast({ title: "Account created!", description: "Welcome to AutoVista." });
      navigate("/");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialSignUp = async (provider) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({ title: "Success!", description: `Signed up with ${provider}.` });
      navigate("/");
    } catch {
      setError(`Failed to sign up with ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-row-reverse">{
    /* RIGHT — Form Panel */
  }<div className="w-full lg:w-[500px] xl:w-[540px] flex-shrink-0 flex flex-col justify-center px-8 sm:px-12 xl:px-16 py-10 bg-[#0a0f1e] relative z-10 overflow-y-auto">{
    /* Logo */
  }<Link to="/" className="flex items-center gap-3 mb-8 group"><div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-105 transition-transform"><Car className="h-5 w-5 text-white" /></div><span className="text-xl font-bold text-white tracking-tight">AutoVista</span></Link>{
    /* Heading */
  }<div className="mb-6"><h1 className="text-4xl font-bold text-white mb-2 leading-tight">
            Join the<br /><span className="text-red-400">Revolution</span></h1><p className="text-slate-400 text-sm">Create your free account and find your perfect car.</p></div>{
    /* Benefits */
  }<div className="grid grid-cols-2 gap-2 mb-6">{benefits.map((b) => <div key={b} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /><span className="text-xs text-slate-400 leading-snug">{b}</span></div>)}</div>{
    /* Error */
  }{error && <Alert variant="destructive" className="mb-5 bg-red-500/10 border-red-500/30 text-red-400"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}{
    /* Social buttons */
  }<div className="grid grid-cols-3 gap-3 mb-5">{[
    {
      name: "Google",
      icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
    },
    {
      name: "GitHub",
      icon: <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
    },
    {
      name: "Facebook",
      icon: <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
    }
  ].map(({ name, icon }) => <button
    key={name}
    type="button"
    disabled={isLoading}
    onClick={() => handleSocialSignUp(name)}
    className="flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
  >{icon}</button>)}</div>{
    /* Divider */
  }<div className="flex items-center gap-3 mb-5"><div className="flex-1 h-px bg-white/10" /><span className="text-xs text-slate-500 font-medium">or with email</span><div className="flex-1 h-px bg-white/10" /></div>{
    /* Form */
  }<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5"><FormField
    control={form.control}
    name="name"
    render={({ field }) => <FormItem><FormLabel className="text-slate-300 text-sm font-medium">Full name</FormLabel><FormControl><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      placeholder="Jane Smith"
      className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-red-500 transition-all"
    /></div></FormControl><FormMessage className="text-red-400 text-xs" /></FormItem>}
  /><FormField
    control={form.control}
    name="email"
    render={({ field }) => <FormItem><FormLabel className="text-slate-300 text-sm font-medium">Email address</FormLabel><FormControl><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      type="email"
      placeholder="you@example.com"
      className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-red-500 transition-all"
    /></div></FormControl><FormMessage className="text-red-400 text-xs" /></FormItem>}
  /><div className="grid grid-cols-2 gap-3"><FormField
    control={form.control}
    name="password"
    render={({ field }) => <FormItem><FormLabel className="text-slate-300 text-sm font-medium">Password</FormLabel><FormControl><div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      type={showPassword ? "text" : "password"}
      placeholder="Min 6 chars"
      className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-red-500 transition-all"
    /><button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
    >{showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button></div></FormControl><FormMessage className="text-red-400 text-xs" /></FormItem>}
  /><FormField
    control={form.control}
    name="confirmPassword"
    render={({ field }) => <FormItem><FormLabel className="text-slate-300 text-sm font-medium">Confirm</FormLabel><FormControl><div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      type={showConfirm ? "text" : "password"}
      placeholder="Repeat"
      className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-red-500 transition-all"
    /><button
      type="button"
      onClick={() => setShowConfirm((v) => !v)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
    >{showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button></div></FormControl><FormMessage className="text-red-400 text-xs" /></FormItem>}
  /></div><Button
    type="submit"
    disabled={isLoading}
    className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-base shadow-lg shadow-red-600/30 hover:shadow-red-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] mt-1"
  >{isLoading ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Creating account...
                </span> : <span className="flex items-center gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" /></span>}</Button></form></Form><p className="mt-4 text-xs text-slate-600 text-center">
          By signing up you agree to our{" "}<Link to="#" className="text-slate-400 hover:text-white transition-colors">Terms</Link>{" "}
          and{" "}<Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>.
        </p><p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}<Link to="/auth/signin" className="text-red-400 hover:text-red-300 font-medium transition-colors">
            Sign in
          </Link></p></div>{
    /* LEFT — 3D Sports Car Panel */
  }<div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#0f0405] via-[#3b0a0a] to-[#0f0405]">{
    /* Grid */
  }<div
    className="absolute inset-0 opacity-15"
    style={{
      backgroundImage: `
              linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)
            `,
      backgroundSize: "60px 60px"
    }}
  />{
    /* Radial glow */
  }<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(220,38,38,0.2)_0%,transparent_70%)]" />{
    /* Corner glows */
  }<div className="absolute top-0 left-0 w-72 h-72 bg-red-900/20 rounded-full blur-3xl" /><div className="absolute bottom-0 right-0 w-72 h-72 bg-red-700/15 rounded-full blur-3xl" /><div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12"><SportsCar3D /><div className="mt-2 text-center"><p className="text-lg font-semibold text-white/90 tracking-wide">AutoVista Sport</p><p className="text-sm text-red-300/70 mt-1">Performance meets elegance.</p></div></div>{
    /* Scan line */
  }<div
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent"
    style={{ animation: "scanlineRed 4s ease-in-out infinite", top: "50%" }}
  /><style>{`
          @keyframes scanlineRed {
            0%, 100% { transform: translateY(-120px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(120px); opacity: 0; }
          }
        `}</style></div></div>;
}
export {
  SignUpPage as default
};
