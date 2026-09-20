import { ArrowRight, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function search(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("model", query.trim());
    navigate(`/cars${params.size ? `?${params}` : ""}`);
  }

  return <section className="relative isolate min-h-[720px] overflow-hidden bg-slate-950 pt-24 text-white">
    <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Premium electric car" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/30" />
    <div className="absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
    <Container className="flex min-h-[620px] items-center py-20">
      <div className="max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-100 backdrop-blur"><Sparkles className="h-4 w-4" />Smarter car discovery, grounded in real listings</div>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Find a car that feels made for <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">your journey.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">Explore verified vehicle details, compare options, and ask AutoVista Assist for catalog-based recommendations.</p>
        <form onSubmit={search} className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-md sm:flex-row">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search make or model" className="h-13 w-full rounded-xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400" /></div>
          <Button type="submit" className="h-13 rounded-xl bg-blue-600 px-7 text-white hover:bg-blue-500">Browse vehicles<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </form>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />Clear listing details</span>
          <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-400" />Instant catalog search</span>
          <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-blue-400" />AI-assisted discovery</span>
        </div>
      </div>
    </Container>
  </section>;
}
