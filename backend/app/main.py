from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4
import json
import os
import re

from fastapi import Depends, FastAPI, HTTPException, Query, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
USERS_FILE = DATA_DIR / "users.json"
MESSAGES_FILE = DATA_DIR / "messages.json"
CARS_FILE = DATA_DIR / "cars.json"
SECRET = os.getenv("JWT_SECRET", "autovista-local-development-secret")
ALGORITHM = "HS256"

app = FastAPI(title="AutoVista API", version="1.0.0", docs_url="/api/docs", openapi_url="/api/openapi.json")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CLIENT_ORIGIN", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
security = HTTPBearer(auto_error=False)
passwords = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.exception_handler(HTTPException)
async def http_error(_: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})


def read_json(path: Path, fallback: list | None = None) -> list:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return fallback or []


def write_json(path: Path, value: list) -> None:
    path.write_text(json.dumps(value, indent=2), encoding="utf-8")


def public_user(user: dict) -> dict:
    return {key: value for key, value in user.items() if key != "passwordHash"}


def create_token(user_id: str) -> str:
    expires = datetime.now(timezone.utc) + timedelta(days=7)
    return jwt.encode({"sub": user_id, "exp": expires}, SECRET, algorithm=ALGORITHM)


def current_user(credentials: HTTPAuthorizationCredentials | None = Depends(security)) -> dict:
    if not credentials:
        raise HTTPException(status_code=401, detail="Authentication required")
    try:
        payload = jwt.decode(credentials.credentials, SECRET, algorithms=[ALGORITHM])
        user = next((item for item in read_json(USERS_FILE) if item["id"] == payload.get("sub")), None)
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid or expired token") from exc
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user


class SignUpInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class SignInInput(BaseModel):
    email: EmailStr
    password: str


class EmailInput(BaseModel):
    email: EmailStr


class ProfileInput(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=100)
    phone: str | None = Field(default=None, max_length=30)
    location: str | None = Field(default=None, max_length=150)
    bio: str | None = Field(default=None, max_length=1000)
    avatar: str | None = None


class MessageInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    subject: str = Field(min_length=5, max_length=200)
    message: str = Field(min_length=10, max_length=5000)


class InquiryInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    message: str = Field(min_length=5, max_length=5000)


class CarInput(BaseModel):
    make: str = Field(min_length=2, max_length=80)
    model: str = Field(min_length=1, max_length=100)
    year: int = Field(ge=1990, le=2035)
    price: float = Field(gt=0)
    mileage: int = Field(ge=0)
    fuelType: str
    transmission: str
    color: str = "Not specified"
    bodyType: str
    engineSize: float = Field(default=0, ge=0)
    cylinders: int | None = Field(default=None, ge=0)
    doors: int = Field(default=4, ge=2, le=6)
    features: list[str] = Field(default_factory=list)
    description: str = Field(min_length=20, max_length=5000)
    images: list[str] = Field(min_length=1)
    condition: str
    sellerType: str = "Dealer"
    sellerName: str = Field(min_length=2, max_length=120)
    sellerContactEmail: EmailStr
    sellerContactPhone: str | None = None
    sellerLocation: str = Field(min_length=2, max_length=150)
    isFeatured: bool = False


class AssistantInput(BaseModel):
    message: str = Field(min_length=2, max_length=500)


def compact_car(car: dict) -> dict:
    return {key: car[key] for key in ("id", "make", "model", "year", "price", "fuelType", "bodyType", "condition", "mileage")}


