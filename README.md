# Sean Hardjanto - Portfolio (34cats)

Portfolio for Sean Richardson Hardjanto, AI & software engineer and NUS CS student,
built with Next.js (App Router, static export) and plain CSS.

## Commands (pnpm only)

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

The static export is written to `out/`. Videos under `/videos/*` are served by the Pages Function in `functions/videos/[[path]].ts`, which adds HTTP byte-range (`206 Partial Content`) support so Cloudflare Pages can stream MP4s to Safari/iOS.

## Production URL

The site is served from `https://34cats.com/`, deployed by Cloudflare Pages from the `main`
branch (build command `pnpm build`, output directory `out`). `NEXT_PUBLIC_BASE_PATH` is
optional: set it (e.g. `/seanhardjanto.com`) only when hosting under a sub-path.

`NEXT_PUBLIC_BASE_PATH` drives both the Next.js `basePath` (in `next.config.ts`) and the
`asset()` helper in `app/data.ts`, which prefixes every `/public` URL (images, PDF, SVG)
because `next/image` with `unoptimized` + static export does not apply `basePath` itself.

## Content

All copy lives in `app/data.ts`. Anything invented has `placeholder: true` and is listed
in `PLACEHOLDERS.md` together with the placeholder images in `public/placeholders/`.
