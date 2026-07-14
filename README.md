# AI Research Agent Frontend

React + Vite frontend for the AI-Powered Research & Recommendation Agent.

The app lets a user enter a company name, sends it to the backend research API, and renders a structured business report with overview, business information, challenges, AI opportunities, CEO pitch, sources, and recent search history.

## Current Frontend Flow

1. User enters a company name in the search bar.
2. `src/services/api.ts` sends `POST /api/research`.
3. The backend returns a generated report.
4. `Home.tsx` stores the report in state and renders report sections.
5. Recent searches are loaded from `GET /api/history`.
6. A history item can be removed with `DELETE /api/history/:id`.

## Backend API Used

The frontend reads the backend API URL from `VITE_API_BASE_URL`.

Default deployed backend:

```txt
https://ai-research-dashboard-server.onrender.com/api
```

Active API helpers:

| Function | Endpoint | Purpose |
| --- | --- | --- |
| `researchCompany(companyName)` | `POST /research` | Generate a report |
| `getHistory()` | `GET /history` | Load recent searches |
| `deleteHistory(id)` | `DELETE /history/:id` | Delete one history item |

## Folder Structure

```txt
frontend/
  src/
    app/
      App.tsx
    components/
      AIOpportunities.tsx
      BusinessChallenges.tsx
      BusinessInformation.tsx
      CEOPitch.tsx
      Footer.tsx
      Loading.tsx
      Navbar.tsx
      OverviewCard.tsx
      SearchBar.tsx
      Sources.tsx
    pages/
      Home.tsx
    services/
      api.ts
    styles/
      index.css
      globals.css
      theme.css
      tailwind.css
      fonts.css
    main.tsx
```

## Main Files

| File | Purpose |
| --- | --- |
| `src/main.tsx` | React entry point |
| `src/app/App.tsx` | App shell with navbar, home page, footer |
| `src/pages/Home.tsx` | Main search, report rendering, history flow |
| `src/services/api.ts` | Axios client and backend API helpers |
| `src/components/SearchBar.tsx` | Company input and frontend validation |
| `src/components/OverviewCard.tsx` | Company overview display |
| `src/components/BusinessInformation.tsx` | Business information lists |
| `src/components/BusinessChallenges.tsx` | Challenge cards |
| `src/components/AIOpportunities.tsx` | AI recommendation cards |
| `src/components/CEOPitch.tsx` | Executive pitch letter |
| `src/components/Sources.tsx` | Source links |

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

Vite will start the frontend locally, usually at:

```txt
http://localhost:5173
```

Make sure the backend is running on:

```txt
http://localhost:5000
```

## Environment Variables

Create a local `.env` file from `.env.example` when you need to override the backend URL:

```txt
VITE_API_BASE_URL=https://ai-research-dashboard-server.onrender.com/api
```

For local backend development, use:

```txt
VITE_API_BASE_URL=http://localhost:5000/api
```

## Build

```bash
npm run build
```

## Environment and Git Safety

This frontend uses `VITE_API_BASE_URL` in `src/services/api.ts`, with a Render backend fallback:

```ts
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ai-research-dashboard-server.onrender.com/api";
```

Keep real `.env` files local. `.env`, `node_modules`, and `dist` are ignored by git.
