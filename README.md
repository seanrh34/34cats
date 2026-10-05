# Sean Hardjanto — Portfolio (34cats)

Portfolio for Sean Richardson Hardjanto — full-stack product engineer & NUS CS student —
built with Next.js (App Router, static export) and plain CSS.

## Commands (pnpm only)

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

The static export is written to `out/`.

## Base path

The site is normally served at `https://34cats.com/seanhardjanto.com/`, which is the default
`basePath`. To build a copy that works at a domain root instead:

```bash
NEXT_PUBLIC_BASE_PATH="" pnpm build
```

`NEXT_PUBLIC_BASE_PATH` drives both the Next.js `basePath` (in `next.config.ts`) and the
`asset()` helper in `app/data.ts`, which prefixes every `/public` URL (images, PDF, SVG)
because `next/image` with `unoptimized` + static export does not apply `basePath` itself.

## Content

All copy lives in `app/data.ts`. Anything invented has `placeholder: true` and is listed
in `PLACEHOLDERS.md` together with the placeholder images in `public/placeholders/`.