def assistant_answer(question: str, cars: list[dict]) -> tuple[str, list[dict]]:
    text = question.lower().strip()
    matches = list(cars)
    mentioned = [car for car in cars if car["make"].lower() in text or car["model"].lower() in text]
    if mentioned:
        matches = mentioned

    fuel_types = ["electric", "hybrid", "diesel", "gasoline", "plug-in hybrid"]
    selected_fuel = next((fuel for fuel in fuel_types if fuel in text), None)
    if selected_fuel:
        matches = [car for car in matches if car["fuelType"].lower() == selected_fuel]

    body_types = ["suv", "sedan", "hatchback", "convertible", "coupe", "wagon", "truck", "van"]
    selected_body = next((body for body in body_types if re.search(rf"\b{re.escape(body)}s?\b", text)), None)
    if selected_body:
        matches = [car for car in matches if car["bodyType"].lower() == selected_body]

    amount_match = re.search(r"(?:under|below|less than|max(?:imum)?|budget(?: of)?)\s*\$?([\d,]+)\s*(k)?", text)
    if amount_match:
        budget = int(amount_match.group(1).replace(",", "")) * (1000 if amount_match.group(2) else 1)
        matches = [car for car in matches if car["price"] <= budget]

    if "featured" in text:
        matches = [car for car in matches if car.get("isFeatured")]

    if any(word in text for word in ("cheap", "affordable", "lowest", "budget", "under", "below")):
        matches.sort(key=lambda car: car["price"])
    elif any(word in text for word in ("newest", "latest")):
        matches.sort(key=lambda car: (car["year"], car["postedDate"]), reverse=True)
    else:
        matches.sort(key=lambda car: (bool(car.get("isFeatured")), car["year"]), reverse=True)

    if any(word in text for word in ("hello", "hi", "hey")) and len(text.split()) <= 4:
        return "Hello! I can find vehicles by budget, body style, fuel type, make, model, or condition. I can also compare listings from AutoVista’s current inventory.", []
    catalog_intent = mentioned or selected_fuel or selected_body or amount_match or "featured" in text or any(
        word in text for word in ("car", "cars", "vehicle", "vehicles", "compare", "recommend", "listing", "inventory", "mileage", "price")
    )
    if not catalog_intent:
        return "I’m a vehicle-shopping assistant, so I only answer questions supported by AutoVista’s current catalog. Ask me about a make, model, budget, body style, fuel type, mileage, or comparison.", []
    if not matches:
        return "I couldn’t find a vehicle in the current AutoVista catalog that matches those requirements. Try increasing the budget or removing one filter.", []

    selected = matches[:3]
    if len(mentioned) == 1 and len(selected) == 1:
        car = selected[0]
        answer = f"The {car['year']} {car['make']} {car['model']} is listed at ${car['price']:,}. It is a {car['condition'].lower()} {car['fuelType'].lower()} {car['bodyType'].lower()} with {car['mileage']:,} miles and a {car['transmission'].lower()} transmission."
    elif "compare" in text and len(selected) > 1:
        lines = [f"• {car['year']} {car['make']} {car['model']}: ${car['price']:,}, {car['fuelType']}, {car['mileage']:,} miles" for car in selected]
        answer = "Here’s a catalog-based comparison:\n" + "\n".join(lines) + "\nOpen each listing for its complete features and seller information."
    else:
        answer = f"I found {len(matches)} matching vehicle{'s' if len(matches) != 1 else ''}. These are the strongest matches from the current catalog, ordered by your request."
    return answer, selected


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "autovista-fastapi", "cars": len(read_json(CARS_FILE))}


@app.post("/api/assistant")
def ask_assistant(payload: AssistantInput) -> dict:
    answer, matches = assistant_answer(payload.message, read_json(CARS_FILE))
    return {"answer": answer, "cars": [compact_car(car) for car in matches], "grounded": True}


@app.get("/api/cars")
@app.get("/api/cars/search")
def list_cars(
    q: str = "", search: str = "", make: str | None = None,
    fuelType: str | None = None, transmission: str | None = None,
    bodyType: str | None = None, condition: str | None = None,
    sellerType: str | None = None, minPrice: float | None = None,
    maxPrice: float | None = None, minYear: int | None = None,
    maxYear: int | None = None, maxMileage: int | None = None,
    featured: bool | None = None, sort: str = Query("posted-desc"),
) -> dict:
    cars = read_json(CARS_FILE)
    term = (q or search).lower().strip()
    if term:
        cars = [car for car in cars if term in f"{car['make']} {car['model']} {car['description']}".lower()]
    for key, value in {"make": make, "fuelType": fuelType, "transmission": transmission, "bodyType": bodyType, "condition": condition, "sellerType": sellerType}.items():
        if value:
            allowed = value.split(",")
            cars = [car for car in cars if str(car.get(key)) in allowed]
    if minPrice is not None: cars = [car for car in cars if car["price"] >= minPrice]
    if maxPrice is not None: cars = [car for car in cars if car["price"] <= maxPrice]
    if minYear is not None: cars = [car for car in cars if car["year"] >= minYear]
    if maxYear is not None: cars = [car for car in cars if car["year"] <= maxYear]
    if maxMileage is not None: cars = [car for car in cars if car["mileage"] <= maxMileage]
    if featured is True: cars = [car for car in cars if car.get("isFeatured")]
    sorters = {
        "price-asc": ("price", False), "price-desc": ("price", True),
        "year-desc": ("year", True), "year-asc": ("year", False),
        "mileage-asc": ("mileage", False), "posted-desc": ("postedDate", True),
    }
    key, reverse = sorters.get(sort, sorters["posted-desc"])
    cars.sort(key=lambda car: car[key], reverse=reverse)
    return {"cars": cars, "total": len(cars)}


