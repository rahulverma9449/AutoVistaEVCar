# AutoVista EV Car Marketplace

AutoVista is a full-stack vehicle marketplace for discovering and exploring electric and conventional cars. It combines a responsive React interface with a FastAPI backend, searchable vehicle inventory, user accounts, inquiries, and an inventory-grounded shopping assistant.

## Features

- Browse featured vehicles and detailed listings
- Search, sort, and filter by make, price, year, mileage, fuel type, transmission, body type, condition, and seller type
- View specifications, features, seller information, and related vehicle details
- Ask AutoVista Assist for catalog-based recommendations and comparisons
- Create an account, sign in, and manage a user profile
- Submit contact messages and vehicle inquiries
- Switch between light and dark themes
- Use a responsive interface designed for desktop and mobile devices
- Explore and test backend endpoints through interactive API documentation

## Technology stack

- Frontend: React 18, Vite, React Router, Tailwind CSS, Radix UI, and Axios
- Backend: FastAPI, Uvicorn, Pydantic, JWT authentication, and Passlib/bcrypt
- Storage: JSON files for the vehicle catalog and local runtime data

## Project structure

```text
AutoVistaEVCar/
|-- backend/
|   |-- app/                 # FastAPI application
|   |-- data/cars.json       # Vehicle catalog
|   |-- requirements.txt     # Python dependencies
|   `-- seed_ev_catalog.py   # Catalog seed utility
|-- public/                  # Static assets
|-- src/
|   |-- components/          # UI, layout, vehicle, and assistant components
|   |-- data/                # Frontend fallback vehicle data
|   |-- hooks/               # Authentication and toast hooks
|   |-- lib/                 # API client and utilities
|   `-- pages/               # Marketplace and authentication pages
|-- package.json
`-- vite.config.js
```

## Requirements

- Node.js 18 or newer
- npm
- Python 3.10 or newer

## Installation

Install the frontend dependencies:

```bash
npm install
```

Install the backend dependencies:

```bash
python -m pip install -r backend/requirements.txt
```

## Run locally

Start the FastAPI backend:

```bash
npm run dev:backend
```

The API runs at `http://localhost:3001`, with interactive documentation at `http://localhost:3001/api/docs`.

In a second terminal, start the React frontend:

```bash
npm run dev:frontend
```

Open `http://localhost:5353` in your browser. Vite proxies frontend `/api` requests to the backend during local development.

## Environment variables

The application works locally without additional configuration. For a production-style setup, create a `.env` file and define:

```env
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5353
```

You can also set `VITE_API_BASE_URL` in the frontend environment when the API is hosted separately. Do not commit real secrets or local `.env` files.

## Available commands

```bash
npm run dev             # Start the Vite frontend
npm run dev:frontend    # Start the Vite frontend on port 5353
npm run dev:backend     # Start FastAPI with auto-reload on port 3001
npm run start:backend   # Start FastAPI without auto-reload
npm run build           # Build the frontend for production
npm run lint            # Run ESLint
npm run preview         # Preview the production frontend build
```

## Data and API behavior

The version-controlled vehicle catalog is stored in `backend/data/cars.json`. User accounts and submitted messages are written locally to `backend/data/users.json` and `backend/data/messages.json`; both runtime files are excluded from Git.

AutoVista Assist answers vehicle-shopping questions using the current backend catalog. It can find and compare listings by attributes such as budget, make, body style, fuel type, mileage, and featured status. Its answers are intended for vehicle discovery and do not replace professional legal, financing, or mechanical advice.

## Production build

```bash
npm run build
```

The generated frontend assets are written to `dist/`.

## Image credit

The local Mustang photograph (`public/assets/mustang-gt.jpg`) is "Ford Mustang GT S550 FL red" by Damian B Oh, licensed under [CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Ford_Mustang_GT_S550_FL_red.jpg).
