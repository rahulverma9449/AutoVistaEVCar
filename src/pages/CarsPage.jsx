import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ArrowDownAZ, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CarCard from "@/components/cars/CarCard";
import CarFilter from "@/components/cars/CarFilter";
import { cars as fallbackCars, sortOptions } from "@/data/cars";
import { carsAPI } from "@/lib/api";
function CarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [sourceCars, setSourceCars] = useState(fallbackCars);
  const [visibleCars, setVisibleCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("posted-desc");
  useEffect(() => {
    carsAPI.getCars().then((response) => setSourceCars(response.cars)).catch(() => setSourceCars(fallbackCars));
  }, []);
  useEffect(() => {
    const initialFilters = {};
    if (searchParams.has("make")) initialFilters.make = searchParams.get("make") || void 0;
    if (searchParams.has("model")) setSearchTerm(searchParams.get("model") || "");
    if (searchParams.has("minPrice")) initialFilters.minPrice = Number(searchParams.get("minPrice"));
    if (searchParams.has("maxPrice")) initialFilters.maxPrice = Number(searchParams.get("maxPrice"));
    if (searchParams.has("minYear")) initialFilters.minYear = Number(searchParams.get("minYear"));
    if (searchParams.has("maxYear")) initialFilters.maxYear = Number(searchParams.get("maxYear"));
    if (searchParams.has("condition")) {
      const condition = searchParams.get("condition");
      if (condition) initialFilters.condition = [condition];
    }
    setFilters(initialFilters);
    if (searchParams.has("sort")) {
      setSortBy(searchParams.get("sort") || "posted-desc");
    }
    document.title = "Browse Cars - AutoVista";
    window.scrollTo(0, 0);
  }, [searchParams]);
  useEffect(() => {
    let filteredCars = [...sourceCars];
    if (searchTerm) {
      filteredCars = filteredCars.filter(
        (car) => car.model.toLowerCase().includes(searchTerm.toLowerCase()) || car.make.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.make) {
      filteredCars = filteredCars.filter((car) => car.make === filters.make);
    }
    if (filters.minPrice !== void 0) {
      filteredCars = filteredCars.filter((car) => car.price >= (filters.minPrice || 0));
    }
    if (filters.maxPrice !== void 0 && filters.maxPrice > 0) {
      filteredCars = filteredCars.filter((car) => car.price <= (filters.maxPrice || Infinity));
    }
    if (filters.minYear !== void 0) {
      filteredCars = filteredCars.filter((car) => car.year >= (filters.minYear || 0));
    }
    if (filters.maxYear !== void 0) {
      filteredCars = filteredCars.filter((car) => car.year <= (filters.maxYear || Infinity));
    }
    if (filters.maxMileage !== void 0) {
      filteredCars = filteredCars.filter((car) => car.mileage <= (filters.maxMileage || Infinity));
    }
    if (filters.fuelType && filters.fuelType.length > 0) {
      filteredCars = filteredCars.filter((car) => filters.fuelType?.includes(car.fuelType));
    }
    if (filters.transmission && filters.transmission.length > 0) {
      filteredCars = filteredCars.filter((car) => filters.transmission?.includes(car.transmission));
    }
    if (filters.bodyType && filters.bodyType.length > 0) {
      filteredCars = filteredCars.filter((car) => filters.bodyType?.includes(car.bodyType));
    }
    if (filters.condition && filters.condition.length > 0) {
      filteredCars = filteredCars.filter((car) => filters.condition?.includes(car.condition));
    }
    if (filters.sellerType && filters.sellerType.length > 0) {
      filteredCars = filteredCars.filter((car) => filters.sellerType?.includes(car.sellerType));
    }
    switch (sortBy) {
      case "price-asc":
        filteredCars.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredCars.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        filteredCars.sort((a, b) => b.year - a.year);
        break;
      case "year-asc":
        filteredCars.sort((a, b) => a.year - b.year);
        break;
      case "mileage-asc":
        filteredCars.sort((a, b) => a.mileage - b.mileage);
        break;
      case "posted-desc":
      default:
        filteredCars.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
    }
    setCars(filteredCars);
    setVisibleCars(filteredCars);
  }, [filters, searchTerm, sortBy, sourceCars]);
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (searchTerm) params.set("model", searchTerm);
    if (newFilters.make) params.set("make", newFilters.make);
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.minYear) params.set("minYear", newFilters.minYear.toString());
    if (newFilters.maxYear) params.set("maxYear", newFilters.maxYear.toString());
    if (sortBy) params.set("sort", sortBy);
    setSearchParams(params);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("model", searchTerm);
    } else {
      params.delete("model");
    }
    setSearchParams(params);
  };
  const handleSortChange = (value) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };
  return <div className="min-h-screen bg-slate-50 pb-20 pt-28 dark:bg-slate-950"><Container><div className="flex flex-col gap-8"><div className="rounded-3xl bg-[#07111f] p-7 text-white shadow-xl sm:p-10"><div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"><div><p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-orange-400">AutoVista marketplace</p><h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Find a car you’ll love
              </h1><p className="mt-3 text-slate-300">Every listing is verified, inspected, and ready for your next drive. <strong className="text-white">{cars.length} {cars.length === 1 ? "vehicle" : "vehicles"}</strong> available.
              </p></div><div className="w-full md:w-auto flex flex-col sm:flex-row gap-3"><form onSubmit={handleSearch} className="flex gap-2 flex-1"><Input
    placeholder="Search by make or model"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="min-w-[220px] border-white/20 bg-white text-slate-900"
  /><Button type="submit" size="icon" className="bg-orange-500 text-white hover:bg-orange-600"><Search className="h-4 w-4" /><span className="sr-only">Search</span></Button></form><div className="flex gap-2 text-slate-900"><CarFilter onFilterChange={handleFilterChange} initialFilters={filters} /><Select value={sortBy} onValueChange={handleSortChange}><SelectTrigger className="w-[180px] bg-white"><ArrowDownAZ className="h-4 w-4 mr-2" /><SelectValue placeholder="Sort by" /></SelectTrigger><SelectContent>{sortOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div></div></div></div>{cars.length > 0 ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{visibleCars.map((car) => <CarCard key={car.id} car={car} />)}</div> : <div className="text-center py-20"><SlidersHorizontal className="h-12 w-12 mx-auto text-slate-400 mb-4" /><h3 className="text-xl font-semibold mb-2">No cars match your criteria</h3><p className="text-slate-600 dark:text-slate-400 mb-6">
                Try adjusting your filters or search term to find more options.
              </p><Button
    variant="outline"
    onClick={() => {
      setFilters({});
      setSearchTerm("");
      setSearchParams({});
    }}
  >
                Reset All Filters
              </Button></div>}</div></Container></div>;
}
export {
  CarsPage as default
};
