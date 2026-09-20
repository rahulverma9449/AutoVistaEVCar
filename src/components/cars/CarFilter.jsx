import { useEffect, useState } from "react";
import { Settings2, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { carMakes } from "@/data/cars";
function CarFilter({ onFilterChange, initialFilters = {} }) {
  const [filters, setFilters] = useState(initialFilters);
  const [priceRange, setPriceRange] = useState([0, 2e5]);
  const [yearRange, setYearRange] = useState([2e3, (/* @__PURE__ */ new Date()).getFullYear()]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (initialFilters.minPrice !== void 0 || initialFilters.maxPrice !== void 0) {
      setPriceRange([
        initialFilters.minPrice || 0,
        initialFilters.maxPrice || 2e5
      ]);
    }
    if (initialFilters.minYear !== void 0 || initialFilters.maxYear !== void 0) {
      setYearRange([
        initialFilters.minYear || 2e3,
        initialFilters.maxYear || (/* @__PURE__ */ new Date()).getFullYear()
      ]);
    }
    setFilters(initialFilters);
  }, [initialFilters]);
  const handlePriceChange = (values) => {
    setPriceRange([values[0], values[1]]);
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };
  const handleYearChange = (values) => {
    setYearRange([values[0], values[1]]);
    setFilters((prev) => ({
      ...prev,
      minYear: values[0],
      maxYear: values[1]
    }));
  };
  const handleMakeChange = (make) => {
    setFilters((prev) => ({
      ...prev,
      make: prev.make === make ? void 0 : make
    }));
  };
  const handleCheckboxGroupChange = (group, value) => {
    setFilters((prev) => {
      const currentValues = prev[group] || [];
      const exists = currentValues.includes(value);
      let newValues;
      if (exists) {
        newValues = currentValues.filter((v) => v !== value);
      } else {
        newValues = [...currentValues, value];
      }
      return {
        ...prev,
        [group]: newValues.length ? newValues : void 0
      };
    });
  };
  const handleMaxMileageChange = (mileage) => {
    setFilters((prev) => ({
      ...prev,
      maxMileage: mileage || void 0
    }));
  };
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  const handleResetFilters = () => {
    setPriceRange([0, 2e5]);
    setYearRange([2e3, (/* @__PURE__ */ new Date()).getFullYear()]);
    setFilters({});
  };
  const bodyTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Wagon", "Truck", "Van"];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
  const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
  const conditions = ["New", "Used", "Certified Pre-Owned"];
  const sellerTypes = ["Dealer", "Private"];
  return <Sheet open={isOpen} onOpenChange={setIsOpen}><SheetTrigger asChild><Button
    variant="outline"
    className="flex items-center gap-2"
    onClick={() => setIsOpen(true)}
  ><SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button></SheetTrigger><SheetContent className="w-full sm:max-w-md overflow-y-auto"><SheetHeader className="mb-4 flex flex-row items-center justify-between"><SheetTitle className="flex items-center"><Settings2 className="mr-2 h-5 w-5" />
            Filter Cars
          </SheetTitle><Button
    variant="ghost"
    size="icon"
    onClick={() => setIsOpen(false)}
  ><X className="h-5 w-5" /></Button></SheetHeader><div className="space-y-6">{
    /* Price Range */
  }<div><h3 className="text-sm font-medium mb-3">Price Range</h3><Slider
    min={0}
    max={2e5}
    step={1e3}
    value={[priceRange[0], priceRange[1]]}
    onValueChange={handlePriceChange}
    className="mb-2"
  /><div className="flex justify-between text-sm text-slate-500"><span>${priceRange[0].toLocaleString()}</span><span>${priceRange[1].toLocaleString()}</span></div></div>{
    /* Year Range */
  }<div><h3 className="text-sm font-medium mb-3">Year Range</h3><Slider
    min={2e3}
    max={(/* @__PURE__ */ new Date()).getFullYear()}
    step={1}
    value={[yearRange[0], yearRange[1]]}
    onValueChange={handleYearChange}
    className="mb-2"
  /><div className="flex justify-between text-sm text-slate-500"><span>{yearRange[0]}</span><span>{yearRange[1]}</span></div></div>{
    /* Max Mileage */
  }<div><h3 className="text-sm font-medium mb-3">Max Mileage</h3><Slider
    min={0}
    max={2e5}
    step={5e3}
    value={[filters.maxMileage || 2e5]}
    onValueChange={(values) => handleMaxMileageChange(values[0])}
    className="mb-2"
  /><div className="flex justify-between text-sm text-slate-500"><span>0 miles</span><span>{(filters.maxMileage || 2e5).toLocaleString()} miles</span></div></div>{
    /* Make */
  }<div><h3 className="text-sm font-medium mb-3">Make</h3><div className="grid grid-cols-2 gap-2">{carMakes.map((make) => <div key={make} className="flex items-center space-x-2"><Checkbox
    id={`make-${make}`}
    checked={filters.make === make}
    onCheckedChange={() => handleMakeChange(make)}
  /><label
    htmlFor={`make-${make}`}
    className="text-sm cursor-pointer"
  >{make}</label></div>)}</div></div>{
    /* Body Type */
  }<div><h3 className="text-sm font-medium mb-3">Body Type</h3><div className="grid grid-cols-2 gap-2">{bodyTypes.map((type) => <div key={type} className="flex items-center space-x-2"><Checkbox
    id={`body-${type}`}
    checked={(filters.bodyType || []).includes(type)}
    onCheckedChange={() => handleCheckboxGroupChange("bodyType", type)}
  /><label
    htmlFor={`body-${type}`}
    className="text-sm cursor-pointer"
  >{type}</label></div>)}</div></div>{
    /* Fuel Type */
  }<div><h3 className="text-sm font-medium mb-3">Fuel Type</h3><div className="grid grid-cols-2 gap-2">{fuelTypes.map((type) => <div key={type} className="flex items-center space-x-2"><Checkbox
    id={`fuel-${type}`}
    checked={(filters.fuelType || []).includes(type)}
    onCheckedChange={() => handleCheckboxGroupChange("fuelType", type)}
  /><label
    htmlFor={`fuel-${type}`}
    className="text-sm cursor-pointer"
  >{type}</label></div>)}</div></div>{
    /* Transmission */
  }<div><h3 className="text-sm font-medium mb-3">Transmission</h3><div className="grid grid-cols-2 gap-2">{transmissions.map((type) => <div key={type} className="flex items-center space-x-2"><Checkbox
    id={`transmission-${type}`}
    checked={(filters.transmission || []).includes(type)}
    onCheckedChange={() => handleCheckboxGroupChange("transmission", type)}
  /><label
    htmlFor={`transmission-${type}`}
    className="text-sm cursor-pointer"
  >{type}</label></div>)}</div></div>{
    /* Condition */
  }<div><h3 className="text-sm font-medium mb-3">Condition</h3><div className="grid grid-cols-2 gap-2">{conditions.map((type) => <div key={type} className="flex items-center space-x-2"><Checkbox
    id={`condition-${type}`}
    checked={(filters.condition || []).includes(type)}
    onCheckedChange={() => handleCheckboxGroupChange("condition", type)}
  /><label
    htmlFor={`condition-${type}`}
    className="text-sm cursor-pointer"
  >{type}</label></div>)}</div></div>{
    /* Seller Type */
  }<div><h3 className="text-sm font-medium mb-3">Seller Type</h3><div className="grid grid-cols-2 gap-2">{sellerTypes.map((type) => <div key={type} className="flex items-center space-x-2"><Checkbox
    id={`seller-${type}`}
    checked={(filters.sellerType || []).includes(type)}
    onCheckedChange={() => handleCheckboxGroupChange("sellerType", type)}
  /><label
    htmlFor={`seller-${type}`}
    className="text-sm cursor-pointer"
  >{type}</label></div>)}</div></div><div className="flex gap-4 pt-4"><Button
    variant="outline"
    onClick={handleResetFilters}
    className="flex-1"
  >
              Reset
            </Button><Button
    onClick={handleApplyFilters}
    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
  >
              Apply Filters
            </Button></div></div></SheetContent></Sheet>;
}
export {
  CarFilter as default
};
