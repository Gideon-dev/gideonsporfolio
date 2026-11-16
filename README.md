# Gideon Adeniran: Portfolio

Personal portfolio built with Next.js (App Router), React 19, TypeScript and Tailwind CSS.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command          | What it does                     |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Start the dev server (Turbopack) |
| `pnpm build`     | Production build                 |
| `pnpm start`     | Serve the production build       |
| `pnpm lint`      | ESLint                           |
| `pnpm typecheck` | TypeScript, no emit              |

## Environment variables

| Name                               | Purpose                                                       |
| ---------------------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`             | Canonical site URL used for metadata, sitemap, JSON-LD        |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form (public by design) |

Set the same variables in the hosting provider (e.g. Vercel project settings).

## Where things live

- `lib/site.ts`: name, role, email, CV link, socials and SEO copy. Edit this first.
- `lib/work.ts`: projects shown in the Work folders and on `/work/[slug]`.
- `lib/tools.ts`: the Internal tools section and `/tools/integration-status` docs.
- `lib/constants.ts`: nav links.
- `app/layout.tsx`: site-wide metadata, fonts, JSON-LD.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`: generated SEO routes.
- `components/sections/*`: page sections.
- `components/three/AboutGlobe.tsx`: the client-only globe (loaded with `next/dynamic`, `ssr: false`).
