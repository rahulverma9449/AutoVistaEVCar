import { Link } from "react-router-dom";
import { ArrowUpRight, Fuel, Gauge, Heart, MapPin, Settings2, ShieldCheck } from "lucide-react";

export default function CarCard({ car, featured = false }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/cars/${car.id}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
        <img src={car.images?.[0]} alt={`${car.make} ${car.model}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4"><span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow">{car.condition}</span><button type="button" aria-label="Save vehicle" onClick={(e) => e.preventDefault()} className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate-700 shadow transition hover:text-rose-500"><Heart className="h-5 w-5" /></button></div>
        {featured && <span className="absolute bottom-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">Top pick</span>}
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{car.year} • {car.bodyType}</p><h3 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">{car.make} {car.model}</h3></div><Link to={`/cars/${car.id}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"><ArrowUpRight className="h-4 w-4" /></Link></div>
        <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">${Number(car.price).toLocaleString()} <span className="text-xs font-medium text-slate-400">drive away</span></p>
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"><span className="flex items-center gap-1.5"><Gauge className="h-4 w-4 text-orange-500" />{Number(car.mileage).toLocaleString()} mi</span><span className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-orange-500" />{car.fuelType}</span><span className="flex items-center gap-1.5"><Settings2 className="h-4 w-4 text-orange-500" />{car.transmission === "Automatic" ? "Auto" : car.transmission}</span></div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{car.sellerLocation}</span><span className="flex items-center gap-1 font-semibold text-emerald-600"><ShieldCheck className="h-4 w-4" />Verified</span></div>
      </div>
    </article>
  );
}
