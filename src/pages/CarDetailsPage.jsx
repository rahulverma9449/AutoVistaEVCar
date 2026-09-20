import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Car,
  Fuel,
  Gauge,
  MapPin,
  PhoneCall,
  Settings2,
  Mail,
  CheckCircle2,
  Clock,
  User,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { carsAPI } from "@/lib/api";
function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    if (!id) return;
    carsAPI.getCar(id).then((foundCar) => {
      setCar(foundCar);
      document.title = `${foundCar.year} ${foundCar.make} ${foundCar.model} - AutoVista`;
    }).catch(() => navigate("/cars", { replace: true })).finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id, navigate]);
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700" /></div>;
  }
  if (!car) {
    return null;
  }
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };
  return <div className="mt-20 py-8"><Container><div className="mb-6"><Button
    variant="ghost"
    onClick={() => navigate(-1)}
    className="mb-4"
  ><ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button><div className="flex flex-col md:flex-row justify-between md:items-center gap-4"><div><h1 className="text-3xl font-bold text-slate-900 dark:text-white">{car.year} {car.make} {car.model}</h1><div className="flex items-center gap-2 mt-2"><Badge
    className={car.condition === "New" ? "bg-green-600" : car.condition === "Certified Pre-Owned" ? "bg-blue-600" : "bg-orange-600"}
  >{car.condition}</Badge><Badge variant="outline" className="flex items-center gap-1"><MapPin className="h-3 w-3" />{car.sellerLocation}</Badge><Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" />
                  Listed {formatDate(car.postedDate)}</Badge></div></div><div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              ${car.price.toLocaleString()}</div></div></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2">{
    /* Image Gallery */
  }<div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-8"><div className="aspect-[16/9] relative"><img
    src={car.images[currentImageIndex]}
    alt={`${car.make} ${car.model}`}
    className="w-full h-full object-cover"
  />{car.images.length > 1 && <><Button
    onClick={prevImage}
    variant="ghost"
    size="icon"
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full"
  ><ChevronLeft className="h-6 w-6" /><span className="sr-only">Previous image</span></Button><Button
    onClick={nextImage}
    variant="ghost"
    size="icon"
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full"
  ><ChevronRight className="h-6 w-6" /><span className="sr-only">Next image</span></Button></>}</div>{
    /* Thumbnails */
  }{car.images.length > 1 && <div className="flex overflow-x-auto p-2 gap-2 bg-white dark:bg-slate-900">{car.images.map((img, index) => <button
    key={index}
    onClick={() => setCurrentImageIndex(index)}
    className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-blue-700 dark:ring-blue-500" : ""}`}
  ><img
    src={img}
    alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
    className="w-full h-full object-cover"
  /></button>)}</div>}</div>{
    /* Car Details */
  }<div className="space-y-8"><div><h2 className="text-2xl font-semibold mb-4">Vehicle Overview</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><div className="flex items-center text-slate-600 dark:text-slate-400 mb-1"><Calendar className="h-4 w-4 mr-2" /><span className="text-sm">Year</span></div><span className="font-medium">{car.year}</span></div><div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><div className="flex items-center text-slate-600 dark:text-slate-400 mb-1"><Car className="h-4 w-4 mr-2" /><span className="text-sm">Make</span></div><span className="font-medium">{car.make}</span></div><div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><div className="flex items-center text-slate-600 dark:text-slate-400 mb-1"><Car className="h-4 w-4 mr-2" /><span className="text-sm">Model</span></div><span className="font-medium">{car.model}</span></div><div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><div className="flex items-center text-slate-600 dark:text-slate-400 mb-1"><Gauge className="h-4 w-4 mr-2" /><span className="text-sm">Mileage</span></div><span className="font-medium">{car.mileage.toLocaleString()} miles</span></div><div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><div className="flex items-center text-slate-600 dark:text-slate-400 mb-1"><Fuel className="h-4 w-4 mr-2" /><span className="text-sm">Fuel Type</span></div><span className="font-medium">{car.fuelType}</span></div><div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><div className="flex items-center text-slate-600 dark:text-slate-400 mb-1"><Settings2 className="h-4 w-4 mr-2" /><span className="text-sm">Transmission</span></div><span className="font-medium">{car.transmission}</span></div></div></div><div><h2 className="text-2xl font-semibold mb-4">Description</h2><p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{car.description}</p></div><div><h2 className="text-2xl font-semibold mb-4">Features & Specifications</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"><div className="flex items-center gap-2"><span className="text-slate-600 dark:text-slate-400">Body Type:</span><span className="font-medium">{car.bodyType}</span></div><div className="flex items-center gap-2"><span className="text-slate-600 dark:text-slate-400">Color:</span><span className="font-medium">{car.color}</span></div><div className="flex items-center gap-2"><span className="text-slate-600 dark:text-slate-400">Engine:</span><span className="font-medium">{car.fuelType === "Electric" ? "Electric Motor" : `${car.engineSize}L ${car.cylinders ? `${car.cylinders}-Cylinder` : ""}`}</span></div><div className="flex items-center gap-2"><span className="text-slate-600 dark:text-slate-400">Doors:</span><span className="font-medium">{car.doors}</span></div></div><Separator className="my-6" /><h3 className="text-lg font-medium mb-3">Features</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">{car.features.map((feature, index) => <div key={index} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0" /><span>{feature}</span></div>)}</div></div></div></div><div className="lg:col-span-1">{
    /* Seller Information */
  }<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm sticky top-24"><h2 className="text-xl font-semibold mb-4 flex items-center"><User className="h-5 w-5 mr-2 text-blue-700 dark:text-blue-400" />
                Seller Information
              </h2><div className="space-y-4"><div><div className="text-sm text-slate-600 dark:text-slate-400">Seller Name</div><div className="font-medium">{car.sellerName}</div></div><div><div className="text-sm text-slate-600 dark:text-slate-400">Seller Type</div><div className="font-medium">{car.sellerType}</div></div><div><div className="text-sm text-slate-600 dark:text-slate-400">Location</div><div className="font-medium flex items-center"><MapPin className="h-4 w-4 mr-1 text-slate-500" />{car.sellerLocation}</div></div><Separator /><div className="space-y-3">{car.sellerContactPhone && <Button variant="outline" className="w-full justify-start"><PhoneCall className="h-4 w-4 mr-2" />{car.sellerContactPhone}</Button>}<Button variant="outline" className="w-full justify-start"><Mail className="h-4 w-4 mr-2" />{car.sellerContactEmail}</Button></div><Button className="w-full bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                  Send Inquiry
                </Button><Alert className="bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 border-blue-200 dark:border-blue-800"><AlertDescription className="text-sm">
                    This vehicle has {car.condition === "New" ? "never been registered" : `${car.mileage.toLocaleString()} miles`} and is available for immediate viewing.
                  </AlertDescription></Alert></div></div></div></div></Container></div>;
}
export {
  CarDetailsPage as default
};
