"""Generate the shared AutoVista EV seed catalog for FastAPI and React fallback data."""
from datetime import date, timedelta
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent

# Representative new-vehicle listings. Prices are sample dealer asking prices in USD,
# not guaranteed manufacturer MSRPs. Every make/model below is a real production EV.
MODELS = [
    ("Tesla", "Model 3", 42490, "Sedan"), ("Tesla", "Model Y", 44990, "SUV"),
    ("Tesla", "Model S", 79990, "Sedan"), ("Tesla", "Model X", 84990, "SUV"),
    ("Tesla", "Cybertruck", 79990, "Truck"), ("Ford", "Mustang Mach-E", 39995, "SUV"),
    ("Ford", "F-150 Lightning", 54995, "Truck"), ("Chevrolet", "Equinox EV", 34995, "SUV"),
    ("Chevrolet", "Blazer EV", 44995, "SUV"), ("Chevrolet", "Silverado EV", 73900, "Truck"),
    ("Rivian", "R1S", 75900, "SUV"), ("Rivian", "R1T", 69900, "Truck"),
    ("Lucid", "Air", 69900, "Sedan"), ("Lucid", "Gravity", 79900, "SUV"),
    ("BMW", "i4", 57900, "Sedan"), ("BMW", "i5", 67900, "Sedan"),
    ("BMW", "i7", 105700, "Sedan"), ("BMW", "iX", 87900, "SUV"),
    ("Mercedes-Benz", "EQB", 53550, "SUV"), ("Mercedes-Benz", "EQE Sedan", 74900, "Sedan"),
    ("Mercedes-Benz", "EQS Sedan", 104400, "Sedan"), ("Audi", "Q4 e-tron", 49900, "SUV"),
    ("Audi", "Q8 e-tron", 74900, "SUV"), ("Audi", "e-tron GT", 106500, "Sedan"),
    ("Volkswagen", "ID.4", 39735, "SUV"), ("Volkswagen", "ID. Buzz", 59995, "Van"),
    ("Hyundai", "IONIQ 5", 42600, "SUV"), ("Hyundai", "IONIQ 6", 37600, "Sedan"),
    ("Hyundai", "Kona Electric", 32975, "SUV"), ("Kia", "EV3", 35900, "SUV"),
    ("Kia", "EV6", 42600, "SUV"), ("Kia", "EV9", 54900, "SUV"),
    ("Kia", "Niro EV", 39900, "SUV"), ("Nissan", "LEAF", 28140, "Hatchback"),
    ("Nissan", "ARIYA", 39770, "SUV"), ("Volvo", "EX30", 34950, "SUV"),
    ("Volvo", "EX40", 52500, "SUV"), ("Volvo", "EC40", 53900, "SUV"),
    ("Polestar", "2", 49900, "Sedan"), ("Polestar", "3", 67500, "SUV"),
    ("Polestar", "4", 54900, "SUV"), ("Porsche", "Taycan", 99900, "Sedan"),
    ("Porsche", "Macan Electric", 78800, "SUV"), ("Cadillac", "LYRIQ", 58595, "SUV"),
    ("Cadillac", "OPTIQ", 52900, "SUV"), ("GMC", "HUMMER EV Pickup", 98700, "Truck"),
    ("GMC", "Sierra EV", 89900, "Truck"), ("Toyota", "bZ4X", 37070, "SUV"),
    ("Subaru", "Solterra", 38900, "SUV"), ("Honda", "Prologue", 47400, "SUV"),
    ("Acura", "ZDX", 64500, "SUV"), ("Lexus", "RZ", 43120, "SUV"),
    ("Genesis", "GV60", 52400, "SUV"), ("Genesis", "Electrified GV70", 66950, "SUV"),
    ("Genesis", "Electrified G80", 74900, "Sedan"), ("MINI", "Cooper Electric", 30900, "Hatchback"),
    ("MINI", "Countryman Electric", 45900, "SUV"), ("Fiat", "500e", 32500, "Hatchback"),
    ("Rolls-Royce", "Spectre", 422750, "Coupe"), ("Lotus", "Eletre", 107000, "SUV"),
    ("VinFast", "VF 8", 46900, "SUV"), ("VinFast", "VF 9", 69900, "SUV"),
    ("Jaguar", "I-PACE", 72900, "SUV"), ("Mazda", "MX-30", 34990, "SUV"),
]

