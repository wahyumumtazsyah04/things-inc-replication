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

## Utilities added

- Health check: `GET /api/health` → `{ status: "ok" }`
- Version: `GET /api/version` → `{ name, version }`
- OG image (log-book): `GET /api/og/log-book/[slug]`

## Environment variables

Copy `.env.example` to `.env.local` and set values as needed:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_SHOW_HUD=false
```

In production, set `NEXT_PUBLIC_SITE_URL` to your canonical domain (e.g. `https://things.inc`). `robots.ts` will allow indexing only when `NODE_ENV=production` (or VERCEL_ENV=production). `sitemap.ts` uses this base URL for absolute links.

## Quality checks

- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Combined: `npm run check`

## Deployment notes

- Ensure env vars are configured in your hosting provider.
- If moving images to a CDN, update `next.config.ts` `images.remotePatterns` accordingly (already includes common CDNs and the official Webflow CDN).
