import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Shield, Zap, Star } from "lucide-react";
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
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." })
});
function Car3D() {
  return <div className="relative w-full h-full flex items-center justify-center select-none">{
    /* Ground reflection */
  }<div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[520px] h-20 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-2xl" />{
    /* Animated glow ring */
  }<div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[460px] h-12 bg-blue-400/30 rounded-full blur-xl animate-pulse" />{
    /* Main car SVG */
  }<img src="/assets/mustang-gt.jpg" alt="Real red Ford Mustang GT" className="relative z-10 w-full max-w-[680px] rounded-3xl object-cover shadow-2xl shadow-blue-950/60" /><svg
    viewBox="0 0 600 280"
    className="hidden w-full max-w-[580px] drop-shadow-2xl"
    style={{ filter: "drop-shadow(0 30px 60px rgba(59,130,246,0.4))" }}
  >{
    /* Car body shadow */
  }<ellipse cx="300" cy="258" rx="230" ry="18" fill="rgba(30,58,138,0.5)" />{
    /* Main body lower */
  }<path
    d="M 60 190 Q 60 220 90 225 L 510 225 Q 540 220 540 190 L 540 160 L 60 160 Z"
    fill="url(#bodyGrad)"
  />{
    /* Main body upper */
  }<path
    d="M 120 160 Q 140 100 200 80 L 290 70 L 380 70 Q 440 80 470 120 L 490 160 Z"
    fill="url(#roofGrad)"
  />{
    /* Windshield */
  }<path
    d="M 205 82 Q 220 72 290 68 L 375 68 Q 430 78 455 115 L 470 155 L 220 155 Z"
    fill="url(#glassGrad)"
    opacity="0.85"
  />{
    /* Windshield glare */
  }<path
    d="M 225 88 Q 255 76 315 74 L 380 74 Q 385 78 350 110 L 240 110 Z"
    fill="white"
    opacity="0.12"
  />{
    /* Rear window */
  }<path
    d="M 122 158 L 130 110 Q 145 92 175 84 L 200 80 L 208 84 L 220 156 Z"
    fill="url(#glassGrad)"
    opacity="0.7"
  />{
    /* Hood */
  }<path
    d="M 60 160 L 120 160 L 120 155 Q 80 150 70 145 L 60 145 Z"
    fill="url(#hoodGrad)"
  />{
    /* Front hood extension */
  }<path
    d="M 60 145 L 70 145 Q 80 148 90 155 L 60 155 Z"
    fill="url(#hoodGrad)"
  />{
    /* Door panel lines */
  }<path d="M 135 160 L 135 220" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" /><path d="M 295 155 L 295 222" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" /><path d="M 455 160 L 455 220" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />{
    /* Door handles */
  }<rect x="190" y="182" width="28" height="6" rx="3" fill="rgba(255,255,255,0.4)" /><rect x="360" y="182" width="28" height="6" rx="3" fill="rgba(255,255,255,0.4)" />{
    /* Side skirt */
  }<path
    d="M 90 222 Q 95 228 110 230 L 490 230 Q 505 228 510 222 Z"
    fill="url(#skirtGrad)"
  />{
    /* Front bumper */
  }<path
    d="M 60 190 Q 55 200 58 210 Q 60 218 75 220 L 90 222 L 90 190 Z"
    fill="url(#bumperGrad)"
  />{
    /* Rear bumper */
  }<path
    d="M 540 190 Q 545 200 542 210 Q 540 218 525 220 L 510 222 L 510 190 Z"
    fill="url(#bumperGrad)"
  />{
    /* Front headlight */
  }<path
    d="M 62 168 Q 60 178 62 188 L 88 186 L 90 165 Z"
    fill="url(#headlightGrad)"
    opacity="0.95"
  /><path
    d="M 64 170 Q 63 178 65 185 L 84 183 L 86 168 Z"
    fill="white"
    opacity="0.6"
  />{
    /* Headlight glow */
  }<ellipse cx="75" cy="177" rx="15" ry="10" fill="rgba(147,210,255,0.4)" className="animate-pulse" />{
    /* Rear taillight */
  }<path
    d="M 538 168 Q 540 178 538 188 L 512 186 L 510 165 Z"
    fill="url(#taillightGrad)"
    opacity="0.95"
  /><ellipse cx="525" cy="177" rx="15" ry="10" fill="rgba(255,80,80,0.35)" className="animate-pulse" />{
    /* Front wheel arch */
  }<path
    d="M 95 225 Q 95 200 130 185 Q 160 172 185 185 Q 215 200 215 225 Z"
    fill="url(#archGrad)"
  />{
    /* Rear wheel arch */
  }<path
    d="M 385 225 Q 385 200 420 185 Q 450 172 475 185 Q 505 200 505 225 Z"
    fill="url(#archGrad)"
  />{
    /* Front wheel */
  }<circle cx="155" cy="225" r="38" fill="url(#tireGrad)" /><circle cx="155" cy="225" r="28" fill="url(#rimGrad)" /><circle cx="155" cy="225" r="20" fill="url(#rimInnerGrad)" />{
    /* Rim spokes */
  }{[0, 60, 120, 180, 240, 300].map((angle, i) => <line
    key={i}
    x1={155 + 10 * Math.cos(angle * Math.PI / 180)}
    y1={225 + 10 * Math.sin(angle * Math.PI / 180)}
    x2={155 + 26 * Math.cos(angle * Math.PI / 180)}
    y2={225 + 26 * Math.sin(angle * Math.PI / 180)}
    stroke="rgba(200,220,255,0.7)"
    strokeWidth="3.5"
    strokeLinecap="round"
  />)}<circle cx="155" cy="225" r="5" fill="rgba(200,220,255,0.9)" />{
    /* Rear wheel */
  }<circle cx="445" cy="225" r="38" fill="url(#tireGrad)" /><circle cx="445" cy="225" r="28" fill="url(#rimGrad)" /><circle cx="445" cy="225" r="20" fill="url(#rimInnerGrad)" />{[0, 60, 120, 180, 240, 300].map((angle, i) => <line
    key={i}
    x1={445 + 10 * Math.cos(angle * Math.PI / 180)}
    y1={225 + 10 * Math.sin(angle * Math.PI / 180)}
    x2={445 + 26 * Math.cos(angle * Math.PI / 180)}
    y2={225 + 26 * Math.sin(angle * Math.PI / 180)}
    stroke="rgba(200,220,255,0.7)"
    strokeWidth="3.5"
    strokeLinecap="round"
  />)}<circle cx="445" cy="225" r="5" fill="rgba(200,220,255,0.9)" />{
    /* Body highlight stripe */
  }<path
    d="M 95 168 Q 200 160 300 158 Q 400 156 490 165"
    stroke="rgba(255,255,255,0.25)"
    strokeWidth="3"
    fill="none"
    strokeLinecap="round"
  />{
    /* Chrome accent strip */
  }<path
    d="M 90 195 L 510 195"
    stroke="rgba(255,255,255,0.3)"
    strokeWidth="2"
    fill="none"
  />{
    /* Gradients */
  }<defs><linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e40af" /><stop offset="50%" stopColor="#1d4ed8" /><stop offset="100%" stopColor="#1e3a8a" /></linearGradient><linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="40%" stopColor="#1d4ed8" /><stop offset="100%" stopColor="#1e40af" /></linearGradient><linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#93c5fd" stopOpacity="0.7" /><stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.5" /><stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" /></linearGradient><linearGradient id="hoodGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#1d4ed8" /></linearGradient><linearGradient id="skirtGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#0f172a" /></linearGradient><linearGradient id="bumperGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#1d4ed8" /></linearGradient><linearGradient id="headlightGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e0f2fe" /><stop offset="100%" stopColor="#bae6fd" /></linearGradient><linearGradient id="taillightGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fca5a5" /><stop offset="100%" stopColor="#ef4444" /></linearGradient><linearGradient id="archGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#0f172a" /></linearGradient><linearGradient id="tireGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0f172a" /></linearGradient><linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#334155" /><stop offset="50%" stopColor="#475569" /><stop offset="100%" stopColor="#1e293b" /></linearGradient><linearGradient id="rimInnerGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0f172a" /></linearGradient></defs></svg>{
    /* Floating spec badges */
  }<div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-2xl border border-white/20 bg-slate-950/80 px-6 py-3 text-center backdrop-blur-md"><div className="text-xs font-medium uppercase tracking-[0.25em] text-blue-300">Ford Mustang GT</div><div className="mt-1 text-xl font-bold text-white">Real performance. Iconic design.</div></div></div>;
}
function SignInPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" }
  });
  const { signIn } = useAuth();
  const onSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(values.email, values.password);
      toast({ title: "Welcome back!", description: "You have successfully signed in." });
      navigate("/");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialSignIn = async (provider) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({ title: "Success!", description: `Signed in with ${provider}.` });
      navigate("/");
    } catch {
      setError(`Failed to sign in with ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex">{
    /* LEFT — Form Panel */
  }<div className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 flex flex-col justify-center px-8 sm:px-12 xl:px-16 py-12 bg-[#0a0f1e] relative z-10 overflow-y-auto">{
    /* Logo */
  }<Link to="/" className="flex items-center gap-3 mb-10 group"><div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 group-hover:scale-105 transition-transform"><Car className="h-5 w-5 text-white" /></div><span className="text-xl font-bold text-white tracking-tight">AutoVista</span></Link>{
    /* Heading */
  }<div className="mb-8"><h1 className="text-4xl font-bold text-white mb-2 leading-tight">
            Welcome<br /><span className="text-blue-400">Back</span></h1><p className="text-slate-400 text-base">Sign in to access your garage and preferences.</p></div>{
    /* Error */
  }{error && <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/30 text-red-400"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}{
    /* Social buttons */
  }<div className="grid grid-cols-3 gap-3 mb-6">{[
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
    onClick={() => handleSocialSignIn(name)}
    className="flex items-center justify-center gap-2 h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
  >{icon}</button>)}</div>{
    /* Divider */
  }<div className="flex items-center gap-3 mb-6"><div className="flex-1 h-px bg-white/10" /><span className="text-xs text-slate-500 font-medium">or continue with email</span><div className="flex-1 h-px bg-white/10" /></div>{
    /* Form */
  }<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"><FormField
    control={form.control}
    name="email"
    render={({ field }) => <FormItem><FormLabel className="text-slate-300 text-sm font-medium">Email address</FormLabel><FormControl><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      type="email"
      placeholder="you@example.com"
      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-blue-500 focus:bg-white/8 transition-all"
    /></div></FormControl><FormMessage className="text-red-400 text-xs" /></FormItem>}
  /><FormField
    control={form.control}
    name="password"
    render={({ field }) => <FormItem><div className="flex items-center justify-between"><FormLabel className="text-slate-300 text-sm font-medium">Password</FormLabel><Link to="/auth/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      Forgot password?
                    </Link></div><FormControl><div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className="pl-10 pr-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-blue-500 focus:bg-white/8 transition-all"
    /><button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
    >{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></FormControl><FormMessage className="text-red-400 text-xs" /></FormItem>}
  /><Button
    type="submit"
    disabled={isLoading}
    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
  >{isLoading ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Signing in...
                </span> : <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" /></span>}</Button></form></Form>{
    /* Sign up link */
  }<p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}<Link to="/auth/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Create one free
          </Link></p>{
    /* Trust badges */
  }<div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-6">{[
    { icon: Shield, label: "Secure" },
    { icon: Zap, label: "Fast" },
    { icon: Star, label: "Trusted" }
  ].map(({ icon: Icon, label }) => <div key={label} className="flex items-center gap-1.5 text-slate-600"><Icon className="h-3.5 w-3.5" /><span className="text-xs">{label}</span></div>)}</div></div>{
    /* RIGHT — 3D Car Panel */
  }<div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0d1f4a] to-[#060d1f]">{
    /* Mesh grid background */
  }<div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `
              linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
            `,
      backgroundSize: "60px 60px"
    }}
  />{
    /* Radial glow center */
  }<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(59,130,246,0.18)_0%,transparent_70%)]" />{
    /* Corner accents */
  }<div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" /><div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800/10 rounded-full blur-3xl" />{
    /* 3D car */
  }<div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12"><Car3D />{
    /* Bottom text */
  }<div className="mt-2 text-center"><p className="text-lg font-semibold text-white/90 tracking-wide">AutoVista Premium</p><p className="text-sm text-blue-300/70 mt-1">Drive the future, today.</p></div></div>{
    /* Horizontal scan line animation */
  }<div
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
    style={{ animation: "scanline 4s ease-in-out infinite", top: "50%" }}
  /><style>{`
          @keyframes scanline {
            0%, 100% { transform: translateY(-120px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(120px); opacity: 0; }
          }
        `}</style></div></div>;
}
export {
  SignInPage as default
};
