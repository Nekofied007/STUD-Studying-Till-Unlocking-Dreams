# STUD — Studying Till Unlocking Dreams

A production-ready full-stack React application with an Express API, Tailwind UI, GSAP/Framer animations, and Spline-powered backgrounds. Built on a Vite + TypeScript monorepo-style layout with shared types across client and server.

## Tech Stack
- Frontend: React 18, TypeScript, React Router 6 (SPA), TailwindCSS 3, Framer Motion, GSAP
- 3D/Visuals: Spline Web Component (non-interactive), custom overlays and reveal animations
- Backend: Express (integrated with Vite), Users API
- Data: Prisma ORM + SQLite (optional; can run API without DB by switching code paths)
- Tooling: Vite, Vitest, Zod, pnpm (preferred)

## Monorepo Layout
```
client/      # React SPA
server/      # Express API (integrated with Vite dev server)
shared/      # Shared types/interfaces
netlify/     # Serverless adapter (optional)
```

Key files:
- `client/pages/Index.tsx`: Landing page with multiple animated sections and Spline scenes
- `client/components/Navbar.tsx`: Fixed top navigation bar
- `server/index.ts`: Express app with `/api/ping`, `/api/demo`, and `/api/users` routes
- `shared/api.ts`: Types shared between client and server

## Features
- Animated landing page: Hero, Problem, Process, Features, Vision, and CTA sections
- Fixed, transparent navbar with blur and consistent height across breakpoints
- Spline scenes are lazy-loaded (except hero) and non-interactive to avoid event capture
- Watermark coverage via safe overlays with minimal overhead
- Users API with zod validation and Prisma-based persistence (SQLite)
- Serverless entry (`netlify/functions/api.ts`) for easy Netlify deployment

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended). If you don’t have pnpm, you can use npm, but scripts reference pnpm in docs.

### Install
```powershell
# from repo root
pnpm install
```

### Development
```powershell
pnpm dev
# Opens Vite on an available port (e.g., http://localhost:8085)
```

### Typecheck and Test
```powershell
pnpm typecheck
pnpm test
```

### Build
```powershell
pnpm build
# Client build -> dist/spa
# Server build -> dist/server
```

### Start (production)
```powershell
pnpm start
# Runs the built Express server from dist/server/node-build.mjs
```

## API
- `GET /api/ping` → `{ message: string }`
- `GET /api/demo` → demo payload
- `GET /api/users` → `{ users: User[] }`
- `POST /api/users` → `{ user: User }` with body `{ name, email }`
- `GET /api/users/:id` → `{ user }`
- `DELETE /api/users/:id` → `{ user }`

Types are defined in `shared/api.ts`.

## Prisma + SQLite (optional)
The Users API expects Prisma to be configured. If you’re running fresh:
```powershell
# Initialize the SQLite DB
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init
```

You can also swap to a different database by updating your Prisma schema and `DATABASE_URL`.

## Deployment
- Netlify: The included `netlify/functions/api.ts` wraps the Express app via `serverless-http`.
- Vercel/Other: Use the Node build (`pnpm build && pnpm start`) or adapt the serverless handler.

## Notes
- The navbar is fixed with high z-index and the layout uses padding-top utilities to ensure content isn’t hidden underneath.
- Spline viewer components are rendered with `pointer-events: none` and lowered z-index so they never interfere with UI interactions.

## License
MIT
