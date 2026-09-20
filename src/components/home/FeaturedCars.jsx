import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import CarCard from "@/components/cars/CarCard";
import { cars } from "@/data/cars";
import { carsAPI } from "@/lib/api";
function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  useEffect(() => {
    carsAPI.getCars({ featured: true }).then((response) => setFeaturedCars(response.cars)).catch(() => setFeaturedCars(cars.filter((car) => car.isFeatured)));
  }, []);
  const totalPages = Math.ceil(featuredCars.length / itemsPerPage);
  const displayedCars = featuredCars.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  return <section className="py-20 bg-slate-50 dark:bg-slate-900/50"><Container><div className="flex justify-between items-center mb-10"><div><h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Featured Cars
            </h2><p className="mt-2 text-slate-600 dark:text-slate-400">
              Discover our handpicked selection of premium vehicles
            </p></div><div className="flex gap-2"><Button
    variant="outline"
    size="icon"
    onClick={prevPage}
    disabled={featuredCars.length <= itemsPerPage}
    className="rounded-full"
  ><ArrowLeft className="h-4 w-4" /><span className="sr-only">Previous</span></Button><Button
    variant="outline"
    size="icon"
    onClick={nextPage}
    disabled={featuredCars.length <= itemsPerPage}
    className="rounded-full"
  ><ArrowRight className="h-4 w-4" /><span className="sr-only">Next</span></Button></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{displayedCars.map((car) => <CarCard key={car.id} car={car} featured />)}</div><div className="mt-12 text-center"><Link to="/cars"><Button className="bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
              View All Cars
              <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div></Container></section>;
}
export {
  FeaturedCars as default
};
