# Nova AI

Nova AI is a React and FastAPI assistant powered by the OpenAI Responses API. It supports multi-turn conversations and optional web search.

## Setup

```bash
npm install
python -m pip install -r backend/requirements.txt
```

## Run locally

Copy `.env.example` to `.env`, set `OPENAI_API_KEY`, then start the API on port 3010:

```bash
npm run dev:backend
```

Start the React frontend on port 5180 in a second terminal:

```bash
npm run dev:frontend
```

The frontend proxies `/api` requests to FastAPI. Interactive API documentation is available at `http://localhost:3010/api/docs`.

The floating AutoVista Assist chat answers vehicle discovery and comparison questions using the current backend catalog. Its responses are deliberately inventory-grounded; it does not claim to provide legal, financing, or mechanical advice.

## Build

```bash
npm run build
```

Runtime users and messages are stored under `backend/data` and ignored by Git. Vehicle seed data is stored in `backend/data/cars.json`.

## Image credit

The local Mustang photograph (`public/assets/mustang-gt.jpg`) is “Ford Mustang GT S550 FL red” by Damian B Oh, licensed under [CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Ford_Mustang_GT_S550_FL_red.jpg).
