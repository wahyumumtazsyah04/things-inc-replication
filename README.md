# Things, Inc. – Modern Reconstruction

A Next.js (App Router) + Tailwind CSS project scaffold that replicates a marketing-site structure with modular components, sample blog, and GSAP-ready animation helpers.

## Tech
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- GSAP (optional, used via hooks)

## Getting Started

Dev server:

```powershell
npm --prefix "a:\dev\zenweb\things-inc-replication" run dev
```

Open http://localhost:3000

Production build:

```powershell
npm --prefix "a:\dev\zenweb\things-inc-replication" run build
```

## Structure
- `src/app` – routes using the App Router. Main pages under `(main-pages)` group.
- `src/components` – `layout`, `ui`, and `features` components.
- `src/lib` – helpers (animations, api stubs).
- `public` – static assets.

## Next steps
- Replace mock blog with MDX or a headless CMS.
- Wire GSAP animations where appropriate using hooks from `src/lib/animations.ts`.
- Add SEO metadata per page and integrate GTM/GA4.