@app.get("/api/cars/meta")
def car_metadata() -> dict:
    cars = read_json(CARS_FILE)
    unique = lambda key: sorted({str(car[key]) for car in cars if car.get(key) is not None})
    prices = [car["price"] for car in cars]
    return {
        "total": len(cars),
        "makes": unique("make"),
        "fuelTypes": unique("fuelType"),
        "transmissions": unique("transmission"),
        "bodyTypes": unique("bodyType"),
        "conditions": unique("condition"),
        "priceRange": {"min": min(prices, default=0), "max": max(prices, default=0)},
    }


@app.post("/api/cars", status_code=status.HTTP_201_CREATED)
def create_car(payload: CarInput) -> dict:
    cars = read_json(CARS_FILE)
    car = {
        "id": str(uuid4()),
        **payload.model_dump(mode="json"),
        "postedDate": datetime.now(timezone.utc).date().isoformat(),
    }
    cars.append(car)
    write_json(CARS_FILE, cars)
    return car


@app.get("/api/cars/{car_id}")
def get_car(car_id: str) -> dict:
    car = next((item for item in read_json(CARS_FILE) if item["id"] == car_id), None)
    if not car: raise HTTPException(status_code=404, detail="Vehicle not found")
    return car


@app.put("/api/cars/{car_id}")
def update_car(car_id: str, payload: CarInput) -> dict:
    cars = read_json(CARS_FILE)
    index = next((i for i, car in enumerate(cars) if car["id"] == car_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    cars[index] = {**cars[index], **payload.model_dump(mode="json"), "id": car_id}
    write_json(CARS_FILE, cars)
    return cars[index]


@app.delete("/api/cars/{car_id}")
def delete_car(car_id: str) -> dict:
    cars = read_json(CARS_FILE)
    remaining = [car for car in cars if car["id"] != car_id]
    if len(remaining) == len(cars):
        raise HTTPException(status_code=404, detail="Vehicle not found")
    write_json(CARS_FILE, remaining)
    return {"message": "Vehicle deleted", "id": car_id}


@app.post("/api/auth/signup", status_code=status.HTTP_201_CREATED)
def sign_up(payload: SignUpInput) -> dict:
    users = read_json(USERS_FILE)
    email = str(payload.email).lower()
    if any(user["email"] == email for user in users):
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    user = {"id": str(uuid4()), "name": payload.name.strip(), "email": email, "passwordHash": passwords.hash(payload.password), "provider": "email", "createdAt": datetime.now(timezone.utc).isoformat()}
    users.append(user); write_json(USERS_FILE, users)
    return {"token": create_token(user["id"]), "user": public_user(user)}


@app.post("/api/auth/signin")
def sign_in(payload: SignInInput) -> dict:
    user = next((item for item in read_json(USERS_FILE) if item["email"] == str(payload.email).lower()), None)
    if not user or not passwords.verify(payload.password, user["passwordHash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"token": create_token(user["id"]), "user": public_user(user)}


@app.get("/api/auth/profile")
def get_profile(user: dict = Depends(current_user)) -> dict:
    return public_user(user)


@app.put("/api/auth/profile")
def update_profile(payload: ProfileInput, user: dict = Depends(current_user)) -> dict:
    users = read_json(USERS_FILE); index = next(i for i, item in enumerate(users) if item["id"] == user["id"])
    users[index].update(payload.model_dump(exclude_none=True)); write_json(USERS_FILE, users)
    return {"user": public_user(users[index])}


@app.post("/api/auth/forgot-password")
def forgot_password(_: EmailInput) -> dict:
    return {"message": "If an account exists, password reset instructions have been sent."}


@app.post("/api/auth/logout")
def logout() -> dict:
    return {"message": "Signed out"}


@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
def contact(payload: MessageInput) -> dict:
    messages = read_json(MESSAGES_FILE); item = {"id": str(uuid4()), **payload.model_dump(mode="json"), "createdAt": datetime.now(timezone.utc).isoformat(), "status": "new"}
    messages.append(item); write_json(MESSAGES_FILE, messages)
    return {"message": "Message received", "id": item["id"]}


@app.post("/api/cars/{car_id}/inquiry", status_code=status.HTTP_201_CREATED)
def inquiry(car_id: str, payload: InquiryInput) -> dict:
    if not any(car["id"] == car_id for car in read_json(CARS_FILE)):
        raise HTTPException(status_code=404, detail="Vehicle not found")
    messages = read_json(MESSAGES_FILE); item = {"id": str(uuid4()), "type": "inquiry", "carId": car_id, **payload.model_dump(mode="json"), "createdAt": datetime.now(timezone.utc).isoformat(), "status": "new"}
    messages.append(item); write_json(MESSAGES_FILE, messages)
    return {"message": "Inquiry sent", "id": item["id"]}