IMAGES = [
    "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/11064362/pexels-photo-11064362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/12318068/pexels-photo-12318068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
]

locations = ["San Francisco, CA", "Los Angeles, CA", "Austin, TX", "Seattle, WA", "Denver, CO", "New York, NY"]
cars = []
today = date.today()
for index, (make, model, price, body) in enumerate(MODELS, start=1):
    cars.append({
        "id": str(index), "make": make, "model": model, "year": 2025,
        "price": price, "mileage": 25 + (index * 17) % 475, "fuelType": "Electric",
        "transmission": "Automatic", "color": ["Pearl White", "Midnight Black", "Ocean Blue", "Performance Red"][index % 4],
        "bodyType": body, "engineSize": 0, "doors": 2 if body == "Coupe" else 4,
        "features": ["Battery Electric Powertrain", "DC Fast Charging", "Regenerative Braking", "Navigation", "Backup Camera", "Driver Assistance", "Wireless Phone Integration"],
        "description": f"This {2025} {make} {model} is a real production battery-electric vehicle offered as a representative new-vehicle listing. Contact the seller to confirm trim, range, charging speed, incentives, and final price.",
        "images": [IMAGES[index % len(IMAGES)], IMAGES[(index + 1) % len(IMAGES)], IMAGES[(index + 2) % len(IMAGES)]],
        "condition": "New", "sellerType": "Dealer", "sellerName": f"{make} EV Center",
        "sellerContactEmail": f"sales@{''.join(char for char in make.lower() if char.isalnum())}ev.example",
        "sellerLocation": locations[index % len(locations)], "isFeatured": index <= 12,
        "postedDate": (today - timedelta(days=index % 28)).isoformat(),
    })

sort_options = [
    {"label": "Newest First", "value": "posted-desc"}, {"label": "Price: Low to High", "value": "price-asc"},
    {"label": "Price: High to Low", "value": "price-desc"}, {"label": "Year: Newest First", "value": "year-desc"},
    {"label": "Year: Oldest First", "value": "year-asc"}, {"label": "Mileage: Low to High", "value": "mileage-asc"},
]
testimonials = [
    {"id": 1, "name": "Sarah Johnson", "role": "EV Owner", "content": "AutoVista made it easy to compare electric cars across brands and find the right fit for my budget.", "avatar": "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400", "rating": 5},
    {"id": 2, "name": "Michael Rodriguez", "role": "Car Enthusiast", "content": "The filters and clear listing details helped me build a useful EV shortlist quickly.", "avatar": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400", "rating": 5},
    {"id": 3, "name": "Emily Chen", "role": "First-time EV Buyer", "content": "The catalog assistant explained my options without inventing vehicles that were not listed.", "avatar": "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400", "rating": 5},
]

(ROOT / "backend" / "data" / "cars.json").write_text(json.dumps(cars, indent=2), encoding="utf-8")
js = "// Generated by backend/seed_ev_catalog.py\n"
js += f"const carMakes = {json.dumps(sorted({car['make'] for car in cars}))};\n"
js += f"const sortOptions = {json.dumps(sort_options)};\n"
js += f"const cars = {json.dumps(cars)};\n"
js += f"const testimonials = {json.dumps(testimonials)};\n"
js += "export { carMakes, cars, sortOptions, testimonials };\n"
(ROOT / "src" / "data" / "cars.js").write_text(js, encoding="utf-8")
print(f"Seeded {len(cars)} real EV models across {len(set(car['make'] for car in cars))} brands.")
