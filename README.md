<div align="center">

<img src="./assets/stud-readme-logo.png" alt="STUD Logo" width="240" />

<h1>STUD — Studying Till Unlocking Dreams ✨</h1>

<p>
<strong>A cinematic, colorful learning experience</strong> built with React + Tailwind, 3D Spline scenes, and a tiny Express backend. <br/>
AI-flavored helpers curate playlists, quizzes, and a study roadmap from your course URL. 🚀
</p>

<p>
<a href="https://github.com/Nekofied007/STUD-Studying-Till-Unlocking-Dreams/actions"><img alt="CI" src="https://github.com/Nekofied007/STUD-Studying-Till-Unlocking-Dreams/actions/workflows/ci.yml/badge.svg" /></a>
<img alt="Made with Vite" src="https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=061c24" />
<img alt="Express" src="https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white" />
<img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white" />
</p>

</div>

---

## Overview 🎬

STUD is a production-ready full-stack template tailored into a stylish landing page with:
- 3D Spline backgrounds and subtle cinematic overlays (grain + vignette)
- Smooth scroll-triggered animations (GSAP) and UI motion (Framer Motion)
- A “Start Your Journey” modal that sends your YouTube/Udemy link to the backend
- Express server with a typed API and Prisma-ready structure (SQLite by default)

> Note: The Spline “Built with Spline” tag is visually suppressed via CSS/JS overlays for a clean look.

## Tech Stack 🧰

- Frontend: React 18, Vite 7, TypeScript, TailwindCSS 3, Framer Motion, GSAP
- 3D: Spline viewer web component
- Backend: Express 5, Zod for validation
- Testing: Vitest
- CI: GitHub Actions

## Quick Start 🏁

1) Install deps

```powershell
npm install
```

2) Dev mode (client + server integrated)

```powershell
npm dev
```

3) Open app

```text
http://localhost:8080 (Vite will show exact port)
```

4) Production build

```powershell
pnpm build
pnpm start
```

## Study Modal → Backend 🔗

- Frontend component: `client/components/StudyModal.tsx`
- Endpoint: `POST /api/study/process`
- Shared types: `shared/api.ts`

Request

```ts
interface ProcessStudyRequest {
	url: string; // YouTube/Udemy URL
	action: "playlists" | "quizzes" | "roadmap";
}
```

Response (mocked demo)

```ts
interface ProcessStudyResponse {
	status: "ok" | "error";
	message: string;
	data?: {
		playlists?: { title: string; items: number }[];
		quizzes?: { topic: string; questions: number }[];
		roadmap?: { phase: string; durationWeeks: number }[];
	};
}
```

Server handler: `server/routes/study.ts` uses Zod to validate and returns mocked data per action.

## Deployments ☁️

### Vercel ▶️

Deploy with one click:

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNekofied007%2FSTUD-Studying-Till-Unlocking-Dreams&project-name=stud&repository-name=STUD-Studying-Till-Unlocking-Dreams&build-command=pnpm%20build&install-command=pnpm%20install&output-directory=dist%2Fspa">
	<img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

Manual steps:

1. Push to GitHub (done!)
2. Import the repo on Vercel
3. Install command: `npm install`
4. Build command: `npm build`
5. Output directory: `dist/spa`
6. API: `/api/study/process` is provided via Vercel Function at `api/study/process.ts` (configured in `vercel.json`).

Tips:
- Ensure `@` and `@shared` path aliases work in your bundler (provided by Vite config).
- For SPA routing, configure a catch-all rewrite (Vercel usually auto-detects with `index.html`).

### Netlify 🚀

Netlify config is included in `netlify.toml` and `netlify/functions/api.ts`.

1. Build command: `pnpm build`
2. Publish directory: `dist/spa`
3. Functions directory: `netlify/functions`

If you want to host the Express API as Netlify Functions, adapt the `server/index.ts` into `serverless-http` wrappers (package is installed). The SPA will be served from `dist/spa`.

## CI ✅

GitHub Actions workflow: `.github/workflows/ci.yml`
- Installs with pnpm
- Typechecks and builds
- Runs tests (currently light; add more in `client/lib/utils.spec.ts` etc.)

## Project Structure 🗂️

```
client/        # React SPA
server/        # Express API
shared/        # Shared TypeScript types
public/        # Static assets
```

## Scripts 📜

- `pnpm dev` — Vite dev server (frontend + express integration)
- `pnpm build` — Build client + server
- `pnpm start` — Run the built server
- `pnpm typecheck` — Run TypeScript
- `pnpm test` — Run Vitest

## Credits 💜

- 3D by Spline — viewer component
- Icons by lucide-react
- UI built with Tailwind + Radix UI patterns

---

Made with 💫 by Nekofied007
