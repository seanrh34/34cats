# Placeholders

Everything in this site that is invented scaffolding, waiting for the real thing.
Items marked `placeholder: true` in `app/data.ts` render a small mint "PLACEHOLDER" flag.

## Data to replace (`app/data.ts`)

| Key | What it is | Replace with |
| --- | --- | --- |
| `projects[*].caseStudy.metrics[placeholder]` | "?" metric cells | Real measured numbers |
| `education[0].details[2]` | "Coursework placeholder: favourite module so far" | A real NUS module |
| `hero.phrases` | Cycling typewriter phrases (style choice) | Adjust copy if desired, not factual |

## Files to replace (`public/placeholders/`)

The remaining gallery strips are stand-ins. Drop-in replacements: keep the same filename
(or change the `gallery` paths in `data.ts`).

| File | Used by | Replace with |
| --- | --- | --- |
| `gallery-genai-seo-writer-*.svg` | GenAI SEO Writer case study | Real product screenshots (16:10) |
| `gallery-uen-search-*.svg` | UEN Search case study | Real product screenshots (16:10) |
| `gallery-dozbuster-*.svg` | DozeBuster case study | Real product screenshots (16:10) |

## Photos and videos (`public/images/`, `public/videos/`)

The hero portrait, experience card photos and "Outside of code" polaroids are all real photos now.
Any project can still get a hover video: set `video: "/videos/<name>.mp4"` on it in `app/data.ts`
(muted, a few seconds, ideally under 2 MB).
