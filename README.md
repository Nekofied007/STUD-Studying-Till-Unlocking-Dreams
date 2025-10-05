<p align="center">
	<img src="./assets/banner.svg" alt="STUD banner" width="720" />
</p>

<h1 align="center">STUD — Studying Till Unlocking Dreams ✨</h1>

<p align="center">
	<strong>Colorful, animated learning landing page + Express API</strong><br/>
	Built with React + TypeScript + Vite + Tailwind + GSAP/Framer, featuring Spline backgrounds.
</p>

<p align="center">
	<a href="https://github.com/Nekofied007/STUD-Studying-Till-Unlocking-Dreams-/actions" target="_blank">
		<img src="https://img.shields.io/badge/CI-ready-22c55e?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI ready"/>
	</a>
	<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=061d2f" alt="React 18"/>
	<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
	<img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
	<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TS"/>
	<img src="https://img.shields.io/badge/GSAP-3-88CC14?style=for-the-badge&logo=greensock&logoColor=0b0b0f" alt="GSAP"/>
	<img src="https://img.shields.io/badge/Framer%20Motion-12-111827?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
</p>

---

## 🚀 Tech Stack
- 🧠 Frontend: React 18, TypeScript, React Router 6 (SPA), TailwindCSS 3, Framer Motion, GSAP
- 🌌 Visuals: Spline Web Component (non-interactive), reveal animations, overlays
- 🛠️ Backend: Express (integrated with Vite) + Users API (Zod validation)
- 🗄️ Data: Prisma ORM + SQLite (optional)
- ⚙️ Tooling: Vite, Vitest, Zod, pnpm

## 📁 Project Structure
```
client/      # React SPA
server/      # Express API (integrated with Vite dev server)
shared/      # Shared types/interfaces
netlify/     # Serverless adapter (optional)
```

Key files:
- `client/pages/Index.tsx` — Animated landing page with multiple Spline scenes
- `client/components/Navbar.tsx` — Fixed top navigation bar
- `server/index.ts` — Express app with `/api/ping`, `/api/demo`, `/api/users`
- `shared/api.ts` — Types shared between client and server

## ✨ Features
- 🎬 Animated sections: Hero, Problem, Process, Features, Vision, CTA
- 🧊 Glass/blur navbar (fixed) with content offsets for perfect scroll behavior
- 🎛️ Spline scenes: lazy-loaded (except hero), non-interactive to avoid event capture
- 🧩 Watermark covered via lightweight overlays (no heavy observers)
- 🔐 Users API with Zod validation and Prisma persistence
- ☁️ Serverless entry (`netlify/functions/api.ts`) for Netlify

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended). You can use npm, but docs below show pnpm.

### Install
```powershell
# from repo root
pnpm install
```

### Development
```powershell
pnpm dev
# Vite will choose an available port (e.g., http://localhost:8085)
```

### Typecheck & Test
```powershell
pnpm typecheck
pnpm test
```

### Build
```powershell
pnpm build
# Client -> dist/spa
# Server -> dist/server
```

### Start (production)
```powershell
pnpm start
# Runs the built Express server from dist/server/node-build.mjs
```

## 🔌 API
- `GET /api/ping` → `{ message: string }`
- `GET /api/demo` → demo payload
- `GET /api/users` → `{ users: User[] }`
- `POST /api/users` → `{ user: User }` with body `{ name, email }`
- `GET /api/users/:id` → `{ user }`
- `DELETE /api/users/:id` → `{ user }`

Types are defined in `shared/api.ts`.

## 🗃️ Prisma + SQLite (optional)
If you’re running fresh:
```powershell
# Initialize the SQLite DB
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init
```
You can switch DBs by updating your Prisma schema and `DATABASE_URL`.

## 🚀 Deployment
- Netlify: `netlify/functions/api.ts` wraps the Express app via `serverless-http`.
- Vercel: Serverless function at `api/index.ts` exports the Express app. `vercel.json` rewrites `/api/*` to this function and serves `dist/spa` for the SPA.

### One-time Vercel setup
1. Install Vercel CLI (optional)
	```powershell
	npm i -g vercel
	```
2. Link and deploy
	```powershell
	vercel
	vercel --prod
	```
3. Environment (optional for DB)
	- Set `DATABASE_URL` if you want Prisma DB on Vercel; otherwise the Users API falls back to in-memory storage.

## 📝 Notes
- Navbar is fixed with a high z-index; layout uses padding-top utilities so content never hides underneath.
- Spline viewers use `pointer-events: none` and low z-index to avoid intercepting interactions.

---

<p align="center">
	<img src="./assets/logo.svg" alt="STUD logo" width="80"/>
	<br/>
	<sub>Studying Till Unlocking Dreams</sub>
	<br/>
	<sub>MIT License</sub>
</p>
